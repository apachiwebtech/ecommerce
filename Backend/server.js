const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser')

const storage = multer.diskStorage({
  destination: 'uploads/', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24

  }
}))

// app.use(session({
//   secret: 'your-secret-key',
//   resave: true,
//   saveUninitialized: true,
// }));



const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
})

con.connect((err) => {
  if (err) {
    console.log('err');
  } else {
    console.log('success');
  }
});

app.get('/', (req, res) => {
  return res.json('from the backend side');
});

app.listen('8081', () => {
  console.log("listening")
})

app.use(
  cors({
    origin: '*',
    credentials :true
  })
);

// const verifyJwt = (req, res, next) => {
//   const token = req.headers["access-token"];
//   if (!token) {
//     return res.json("we need a token")
//   } else {
//     jwt.verify(token, "jwtSecretkey", (err, decoded) => {
//       if (err) {
//         res.json("Not Authenticated")
//       } else {
//         req.userID = decoded.id;
//         next();
//       }
//     })
//   }
// }

// app.get('/checkauth', verifyJwt, (req, res) => {
//   return res.json({ status: 1 })
// })

// app.post('/login', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let role = req.body.role;

//   const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"

//   con.query(sql, [email, password, role], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       if (data.length === 1) {
//         const id = data[0].id;
//         const token = jwt.sign({ id }, "jwtSecretkey", { expiresIn: 300 })

//         return res.json({ Login: true, token, data })
//         // return res.json({id : id})
//       } else {
//         return res.json({ err: "email or password is wrong" })
//       }
//     }
//   })
// })

app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;

  const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"

  con.query(sql, [email, password, role], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length > 0) {
        const id = data[0].id;
        req.session.id = id
        console.log(req.session.id)
        return res.json({data,id :req.session.id,id : id})
      }
      

    }
  })
})


app.get('/checkauth',(req,res)=>{
  if(req.session.id){
    return res.json({valid : true , id :req.session.id})
  }else{
    return res.json({valid :false})
  }
})








app.post('/add_vendor', upload.fields([
  { name: 'gstupload', maxCount: 1 },
  { name: 'panupload', maxCount: 1 },
  { name: 'agreementupload', maxCount: 1 }
]), (req, res) => {

  let username = req.body.username;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let password = req.body.password;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let pincode = req.body.pincode;
  let personemail = req.body.personemail;
  let personmobile = req.body.personmobile;
  let personname = req.body.personname;
  let gst = req.body.gst;
  let pancard = req.body.pancard;
  let account_name = req.body.account_name;
  let account_no = req.body.account_no;
  let ifsc_code = req.body.ifsc_code;
  let created_date = new Date()
  let u_id = req.body.u_id;
  let user_id = req.body.user_id


  let sql;
  let sql2;
  let sql3;
  let param;
  let param2;
  let param3;




  const image1 = req.files['gstupload'];
  const image2 = req.files['panupload'];
  const image3 = req.files['agreementupload'];

  let gstupload = image1[0].filename
  let panupload = image2[0].filename
  let agreementupload = image3[0].filename



  if (u_id == "undefined") {

    sql = "insert into awt_vendor(`username`,`mobile`,`emailid`,`password`,`address`,`state`,`city`,`pincode`,`gstno`,`vendor_pan`,`created_date`,`created_by`,`gst_upload`,`pan_upload`,`aggrement_upload`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


    param = [username, mobile, email, password, address, state, city, pincode, gst, pancard, created_date, user_id, gstupload, panupload, agreementupload]
  }
  else {

    sql = "update awt_vendor set username = ? , mobile = ?, emailid = ?, password = ?, address = ?,state = ?, city = ?,pincode = ?,gstno =?,vendor_pan = ?, updated_date = ?, updated_by = ? ,gst_upload = ?, pan_upload = ?,aggrement_upload =? where id = ?";
    console.log("update")
    param = [username, mobile, email, password, address, state, city, pincode, gst, pancard, created_date, user_id, gstupload, panupload, agreementupload, u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }



    const insertedId = data.insertId;
    console.log(insertedId)

    if (u_id == "undefined") {

      sql2 = "insert into awt_vendorbank(`Account_name`,`Account_no`,`ifsc`,`created_date`,`created_by`,`v_id`) values(?,?,?,?,?,?)"
      param2 = [account_name, account_no, ifsc_code, created_date, user_id, insertedId,]
    }
    else {
      sql2 = "update awt_vendorbank set Account_name = ? ,Account_no = ?, ifsc = ?, updated_date = ?, updated_by = ? where v_id = ?"
      param2 = [account_name, account_no, ifsc_code, created_date, user_id, u_id]
    }
    con.query(sql2, param2, (err, data) => {
      if (err) {
        return res.json(err)
      }

      if (u_id == "undefined") {

        sql3 = "insert into awt_vendorcontact(`person_email`,`person_mobile`,`person_name`,`created_date`,`created_by`,`v_id`) values(?,?,?,?,?,?)"

        param3 = [personemail, personmobile, personname, created_date, user_id, insertedId]
      } else {
        sql3 = "update awt_vendorcontact set person_email = ?,person_mobile = ?,person_name = ?,updated_date = ?, updated_by = ? where v_id = ?"

        param3 = [personemail, personmobile, personname, created_date, user_id, u_id]
      }


      con.query(sql3, param3, (err, data) => {
        if (err) {

          return res.json(err)
        }
        else {

          return res.json("Data Added successfully")
        }
      })


    })


  })
})

app.post('/vendor_update', (req, res) => {

  let u_id = req.body.u_id;


  const sql = "select av.id,av.emailid,av.username,av.mobile,av.password,av.gstno,av.address,av.state,av.city,av.pincode,av.vendor_pan,av.gst_upload,av.pan_upload,av.aggrement_upload,av.created_date,avd.person_email,avd.person_mobile,avd.person_name,avb.Account_name,avb.Account_no,avb.ifsc from awt_vendor as av left join awt_vendorcontact as avd on av.id = avd.v_id left join awt_vendorbank as avb on av.id = avb.v_id where av.id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      return res.json(data)
    }
  })

})


app.get('/vendor_data', (req, res) => {


  const sql = "select * from awt_vendor where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/vendor_delete', (req, res) => {

  let vendor_id = req.body.vendor_id;

  const sql = "update awt_vendor set deleted = 1 where id = ?"

  con.query(sql, [vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_adminuser', (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let role = "2";
  let created_date = new Date()
  let u_id = req.body.u_id;

  let user_id = req.body.user_id
  let sql;
  let param;

  if (u_id == undefined) {


    sql = "insert into awt_adminuser(`firstname`,`lastname`,`email`,`password`,`role`,`created_date`,`created_by`) values(?,?,?,?,?,?,?)"
    param = [firstname, lastname, email, password, role, created_date, user_id]

  } else {
    sql = "update awt_adminuser set firstname = ?, lastname = ?, email = ?, password = ?, role = ?,updated_date = ?, updated_by = ? where id = ?"
    param = [firstname, lastname, email, password, role, created_date, user_id, u_id]
  }

  con.query(sql, param, (err, data) => {
    console.log(sql)
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
    }


  })
})

app.post('/adminuser_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_adminuser where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/adminuser_data', (req, res) => {

  const sql = "select * from awt_adminuser where deleted = 0 and role = 2"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/adminuser_delete', (req, res) => {

  let adminuser_id = req.body.adminuser_id;

  const sql = "update awt_adminuser set deleted = 1 where id = ?"

  con.query(sql, [adminuser_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_category', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_category(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, description, user_id, created_date]

  } else {
    sql = "update awt_category set title = ? , description = ? , updated_by = ? ,updated_date = ? where id = ?"
    param = [title, description, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {
    if (err) {

      return res.json(err)
    }
    else {

      return res.json("Data Added Successfully!")
    }


  })
})

app.post('/category_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_category where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/category_data', (req, res) => {

  const sql = "select * from awt_category where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/category_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_category set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_subcategory', (req, res) => {
  let cat_id = req.body.cat_id;
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_subcategory(`cat_id`,`title`,`description`,`created_by`,`created_date`) values(?,?,?,?,?)"
    param = [cat_id, title, description, user_id, created_date]
  } else {
    sql = "update awt_subcategory set cat_id = ?, title = ? , description = ? , updated_by = ?, updated_date = ? where id = ?"
    param = [cat_id, title, description, user_id, created_date, u_id]
  }

  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
    }


  })
})

app.post('/subcategory_update', (req, res) => {

  let u_id = req.body.u_id;
  const sql = "select * from awt_subcategory where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/subcategory_data', (req, res) => {

  const sql = "select * from awt_subcategory where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/subcategory_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_subcategory set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_brand', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()


  const sql = "insert into awt_brand(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"

  con.query(sql, [title, description, user_id, created_date], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
    }


  })
})

app.post('/brand_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_brand where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.get('/Brand_data', (req, res) => {

  const sql = "select * from awt_brand where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/Brand_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_brand set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})