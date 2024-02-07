import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';

const Gallery = () => {

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
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Image / Video</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="brand">Title</label>
                                            <input type="text" class="form-control" id="title" placeholder="Brand Name" name='brand' onChange={onhandleChange} />
                                            {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="image">Image / Video</label>
                                            <input type="file" class="form-control" id="image" placeholder="" name='image' onChange={onhandleChange} />
                                            {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                        </div>
                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <Link to="/webapp/gallery"><button class="btn btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title"> List Of Gallery </h4>

                                        </div>

                                    </div>

                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Title
                                                    </th>

                                                    <th width="17%">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                <tr >
                                                    <td>
                                                        1
                                                    </td>
                                                    <td>
                                                        bed
                                                    </td>


                                                    <td>
                                                        <Link><EditIcon /></Link>
                                                        <Link style={{ color: "red" }}><DeleteIcon /></Link>
                                                        {/* <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button> */}
                                                    </td>

                                                </tr>




                                            </tbody>
                                        </table>

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

export default Gallery;