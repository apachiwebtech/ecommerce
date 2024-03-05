import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { md5 } from 'js-md5'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';


function LoginForm({open, setOpen}) {

    // const [open, setOpen] = useState(true);
    const [value, setValue] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState("")

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!value.email) {
            errors.email = 'Email is required';
            isValid = false;
        }

        if (!value.password) {
            errors.password = 'Password is required';
            isValid = false;
        }
        console.log(errors, ">>>>>>>>.")
        setErrors(errors);
        console.log("hello")
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
        console.log(validateForm(), "??")
        if (validateForm()) {


            const hashpass = md5(value.password)

            const data = {
                email: value.email,
                password: hashpass,
            }
            axios.post(`${BASE_URL}/customerlogin`, data)
                .then((res) => {
                    console.log(res.data.err)

                    if (res.data.id) {
                        setOpen(!open);
                        const ciphertext = CryptoJS.AES.encrypt(res.data.id.toString(), encryptionKey).toString();
                        Cookies.set('userid', ciphertext, { expires: 1 });
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
    return (
        <div className="form-login-register">
            {open && <div className="box-form-login" >
                <div className="active-login" onClick={handleToggle} ></div>
                <div className="box-content">
                    <div className="form-login active">
                        <form id="login_ajax" method="post" className="login">

                            <h2>Sign in</h2>
                            <p className="status"></p>
                            <div className="content">
                                <div className="username">
                                    <input type="text" required="required" className="input-text" name="email" id="username" placeholder="Your name" onChange={onhandleChange} />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="password">
                                    <input className="input-text" required="required" type="password" name="password" id="password" placeholder="Password" onChange={onhandleChange} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>
                                    )}
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
                                <div className="button-login">
                                    <input type="submit" className="button" name="login" value="Login" onClick={handleSubmit} />
                                </div>
                                <div className="button-next-reregister">Create An Account</div>
                            </div>
                        </form>
                    </div>
                    <div className="form-register">
                        <form method="post" className="register">
                            <h2>REGISTER</h2>
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
                    </div>
                </div>
            </div> }
        </div>
    )
}

export default LoginForm