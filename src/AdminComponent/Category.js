import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';



const Category = () => {

    const [cat, setCatData] = useState([])
    const [error, setError] = useState({})
    const [uid, setUid] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [value, setValue] = useState({
        title: "" || uid.title,
        description: "" || uid.description,
    })

    useEffect(() => {
        setValue({
            title: uid.title,
            description: uid.description,
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.title) {
            isValid = false;
            newErrors.title = "title is require"
        }
        if (!value.description) {
            isValid = false
            newErrors.description = "description is require"
        }

        setError(newErrors)
        return isValid
    }



    async function getcatData() {
        axios.get(`${BASE_URL}/category_data`)
            .then((res) => {
                console.log(res.data)
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getcatData()
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
            cat_id: id
        }

        axios.post(`${BASE_URL}/category_delete`, data)
            .then((res) => {
                getcatData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    const handleUpdate = (id) => {
        axios.post(`${BASE_URL}/category_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(uid)



    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                title: value.title,
                description: value.description,
                user_id: localStorage.getItem("userid"),
                u_id: uid.id
            }

            axios.post(`${BASE_URL}/add_category`, data)
                .then((res) => {
                    alert(res.data)
                    getcatData()

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
            <InnerHeader/>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Category</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>
                                            {error.description && <span className='text-danger'>{error.description}</span>}
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <Link to="/webapp/adminuser"><button class="btn btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Category </h4>
                                            <p class="card-description">
                                                List Of Category
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
                                                        Title
                                                    </th>

                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {cat.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>

                                                            <td>
                                                                <EditIcon onClick={() => handleUpdate(item.id)} />
                                                                <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
                                                                {/* <button className='btn btn-sm btn-danger' >Delete</button> */}
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

export default Category