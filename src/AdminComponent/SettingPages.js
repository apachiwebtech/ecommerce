import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { md5 } from 'js-md5';
import decryptedUserId from '../Utils/UserID';


function SettingPages() {

    const [errors, setErrors] = useState({})
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState(false);
    const [value, setValue] = useState({
        password: "",
        cnf_password: "",
    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.password) {
            isValid = false;
            newErrors.password = "Password is required"
        }
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        if (!passwordPattern.test(value.password)) {
            isValid = false;
            newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
        }

        if (value.password !== value.cnf_password) {
            isValid = false;
            newErrors.cnf_password = "Password & Confirm Password dont match"

        }

        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setConfirmationVisibleMap(true)
        }
    };

    const handleUpdate = (e) => {
        const hashpass = md5(value.password);
        const data = {
            password: hashpass,
            user_id :decryptedUserId()
          };
        axios.post(`${BASE_URL}/change_password` , data)
        .then((res) => {
         console.log(res.data , ">>>")

        })
        .catch((err) => {
            console.log(err)
        })

    }
    return (
        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div>
                                        <div>
                                            <h4 class="card-title">GST </h4>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue=""
                                                name="radio-buttons-group"
                                                row
                                            >
                                                <FormControlLabel value="0" control={<Radio size="small" />} label="Add on" />
                                                <FormControlLabel value="1" control={<Radio size="small" />} label="reverse" />
                                                {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                            </RadioGroup>
                                            <div>
                                                <hr />
                                                <h4 class="card-title">COD Settings </h4>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue=""
                                                    name="radio-buttons-group"
                                                    row
                                                >
                                                    <FormControlLabel value="0" control={<Radio size="small" />} label="Enable" />
                                                    <FormControlLabel value="1" control={<Radio size="small" />} label="disable" />
                                                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                                </RadioGroup>
                                            </div>

                                         

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6' grid-margin stretch-card>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Change Password</h4>
                                    <form class="forms-sample" onSubmit={handleUpdate}>
                                    <div className='row'>
                                        <div class=" col-lg-6 form-group">
                                            <p>Password</p>
                                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={onhandleChange}/>
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        
                                        </div>
                                        <div class="col-lg-6 form-group">
                                            <p>Confirm Password</p>
                                            <input type="text" class="form-control" id="exampleInputConfirmPassword1" name='cnf_password' placeholder="Password" onChange={onhandleChange}/>
                                            {errors.cnf_password && <div className="text-danger">{errors.cnf_password}</div>}
                                        </div>
                                        <div className='col-lg-12 py-3'>
                                            <button type = 'button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>                                   
                                        </div>
                                        </div>
                                        {confirmationVisibleMap && <div className='confirm-delete'>
            <p>Are you sure you want to Change the Password</p>
            <button type = 'submit' className='btn btn-sm btn-primary'>OK</button>
            <button  type = 'button' onClick ={() => setConfirmationVisibleMap(false)} className='btn btn-sm btn-danger'>Cancel</button>
        </div>}
                                    </form>
                                   
                                </div></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPages