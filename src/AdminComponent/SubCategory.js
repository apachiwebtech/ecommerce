import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SubCategory = () => {
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [subcat, setsubCatData] = useState([])
    const [cat, setCatData] = useState([])


    const [cat_id, setId] = useState("")
    const [value, setValue] = useState({
        title: "",
        description: "",

    })

    async function getcatData() {
        axios.get(`${BASE_URL}/category_data`)
            .then((res) => {
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getcatData()
    }, [])



    async function getsubcatData() {
        axios.get(`${BASE_URL}/subcategory_data`)
            .then((res) => {
                setsubCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getsubcatData()
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

        axios.post(`${BASE_URL}/subcategory_delete`, data)
            .then((res) => {
                getsubcatData()

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



        const data = {
            title: value.title,
            description: value.description,
            user_id: localStorage.getItem("userid"),
            cat_id: cat_id
        }

        axios.post(`${BASE_URL}/add_subcategory`, data)
            .then((res) => {
                alert(res.data)
                getsubcatData()

            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(cat_id, "new")


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            const selectedId = selectedValue.id;
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
        }
    };

    return (

        <div class="container-fluid page-body-wrapper">
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add SubCategory</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={cat}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                sx={{ width: "100%" }}
                                                renderInput={(params) => <TextField {...params} label="Category" />}
                                                onChange={(event, value) => HandleChange(value)}
                                                name="category"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Title" name='title' onChange={onhandleChange} />
                                        </div>
                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" name='description' onChange={onhandleChange}></textarea>
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
                                            <h4 class="card-title">SubCategory </h4>
                                            <p class="card-description">
                                                List Of SubCategory
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

                                                {subcat.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {item.id}
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>


                                                            <td>
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button>
                                                            </td>
                                                            {confirmationVisibleMap[item.id] && (
                                                                <div className='confirm-delete'>
                                                                    <p>Are you sure you want to delete?</p>
                                                                    <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-primary'>OK</button>
                                                                    <button onClick={() =>handleCancel(item.id)} className='btn btn-sm btn-danger'>Cancel</button>
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

export default SubCategory