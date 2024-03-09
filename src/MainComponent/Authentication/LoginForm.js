import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { md5 } from 'js-md5'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';
import { Alert } from '@mui/material'


function LoginForm({ open, setOpen }) {

    const [value, setValue] = useState({
        email: "",
        password: "",
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

    const handleGenerateOTP = () => {
        const generatedOTP = generateOTP(4); // Change 6 to the desired length of OTP
        setOTP(generatedOTP);

    };


    const [otpvalue, setOTPValue] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
    })

    const [otp, setOTP] = useState('');
    const [showOtp, setShowOtp] = useState(true);
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState("")
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [hide, setHide] = useState(false)





    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    useEffect(() => {


        setOTP(localStorage.getItem('otp'));
        // setTimeout(() => {
        //     setShowOtp(false);
        // }, 10000)

    }, []);

    const onHandleChange = (e) => {
        const { name, value } = e.target;

        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

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

    const onhandlesubmit = (e) => {
        const mergedOtp = Object.values(value).join('');
        e.preventDefault();
        setLoader(true)

        const data = {
            otp: mergedOtp,
            email: localStorage.getItem("pet_email"),
            value: localStorage.getItem("pet_value"),
        }

        axios.post(`${BASE_URL}/otp`, data)
            .then((res) => {
                console.log(res)


                if (res.data.length == 0) {
                    setError(true)

                    // document.getElementById("err").innerHTML = "<Stack sx={{ width: '100%' }} spacing={2}><Alert variant='outlined' severity='warning'>Please enter valid otp!</Alert></Stack>"
                    setLoader(false)
                    setTimeout(() => {
                        setError(false)

                        // document.getElementById("err").innerHTML = ""
                    }, 2000)
                } else {
                    setLoader(false)
                    if (res.data[0].parent_name === null) {
                        window.location.pathname = '/petprofilform';

                    }
                    else {
                        window.location.pathname = '/';
                    }
                    // navigate('/')
                    // window.location.pathname = '/';
                    const role = res.data[0].role;
                    const value = res.data[0].value;
                    const id = res.data[0].id;

                    localStorage.setItem("pet_role", role)
                    localStorage.setItem("pet_value", value)
                    localStorage.setItem('pet_id', id);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!value.email) {
            errors.email = 'Email is required';
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

    const encryptionKey = 'secret-key';

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                email: value.email,
                otp: otp
            }


            axios.post(`${BASE_URL}/customerlogin`, data)
                .then((res) => {
                    console.log(res.data.err)

                    if (res.data.id) {
                        setHide(true)
                        setOpen(!open);
                        const ciphertext = CryptoJS.AES.encrypt(res.data.id.toString(), encryptionKey).toString();
                        Cookies.set('custuserid', ciphertext, { expires: 1 });
                    }
                    else {
                        setErr('not able to display')
                    }

                })
                .catch((err) => {
                    console.log(err, "??????")
                })
        }

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
                                <button class="nav-link" id="profile-tab" onClick={flushdata}  data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SIGN UP</button>
                            </li>

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form id="login_ajax" method="post" className="login">

                                    <h2>Sign in</h2>
                                    <p className="status"></p>
                                    <div className="content">
                                        {errors.email && (<span className="text-danger">{errors.email}</span>
                                        )}
                                        <div className="username">
                                            <input type="text" required="required" className="input-text" name="email" id="username" placeholder="Your Email" onChange={onhandleChange} />
                                        </div>

                                        <div className="rememberme-lost">
                                            <div className="rememberme">
                                                <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                                                <label htmlFor="rememberme" className="inline">Remember me</label>
                                            </div>
                                            <div className="lost_password">
                                                <Link href="forgot-password.html">Lost your password?</Link>
                                            </div>
                                        </div>
                                        <div className="button-login" onClick={handleGenerateOTP}>
                                            <input type="submit" className="button" name="login" value="Login" onClick={handleSubmit} />
                                        </div>
                                        <div className="button-next-reregister">Create An Account</div>
                                    </div>
                                </form>
                            </div>

                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <form id="login_ajax" method="post" className="login">

                                    <h2>Register</h2>
                                    <p className="status"></p>
                                    <div className="content">
                                        {errors.email && (<span className="text-danger">{errors.email}</span>
                                        )}
                                        <div className="username">
                                            <input type="text" required="required" className="input-text" name="email" id="username" placeholder="Your Email" onChange={onhandleChange} />
                                        </div>

                                        <div className="rememberme-lost">
                                            <div className="rememberme">
                                                <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
                                                <label htmlFor="rememberme" className="inline">Remember me</label>
                                            </div>
                                            <div className="lost_password">
                                                <Link href="forgot-password.html">Lost your password?</Link>
                                            </div>
                                        </div>
                                        <div className="button-login" onClick={handleGenerateOTP}>
                                            <input type="submit" className="button" name="login" value="Login" onClick={handleSubmit} />
                                        </div>
                                        <div className="button-next-reregister">Create An Account</div>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                    {hide ? 
                    <div className='form-login active'>
                        <form onSubmit={onhandlesubmit} className="login">
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
                                        <input type='number' maxLength='1' name='otp1' ref={otp1Ref} onChange={onHandleChange} />
                                        <input type='number' maxLength='1' name='otp2' ref={otp2Ref} onChange={onHandleChange} />
                                        <input type='number' maxLength='1' name='otp3' ref={otp3Ref} onChange={onHandleChange} />
                                        <input type='number' maxLength='1' name='otp4' ref={otp4Ref} onChange={onHandleChange} />
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
                                        <input type="submit" className="button" name={loader ? "Processing" : " Verify"} value="Login" onClick={handleSubmit} />
                                    </div>

                                    <p className='text-danger' id="err"></p>
                                    <div id='msg'>
                                        {
                                            showOtp && <Alert severity="info" >{otp}</Alert>
                                        }
                                    </div>




                                </div>
                            </div>
                        </form>
                    </div> : null}

                    {/* <div className="form-register">
                        <form method="post" className="register">
                            <h2>OTP</h2>
                            <div className="content">
                                <div className="email">
                                    <input type="email" className="input-text" placeholder="Email" name="email" id="reg_email" value="" />
                                </div>
                                <div className="password">
                                    <input type="password" className="input-text" placeholder="Password" name="password" id="reg_password" />
                                </div>
                                <div className="button-register">
                                    <input type="submit" className="button" name="register" value="Register" />
                                </div>
                                <div className="button-next-login">Already has an account</div>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>}
        </div>
    )
}

export default LoginForm