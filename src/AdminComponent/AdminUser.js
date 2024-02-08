import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';

const AdminUser = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [admindata, setData] = useState([])
    const [uid, setUid] = useState([])
    const [value, setValue] = useState({
        firstname: "" || uid.firstname,
        lastname: "" || uid.lastname,
        email: "" || uid.email,
        password: "",

    })

    useEffect(() => {
        setValue({
            firstname: uid.firstname,
            lastname: uid.lastname,
            email: uid.email,
            password: "",
        })
    }, [uid])

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


    const handleUpdate = (id) => {
        axios.post(`${BASE_URL}/adminuser_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
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
                u_id : uid.id,
                user_id: localStorage.getItem("userid")

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
                                    <h4 class="card-title">Add Admin User</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">FirstName</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="FirstName" value={value.firstname} name='firstname' onChange={onhandleChange} />
                                            {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">LastName</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="LastName" value={value.lastname} name="lastname" onChange={onhandleChange} />
                                            {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" value={value.email} name="email" onChange={onhandleChange} />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={onhandleChange} />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputConfirmPassword1">Confirm Password</label>
                                            <input type="text" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password" onChange={onhandleChange} />
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' class="btn btn-light" onClick={() => setValue()}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Admin User </h4>
                                            <p class="card-description">
                                                List Of Admin User
                                            </p>
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
                                                        User Name
                                                    </th>

                                                    <th>
                                                        Email
                                                    </th>

                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {admindata.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.firstname}
                                                            </td>
                                                            <td>
                                                                {item.email}
                                                            </td>

                                                            <td>
                                                                <EditIcon onClick={() => handleUpdate(item.id)} />
                                                                <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
                                                                {/* <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button> */}
                                                            </td>
                                                            {confirmationVisibleMap[item.id] && (
                                                                <div className='confirm-delete'>
                                                                    <p>Are you sure you want to delete?</p>
                                                                    <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-primary'>OK</button>
                                                                    <button onClick={() => handleCancel(item.id)} className='btn btn-sm btn-danger'>Cancel</button>
                                                                </div>
                                                            )}
                                                        </tr>

                                                    )
                                                })}


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

export default AdminUser