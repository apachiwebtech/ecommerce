const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser');
const cron = require('node-cron')
const crypto = require('crypto');
const axios = require('axios');

dotenv.config();


const storage = multer.diskStorage({
  destination: '../../ecomuploads/', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage2 = multer.diskStorage({
  destination: '../../ecomuploads/banner', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage3 = multer.diskStorage({
  destination: '../../ecomuploads/gallery', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage4 = multer.diskStorage({
  destination: '../../ecomuploads/brand', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage5 = multer.diskStorage({
  destination: '../../ecomuploads/sizechart', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage6 = multer.diskStorage({
  destination: '../../ecomuploads/category', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const storage7 = multer.diskStorage({
  destination: '../../ecomuploads/group', // 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage8 = multer.diskStorage({
  destination: '../../ecomuploads/productimg', // 
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
const upload7 = multer({ storage: storage7 });
const upload8 = multer({ storage: storage8 });

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

// const con = mysql.createPool({
//   host: 'localhost',
//   user: 'icasasuc_micasasucasa',
//   password: 'oSPC2)TF&8e,',
//   database: 'icasasuc_micasasucasa',
//   timezone: '+05:30'
// })

const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
});

con.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
    connection.release(); // Release the connection back to the pool
  }
});

app.get('/', (req, res) => {
  return res.json('from the backend side new');
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

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


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
//   return res.json({status : 1})
// })

// app.post('/login', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let role = req.body.role;

//   const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"

//   con.query(sql, [email, password, role], (err, data) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: "Internal server error" });
//    } else {
//       if (data.length === 1) {
//         const id = data[0].id;
//         const token = jwt.sign({ id }, "jwtSecretkey", { expiresIn: 300 })

//         return res.json(data)
//       } else {
//         return res.json({ err: "email or password is wrong" })
//       }
//     }
//   })
// })

// app.post('/login', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   let role = req.body.role;

//   const sql = "select * from awt_adminuser where email = ? and password = ? and role = ? and deleted = 0"

//   con.query(sql, [email, password, role], (err, data) => {
//     if (err) {
//      return res.json(err)
//     } else {
//       if (data.length === 1) {
//         const id = data[0].id;
//         return res.json({id : id})
//       }
//     }
//   })
// })

// app.post('/customerlogin', (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   const sql = "select * from awt_customers where email = ? and password = ? and deleted = 0"

//   con.query(sql, [email, password], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       if (data.length > 0) {
//         const id = data[0].id;


//         req.session.id = id
//         console.log(req.session.id)
//         return res.json({ data, keyid: req.session.id, id: id })
//       }


//     }
//   })
// })

app.post('/customerlogin', (req, res) => {
  let email = req.body.email;
  let otp = req.body.otp;

  const sql = "SELECT * from awt_customers where email = ? AND deleted = 0"

  con.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      if (data.length !== 0) {
        const sql2 = "UPDATE awt_customers SET otp = ? WHERE email = ?";

        con.query(sql2, [otp, email], (err, data) => {
          if (err) {
            return res.json(err)
          }
          else {
            if (data.length !== 0) {

              const sql = "SELECT * from awt_customers WHERE email = ? and deleted = 0";
              con.query(sql, [email], (err, data) => {
                if (err) {
                  return res.json(err)
                } else {
                  return res.json(data)
                }
              })
            }

          }
        })
      } else {
        return res.json("Email id is not registered")
      }
    }
  })

})

app.post('/otp', (req, res) => {
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let mobile = req.body.mobile;
  let value = req.body.value;
  let otp = req.body.otp;
  const currentDate = new Date();
  let params;

  if (value == 1) {
    const sql = "SELECT * from awt_customers  where email =?  and otp = ? and deleted = 0 ";
    params = [email, otp]

    con.query(sql, params, (err, data) => {
      if (err) {
        return res.json(err)
      } else {

        console.log(data, "otp")
        return res.json(data)
      }
    })
  }

  if (value == 0) {
    const sql = "SELECT * from awt_customers_dummy where email = ? and otp = ? and deleted = 0 ";
    params = [email, otp]
    con.query(sql, params, (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        if (data.length !== 0) {

          const sql = "INSERT INTO awt_customers(`email`,`firstname`,`lastname`,`mobile`,`otp`,`created_date`) VALUES(?,?,?,?,?,?)"

          con.query(sql, [email, firstname, lastname, mobile, otp, currentDate], (err, data) => {
            if (err) {
              return res.json(err)
            } else {
              const insertedId = data.insertId;
              const sql = "SELECT * from  awt_customers WHERE id = ? and deleted = 0";

              con.query(sql, [insertedId], (err, data) => {
                if (err) {
                  console.log(err)
                }
                else {
                  return res.json(data)
                }
              })

            }
          })
        }


      }
    })
  }



});

app.post('/register', (req, res) => {
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let mobile = req.body.mobile;
  let otp = req.body.otp;


  const sql = "SELECT * from awt_customers where email = ? AND deleted = 0"


  con.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {

      if (data.length === 0) {

        const sql3 = "INSERT INTO awt_customers_dummy(`email`,`firstname`,`lastname`,`mobile`,`otp`) VALUES (?,?,?,?,?)";
        con.query(sql3, [email, firstname, lastname, mobile, otp], (err, data) => {
          if (err) {
            return res.json(err);
          }
          else {
            const insertedId = data.insertId;

            const sql = "SELECT * from awt_customers_dummy WHERE id = ? and deleted = 0";
            con.query(sql, [insertedId], (err, data) => {
              if (err) {
                console.log(err)
              }
              else {

                return res.json(data)
              }
            })

          }
        })
      } else {
        return res.json("Email id alerady exist")
      }
    }
  });
});

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
        return res.json({ data, id: req.session.id, id: id })
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

  console.log(image1, "new")

  const imagesql = "select gst_upload,pan_upload,aggrement_upload from awt_vendor where id = ?"

  con.query(imagesql, [u_id], (err, data) => {
    if (err) {
      return res.json("error")
    } else {
      const gstimage = data[0] && data[0].gst_upload !== undefined ? data[0].gst_upload : '';
      const panimage = data[0] && data[0].pan_upload !== undefined ? data[0].pan_upload : '';
      const agreementimg = data[0] && data[0].aggrement_upload !== undefined ? data[0].aggrement_upload : '';



      console.log(gstimage, "gst")


      let gstupload;
      let panupload;
      let agreementupload;

      if (gstimage == undefined) {

        gstupload = image1 ? image1[0].filename : '';
      } else {
        gstupload = image1 ? image1[0].filename : gstimage;

      }

      if (panimage == undefined) {
        panupload = image2 ? image2[0].filename : '';

      } else {

        panupload = image2 ? image2[0].filename : panimage;
      }

      if (agreementimg == undefined) {
        agreementupload = image3 ? image3[0].filename : "";

      } else {
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


  const sql = "select * from awt_vendor where deleted = 0 order by id desc"

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
  let created_date = new Date()
  let u_id = req.body.u_id;
  let user_id = req.body.user_id;
  let role = req.body.role;
  let address = req.body.address;
  let city = req.body.city;
  let state = req.body.state;
  let pincode = req.body.pincode;

  let sql;
  let param;

  if (u_id == undefined) {


    sql = "insert into awt_adminuser(`firstname`,`lastname`,`mobile`,`email`,`password`,`role`,`created_date`,`created_by`,`address`,`city`,`state`,`pincode`) values(?,?,?,?,?,?,?,?,?,?,?,?)"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id, address, city, state, pincode]

  } else {
    sql = "update awt_adminuser set firstname = ?, lastname = ?,mobile = ?, email = ?, password = ?, role = ?,updated_date = ?, updated_by = ? , address = ? , city = ? , state = ? ,pincode = ?  where id = ?"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id, address, city, state, pincode, u_id]
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

  const sql = "select * from awt_adminuser where deleted = 0 order by id desc"

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
  let date = new Date()

  const sql = "update awt_adminuser set deleted = 1 , deleted_date = ? where id = ?"

  con.query(sql, [date, adminuser_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_category', upload6.single('image'), (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let group_id = req.body.group_id;
  let image = req.file.filename;
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;




  let sql;
  let param;

  if (u_id == 'undefined') {
    sql = "insert into awt_category(`title`,`group_id`,`slug`,`description`,`image`,`created_by`,`created_date`) values(?,?,?,?,?,?,?)"
    param = [title, group_id, slug, description, image, user_id, created_date]

  } else {
    sql = "update awt_category set title = ? ,group_id = ? ,slug = ?, description = ? ,image = ?, updated_by = ? ,updated_date = ? where id = ?"
    param = [title, group_id, slug, description, image, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {

    if (err) {

      return res.json("Error")
    }
    else {

      return res.json("Data Added Successfully")
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
app.get('/blogcategory_data', (req, res) => {

  const sql = "select * from awt_blogcategory where deleted = 0 "

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

app.post('/add_group', upload7.single('image'), (req, res) => {
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
    sql = "insert into awt_group(`title`,`slug`,`description`,`image`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [title, slug, description, image, user_id, created_date]

  } else {
    sql = "update awt_group set title = ? ,slug = ?, description = ? ,image = ?, updated_by = ? ,updated_date = ? where id = ?"
    param = [title, slug, description, image, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {

    if (err) {

      return res.json("Error")
    }
    else {

      return res.json("Data Added Successfully")
    }


  })
})

app.post('/group_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_group where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/group_data', (req, res) => {

  const sql = "select * from awt_group where deleted = 0 limit 3"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/group_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_group set deleted = 1 where id = ?"

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
    sql = "insert into awt_subcategory(`cat_id`,`title`,`slug`,`description`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
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

app.post('/add_blogcat', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;

  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_blogcategory(`title`,`slug`,`description`,`created_by`,`created_date`) values(?,?,?,?,?)"
    param = [title, slug, description, user_id, created_date]
  } else {
    sql = "update awt_blogcategory set  title = ?, slug = ? , description = ? , updated_by = ?, updated_date = ? where id = ?"
    param = [title, slug, description, user_id, created_date, u_id]
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

app.post('/blogcat_update', (req, res) => {

  let u_id = req.body.u_id;
  const sql = "select * from awt_blogcategory where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/blogcat_data', (req, res) => {

  const sql = "select * from awt_blogcategory where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/blogcat_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_blogcategory set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/add_blog', (req, res) => {
  let blogcat_id = req.body.blogcat_id;
  let user_id = req.body.user_id
  let title = req.body.title;
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_blog(`blogcat_id`,`title`,`slug`,`description`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [blogcat_id, title, slug, description, user_id, created_date]
  } else {
    sql = "update awt_blog set blogcat_id = ?, title = ?, slug = ? , description = ? , updated_by = ?, updated_date = ? where id = ?"
    param = [blogcat_id, title, slug, description, user_id, created_date, u_id]
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

app.post('/blog_update', (req, res) => {

  let u_id = req.body.u_id;
  const sql = "select * from awt_blog where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/blog_data', (req, res) => {

  const sql = "select * from awt_blog where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/blog_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_blog set deleted = 1 where id = ?"

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
    sql = "insert into awt_brand(`title`,`logo`,`description`,`created_by`,`created_date`,`approve`) values(?,?,?,?,?,?)"
    param = [title, image, description, user_id, created_date, 1]
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

app.post('/add_vendor_brand', upload4.single('logo'), (req, res) => {
  let user_id = req.body.user_id
  let image = req.file.filename
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let uid = req.body.uid

  let sql;
  let param;
  if (uid == "undefined") {
    sql = "insert into awt_brand(`v_id`,`title`,`logo`,`description`,`created_by`,`created_date`) values(?,?,?,?,?,?)"
    param = [user_id, title, image, description, user_id, created_date]
  } else {

    sql = "update awt_brand set v_id = ?, title = ?, logo = ?,description = ?,updated_by = ?, updated_date = ? ,approve = 0 where id =?";
    param = [user_id, title, image, description, user_id, created_date, uid]
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

  const sql = "select * from awt_brand where deleted = 0 and approve = 1"

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
    param = [title, colorcode, user_id, created_date]
  } else {

    sql = "update awt_color set title = ?, colorcode = ?,updated_by = ?, updated_date = ? where id =?";
    param = [title, colorcode, user_id, created_date, uid]
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
  let banner;

  if (req.body.filename == undefined) {
    banner = req.body.image
  } else {
    banner = req.file.filename;
  }

  let link = req.body.link;
  let target = req.body.target;
  let view = req.body.viewid;
  let uid = req.body.uid;
  let description = req.body.description;

  let sql;
  let param;





  if (uid == "undefined") {

    sql = 'insert into awt_banner(`title`,`upload_image`,`link`,`target`,`view`,`description`) values(?,?,?,?,?,?)'

    param = [title, banner, link, target, view, description]
  } else {
    sql = 'update awt_banner set title = ? , upload_image = ? , link = ? ,target = ?, view = ? ,description = ?  where  id = ?'
    param = [title, banner, link, target, view, description, uid]
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

  const sql = 'select * from `order` where deleted = 0 and orderno != "" order by id desc';

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/vendor_order_detail`, (req, res) => {

  let vendor_id = req.body.vendor_id

  const sql = 'select * from `order` where deleted = 0  and FIND_IN_SET( ?, `v_id`)'

  con.query(sql, [vendor_id], (err, data) => {
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

app.post(`/getcategory_data`, (req, res) => {
  let groupid = req.body.groupid;

  const sql = 'select * from `awt_category` where group_id = ?'

  con.query(sql, [groupid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/product_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_add_product where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/update_proqty', (req, res) => {

  let order_id = req.body.order_id;
  let p_id = req.body.p_id;
  let pqty = req.body.pqty;

  const sql = "update `awt_cart` set `pqty` = ? where `orderid` = ? and `proid` = ?"

  con.query(sql, [pqty, order_id, p_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})





app.post(`/add_product`, upload5.fields([
  { name: 'sizeimage', maxCount: 1 },
]), (req, res) => {

  let v_id = req.body.v_id;
  let user_id = req.body.user_id;
  let groupid = req.body.groupid;
  let slug = req.body.slug;
  let catid = req.body.catid;
  let title = req.body.title;
  let b_id = req.body.b_id;
  let subcatid = req.body.subcatid;
  let price = req.body.price;
  let d_price = req.body.d_price;
  let customizable = req.body.customizable;
  let description = req.body.description;
  let specification = req.body.specification;
  let gst = req.body.gst;
  // let sizeimage = req.file.filename;
  let date = new Date()
  let approve = 0
  let uid = req.body.uid;
  
  let hsn_code = req.body.hsn_code;
  let lbh_unit = req.body.lbh_unit;
  let length = req.body.length;
  let height = req.body.height;
  let breadth = req.body.breadth;
  let weight_unit = req.body.weight_unit;
  let weight = req.body.weight;
  let no_of_box = req.body.no_of_box;

  let sql;
  let param;

  const image1 = req.files['sizeimage'];

  const imagesql = "select size_image from awt_add_product where id = ?"


  con.query(imagesql, [uid], (err, data) => {
    if (err) {
      console.log(err)
    } else {


      const getimage = data[0] && data[0].size_image !== undefined ? data[0].size_image : '';
      console.log(getimage, "dd")

      let sizeupload;


      if (getimage == undefined) {
        sizeupload = image1 ? image1[0].filename : '';
      } else {
        sizeupload = image1 ? image1[0].filename : getimage;

      }



      if (uid == "undefined") {
        sql = 'insert into awt_add_product(`title`,`v_id`,`b_id`,`groupid`,`catid`,`scatid`,`slug`,`description`,`specification`,`price`,`disc_price`,`size_image`,`created_date`,`created_by`,`gst`,`customizable`,`length`,`breadth`,`height`,`no_of_box`,`weight`,`hsn_code`,`lbh_unit`,`weight_unit`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

        param = [title, v_id, b_id, groupid, catid, subcatid, slug, description, specification, price, d_price, sizeupload, date, user_id, gst,customizable,length,breadth,height,no_of_box,weight,hsn_code,lbh_unit,weight_unit]
      }
      else {
        sql = `update awt_add_product set title = ? , v_id = ? , b_id = ? , groupid = ?,catid =? , scatid =? , slug =? , description =?,specification = ?, price = ? ,disc_price = ?, size_image = ?,created_date = ?,created_by = ? ,approve = 0 ,gst = ?,customizable= ?,length = ? ,breadth = ? ,height = ? ,no_of_box = ? ,weight = ? ,hsn_code = ? ,lbh_unit = ? ,weight_unit = ?  where id = ? `;

        param = [title, v_id, b_id, groupid, catid, subcatid, slug, description, specification, price, d_price, sizeupload, date, user_id, gst,customizable,length,breadth,height,no_of_box,weight,hsn_code,lbh_unit,weight_unit, uid]
      }



      con.query(sql, param, (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          const insertedid = data.insertId
          if (insertedid) {

            const sql = "insert into awt_productstock(`pro_id`,`stock`,`created_date`) values(?,?,?)"

            con.query(sql, [insertedid, 0, date], (err, data) => {
              if (err) {
                return res.json(err)
              } else {
                return res.json("Data Added Successfully")
              }
            })
          } else {
            return res.json(data)
          }

        }
      })
    }
  })
})

app.post('/add_product_img', upload8.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), (req, res) => {


  const image1 = req.files['image1'];
  const image2 = req.files['image2'];
  const image3 = req.files['image3'];
  const image4 = req.files['image4'];

  // let img1 = image1[0].filename
  // let img2 = image2[0].filename
  // let img3 = image3[0].filename
  // let img4 = image3[0].filename


  const img1 = image1 ? image1[0].filename : '';
  const img2 = image2 ? image2[0].filename : '';
  const img3 = image3 ? image3[0].filename : '';
  const img4 = image4 ? image4[0].filename : '';

  let color_id = req.body.color_id;
  let product_id = req.body.product_id;
  let user_id = req.body.user_id;
  let date = new Date();

  const sql = "insert into awt_productimg(`image1`,`image2`,`image3`,`image4`,`product_id`,`color_id`,`created_date`,`created_by`) values(?,?,?,?,?,?,?,?)"

  con.query(sql, [img1, img2, img3, img4, product_id, color_id, date, user_id], (err, data) => {
    if (err) {
      return res.json("err")
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

app.post('/product_status', (req, res) => {

  let product_id = req.body.product_id;
  let status = req.body.status;
  let column = req.body.column;


  const sql = `update awt_add_product set  ${column} = ? where id = ?`

  con.query(sql, [status, product_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      return res.json(data)
    }
  })

})

app.get('/product_single_img', (req, res) => {

  const sql = "SELECT  * FROM awt_productimg WHERE deleted = 0 GROUP BY product_id"


  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/product_img_data`, (req, res) => {
  let product_id = req.body.product_id;

  const sql = "SELECT ap.id, ap.image1, ap.image2, ap.image3, ap.image4, ac.title, ac.colorcode FROM awt_productimg AS ap LEFT JOIN awt_color AS ac ON ac.id = ap.color_id WHERE ap.product_id = ? AND ap.deleted = 0";

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      // Process data to create an array of images for each product
      const result = data.map(item => {
        return {
          id: item.id,
          title: item.title,
          colorcode: item.colorcode,
          images: [item.image1, item.image2, item.image3, item.image4].filter(image => image !== null && image !== "") // Filter out any null or empty images
        };
      });
      return res.json(result);
    }
  });
});



app.post(`/product_img_delete`, (req, res) => {

  let product_id = req.body.product_id;

  const sql = "update awt_productimg set deleted = 1 where id = ?";

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.get('/trending_products', (req, res) => {

  const sql = 'select aap.id, aap.v_id, aap.gst, aap.title, aap.catid, aap.slug, aap.description, aap.price, aap.disc_price, ap.image1, ap.image2, aps.stock,aap.customizable from awt_add_product as aap left join awt_productimg as ap on ap.product_id = aap.id LEFT JOIN awt_productstock as aps on aps.pro_id = aap.id where aap.trending = 1 and aap.active = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id;';

  con.query(sql, (err, products) => {
    if (err) {
      return res.json(err);
    } else {
      // Create an array of promises to handle the second query for each product
      const promises = products.map((product) => {
        const { slug } = product;

        const checkreservstock = 'select * from awt_add_product as aap left join awt_reservstock as ars on aap.id = ars.proid where aap.slug = ? and aap.deleted = 0 and ars.deleted = 0 and ars.p_status = 0';

        return new Promise((resolve, reject) => {
          con.query(checkreservstock, [slug], (err, reservStockData) => {
            if (err) {
              reject(err);
            } else {
              const totalRStock = reservStockData.reduce((total, row) => total + Number(row.r_stock), 0);
              product.r_stock = totalRStock;
              resolve(product); // Resolve with the product data and r_stock
            }
          });
        });
      });

      // Wait for all promises to complete
      Promise.all(promises)
        .then((results) => {
          // Once all queries are done, send the combined result
          res.json(results);
        })
        .catch((err) => {
          res.json(err); // Handle any errors
        });
    }
  });
});


app.post('/addToCart', async (req, res) => {
  let userid = req.body.userId;
  let orderid = req.body.orderid;
  let product_id = req.body.pro_id;
  let pro_name = req.body.pro_name;
  let catid = req.body.catid;
  let price = req.body.price;
  let p_qty = req.body.p_qty;
  let date = new Date();
  let v_id = req.body.v_id
  let gst = req.body.gst

  let totalprice = price * p_qty

  let cgstper = gst / 2;
  let sgstper = gst / 2;

  let cgst = (totalprice * cgstper) / 100
  let sgst = (totalprice * sgstper) / 100
  let totalgst = cgst + sgst


  if (!orderid) {
    const sql = 'INSERT INTO `order` (`userid`,`created_date`) VALUES (?,?)';

    con.query(sql, [userid, date], (err, data) => {
      if (err) {
        res.json(err);
      } else {

        const Inorderid = data.insertId

        const sql = 'INSERT INTO `awt_cart` (`orderid`,`v_id`,`proid`,`pname`,`catid`,`price`,`pqty`,`cgst`,`sgst`,`totalgst`,`totalprice`,`created_date`) values (?,?,?,?,?,?,?,?,?,?,?,?)';

        con.query(sql, [Inorderid, v_id, product_id, pro_name, catid, price, p_qty, cgst, sgst, totalgst, totalprice, date], (err, cartdata) => {
          if (err) {
            return res.json(err)
          } else {
            const insertedid = cartdata.insertId;

            const insertintoreserve = "insert into awt_reservstock(`v_id`,`orderid`,`cartid` ,`proid`,`pname`,`r_stock`,`created_date`) values(?,?,?,?,?,?,?)"

            con.query(insertintoreserve, [v_id, Inorderid, insertedid, product_id, pro_name, p_qty, date], (Err, data) => {
              if (Err) {
                return res.json(Err)
              } else {

                const sql = 'select * from awt_cart where id = ?';

                con.query(sql, [insertedid], (err, data) => {
                  if (err) {
                    return res.json(err)
                  } else {
                    return res.json(data)
                  }
                })
              }
            })
          }






        })
      }
    })
  } else if (userid && orderid) {

    const sql = 'UPDATE `order` set userid = ? , updated_date = ? WHERE  id = ?';

    con.query(sql, [userid, date, orderid], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        const sql = "select * from awt_cart where orderid = ? and proid = ? and deleted = 0";

        con.query(sql, [orderid, product_id], (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            if (data.length == 0) {
              const sql = 'INSERT INTO `awt_cart` (`orderid`,`v_id`,`proid`,`pname`,`catid`,`price`,`pqty`,`created_date`,`cgst`,`sgst`,`totalgst`,`totalprice`) values (?,?,?,?,?,?,?,?,?,?,?,?)';
              con.query(sql, [orderid, v_id, product_id, pro_name, catid, price, p_qty, date, cgst, sgst, totalgst, totalprice], (err, cartdata) => {
                if (err) {
                  return res.json(err)
                } else {
                  const insertedid = cartdata.insertId;

                  const insertintoreserve = "insert into awt_reservstock(`v_id`,`orderid`,`cartid`,`proid`,`pname`,`r_stock`,`created_date`) values(?,?,?,?,?,?,?)"

                  con.query(insertintoreserve, [v_id, orderid, insertedid, product_id, pro_name, p_qty, date], (err, data) => {
                    if (err) {
                      return res.json(err)
                    } else {

                      return res.json(data)
                    }
                  })
                }
              })
            } else {
              const sql = 'update `awt_cart` set  pname = ?, catid = ?, price = ?, pqty = ? , created_date = ? , deleted = 0,cgst =?, sgst = ? , totalgst = ? ,totalprice = ?  where orderid = ? and proid = ?';

              con.query(sql, [pro_name, catid, price, p_qty, date, cgst, sgst, totalgst, totalprice, orderid, product_id], (err, data) => {
                if (err) {
                  return res.json(err)
                } else {

                  const updatereservstock = "update awt_reservstock set r_stock = ? , deleted = 0 where orderid = ? and proid = ? "

                  con.query(updatereservstock, [p_qty, orderid, product_id], (err, data) => {
                    if (err) {
                      return res.json(err)
                    } else {


                      return res.json(data)

                    }
                  })
                }
              })
            }

          }
        })


      }
    })
  } else {

    const sql = "select * from awt_cart where orderid = ? and proid = ?";

    con.query(sql, [orderid, product_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        if (data.length == 0) {
          const sql = 'INSERT INTO `awt_cart` (`orderid`,`v_id`,`proid`,`pname`,`catid`,`price`,`pqty`,`created_date`,`cgst`,`sgst`,`totalgst`,`totalprice`) values (?,?,?,?,?,?,?,?,?,?,?,?)';

          con.query(sql, [orderid, v_id, product_id, pro_name, catid, price, p_qty, date, cgst, sgst, totalgst, totalprice], (err, cartdata) => {
            if (err) {
              return res.json(err)
            } else {
              const insertedid = cartdata.insertId;

              const insertintoreserve = "insert into awt_reservstock(`v_id`,`orderid`,`cartid`,`proid`,`pname`,`r_stock`,`created_date`) values(?,?,?,?,?,?,?)"

              con.query(insertintoreserve, [v_id, orderid, insertedid, product_id, pro_name, p_qty, date], (err, data) => {
                if (err) {
                  return res.json(err)
                } else {
                  return res.json(data)
                }
              })
            }
          })
        } else {
          const sql = 'update `awt_cart` set  pname = ?,catid = ?,price = ?, pqty = ? , created_date = ? , deleted = 0 , cgst =? ,sgst = ? ,totalgst = ? , totalprice = ? where orderid = ? and proid = ?';

          con.query(sql, [pro_name, catid, price, p_qty, date, cgst, sgst, totalgst, totalprice, orderid, product_id], (err, data) => {
            if (err) {
              return res.json(err)
            } else {
              const updatereservstock = "update awt_reservstock set r_stock = ? ,deleted = 0 where orderid = ? and proid = ?"

              console.log(p_qty, orderid, product_id)

              con.query(updatereservstock, [p_qty, orderid, product_id], (err, data) => {
                if (err) {
                  return res.json(err)
                } else {


                  return res.json(data)
                }
              })
            }
          })
        }
      }
    })


  }


})

app.post(`/updateproid`, (req, res) => {

  let user_id = req.body.user_id;
  let order_id = req.body.order_id;

  const sql = "update `order` set userid = ? where id = ?";

  con.query(sql, [user_id, order_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/main_Banner', (req, res) => {

  const sql = 'select * from awt_banner where deleted = 0'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/products', async (req, res, next) => {
  try {
    const sql = 'SELECT v_id, b_id, title, description, specification, price, disc_price, size_image, approve, active, trending, featured FROM awt_add_product';
    const data = await new Promise((resolve, reject) => {
      con.query(sql, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});


app.post('/getproductDetails', (req, res) => {

  let productslug = req.body.productslug;

  const checkreservstock = "select * from awt_add_product as aap left join awt_reservstock as ars on aap.id = ars.proid where aap.slug = ? and aap.deleted = 0 and ars.deleted = 0 and ars.p_status = 0;"

  con.query(checkreservstock, [productslug], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      const totalRStock = data.reduce((total, row) => total + Number(row.r_stock), 0);


      const sql = 'select aap.* , ac.title as category ,aps.stock from awt_add_product as aap left join awt_category as ac on ac.id = aap.catid left join awt_productstock as aps on aps.pro_id = aap.id  where aap.slug = ? and aap.deleted = 0'

      con.query(sql, [productslug], (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          return res.json({ data: data, r_stock: totalRStock })
        }
      })
    }
  })




})

// app.post('/getproductlisting', (req, res) => {

//   let groupslug = req.body.groupslug;
//   let catslug = req.body.catslug;
//   let subcatslug = req.body.subcatslug;
//   let brand_id = req.body.brand_id;

//   let sql;
//   let param;

//   if (brand_id) {
//     sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,aap.gst,ag.title,aap.slug , ab.title ,ab.logo from awt_add_product as aap left join awt_group as ag on ag.id = aap.groupid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id where aap.b_id = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id'

//     param = [brand_id]
//   }
//   else if (catslug == undefined && subcatslug == undefined) {

//     sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo from awt_add_product as aap left join awt_group as ag on ag.id = aap.groupid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id'

//     param = [groupslug]
//   }
//   else if (subcatslug == undefined) {

//     sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo  from awt_add_product as aap left join awt_category as ag on ag.id = aap.catid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id'
//     param = [catslug]

//   } else {

//     sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo from awt_add_product as aap left join awt_subcategory as ag on ag.id = aap.scatid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id'
//     param = [subcatslug]
//   }


//   con.query(sql, param, (err, data) => {

//     if (err) {
//       return res.json(err)
//     } else {
//       return res.json(data)
//     }
//   })
// })

app.post('/getproductlisting', (req, res) => {

  let groupslug = req.body.groupslug;
  let catslug = req.body.catslug;
  let subcatslug = req.body.subcatslug;
  // let brand_id = req.body.brand_id;
  let brandid = req.body.brandid;
  let sort = req.body.sort;
  let price = req.body.price;

  let sql;
  let param;
  param = []


  if (catslug == undefined && subcatslug == undefined) {

    sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo ,aps.stock , aap.customizable from awt_add_product as aap left join awt_group as ag on ag.id = aap.groupid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id LEFT JOIN awt_productstock as aps on aap.id = aps.pro_id where '

    if (brandid && groupslug && price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.disc_price < ?  and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }
      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, groupslug, price)
    }
    if (brandid && groupslug && !price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }
      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, groupslug)
    }

    if (price && groupslug && !brandid) {
      sql += "aap.disc_price < ? and ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(price, groupslug)
    }

    if (!price && !brandid) {
      sql += " ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }
      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(groupslug);
    }



  }
  else if (subcatslug == undefined) {

    sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo ,aps.stock , aap.customizable  from awt_add_product as aap left join awt_category as ag on ag.id = aap.catid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id LEFT JOIN awt_productstock as aps on aap.id = aps.pro_id where '





    if (brandid && catslug && price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.disc_price < ?  and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, catslug, price)
    }
    if (brandid && catslug && !price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, catslug)
    }

    if (price && catslug && !brandid) {
      sql += "aap.disc_price < ? and ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(price, catslug)
    }

    if (!price && !brandid) {
      sql += " ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }
      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(catslug);
    }




  } else {

    sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.gst,aap.slug , ab.title ,ab.logo ,aps.stock , aap.customizable from awt_add_product as aap left join awt_subcategory as ag on ag.id = aap.scatid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id LEFT JOIN awt_productstock as aps on aap.id = aps.pro_id where '



    if (brandid && subcatslug && price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.disc_price < ?  and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, subcatslug, price)
    }
    if (brandid && subcatslug && !price) {
      sql += "aap.b_id = ? and  ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(brandid, subcatslug)
    }

    if (price && subcatslug && !brandid) {
      sql += "aap.disc_price < ? and ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }

      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(price, subcatslug)
    }

    if (!price && !brandid) {
      sql += " ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 and ap.deleted = 0 group by ap.product_id ";

      if (sort == "low") {
        sql += "order by aap.disc_price ASC";
      }
      if (sort == "high") {
        sql += "order by aap.disc_price DESC";
      }

      if (sort == "latest") {
        sql += "order by aap.id DESC";
      }

      param.push(subcatslug);
    }


  }


  con.query(sql, param, (err, products) => {
    if (err) {
      return res.json(err);
    } else {
      // Create an array of promises to handle the second query for each product
      const promises = products.map((product) => {
        const { slug } = product;

        const checkreservstock = 'select * from awt_add_product as aap left join awt_reservstock as ars on aap.id = ars.proid where aap.slug = ? and aap.deleted = 0 and ars.deleted = 0 and ars.p_status = 0';

        return new Promise((resolve, reject) => {
          con.query(checkreservstock, [slug], (err, reservStockData) => {
            if (err) {
              reject(err);
            } else {
              const totalRStock = reservStockData.reduce((total, row) => total + Number(row.r_stock), 0);
              product.r_stock = totalRStock;
              resolve(product); // Resolve with the product data and r_stock
            }
          });
        });
      });

      // Wait for all promises to complete
      Promise.all(promises)
        .then((results) => {
          // Once all queries are done, send the combined result
          res.json(results);
        })
        .catch((err) => {
          res.json(err); // Handle any errors
        });
    }
  });
})




app.post(`/getbrand`, (req, res) => {
  let groupslug = req.body.groupslug;
  let catslug = req.body.catslug;
  let subcatslug = req.body.subcatslug;
  let brand_id = req.body.brand_id;

  let sql;
  let param;

  if (brand_id) {
    sql = 'select ab.id , ab.title ,ab.logo from awt_add_product as aap left join awt_brand as ab on aap.b_id = ab.id where aap.b_id = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 group by aap.b_id'

    param = [brand_id]
  }
  else if (catslug == undefined && subcatslug == undefined) {

    sql = 'select  ab.id, ab.title ,ab.logo from awt_add_product as aap left join awt_group as ag on ag.id = aap.groupid left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 group by aap.b_id'

    param = [groupslug]
  }
  else if (subcatslug == undefined) {

    sql = 'select ab.id, ab.title ,ab.logo  from awt_add_product as aap left join awt_category as ag on ag.id = aap.catid  left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 group by aap.b_id';
    param = [catslug]

  } else {

    sql = 'select ab.id, ab.title ,ab.logo from awt_add_product as aap left join awt_subcategory as ag on ag.id = aap.scatid left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 group by aap.b_id'
    param = [subcatslug]
  }


  con.query(sql, param, (err, data) => {

    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/addToWishList', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    console.log(userId, productId);
    const date = new Date();

    // Check if the product is already in the wishlist
    const checkSql = 'SELECT * FROM awt_wishlist WHERE user_id = ? AND prod_id = ? AND deleted = 0';

    const checkData = await new Promise((resolve, reject) => {
      con.query(checkSql, [userId, productId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });

    if (checkData.length > 0) {
      // Product is already in the wishlist
      res.json({
        message: "Product is already in the wishlist.",
      });
    } else {
      // Product is not in the wishlist, proceed with the INSERT
      const insertSql = 'INSERT INTO awt_wishlist (`user_id`, `prod_id`, `created_at`) VALUES (?,?,?)';
      const insertData = await new Promise((resolve, reject) => {
        con.query(insertSql, [userId, productId, date], (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      res.json({
        data: insertData,
        message: "Product added to wishlist.",
      });
    }
  } catch (err) {
    res.json(err);
  }
});


app.post('/getUserWishList', async (req, res, next) => {
  try {
    const userId = req.body.userId;


    const sql = 'SELECT awl.id, awl.user_id, adp.id AS prod_id, adp.v_id, adp.b_id, adp.catid, adp.scatid,adp.title, adp.description, adp.specification, adp.price, adp.disc_price, adp.size_image ,ap.image1 FROM `awt_wishlist` AS awl LEFT JOIN `awt_add_product` AS adp ON adp.id = awl.prod_id left join `awt_productimg` as ap on ap.product_id = awl.prod_id   WHERE awl.user_id = ? AND awl.deleted = 0 GROUP BY ap.product_id';

    const data = await new Promise((resolve, reject) => {
      con.query(sql, [userId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
          res.json(data);
        }
      });
    })
  } catch (error) {
    res.json(error);
  }

})

app.post('/removeWishItem', async (req, res, next) => {
  const { userId, productId } = req.body;

  console.log(userId, productId);
  try {
    const sql = 'UPDATE awt_wishlist SET deleted = 1 WHERE id = ? AND user_id = ?';
    const data = await new Promise((resolve, reject) => {
      con.query(sql, [productId, userId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
          res.json(data);
        }
      })
    })
  } catch (error) {
    res.json(error);
  }
})


app.post('/getcartData', (req, res) => {

  let order_id = req.body.order_id;

  const sql = 'select ac.cgst ,ac.sgst, ac.id,ac.v_id,ac.orderid,ac.proid,ac.pname,ac.catid,ac.price,ac.pqty,ap.image1 from `awt_cart` as ac LEFT JOIN awt_productimg as ap on ap.product_id = ac.proid where ac.orderid = ? and ac.deleted = 0 GROUP by ap.product_id'

  con.query(sql, [order_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/removecartitem', (req, res) => {

  let cart_id = req.body.cart_id;

  const sql = 'update `awt_cart` set deleted = 1 where id = ?'

  con.query(sql, [cart_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {

      const updatereserv = "update awt_reservstock set deleted = 1 where cartid = ?"

      con.query(updatereserv, [cart_id], (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          return res.json(data)
        }
      })
    }
  })
})


app.post('/getcartcount', (req, res) => {

  let order_id = req.body.order_id;

  const sql = 'SELECT COUNT(*) as count FROM `awt_cart` WHERE orderid = ? and deleted = 0'

  con.query(sql, [order_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.post('/getwishcount', (req, res) => {

  let user_id = req.body.user_id;

  const sql = 'SELECT COUNT(*) as count FROM `awt_wishlist` WHERE user_id = ? AND deleted = 0;'

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/state`, (req, res) => {

  const sql = "select * from awt_states "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/place_order', (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let country = req.body.country;
  let address = req.body.address;
  let landmark = req.body.landmark;
  let city = req.body.city;
  let state = req.body.state;
  let postcode = req.body.postcode;
  let orderNotes = req.body.orderNotes;
  let sfirstname = req.body.sfirstname;
  let slastname = req.body.slastname;
  let scountry = req.body.scountry;
  let saddress = req.body.saddress;
  let slandmark = req.body.slandmark;
  let scity = req.body.scity;
  let sstate = req.body.sstate;
  let spostcode = req.body.spostcode;
  let totalamt = req.body.totalamt;
  let paymode = req.body.paymode;
  let order_id = req.body.order_id
  let user_id = req.body.user_id
  let mobile = req.body.mobile
  let pending = "pending";
  let vendor_id = req.body.vendor_id;


  const date = new Date()


  const checkaddress = "select * from `awt_address` where `uid` = ? and `deleted` = 0"

  con.query(checkaddress, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      if (data.length == 0) {
        const insert = "insert into awt_address(`uid`,`firstname`,`lastname`,`mobile`,`address`,`state`,`city`,`pincode`,`created_date`,`default`) values(?,?,?,?,?,?,?,?,?,?)"


        con.query(insert, [user_id, firstname, lastname, mobile, address, state, city, postcode, date, 1], (err, data) => {
          if (err) {
            return res.json(err)
          } else {

            //  const removestock = "insert into awt_productstockremove(`pro_id` , `stock` ,`created_date`, `created_by` )"
            //  con.query(removestock )

            console.log(res.data)
          }
        })
      }
    }
  })




  const sql = "update `order` set  v_id = ?,firstname = ?, lastname = ? , country =?,address1 = ? ,landmark = ? , city1 = ? , state = ? , postcode = ?, order_comments = ? ,sfirstname = ? , slastname= ? ,scountry = ?, shipaddress = ? , shiplandmark = ? , shipcity = ? , shipstate = ? , shippostcode = ?,totalamt = ?,paymode = ? where id = ? ";

  con.query(sql, [vendor_id, firstname, lastname, country, address, landmark, city, state, postcode, orderNotes, sfirstname, slastname, scountry, saddress, slandmark, scity, sstate, spostcode, totalamt, paymode, order_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      const sql = "select * from `order` where `orderno` != '' "

      con.query(sql, (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          const count = data.length
          const ordercount = count + 1

          const currentDate = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
          const utcDate = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60 * 1000);
          const istDate = new Date(utcDate + istOffset);

          const day = String(istDate.getDate()).padStart(2, '0');
          const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Months are zero based
          const year = istDate.getFullYear().toString().substr(-2);

          const orderno = "MISU" + "-" + year + month + day + "-" + ordercount

          const sql = "update `order` set `orderno` = ? , `ostatus` = ? , order_date = ? where `id`  = ?"

          con.query(sql, [orderno, pending, currentDate, order_id], (err, data) => {
            if (err) {
              return res.json(err)
            } else {

              const checkcart = "select * from `awt_cart` where orderid = ? and deleted = 0"


              con.query(checkcart, [order_id], (err, data) => {
                if (err) {
                  return res.json(err)
                } else {

                  const param = data.map((items) => {
                    return [
                      items.proid,
                      items.pqty,
                      new Date(),
                      user_id
                    ]
                  })


                  const updateremovestock = "insert into awt_productstockremove(`pro_id`,`stock`,`created_date`,`updated_by`) values ?"

                  con.query(updateremovestock, [param], (err, data) => {
                    if (err) {
                      return res.json(err)
                    } else {


                      const updatePromises = param.map(item => {
                        const [pro_id, stock] = item;
                        const getproductstock = "UPDATE `awt_productstock` SET stock = stock - ? WHERE pro_id = ?";
                        return new Promise((resolve, reject) => {
                          con.query(getproductstock, [stock, pro_id], (err, data) => {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(data);
                            }
                          });
                        });
                      });


                      Promise.all(updatePromises)
                        .then(results => {
                          const updatereservstock = "update awt_reservstock set p_status = 1 where orderid = ?"

                          con.query(updatereservstock, [order_id], (err, data) => {
                            if (err) {
                              return res.json(err)
                            } else {
                              const orderno = "select orderno from `order` where id = ?"

                              con.query(orderno, [order_id], (err, data) => {
                                if (err) {
                                  return res.json(err)
                                }
                                else {
                                  return res.json(data)
                                }
                              })
                            }
                          })
                        })
                        .catch(err => {
                          // At least one update failed
                          res.json(err);
                        });




                    }
                  })
                }
              })




            }
          })
        }
      })
    }

  })
})


app.post('/getcolorimg', (req, res) => {

  let colorid = req.body.colorid;

  const sql = 'select * from awt_productimg where id = ?'

  con.query(sql, [colorid], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      // Process data to create an array of images for each product
      const result = data.map(item => {
        return {
          id: item.id,
          product_id: item.product_id,
          color_id: item.color_id,
          images: [item.image1, item.image2, item.image3, item.image4].filter(image => image !== null && image !== "") // Filter out any null or empty images
        };
      });
      return res.json(result);
    }
  })
})

app.post('/getcolorimg', (req, res) => {

  let colorid = req.body.colorid;
  let product_id = req.body.product_id;


  let sql;
  let param;

  if (product_id) {
    sql = 'select ap.id ,ap.image1, ap.image2,ap.image3,ap.image4 from awt_productimg as ap  where ap.product_id = ? and ap.deleted = 0  LIMIT 1'
    param = [product_id]

  } else if (colorid) {
    sql = 'select * from awt_productimg where id = ? and deleted = 0'
    param = [colorid]

  }


  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/getprofiledata`, (req, res) => {

  let user_id = req.body.user_id

  const sql = "select id,firstname,lastname,email,mobile,gender from `awt_customers` where id = ? "

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/updateprofiledetails`, (req, res) => {

  let user_id = req.body.user_id;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let gender = req.body.gender;
  let mobile = req.body.mobile;
  let date = new Date()


  const sql = "update  awt_customers set firstname = ? ,lastname = ? , mobile = ? ,gender = ? , updated_date = ? where id = ?"

  con.query(sql, [firstname, lastname, mobile, gender, date, user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})




app.post(`/add_address`, (req, res) => {

  let user_id = req.body.user_id;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let address = req.body.address;
  let state = req.body.state;
  let city = req.body.city;
  let pincode = req.body.pincode;
  let u_id = req.body.u_id;
  let date = new Date()

  let sql;
  let param;






  if (u_id !== undefined) {
    sql = "update awt_address set firstname = ? , lastname = ? , email = ?, mobile = ? ,address = ?, state = ? , city = ? , pincode = ? , updated_date = ?  where id = ? "

    param = [firstname, lastname, email, mobile, address, state, city, pincode, date, u_id]


    con.query(sql, param, (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        return res.json(data)
      }
    })

  } else {
    const checkcount = "select COUNT(*) as count  from awt_address where uid = ? and deleted = 0"

    con.query(checkcount, [user_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {

        const count = data[0].count;

        console.log(count)

        let insert;
        let insertparam;

        if (count == 0) {
          insert = "insert into awt_address(`uid`,`firstname`,`lastname`,`email`,`mobile`,`address`,`state`,`city`,`pincode`,`created_date`,`default`) values(?,?,?,?,?,?,?,?,?,?,?)"

          insertparam = [user_id, firstname, lastname, email, mobile, address, state, city, pincode, date, 1]

        } else {
          insert = "insert into awt_address(`uid`,`firstname`,`lastname`,`email`,`mobile`,`address`,`state`,`city`,`pincode`,`created_date`,`default`) values(?,?,?,?,?,?,?,?,?,?,?)"

          insertparam = [user_id, firstname, lastname, email, mobile, address, state, city, pincode, date, 0]
        }


        con.query(insert, insertparam, (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            return res.json(data)
          }
        })
      }
    })


  }






})

app.post(`/user_address_data`, (req, res) => {

  let user_id = req.body.user_id

  const sql = "select * from awt_address  where uid = ? and deleted = 0"

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/address_delete', (req, res) => {

  let address_id = req.body.address_id;
  let user_id = req.body.user_id;

  const sql = "select * from `awt_address` where `default` = 1 and `id` = ?"

  con.query(sql, [address_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      if (data.length == 0) {
        const sql = "update `awt_address` set `deleted` = 1 where `id` = ?";

        console.log("111")

        con.query(sql, [address_id], (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            return res.json(data)
          }
        })
      } else {

        console.log("222")
        const sql = "update `awt_address` set `deleted` = 1 where `id` = ?";

        con.query(sql, [address_id], (err, data) => {
          if (err) {
            return res.json(err)
          } else {

            const sql = "SELECT * FROM `awt_address` WHERE `uid` = ? and `deleted` = 0 LIMIT 1";

            con.query(sql, [user_id], (err, data) => {
              if (err) {
                return res.json(err)
              }
              else {

                if (data.length > 0) {
                  const addid = data[0].id


                  console.log(addid, "88")

                  const sql = "update `awt_address` set `default` = 1 where `id` = ? "

                  con.query(sql, [addid], (err, data) => {
                    if (err) {
                      return res.json(err)
                    } else {
                      return res.json(data)
                    }
                  })
                }
                else {
                  res.json(data)
                }
              }
            })

          }
        })
      }

    }
  })

})


app.post('/address_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_address where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/update_default', (req, res) => {

  let d_id = req.body.d_id;
  let user_id = req.body.user_id;

  const sql = "update `awt_address` set `default` = 0 where  uid = ?"

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      const sql = "update `awt_address` set `default` = 1 where id = ? "

      con.query(sql, [d_id], (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          return res.json(data)
        }
      })
    }
  })

})

app.post('/profile_order', (req, res) => {

  let user_id = req.body.user_id;

  const sql = "select * from `order` where  `userid` = ? and `ostatus` !='incart' and orderno != '' "

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/fetch_address', (req, res) => {

  let user_id = req.body.user_id;

  const sql = "select * from `awt_address` where  `uid` = ? and `default` = 1 and `deleted` = 0"

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/order_view', (req, res) => {

  let order_id = req.body.order_id;

  const sql = "select id, sfirstname,slastname,orderno,order_date,ostatus,paymode,shipaddress,paymode,pstatus,shipcity,shippostcode,totalamt from `order` where `id` = ? and deleted = 0"

  con.query(sql, [order_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/order_status_update', (req, res) => {

  let order_id = req.body.order_id;
  let order_status = req.body.order_status;

  const sql = "update `order` set `ostatus` = ?  where  id = ?"

  con.query(sql, [order_status, order_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/addorderid', (req, res) => {

  let user_id = req.body.user_id;
  let orderid = req.body.orderid;



  const updateuserid = "update `order` set userid = ? where id = ?"

  con.query(updateuserid, [user_id, orderid], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      if (data) {
        const sql = "select id from `order` where `userid` = ? and `ostatus` = 'incart' order by `id` desc limit 1"

        con.query(sql, [user_id], (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            return res.json(data)
          }
        })
      }



    }
  })

})




app.get('/role_data', (req, res) => {

  const sql = 'select * from role where role.delete = 0 '

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/role_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from role where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/role_delete', (req, res) => {

  let role_id = req.body.role_id;

  const sql = "update role set role.delete = 1 where id = ?"

  con.query(sql, [role_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/add_role', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;



  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into role(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, description, user_id, created_date]

  } else {
    sql = "update role set title = ? , description = ? , updated_by = ? ,updated_date = ? where id = ? "
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

app.post('/role_pages', (req, res) => {
  let role_id = req.body.role_id;

  const sqlSelect = "SELECT * FROM `pagerole` AS pg LEFT JOIN `page_master` AS pm ON pg.pageid = pm.id  WHERE pg.roleid = ? ORDER BY pg.id ASC";

  con.query(sqlSelect, [role_id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length == 0) {

        const selectquery = "select COUNT(*) as count from `page_master` where deleted = 0"


        con.query(selectquery, (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            const count = data[0].count

            // Insert 35 rows if data length is less than 0
            const insertRows = "INSERT INTO `pagerole` (`roleid`, `pageid`,`accessid`) VALUES ?";

            let values = [];
            for (let i = 1; i < count; i++) {
              // Assuming `roleid` and `pageid` are the columns in `pagerole` table
              values.push([role_id, i, 1]);
            }
            con.query(insertRows, [values], (insertErr, insertResult) => {
              if (insertErr) {
                return res.json(insertErr);
              } else {
                const getdata = "SELECT * FROM `pagerole` AS pg LEFT JOIN `page_master` AS pm ON pg.pageid = pm.id  WHERE pg.roleid = ? ORDER BY pg.id ASC";


                con.query(getdata, [role_id], (err, data) => {
                  if (err) {
                    return res.json(err)
                  } else {
                    return res.json(data)
                  }
                })
              }

            });

          }
        })




      }
      else {
        return res.json(data)
      }
    }
  });
});


app.post('/assign_role', (req, res) => {

  let rolePages = req.body


  const role_id = rolePages[0].roleid


  const sql = "delete from `pagerole` where roleid = ?"


  con.query(sql, [role_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {

      const sql = "insert into pagerole(`roleid`,`pageid`,`accessid`) VALUES ?"
      const values = rolePages.map(rolePage => [rolePage.roleid, rolePage.pageid, rolePage.accessid]);

      con.query(sql, [values], (err, data) => {
        if (err) {
          return res.json(err)
        }
        else {
          return res.json(data)
        }
      })

    }
  })






})

app.post('/getRoleData', (req, res) => {
  let role = req.body.role;
  let pageid = req.body.pageid;


  const sql = 'select * from `pagerole` where pageid = ? and roleid = ?'

  con.query(sql, [pageid, role], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/check_slug`, (req, res) => {
  let slug = req.body.slug;
  let table_name = req.body.table_name;

  const sql = `select * from ${table_name} where slug like '${slug}%' `

  con.query(sql, (err, data) => {

    if (err) {
      return res.json(err)
    } else {
      if (data.length > 0) {
        let count = data.length;
        let newcount = count + 1
        let newslug = slug + '-' + newcount;
        return res.json({ newslug: newslug })

      } else {
        return res.json({ newslug: slug })
      }
    }
  })
})

app.post(`/check_againslug`, (req, res) => {
  let slug = req.body.slug;

  const sql = "select * from `awt_group` where slug = ? and deleted = 0"

  con.query(sql, [slug], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/vendorlogin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // let role = req.body.role;

  const sql = "select * from `awt_vendor` where emailid = ? and password = ?  and deleted = 0"

  con.query(sql, [email, password], (err, data) => {
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

app.post('/product_status', (req, res) => {
  const { id, status } = req.body;

  console.log(id, status);

  const sql = 'SELECT approve FROM awt_temp_add_product WHERE id = ?';

  con.query(sql, [id], (error, data) => {
    if (error) {
      res.json({
        message: "Id not found"
      })
    }
  })


})

app.post('/add_category', upload6.single('image'), (req, res) => {
  let user_id = req.body.user_id;
  let title = req.body.title;
  let image = req.file.filename; // Assuming the image filename is directly available in the request body
  let slug = req.body.slug;
  let description = req.body.description;
  let created_date = new Date();
  let u_id = req.body.u_id;

  let sql;
  let param;

  if (u_id == 'undefined') {
    sql = "INSERT INTO awt_category(`title`, `slug`, `description`, `image`, `created_by`, `created_date`) VALUES (?, ?, ?, ?, ?, ?)";
    param = [title, slug, description, image, user_id, created_date];
  } else {
    sql = "UPDATE awt_category SET title = ?, slug = ?, description = ?, image = ?, updated_by = ?, updated_date = ? WHERE id = ?";
    param = [title, slug, description, image, user_id, created_date, u_id];
  }

  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
})


app.post('/vendorUserDelete', (req, res) => {

  let vendoruser_id = req.body.vendoruser_id;

  const sql = "update awt_vendoruser set deleted = 1 where id = ?"

  con.query(sql, [vendoruser_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/vendorUserUpdate', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_vendoruser where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })
})


app.get('/getVendorData', (req, res) => {

  const sql = "select * from awt_vendoruser where deleted = 0 and role = 2"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/addVendorUser', (req, res, next) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;
  let role = "2";
  let created_date = new Date();
  let u_id = req.body.u_id;
  let user_id = req.body.user_id;

  let sql;
  let param;

  if (u_id === undefined) {


    sql = "insert into awt_vendoruser(`firstname`,`lastname`,`mobile`,`email`,`password`,`role`,`created_date`,`created_by`) values(?,?,?,?,?,?,?,?)"
    param = [firstname, lastname, mobile, email, password, role, created_date, user_id]

  } else {
    sql = "update awt_vendoruser set firstname = ?, lastname = ?,mobile = ?, email = ?, password = ?, role = ?,updated_date = ?, updated_by = ? where id = ?"
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


app.post('/changepassword', (req, res, next) => {

  try {
    const sql = 'UPDATE awt_vendor SET password = ? WHERE id = ?';
    const { password, cnf_password, vendor_id } = req.body;
    console.log(password, cnf_password, vendor_id);

    const hashedPassword = md5(password);
    con.query(sql, [hashedPassword], (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data)
      }
    })
  } catch (error) {
    res.json(error);
  }

})

app.post(`/vendor_product_data`, (req, res) => {

  const vendor_id = req.body.vendor_id;

  const sql = 'select  aap.id,aap.active,aap.approve, aap.title,aap.description ,aap.price,ac.id as catid ,ac.title as category,av.id as vendorid,av.vendor_name as vendor,ab.id as brandid,ab.title as brand ,acs.id as scatid,acs.title as subcategory from `awt_add_product` as aap left join awt_category as ac on aap.catid = ac.id left JOIN awt_vendor as av on aap.v_id = av.id LEFT JOIN awt_brand as ab on aap.b_id = ab.id left JOIN awt_subcategory as acs on aap.scatid = acs.id where aap.deleted = 0 and aap.v_id = ?';

  con.query(sql, [vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.get(`/getproductrequest`, (req, res) => {

  const sql = "select  aap.id,aap.active,aap.approve, aap.title,aap.description ,aap.price,ac.id as catid ,ac.title as category,av.id as vendorid,av.vendor_name as vendor,ab.id as brandid,ab.title as brand ,acs.id as scatid,acs.title as subcategory from `awt_add_product` as aap left join awt_category as ac on aap.catid = ac.id left JOIN awt_vendor as av on aap.v_id = av.id LEFT JOIN awt_brand as ab on aap.b_id = ab.id left JOIN awt_subcategory as acs on aap.scatid = acs.id where aap.deleted = 0 and aap.approve = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/vendor_Brand_data`, (req, res) => {

  let user_id = req.body.user_id;

  const sql = "select * from `awt_brand` where v_id = ? and deleted = 0";

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/vendor_Brand_request`, (req, res) => {


  const sql = "select ab.* , av.vendor_name from `awt_brand` as ab left join `awt_vendor` as av on av.id = ab.v_id where ab.approve = 0 and ab.deleted = 0";

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/getBrandProducts', (req, res, next) => {
  const { b_id } = req.body;

  const sql = 'SELECT * FROM awt_add_product WHERE b_id = ? AND deleted = 0';

  con.query(sql, [b_id], (error, data) => {
    if (error) {
      res.status(500).json({
        message: 'cannot get brand data',
        error: error,
      })
      return;
    }

    return res.json(data);
  })
})

app.post(`/product_details`, (req, res) => {

  let product_id = req.body.product_id;

  const sql = "select  aap.id,ag.title as group_name, aap.active,aap.approve, aap.title,aap.description ,aap.price,aap.disc_price , ac.id as catid ,ac.title as category,av.id as vendorid,av.vendor_name as vendor,ab.id as brandid,ab.title as brand ,acs.id as scatid,acs.title as subcategory  from `awt_add_product` as aap left join awt_category as ac on aap.catid = ac.id left JOIN awt_vendor as av on aap.v_id = av.id LEFT JOIN awt_brand as ab on aap.b_id = ab.id left JOIN awt_subcategory as acs on aap.scatid = acs.id left join `awt_group` as ag on aap.groupid = ag.id  where aap.deleted = 0 and aap.id = ?"

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post(`/approve_product`, (req, res) => {

  let product_id = req.body.product_id;

  const sql = "update `awt_add_product` set approve = 1 where id = ?"

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.post(`/approve_brand`, (req, res) => {

  let brand_id = req.body.brand_id;

  const sql = "update `awt_brand` set approve = 1 where id = ?"

  con.query(sql, [brand_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/add_faq', (req, res) => {
  let user_id = req.body.user_id
  let question = req.body.question;
  let description = req.body.description;
  let created_date = new Date()
  let uid = req.body.uid

  let sql;
  let param;

  if (uid == undefined) {
    sql = "insert into `awt_faq`(`title`,`answer`,`created_by`,`created_date`) values(?,?,?,?)"

    param = [question, description, user_id, created_date]
  } else {

    sql = "update awt_faq set title = ?, answer = ?, updated_by = ?, updated_date = ? where id =?";
    param = [question, description, user_id, created_date, uid]
  }

  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json("Data added Successfully")
    }


  })
})

app.post('/faq_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_faq where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.get('/faq_data', (req, res) => {

  const sql = "select * from awt_faq where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/faq_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_faq set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/searchproduct', (req, res) => {
  let search = req.body.search.toLowerCase();

  let sql;

  if (search == "") {
    sql = 'SELECT * FROM `awt_add_product` LIMIT 0 ';
  } else {
    sql = 'select aap.id , aap.title ,aap.catid, aap.slug,aap.description, aap.price,aap.disc_price , ap.image1,ap.image2 from awt_add_product as aap left join awt_productimg as ap on ap.product_id = aap.id where aap.approve = 1 and aap.active = 1 and aap.deleted = 0 group by ap.product_id;';
  }

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const filteredData = data.filter(item => (item.title.toLowerCase()).includes(search));
      return res.json(filteredData);

    }
  });
});


app.post('/getProductsByPriceRange', (req, res, next) => {
  const { range } = req.body;

  console.log(range);

  const min = range[0];
  const max = range[1];

  const sql = 'SELECT * FROM awt_add_product WHERE disc_price BETWEEN 0 AND ?';

  // const sql = 'select ap.image1,ap.image2,aap.id as proid, aap.v_id,aap.b_id,aap.catid,aap.title as product_title,aap.groupid,aap.scatid,aap.slug,aap.price,aap.disc_price,aap.featured,ag.title,aap.slug , ab.title ,ab.logo from awt_add_product as aap left join awt_group as ag on ag.id = aap.groupid left join awt_productimg as ap on ap.product_id = aap.id left join awt_brand as ab on aap.b_id = ab.id where ag.slug = ? and aap.active= 1 and aap.approve = 1 and aap.deleted = 0 group by ap.product_id';

  con.query(sql, [range], (error, data) => {
    if (error) {
      res.status(500).json(error);
      return;
    }

    return res.json(data);
  })
})

app.get(`/deleteduser`, (req, res) => {

  const sql = "select * from `awt_adminuser` where deleted = 1 order by id desc"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/getintouch', (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let message = req.body.message;
  let date = new Date()

  const sql = "insert into contact_us(`firstname`, `lastname`,`email`,`mobile`,`message`,`created_date`) values(?,?,?,?,?,?)"

  con.query(sql, [firstname, lastname, email, mobile, message, date], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/vendor_regitration_request', (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let message = req.body.message;
  let date = new Date()

  const sql = "insert into Vendor_registration(`firstname`, `lastname`,`email`,`mobile`,`message`,`created_date`) values(?,?,?,?,?,?)"

  con.query(sql, [firstname, lastname, email, mobile, message, date], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get(`/vendor_request`, (req, res) => {

  const sql = "select * from `Vendor_registration` where deleted = 0 order by id desc"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.post(`/vendor_request_approve`, (req, res) => {
  let firstname = req.body.firstname;
  let vendor_id = req.body.vendor_id;
  let lastname = req.body.lastname;
  let status = req.body.status;
  let email = req.body.email;
  let mobile = req.body.mobile;

  const fullname = firstname + " " + lastname


  const sql = "update `Vendor_registration` set status = ? where id = ?"

  con.query(sql, [status, vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      if (data.affectedRows == 1) {
        const insert = "insert into awt_vendor(`vendor_name`, `mobile`, `emailid`) values(?,?,?)"

        con.query(insert, [fullname, mobile, email], (err, data) => {
          if (err) {
            return res.json(err)
          } else {
            return res.json(data)
          }
        })
      }
    }
  })
})

app.post(`/add_return_order`, (req, res) => {
  let products = req.body.products;
  let order_id = req.body.order_id;
  let user_id = req.body.user_id;
  let reasonid = req.body.reasonid;

  const getreturncount = "select * from `awt_return_exchange`"

  con.query(getreturncount, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      const count = data.length
      const ordercount = count + 1
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero based
      const year = currentDate.getFullYear().toString().substr(-2);

      const returnno = "RTN" + "-" + year + month + day + "-" + ordercount

      const insertreturnorder = "insert into awt_return_exchange(`orderid`,`reason`,`user_id`,`return_no`,`return_date`,`created_date`) values(?,?,?,?,?,?)"

      con.query(insertreturnorder, [order_id, reasonid, user_id, returnno, currentDate, currentDate], (err, data) => {
        if (err) {
          return res.json(err)
        } else {
          const inserttedid = data.insertId

          const insertproduct = "insert into awt_return_cart(`orderid`,`return_id`,`proid`,`pname`,`price`,`pqty`,`cid`,`wishid`,`created_date`) values ?"

          const values = products.map(product => [order_id, inserttedid, product.proid, product.pname, product.price, product.quantity, product.catid, product.id, currentDate]);

          con.query(insertproduct, [values], (err, data) => {
            if (err) {
              return res.json(err)
            } else {
              return res.json(data)
            }
          })
        }
      })

    }
  })
})

app.post('/getreturnorderno', (req, res) => {
  let user_id = req.body.user_id;

  const sql = "select orderid from `awt_return_exchange` where user_id = ? "

  con.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.get('/return_request', (req, res) => {

  const sql = "select are.id, are.user_id, are.orderid , are.return_no , are.return_amount, are.return_date, are.status, ac.firstname, ac.lastname, ac.email from `awt_return_exchange` as are left join `awt_customers` as ac on are.user_id = ac.id "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/return_order_view', (req, res) => {

  let order_id = req.body.order_id;

  const sql = "select are.id, are.user_id, are.orderid , are.return_no , are.return_amount, are.return_date, are.status, o.firstname as username , o.orderno ,o.address1,o.city1 ,o.state , o.postcode , o.sfirstname , o.slastname ,o.shipaddress , o.shipcity, o.shippostcode , o.paymode , o.ostatus , o.order_date , o.totalamt  from `awt_return_exchange` as are left join `order` as o on o.id = are.orderid  where are.id = ?"

  con.query(sql, [order_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/getreturncartData', (req, res) => {

  let order_id = req.body.order_id;

  const sql = 'select * from `awt_return_cart` as arc left join `awt_productimg` as ap on ap.product_id = arc.proid where return_id = ? and ap.deleted = 0 group by arc.proid '

  con.query(sql, [order_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/return_status_update', (req, res) => {

  let return_id = req.body.return_id;
  let return_status = req.body.return_status;

  const sql = "update `awt_return_exchange` set `status` = ?  where  id = ?"

  con.query(sql, [return_status, return_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.post('/add_cancellation', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let uid = req.body.uid

  let sql;
  let param;



  if (uid == undefined) {

    sql = "insert into awt_cancellation_reason(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, description, user_id, created_date]
  } else {

    sql = "update awt_cancellation_reason set title = ?, description = ?,updated_by = ?, updated_date = ? where id =?";
    param = [title, description, user_id, created_date, uid]
  }

  con.query(sql, param, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      if (data.insertId == 0) {
        return res.json("Date Updated Successfully")

      } else {
        return res.json("Data Added Successfully!")
      }
      // return res.json(data)

    }


  })
})



app.post('/cancellation_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_cancellation_reason where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})


app.get('/cancellation_data', (req, res) => {

  const sql = "select * from awt_cancellation_reason where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/cancellation_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_cancellation_reason set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/getreason', (req, res) => {
  const sql = "select * from awt_cancellation_reason where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post('/add_seo', (req, res) => {

  let seotitle = req.body.seotitle;
  let seodescription = req.body.seodescription;
  let user_id = req.body.user_id;
  let u_id = req.body.u_id;
  const date = new Date()


  let sql;
  let param;

  if (u_id == undefined) {


    sql = "insert into awt_pages(`seo_title`,`seo_desc`,`created_date`,`created_by`) values(?,?,?,?)"
    param = [seotitle, seodescription, date, user_id]

  } else {
    sql = "update awt_pages set seo_title = ? , seo_desc = ? ,updated_date = ? , updated_by = ?  where id = ?"
    param = [seotitle, seodescription, date, user_id, u_id]
  }

  con.query(sql, param, (err, data) => {
    console.log(sql)
    if (err) {
      return res.json(err)
    }
    else {
      if (data.insertId == 0) {
        return res.json("Date Updated Successfully")

      } else {
        return res.json("Data Added Successfully!")
      }
    }


  })
})

app.post('/seo_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_pages where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/seo_data', (req, res) => {

  const sql = "select * from awt_pages where deleted = 0 order by id desc"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/seo_delete', (req, res) => {

  let seo_id = req.body.seo_id;
  let date = new Date()

  const sql = "update awt_pages set deleted = 1  where id = ?"

  con.query(sql, [seo_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/getmetadetail', (req, res) => {

  let page_id = req.body.page_id;

  const sql = "select * from `awt_pages` where id = ? and deleted = 0"

  con.query(sql, [page_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.get('/getfaq', (req, res) => {

  const sql = "select * from `awt_faq` where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get('/getabout', (req, res) => {

  const sql = "select * from `awt_about` where deleted = 0 limit 1"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/update_about', (req, res) => {
  let abouttitle = req.body.abouttitle;
  let aboutdescription = req.body.aboutdescription;
  let date = new Date()


  const sql = "update `awt_about` set top_title = ? , top_desc = ? ,updated_date = ? where id = 1"

  con.query(sql, [abouttitle, aboutdescription, date], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json("Data Updated Successfully")
    }
  })
})

app.get(`/about_data`, (req, res) => {

  const sql = "select * from `awt_about` where id = 1  and deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })

})

app.get(`/get_gallery`, (req, res) => {

  const sql = "select * from `awt_gallery` where  deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })

})


app.post('/add_producttag', (req, res) => {
  let user_id = req.body.user_id
  let title = req.body.title;
  let description = req.body.description;
  let created_date = new Date()
  let u_id = req.body.u_id;


  let sql;
  let param;

  if (u_id == undefined) {
    sql = "insert into awt_producttag(`title`,`description`,`created_by`,`created_date`) values(?,?,?,?)"
    param = [title, description, user_id, created_date]

  } else {
    sql = "update awt_producttag set title = ? , description = ? , updated_by = ? ,updated_date = ? where id = ?"
    param = [title, description, user_id, created_date, u_id]
  }


  con.query(sql, param, (err, data) => {

    if (err) {

      return res.json(err)
    }
    else {
      if (data.insertId == 0) {
        return res.json("Date Updated Successfully")

      } else {
        return res.json("Data Added Successfully!")
      }
    }


  })
})

app.post('/producttag_update', (req, res) => {

  let u_id = req.body.u_id;

  const sql = "select * from awt_producttag where id = ?"

  con.query(sql, [u_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.get('/producttag_data', (req, res) => {

  const sql = "select * from awt_producttag where deleted = 0 "

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})
app.post('/producttag_delete', (req, res) => {

  let cat_id = req.body.cat_id;

  const sql = "update awt_producttag set deleted = 1 where id = ?"

  con.query(sql, [cat_id], (err, data) => {
    if (err) {
      return res.json(err)
    }
    else {
      return res.json(data)
    }
  })

})

app.post('/update_stock', (req, res) => {
  let count = req.body.count;
  let pro_id = req.body.pro_id;
  let flag = req.body.flag;
  let date = new Date()
  let user_id = req.body.user_id

  const ncount = Number(count)


  if (flag == '1') {
    const addstock = "insert into awt_productstockadd(`pro_id` , `stock`, `created_date`, `created_by`) values(?,?,?,?)"

    con.query(addstock, [pro_id, count, date, user_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        if (data.affectedRows == 1) {

          const getstock = "select * from awt_productstock where pro_id = ? and deleted = 0"

          con.query(getstock, [pro_id], (err, data) => {
            if (err) {
              return res.json(err)
            } else {
              if (data.length == 0) {
                const insert = "insert into awt_productstock(`pro_id` , `stock`, `created_date`, `created_by`) values(?,?,?,?)"
                con.query(insert, [pro_id, count, date, user_id], (err, data) => {
                  if (err) {
                    return res.json(err)
                  } else {
                    console.log(data)
                    return res.json(data)
                  }
                })
              } else {

                const previousstock = data[0].stock


                const newcount = previousstock + ncount;


                const updatestock = "update awt_productstock set stock = ? , updated_date = ? , updated_by = ? where pro_id = ?"

                con.query(updatestock, [newcount, date, user_id, pro_id], (err, data) => {
                  if (err) {
                    return res.json(err)
                  } else {
                    return res.json("Stock Updated Successfully")
                  }
                })
              }
            }
          })
        }
      }
    })

  } else {

    const addstock = "insert into awt_productstockremove(`pro_id` , `stock`, `created_date`, `created_by`) values(?,?,?,?)"

    con.query(addstock, [pro_id, count, date, user_id], (err, data) => {
      if (err) {
        return res.json(err)
      } else {
        if (data.affectedRows == 1) {

          const getstock = "select * from awt_productstock where pro_id = ? and deleted = 0"

          con.query(getstock, [pro_id], (err, data) => {
            if (err) {
              return res.json(err)
            } else {
              if (data.length == 0) {

                return res.json("Data not found")

              } else {
                const previousstock = data[0].stock;
                const newcount = previousstock - ncount;

                if (previousstock >= ncount) {

                  const updatestock = "update awt_productstock set stock = ? , updated_date = ? , updated_by = ? where pro_id = ?"

                  con.query(updatestock, [newcount, date, user_id, pro_id], (err, data) => {
                    if (err) {
                      return res.json(err)
                    } else {
                      return res.json("Stock Updated Successfully")
                    }
                  })
                } else {
                  return res.json("Please enter the number less than stock")
                }


              }
            }
          })
        }
      }
    })
  }




})

app.post(`/vendor_product_stock`, (req, res) => {

  const vendor_id = req.body.vendor_id;

  const sql = 'select aps.stock, aap.id,aap.active,aap.approve, aap.title,aap.description ,aap.price,ac.id as catid ,ac.title as category,av.id as vendorid,av.vendor_name as vendor,ab.id as brandid,ab.title as brand ,acs.id as scatid,acs.title as subcategory from `awt_add_product` as aap left join awt_category as ac on aap.catid = ac.id left JOIN awt_vendor as av on aap.v_id = av.id LEFT JOIN awt_brand as ab on aap.b_id = ab.id left JOIN awt_subcategory as acs on aap.scatid = acs.id left join awt_productstock as aps on aap.id = aps.pro_id  where aap.deleted = 0 and aap.v_id = ?';

  con.query(sql, [vendor_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})


app.post(`/getstock`, (req, res) => {
  let pro_id = req.body.pro_id;

  const sql = "select id,pro_id,stock from `awt_productstock` where pro_id = ?"

  con.query(sql, [pro_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})





function checkRows() {
  const query = `SELECT * FROM awt_reservstock WHERE created_date < CONVERT_TZ(NOW(), @@session.time_zone, '+05:30') - INTERVAL 15 MINUTE AND p_status = 0 AND deleted = 0`;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // Process the results (e.g., send an API request for each row)
    results.forEach(row => {
      // Your API request logic here


      let param = row.id;
      let cart_id = row.cartid;

      const deleterow = "update awt_reservstock set deleted = 1 where id = ?"

      con.query(deleterow, [param], (err, data) => {
        if (err) {
          console.log(err)
        } else {

          const updatecart = "update awt_cart set deleted = 1 where id = ?"

          con.query(updatecart, [cart_id], (err, data) => {
            if (err) {
              console.log(err)
            } else {
              // console.log(data)
            }
          })
        }
      })

    });
  });
}


cron.schedule('* * * * *', () => {
  console.log('Running scheduled task');
  checkRows();
});


// payment api *************************

app.post('/payment', async (req, res) => {
  const { user_id, price, phone, name } = req.body;

  const merchantTransactionId = 'M' + Date.now();

  const data = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: 'MUID' + user_id,
    name: name,
    amount: price * 100,
    redirectUrl: `https://nodejs.micasasucasa.in/payment/validate/${merchantTransactionId}`,
    redirectMode: 'REDIRECT',
    mobileNumber: phone,
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };


  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');

  const keyIndex = 1; // Adjust based on your configuration
  const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

  const options = {
    method: 'POST',
    url: prod_URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    },
    data: {
      request: payloadMain
    }
  };

  try {
    const response = await axios.request(options);


    res.status(200).send({
      url: response.data.data.instrumentResponse.redirectInfo.url,
      transactionid: response.data.data.merchantTransactionId,
      success: response.data.success
    });
  } catch (error) {
    console.error(`Payment Error: ${error.message}`);
    res.status(500).send({ message: error.message, success: false });
  }

});



app.get("/payment/validate/:merchantTransactionId", async function (req, res) {
  const PHONE_PE_HOST_URL = "https://api.phonepe.com/apis/hermes";
  const MERCHANT_ID = process.env.MERCHANT_ID;
  const SALT_INDEX = 1;
  const SALT_KEY = process.env.SALT_KEY;

  const { merchantTransactionId } = req.params;

  if (merchantTransactionId) {
    const statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId;

    // generate X-VERIFY
    const string = `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const xVerifyChecksum = sha256 + "###" + SALT_INDEX;

    try {
      const response = await axios.get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": MERCHANT_ID,  // Corrected this line
          accept: "application/json",
        },
      });

      if (response.data && response.data.code === "PAYMENT_SUCCESS") {
        // Redirect to FE payment success status page
        res.redirect(`https://micasasucasa.in/#/payment-success?transactionid=${merchantTransactionId}`);
      } else {
        // Redirect to FE payment failure / pending status page
        res.redirect(`https://micasasucasa.in/#/payment-failure?transactionid=${merchantTransactionId}`);
      }
    } catch (error) {
      console.error(`Payment validation failed: ${error.message}`);
      res.status(500).send({ message: "Payment verification failed", success: false });
    }
  } else {
    res.status(400).send({ message: "Invalid Transaction ID", success: false });
  }
});

app.post('/getrelatedproduct', (req, res) => {
  let { catid ,product_id} = req.body;


  const sql = "select aap.id, aap.title, aap.slug, aap.description, aap.description, aap.specification,aap.price,aap.disc_price, aap.size_image,aap.gst,aap.v_id,aap.catid,ap.image1,ap.image2 ,aap.customizable from awt_add_product as aap left join awt_productimg as ap on aap.id = ap.product_id where aap.catid = ? and aap.id != ? and aap.deleted = 0 and ap.deleted = 0 and aap.active= 1 and aap.approve = 1"

  con.query(sql, [catid,product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})



app.get('/gettagdata', (req, res) => {

  const sql = 'select * from awt_producttag where deleted = 0'

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.post('/getproducttag', (req, res) => {

  let { product_id } = req.body;

  const sql = 'select Tags from awt_add_product  where  id = ? and deleted = 0'

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })

})

app.post('/update_tag', (req, res) => {

  let { tags, product_id } = req.body;


  const sql = "update awt_add_product set Tags = ? where id = ?"

  con.query(sql, [tags, product_id], (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json("Data added successfully!")
    }
  })

})




