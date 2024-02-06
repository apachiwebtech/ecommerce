import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';




const Testimonial = () => {

    const [cat, setCatData] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [value, setValue] = useState({
        title: "",
        description: "",
    })

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

    const handleSubmit = (e) => {
        e.preventDefault()



        const data = {
            title: value.title,
            description: value.description,
            user_id: localStorage.getItem("userid")
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


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (

        <div class="container-fluid page-body-wrapper">
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Testimonials</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control" id="name" placeholder="Name" name='name' onChange={onhandleChange} />
                                        </div>
                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" name='description' onChange={onhandleChange}></textarea>
                                        </div>
                                        <div class="form-group ">
                                            <label for="info">Information</label>
                                            <textarea class="form-control" id="info" rows="4" name='info' onChange={onhandleChange}></textarea>
                                        </div>

                                        <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                        <Link to="/webapp/adminuser"><button class="btn btn-sm btn-light">Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                           
                                            <p class="card-description">
                                                List Of Testimonials
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

export default Testimonial;