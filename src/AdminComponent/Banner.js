import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';

import img1 from "../assets/images/prof.png";
import InnerHeader from './InnerHeader';


const Banner = () => {


    const [errors, setErrors] = useState({})

    const [value, setValue] = useState({
        title: "",
        banner: "",
        target: "",
        link: "",

    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.title) {
            isValid = false;
            newErrors.title = "Title is required";
        }
        if (!value.banner) {
            isValid = false;
            newErrors.banner = "Banner is required"
        }
        if (!value.link) {
            isValid = false;
            newErrors.link = "Link is required"
        }
        if (!value.target) {
            isValid = false;
            newErrors.lastname = "Target is required"
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
           
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAdminuserData()
    }, [])

 


 


    const handleSubmit = (e) => {
        e.preventDefault()


        if (validateForm()) {
          

            const data = {
                title: value.firstname,
                banner: value.lastname,
                link: value.email,
                target: value.target,

            }

            axios.post(`${BASE_URL}/add_banner`, data)
                .then((res) => {
                    alert(res.data)
               
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
            <InnerHeader />
            <div class="main-panel">

                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">



                                    <div class="forms-sample " >

                                        <div class="row">
                                            <div class="col-md-6">
                                                <form >


                                                    <h4 class="card-title">Banner For Desktop</h4>
                                                    <div class="form-group">
                                                        <label for="title">Title<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="title" placeholder="Title" name='title' />
                                                        {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="ban_img">Banner Image<span className='text-danger'>*</span></label>
                                                        <input type="file" class="form-control" id="ban_img" placeholder="" name='ban_img' />
                                                        {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                    </div>
                                                    <div class="form-group ">
                                                        <label for="exampleFormControlSelect1">Target<span className='text-danger'>*</span></label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" name=''>
                                                            <option selected>Select</option>
                                                            <option value="1">blank</option>
                                                            <option value="2">same</option>
                                                        </select>

                                                    </div>
                                                    <div class="form-group">
                                                        <label for="link1">Link<span className='text-danger'>*</span></label>
                                                        <input type="text" class="form-control" id="link1" placeholder="Link" name='link1' />
                                                        {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                                    </div>
                                                    <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                                    <Link to="/webapp/banner"><button class="btn btn-sm btn-light">Cancel</button></Link>
                                                </form>
                                            </div>

                                            <div class="col-md-6">
                                                <form>

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
                                                    <div class="form-group ">
                                                        <label for="exampleFormControlSelect1">Target<span className='text-danger'>*</span></label>
                                                        <select class="form-control form-control-lg" id="exampleFormControlSelect1" name=''>
                                                            <option selected>Select</option>
                                                            <option value="1">blank</option>
                                                            <option value="2">same</option>
                                                        </select>

                                                    </div>
                                                    <div class="form-group">
                                                        <label for="link2">Link</label>
                                                        <input type="text" class="form-control" id="link2" placeholder="Link" name='link2' />
                                                        {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
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
                </div>
            </div>
        </div>

    )
}

export default Banner;