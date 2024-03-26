import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { md5 } from 'js-md5'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';
import { Alert } from '@mui/material'
import custdecryptedUserId from '../../Utils/CustUserid'


function LoginForm({ open, setOpen }) {

    const [value, setValue] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        mobile: "",
        remail: ""
    })


    const generateOTP = (length) => {

        const characters = '123456789';
        let otp = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            otp += characters[randomIndex];
        }


        return otp;
    };


    const [otpvalue, setOTPValue] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
    })




    const [showOtp, setShowOtp] = useState(true);
    const [tostOtp, settostotp] = useState('');
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [hide, setHide] = useState(false)
    const [emailexist, setExist] = useState('')
    const [notexist, setNotExist] = useState('')

    const encryptionKey = 'secret-key';





    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);





    const onHandleOtpChange = (e) => {
        const { name, value } = e.target;

        setOTPValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        // Move focus to the next input if a digit is entered
        let inputValue = e.target.value;
        if (value.length > 1) {
            inputValue = value.slice(0, 1);
            otp1Ref.current.value = inputValue;
            otp2Ref.current.value = inputValue;
            otp2Ref.current.value = inputValue;
            otp4Ref.current.value = inputValue;
        }

        if (value.length === 1) {
            switch (name) {
                case 'otp1':
                    otp2Ref.current.focus();
                    break;
                case 'otp2':
                    otp3Ref.current.focus();
                    break;
                case 'otp3':
                    otp4Ref.current.focus();
                    break;
                case 'otp4':
                    // The last input, you can perform additional actions if needed
                    break;
                default:
                    break;
            }
        } else if (value.length === 0) {
            // Backspace pressed, move focus to the previous input
            switch (name) {
                case 'otp2':
                    otp1Ref.current.focus();
                    break;
                case 'otp3':
                    otp2Ref.current.focus();
                    break;
                case 'otp4':
                    otp3Ref.current.focus();
                    break;
                default:
                    break;
            }
        }
    };



    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!value.remail) {
            errors.remail = 'Email is required';
            isValid = false;
        }
        if (!value.firstname) {
            errors.firstname = 'Firstname is required';
            isValid = false;
        }
        if (!value.lastname) {
            errors.lastname = 'Lastname is required';
            isValid = false;
        }
        if (!value.mobile) {
            errors.mobile = 'Mobile is required';
            isValid = false;
        }

        setErrors(errors);

        return isValid;
    };

    const handleToggle = (e) => {
        setOpen(false);
    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }





    const flushdata = () => {
        setShowOtp(false);
        setOTPValue({
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
        });
        setHide(false)
    }

    const handleSubmit = (e) => {
        const generatedOTP = generateOTP(4);
        settostotp(generateOTP)

        // Change 6 to the desired length of OTP
        e.preventDefault()


        const data = {
            email: value.email,
            otp: generatedOTP
        }


        if (value.email !== "") {
            setLoader(true)
            axios.post(`${BASE_URL}/customerlogin`, data)
                .then((res) => {
                    setLoader(false)
                    // console.log(res.data, "000")
                    if (res.data[0].id) {
                        setShowOtp(true)
                        setHide(true)
                        settostotp(res.data[0].otp)
                        const id = res.data[0].email; // Define id here
                        const value = res.data[0].value; // Define id here
                        const name = res.data[0].firstname;
                        const otp = res.data[0].otp;
                        localStorage.setItem("ecom_email", id)
                        localStorage.setItem("ecom_value", value)
                        // localStorage.setItem("Name", name)
                        // localStorage.setItem('otp', otp)
                    }
                    else {
                        setNotExist(res.data)
                        setError(true)
                        setTimeout(() => {
                            setError(false)

                        }, 5000);
                    }


                })
                .catch((err) => {
                    console.log(err);
                })

        }
        else {
            // setError2(true)
            setTimeout(() => {
                // setError2(false)
            }, 5000);
        }


    }


    const onhandleregistersubmit = (e) => {
        const generatedOTP = generateOTP(4);
     
        e.preventDefault();

        const data = {
            email: value.remail,
            mobile: value.mobile,
            firstname: value.firstname,
            lastname: value.lastname,
            otp: generatedOTP
        }

        if (validateForm()) {
            setLoader(true)

            axios.post(`${BASE_URL}/register`, data)
                .then((res) => {
                    setLoader(false)
                   
                    if (res.data[0].email) {
                        setShowOtp(true)
                        setHide(true)
                        settostotp(res.data[0].otp)
                        const id = res.data[0].email; // Define id here
                        const value = res.data[0].value; // Define id here
                        const firstname = res.data[0].firstname;
                        const lastname = res.data[0].lastname;
                        const Mobile = res.data[0].mobile
                        const otp = res.data[0].otp;
                        localStorage.setItem("ecom_email", id)
                        localStorage.setItem("ecom_value", value)
                        localStorage.setItem("ecom_mobile", Mobile)
                        localStorage.setItem("firstname", firstname)
                        localStorage.setItem("lastname", lastname)
                    } else {
                        setExist(res.data)

                        setTimeout(() => {
                            setExist('')
                        }, 4000);
                    }


                })
                .catch((err) => {
                    console.log(err);
                })

        }


    }


    async function updateuserid() {
        if (Cookies.get("orderid")) {
            const data = {
                user_id: custdecryptedUserId(),
                order_id: Cookies.get("orderid")
            }

            axios.post(`${BASE_URL}/updateproid`, data)
                .then((res) => {
                    // console.log(res)
          
                  
                });
        }

    }

    async function addorderid() {
    
            const data = {
                user_id: custdecryptedUserId(),
            }

            axios.post(`${BASE_URL}/addorderid`, data)
                .then((res) => {
                    // console.log(res)

                    if(res.data[0].id){

                        Cookies.set('orderid' , res.data[0].id)
                    }
                });
      

    }

    // useEffect(() => {
    //     if (Cookies.get("custuserid")) {
    //         updateuserid()
    //     }
    // }, [])

    const onhandleotpsubmit = (e) => {
        const mergedOtp = Object.values(otpvalue).join('');
        e.preventDefault();
        setLoader(true)

        const data = {
            otp: mergedOtp,
            email: localStorage.getItem("ecom_email"),
            value: localStorage.getItem("ecom_value"),
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname"),
            mobile: localStorage.getItem("ecom_mobile"),
        }

        axios.post(`${BASE_URL}/otp`, data)
            .then((res) => {
                // console.log(res)


                if (res.data.length == 0) {
                    setError(true)

                    setLoader(false)
                    setTimeout(() => {
                        setError(false)

                    }, 2000)
                } else {

                    setTimeout(() => {
                        updateuserid()
                        addorderid()
                    }, 1000);
                    setLoader(false)
                    setOpen(false)
                    const value = res.data[0].value;
                    const id = res.data[0].id;

                    const ciphertext = CryptoJS.AES.encrypt(res.data[0].id.toString(), encryptionKey).toString();
                    Cookies.set('custuserid', ciphertext, { expires: 1 });

                    localStorage.setItem("ecom_value", value)
                    localStorage.setItem('ecom_id', id);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="form-login-register">
            {open && <div className="box-form-login" >
                <div className="active-login" onClick={handleToggle} ></div>
                <div className="box-content">
                    <div className="form-login active">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" onClick={flushdata} data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">LOGIN</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" onClick={flushdata} data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SIGN UP</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                
                                <form onSubmit={handleSubmit} id="login_ajax" method="post" style={{padding :"20px 30px 30px"}} className="login">

                                    <h2>Sign in</h2>
                                    <p className="status"></p>
                                    <div className="content">
                                        {errors.email && (<span className="text-danger">{errors.email}</span>
                                        )}
                                        <div className="username">
                                            <input type="text" required="required" className="input-text" name="email" id="username" placeholder="Your Email" onChange={onhandleChange} />
                                        </div>

                                        {/* <div className="rememberme-lost">
                                            <div className="rememberme">
                                                <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                                                <label htmlFor="rememberme" className="inline">Remember me</label>
                                            </div>
                                            <div className="lost_password">
                                                <Link href="forgot-password.html">Lost your password?</Link>
                                            </div>
                                        </div> */}
                                        <div className="button-login" >
                                            <input type="submit" className="button" name="Login" value="Login" />
                                        </div>
                                        <span className='text-danger'>{notexist}</span>
                                    </div>
                                </form>
                            </div>

                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <form onSubmit={onhandleregistersubmit} id="login_ajax" method="post" style={{padding :"20px 30px 30px"}} className="login">

                                    <h2>Register</h2>
                                    <p className="status"></p>
                                    <div className="content">

                                        <div className="username">
                                            <input type="text" className="input-text" name="firstname" id="username" placeholder="Firstname" onChange={onhandleChange} />
                                            {errors.firstname && (<span className="text-danger">{errors.remail}</span>
                                            )}
                                        </div>
                                        <div className="username">
                                            <input type="text" className="input-text" name="lastname" id="username" placeholder="Lastname" onChange={onhandleChange} />
                                            {errors.lastname && (<span className="text-danger">{errors.lastname}</span>
                                            )}
                                        </div>
                                        <div className="username">
                                            <input type="number" className="input-text" name="mobile" id="username" placeholder="Mobile" onChange={onhandleChange} />
                                            {errors.mobile && (<span className="text-danger">{errors.mobile}</span>
                                            )}
                                        </div>
                                        <div className="username">
                                            <input type="email" className="input-text" name="remail" id="username" placeholder="Your Email" onChange={onhandleChange} />
                                            {errors.remail && (<span className="text-danger">{errors.remail}</span>
                                            )}
                                        </div>

                                        {/* <div className="rememberme-lost">
                                            <div className="rememberme">
                                                <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                                                <label htmlFor="rememberme" className="inline">Remember me</label>
                                            </div>
                                            <div className="lost_password">
                                                <Link href="forgot-password.html">Lost your password?</Link>
                                            </div>
                                        </div> */}
                                        <div className="button-login" >
                                            <input type="submit" className="button" name="Register" value="Register" />
                                        </div>
                                        <span className='text-danger'>{emailexist}</span>

                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                    {hide ?
                        <div className='form-login active'>
                            <form onSubmit={onhandleotpsubmit} className="login">
                                <div className="content">
                                    {error && <Alert style={{ position: "absolute", top: "74px" }} severity='error'>Please enter valid otp!</Alert>}

                                    <div className='text-center'>
                                        <h4 className='reg-head'>OTP</h4>
                                    </div>

                                    <div className=' mobile-detail mob-box'>
                                        <div className=''>
                                            {/* <p style={{ fontWeight: "700" }}>Enter OTP</p> */}
                                        </div>
                                        <div className='otp-box d-flex justify-content-between'>
                                            <input type='number' maxLength='1' name='otp1' ref={otp1Ref} onChange={onHandleOtpChange} />
                                            <input type='number' maxLength='1' name='otp2' ref={otp2Ref} onChange={onHandleOtpChange} />
                                            <input type='number' maxLength='1' name='otp3' ref={otp3Ref} onChange={onHandleOtpChange} />
                                            <input type='number' maxLength='1' name='otp4' ref={otp4Ref} onChange={onHandleOtpChange} />
                                        </div>
                                        <div className='  align-items-center otp-text pt-2'>
                                            {/* <p className='col-6'>1.45 secs Time remaining</p> */}


                                        </div>
                                    </div>
                                    <div className='text-center btn-sec' >
                                        <div className='text-center' style={{ position: "relative" }}>
                                            <button type='submit' className='Verify-btn'>

                                            </button>


                                        </div>
                                        <div className="button-login">
                                            <input type="submit" className="button" name={loader ? "Processing" : " Verify"} value="Login" />
                                        </div>

                                        <p className='text-danger' id="err"></p>
                                        <div id='msg'>
                                            {
                                                showOtp && <Alert severity="info" >{tostOtp}</Alert>
                                            }
                                        </div>




                                    </div>
                                </div>
                            </form>
                        </div> : null}


                </div>
            </div>}
        </div>
    )
}

export default LoginForm