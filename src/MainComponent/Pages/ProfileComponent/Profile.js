import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../AdminComponent/BaseUrl';
import ProfileSidebar from '../../Subcomponents/ProfileSidebar';
import custdecryptedUserId from '../../../Utils/CustUserid';
import { useLocation } from 'react-router-dom';
import Spinner from '../../Ui/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {



    const [uid, setUid] = useState([])
    const [errors, setErrors] = useState({})
    const [toaster, setToast] = useState({})
    const [spinner, setspinner] = useState(false)
    const [value, setValue] = useState({
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        mobile: "",
    })

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.firstname) {
            isValid = false;
            newErrors.firstname = "firstname is required";
        }
        if (!value.lastname) {
            isValid = false;
            newErrors.lastname = "lastname is required";
        }
        if (!value.mobile) {
            isValid = false;
            newErrors.lastname = "lastname is required";
        }





        setErrors(newErrors)
        return isValid



    }
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };
    const notify = () => toast("Profile updated successfully..");

    async function getProfiedata() {
        const data = {
            user_id: custdecryptedUserId()
        }
        axios.post(`${BASE_URL}/getprofiledata`, data)
            .then((res) => {

                setUid(res.data[0])

                setValue({
                    email: res.data[0].email,
                    firstname: res.data[0].firstname,
                    lastname: res.data[0].lastname,
                    gender: res.data[0].gender,
                    mobile: res.data[0].mobile
                })
            })


    }





    useEffect(() => {
        getProfiedata()
    }, [])

    const onhandlechange = (e) => {
        setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        if (validateForm()) {
            setspinner(true)
            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                mobile: value.mobile,
                gender: value.gender,
                user_id: custdecryptedUserId()
            }

            axios.post(`${BASE_URL}/updateprofiledetails`, data)
                .then((res) => {
                    console.log(res)
                    setspinner(false)
                    notify()
                })
        }


    }

    const gendervalue = String(value.gender)



    return (
        <div className='row p-5'>
            {spinner && <Spinner />}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='col-lg-4 col-md-4 col-12'>
                <ProfileSidebar />
            </div>
            <div className='col-lg-8 col-md-4 col-12'>
                <div className='row'>
                    <div className='p-3'>
                        <h2>UPDATE YOUR PROFILE BELOW :</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className='row'>
                        <div class="mb-3 col-lg-6">
                            <label for="exampleFormControlInput1" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter first name" name="firstname" value={value.firstname} onChange={onhandlechange} />
                            {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
                        </div>
                        <div class="mb-3 col-lg-6">
                            <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Last name" name="lastname" value={value.lastname} onChange={onhandlechange} />
                            {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                        </div>
                        <div class="mb-3 col-lg-6">
                            <label for="exampleFormControlInput1" class="form-label">Email</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={value.email} placeholder="Enter email" name="email" onChange={onhandlechange} disabled />
                        </div>
                        <div class="mb-3 col-lg-6">
                            <label for="exampleFormControlInput1" class="form-label">Mobile</label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Enter mobile" name="mobile" onChange={onhandlechange} value={value.mobile} />
                            {errors.mobile && <span className='text-danger'>{errors.mobile}</span>}
                        </div>
                        <div className='px-3'>
                            <FormControl>
                                <label for="exampleFormControlInput1" class="form-label">Gender</label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    // defaultValue="1"
                                    onChange={onhandlechange}
                                    name="gender"
                                    value={gendervalue}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                                    <FormControlLabel value="0" control={<Radio />} label="Female" />

                                </RadioGroup>
                            </FormControl>
                        </div>

                    </div>

                    <button type='submit' className='button button-outline ' style={{ float: "right" }}>Submit</button>
                </form>




            </div>
        </div>
    )
}

export default Profile