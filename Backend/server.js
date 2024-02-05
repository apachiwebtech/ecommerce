const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination: 'uploads/', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(bodyParser.json());
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
  })
);

app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;

  const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"

  con.query(sql, [email, password, role], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length === 1) {
        const id = data[0].id;

        return res.json({ id: id })
      } else {
        return res.json({ err: "email or password is wrong" })
      }
    }
  })
})

app.post('/add_vendor', (req, res) => {

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
  // let gstupload = req.body.gstupload;
  // let panupload = req.body.panupload;
  // let agreementupload = req.body.agreementupload;
  let account_name = req.body.account_name;
  let account_no = req.body.account_no;
  let ifsc_code = req.body.ifsc_code;
  let created_date = new Date()


  // const image1 = req.files['gstupload'];
  // const image2 = req.files['panupload'];
  // const image3 = req.files['agreementupload'];

  // let gstupload = image1[0].filename
  // let panupload = image2[0].filename
  // let agreementupload = image3[0].filename

  const sql = "insert into awt_vendor(`username`,`mobile`,`emailid`,`password`,`address`,`state`,`city`,`pincode`,`gstno`,`vendor_pan`,`created_date`) values(?,?,?,?,?,?,?,?,?,?,?)"

  con.query(sql, [username, mobile, email, password, address, state, city, pincode, gst, pancard, created_date], (err, data) => {
    if (err) {
      return res.json(err)
    }

    const sql = "insert into awt_vendorbank(`Account_name`,`Account_no`,`ifsc`,`created_date`) values(?,?,?,?)"
    con.query(sql, [account_name, account_no, ifsc_code, created_date], (err, data) => {
      if (err) {
        return res.json(err)
      }


      const sql2 = "insert into awt_vendorcontact(`person_email`,`person_mobile`,`person_name`,`created_date`) values(?,?,?,?)"
      con.query(sql2, [personemail, personmobile, personname, created_date], (err, data) => {
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


  const sql = "insert into awt_adminuser(`firstname`,`lastname`,`email`,`password`,`role`,`created_date`) values(?,?,?,?,?,?)"

  con.query(sql, [firstname, lastname, email, password, role, created_date], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
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


  const sql = "insert into awt_category(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"

  con.query(sql, [title, description, user_id, created_date], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
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


  const sql = "insert into awt_subcategory(`cat_id`,`title`,`description`,`created_by`,`created_date`) values(?,?,?,?,?)"

  con.query(sql, [cat_id, title, description, user_id, created_date], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data Added Successfully!")
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
