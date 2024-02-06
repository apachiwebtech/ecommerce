import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import img1 from "../assets/images/prof.png";


const Banner = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [admindata, setData] = useState([])
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        
    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.email) {
            isValid = false;
            newErrors.email = "Email is required";
        }
        if (!value.firstname) {
            isValid = false;
            newErrors.firstname = "FirstName is required"
        }
        if (!value.lastname) {
            isValid = false;
            newErrors.lastname = "Lastname is required"
        }
        if (!value.password) {
            isValid = false;
            newErrors.password = "Password is required"
        }
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        if (!passwordPattern.test(value.password)) {
            isValid = false;
            newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
        }



        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }



    async function getAdminuserData() {
        axios.get(`${BASE_URL}/adminuser_data`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAdminuserData()
    }, [])

    const handleClick = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };


    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleDelete = (id) => {


        const data = {
            adminuser_id: id
        }


        axios.post(`${BASE_URL}/adminuser_delete`, data)
            .then((res) => {
                getAdminuserData()

            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const hashpassword = md5(value.password)

            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                email: value.email,
                password: hashpassword,

            }

            axios.post(`${BASE_URL}/add_adminuser`, data)
                .then((res) => {
                    alert(res.data)
                    getAdminuserData()
                    if (res.data) {
                        //    navigate('/vendormaster')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (

        <div class="container-fluid page-body-wrapper">
            <div class="main-panel">
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <div class="page-title">
                            <h1>Subscription order #O9072076874</h1>
                        </div>
                        <div class="main-header-toolbar">
                            <div class="header-action">
                                <div class="header-action__item">
                                    <Link class="link"><DesktopWindowsRoundedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><SearchRoundedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><StorefrontOutlinedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><NotificationsActiveTwoToneIcon style={{fontSize : "17px"}}/></Link>
                                </div>

                                <div class="header-action__item header-acc">
                                    <span class="header-account__img"><Link class="link"><img  src={img1} alt="" /></Link></span>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </header>
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                   
                                          

                                            <form class="forms-sample" onSubmit={handleSubmit}>
                                           
                                                <div class="row">
                                                    <div class="col-md-6">
                                                    <h4 class="card-title">Banner For Desktop</h4>
                                                    <div class="form-group">
                                                    <label for="title">Title</label>
                                                    <input type="text" class="form-control" id="title" placeholder="Title" name='title'  />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                                <div class="form-group">
                                                    <label for="ban_img">Banner Image</label>
                                                    <input type="file" class="form-control" id="ban_img" placeholder="" name='ban_img'  />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                                <div class="form-group">
                                                    <label for="link1">Link</label>
                                                    <input type="text" class="form-control" id="link1" placeholder="Link" name='link1'  />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                                    </div>
                                                
                                               <div class="col-md-6">
                                               <h4 class="card-title">Banner For Mobile</h4>
                                               <div class="form-group">
                                                    <label for="title2">Title</label>
                                                    <input type="text" class="form-control" id="title2" placeholder="Title" name='title2' onChange={onhandleChange} />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                                <div class="form-group">
                                                    <label for="mob_img">Banner Image</label>
                                                    <input type="file" class="form-control" id="mob_img" placeholder="" name='mob_img' onChange={onhandleChange} />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                                <div class="form-group">
                                                    <label for="link2">Link</label>
                                                    <input type="text" class="form-control" id="link2" placeholder="Link" name='link2'  />
                                                    {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                </div>
                                               </div>
                                               </div>
                                                
                                                <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                                <Link to="/webapp/banner"><button class="btn btn-sm btn-light">Cancel</button></Link>
                                            </form>
                                       
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Banner;