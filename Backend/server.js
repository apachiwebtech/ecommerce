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

const storage2 = multer.diskStorage({
  destination: 'uploads/banner', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage3 = multer.diskStorage({
  destination: 'uploads/gallery', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage4 = multer.diskStorage({
  destination: 'uploads/brand', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage5 = multer.diskStorage({
  destination: 'uploads/sizechart', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage6 = multer.diskStorage({
  destination: '../public_html/ecomuploads/category', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });
const upload4 = multer({ storage: storage4 });
const upload5 = multer({ storage: storage5 });
const upload6 = multer({ storage: storage6 });

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
    credentials: true
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
        return res.json({ data, keyid: req.session.id, id: id })
      }


    }
  })
})


app.get('/checkauth', (req, res) => {
  if (req.session.id) {
    return res.json({ valid: true, id: req.session.id })
  } else {
    return res.json({ valid: false })
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
  let vendor_name = req.body.vendor_name;

  let address = req.body.address
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
  let user_id = req.body.user_id;

  console.log(vendor_name, "name")

  if (address == "undefined") {
    address = null;
  }
  if (state == "undefined") {
    state = null;
  }
  if (city == "undefined") {
    city = null;
  }
  if (pincode == "undefined") {
    pincode = null;
  }
  if (personemail == "undefined") {
    personemail = null;
  }
  if (personmobile == "undefined") {
    personmobile = null;
  }
  if (personname == "undefined") {
    personname = null;
  }
  if (gst == "undefined") {
    gst = null;
  }
  if (pancard == "undefined") {
    pancard = null;
  }
  if (account_name == "undefined") {
    account_name = null;
  }
  if (account_no == "undefined") {
    account_no = null;
  }
  if (ifsc_code == "undefined") {
    ifsc_code = null;
  }



  let sql;
  let sql2;
  let sql3;
  let param;
  let param2;
  let param3;




  const image1 = req.files['gstupload'];
  const image2 = req.files['panupload'];
  const image3 = req.files['agreementupload'];



  const imagesql = "select gst_upload,pan_upload,aggrement_upload from awt_vendor where id = ?"

  con.query(imagesql,[u_id], (err, data) => {
    if (err) {
      return res.json("error")
    } else {
      const gstimage = data[0] && data[0].gst_upload !== undefined ? data[0].gst_upload : '';
      const panimage = data[0] && data[0].pan_upload !== undefined ? data[0].pan_upload : '';
      const agreementimg = data[0] && data[0].aggrement_upload !== undefined ? data[0].aggrement_upload : '';
      
      



      let gstupload;
      let panupload;
      let agreementupload;

      if(gstimage == undefined){
        
        gstupload = image1 ? image1[0].filename : '';
      }else{
        gstupload = image1 ? image1[0].filename : gstimage;
        
      }

      if(panimage == undefined){
        panupload = image2 ? image2[0].filename : '';
        
      }else{
        
        panupload = image2 ? image2[0].filename : panimage;
      }

      if(agreementimg == undefined){
        agreementupload = image3 ? image3[0].filename : "";
        
      }else{
        agreementupload = image3 ? image3[0].filename : agreementimg;
        
      }
      



      if (u_id == "undefined") {

        sql = "insert into awt_vendor(`vendor_name`,`username`,`mobile`,`emailid`,`password`,`address`,`state`,`city`,`pincode`,`gstno`,`vendor_pan`,`created_date`,`created_by`,`gst_upload`,`pan_upload`,`aggrement_upload`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


        param = [vendor_name, username, mobile, email, password, address, state, city, pincode, gst, pancard, created_date, user_id, gstupload, panupload, agreementupload]
      }
      else {

        sql = "update awt_vendor set vendor_name= ? ,  username = ? , mobile = ?, emailid = ?, password = ?, address = ?,state = ?, city = ?,pincode = ?,gstno =?,vendor_pan = ?, updated_date = ?, updated_by = ? ,gst_upload = ?, pan_upload = ?,aggrement_upload =? where id = ?";

        param = [vendor_name, username, mobile, email, password, address, state, city, pincode, gst, pancard, created_date, user_id, gstupload, panupload, agreementupload, u_id]
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
    }
  })
})

app.post('/vendor_approve', (req, res) => {

  let vendor_id = req.body.vendor_id;


  const sql = "update awt_vendor set approve = 1, active = 1 where id = ?"

  con.query(sql, [vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      return res.json(data)
    }
  })

})

app.post('/vendor_status', (req, res) => {

  let vendor_id = req.body.vendor_id;
  let status = req.body.status;


  const sql = "update awt_vendor set  active = ? where id = ?"

  con.query(sql, [status, vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      return res.json(data)
    }
  })

})




app.post('/vendor_update', (req, res) => {

  let u_id = req.body.u_id;


  const sql = "select av.id,av.vendor_name,av.emailid,av.username,av.mobile,av.password,av.gstno,av.address,av.state,av.city,av.pincode,av.vendor_pan,av.gst_upload,av.pan_upload,av.aggrement_upload,av.created_date,avd.person_email,avd.person_mobile,avd.person_name,avb.Account_name,avb.Account_no,avb.ifsc from awt_vendor as av left join awt_vendorcontact as avd on av.id = avd.v_id left join awt_vendorbank as avb on av.id = avb.v_id where av.id = ?"

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
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let role = "2";
  let created_date = new Date()
  let u_id = req.body.u_id;
  let user_id = req.body.user_id

  let sql;
  let param;

  if (u_id == undefined) {


    sql = "insert into awt_adminuser(`firstname`,`lastname`,`mobile`,`email`,`password`,`role`,`created_date`,`created_by`) values(?,?,?,?,?,?,?,?)"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id]

  } else {
    sql = "update awt_adminuser set firstname = ?, lastname = ?,mobile = ?, email = ?, password = ?, role = ?,updated_date = ?, updated_by = ? where id = ?"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id, u_id]
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

app.post('/add_category',upload6.single('image'), (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let image = req.file.filename;
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;




  let sql;
  let param;

  if (u_id == 'undefined') {
    sql = "insert into awt_category(`title`,`slug`,`description`,`image`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [title, slug, description,image, user_id, created_date]

  } else {
    sql = "update awt_category set title = ? ,slug = ?, description = ? ,image = ?, updated_by = ? ,updated_date = ? where id = ?"
    param = [title, slug, description,image, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {
   
    if (err) {

      return res.json(err)
    }
    else {

      return res.json(data)
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
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_subcategory(`cat_id`,`title`,`slug`,`description`,`created_by`,`created_date`) values(?,?,?,?,?)"
    param = [cat_id, title, slug, description, user_id, created_date]
  } else {
    sql = "update awt_subcategory set cat_id = ?, title = ?,slug = ? , description = ? , updated_by = ?, updated_date = ? where id = ?"
    param = [cat_id, title, slug, description, user_id, created_date, u_id]
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

app.post('/add_brand', upload4.single('logo'), (req, res) => {
  let user_id = req.body.user_id
  let image = req.file.filename
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let uid = req.body.uid

  let sql;
  let param;
  if (uid == "undefined") {
    sql = "insert into awt_brand(`title`,`logo`,`description`,`created_by`,`created_date`) values(?,?,?,?,?)"
    param = [title, image, description, user_id, created_date]
  } else {

    sql = "update awt_brand set title = ?, logo = ?,description = ?,updated_by = ?, updated_date = ? where id =?";
    param = [title, image, description, user_id, created_date, uid]
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


app.post('/add_color', (req, res) => {
  let title = req.body.title;
  let colorcode = req.body.colorcode;
  let created_date = new Date()
  let uid = req.body.uid
  let user_id = req.body.user_id

  console.log(user_id, "id")

  let sql;
  let param;
  if (uid == undefined) {
    sql = "insert into awt_color(`title`,`colorcode`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title,  colorcode, user_id, created_date]
  } else {

    sql = "update awt_color set title = ?, colorcode = ?,updated_by = ?, updated_date = ? where id =?";
    param = [title,  colorcode, user_id, created_date, uid]
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

app.post('/color_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_color where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.get('/color_data', (req, res) => {

  const sql = "select * from awt_color where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/color_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_color set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/social_data', (req, res) => {

  const sql = 'select * from awt_social_links'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.post('/social_update_data', (req, res) => {

  let social_id = req.body.social_id;

  const sql = 'select * from awt_social_links where id = ?'

  con.query(sql, [social_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.post('/update_social', (req, res) => {

  let title = req.body.title;
  let link = req.body.link;
  let colorcode = req.body.colorcode;
  let user_id = req.body.user_id
  let date = new Date()
  let uid = req.body.uid


  const sql = 'update awt_social_links set title = ?,link = ?,colorcode = ?,updated_date = ?,updated_by = ? where id = ?'

  con.query(sql, [title, link, colorcode, date, user_id, uid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json("Data Added Successfully")
    }
  })
})

app.post('/add_banner', upload2.single('image'), (req, res) => {

  let title = req.body.title;
  let banner = req.file.filename;
  let link = req.body.link;
  let target = req.body.target;
  let view = req.body.viewid;
  let uid = req.body.uid;

  let sql;
  let param;

  console.log(uid, "uid")



  if (uid == "undefined") {

    sql = 'insert into awt_banner(`title`,`upload_image`,`link`,`target`,`view`) values(?,?,?,?,?)'

    param = [title, banner, link, target, view]
  } else {
    sql = 'update awt_banner set title = ? , upload_image = ? , link = ? ,target = ?, view = ? where  id = ?'
    param = [title, banner, link, target, view, uid]
  }


  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/banner_data`, (req, res) => {

  const sql = 'select * from awt_banner '

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/banner_updateid', (req, res) => {

  let bannerid = req.body.bannerid;

  const sql = 'select * from awt_banner where id = ?'

  con.query(sql, [bannerid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.get('/gallery_data', (req, res) => {

  const sql = 'select * from awt_gallery where deleted = 0'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/add_gallery', upload3.single('image'), (req, res) => {

  let title = req.body.title;
  let image = req.file.filename;
  let created_date = new Date()
  let user_id = "2"
  let u_id = req.body.u_id;


  let sql;
  let param;


  if (u_id == 'undefined') {
    sql = "insert into awt_gallery(`title`,`upload_image`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, image, user_id, created_date]
  } else {
    sql = "update awt_gallery set title = ? , upload_image = ? , updated_by = ? ,updated_date = ? where id = ?"
    param = [title, image, user_id, created_date, u_id]
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

app.post('/gallery_delete', (req, res) => {

  let gallery_id = req.body.gallery_id;

  const sql = "update awt_gallery set deleted = 1 where id = ?"

  con.query(sql, [gallery_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/gallery_update_data', (req, res) => {

  let gallery_id = req.body.gallery_id;

  const sql = "select * from  awt_gallery  where id = ?"

  con.query(sql, [gallery_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get(`/order_detail`, (req, res) => {

  const sql = 'select * from `order` where deleted = 0'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/getsubcategory`, (req, res) => {
  let catid = req.body.catid;

  const sql = 'select * from `awt_subcategory` where cat_id = ?'

  con.query(sql, [catid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post(`/add_product`, upload5.single('sizeimage'), (req, res) => {

  let v_id = req.body.v_id;
  let user_id = req.body.user_id;
  let catid = req.body.catid;
  let title = req.body.title;
  let b_id = req.body.b_id;
  let subcatid = req.body.subcatid;
  let price = req.body.price;
  let d_price = req.body.d_price;
  let description = req.body.description;
  let specification = req.body.specification;
  let activeval = req.body.activeval;
  let featureval = req.body.featureval;
  let trendingval = req.body.trendingval;
  let sizeimage = req.file.filename;
  let date = new Date()

  const sql = 'insert into awt_add_product(`title`,`v_id`,`b_id`,`catid`,`scatid`,`description`,`specification`,`price`,`disc_price`,`size_image`,`created_date`,`created_by`,`active`,`trending`,`featured`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

  con.query(sql, [title, v_id, b_id, catid, subcatid, description,specification, price, d_price, sizeimage, date, user_id,activeval,trendingval,featureval], (err, data) => {
    if (err) {
      return res.json("Error in uploading")
    } else {
      return res.json("Data Added Successfully")
    }
  })
})

app.get(`/product_data`, (req, res) => {

  const sql = 'select  aap.id,aap.active,aap.approve, aap.title,aap.description ,aap.price,ac.id as catid ,ac.title as category,av.id as vendorid,av.vendor_name as vendor,ab.id as brandid,ab.title as brand ,acs.id as scatid,acs.title as subcategory from `awt_add_product` as aap left join awt_category as ac on aap.catid = ac.id left JOIN awt_vendor as av on aap.v_id = av.id LEFT JOIN awt_brand as ab on aap.b_id = ab.id left JOIN awt_subcategory as acs on aap.scatid = acs.id where aap.deleted = 0';

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})