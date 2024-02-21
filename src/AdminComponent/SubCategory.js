import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';

const SubCategory = () => {
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [subcat, setsubCatData] = useState([])
    const [error, setError] = useState({})
    const [cat, setCatData] = useState([])
    const [selectedOption, setSelectedOption] = useState(null); 
    const [uid, setUid] = useState([])

    const [cat_id, setId] = useState("")
    const [value, setValue] = useState({
        title: "" || uid.title,
        slug: "" || uid.slug,
        description: "" || uid.description,

    })

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!setSelectedOption) {
            isValid = false;
            newErrors.category = "category is require"
        }
        if (!value.title) {
            isValid = false;
            newErrors.title = "title is require"
        }

        if (!value.slug) {
            isValid = false
            newErrors.slug = "slug is require"
        }

        setError(newErrors)
        return isValid
    }



    useEffect(() => {
        setValue({
            title: "" || uid.title,
            slug: "" || uid.slug,
            description: "" || uid.description,
        })
    }, [uid])

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

    const handleUpdate = (id) => {
        axios.post(`${BASE_URL}/subcategory_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }


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

        if (validateForm()) {
            const data = {
                title: value.title,
                description: value.description,
                slug: value.slug,
                user_id: decryptedUserId(),
                cat_id: cat_id,
                u_id: uid.id
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


    }

    console.log(cat_id, "new")


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue , "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
        }
    };

    useEffect(() => {
        // If you have received the ID from the API, find the option that matches the ID
        if (uid.cat_id) {
            console.log(cat , "111")
          const selected = cat.find(option => option.id === uid.cat_id);
          console.log(selected, "dadad")
          setSelectedOption(selected);
        }
      }, [uid, cat]);

    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add SubCategory</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Category</label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={cat}
                                                value={selectedOption}  
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(event, value) => HandleChange(value)}
                                                name="category"

                                            />
                                              {error.category && <span className='text-danger'>{error.category}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                              {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">SubCategory Slug<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.slug} name='slug' onChange={onhandleChange} placeholder="Enter.." />
                                              {error.slug && <span className='text-danger'>{error.slug}</span>}

                                        </div>


                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
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

export default SubCategory