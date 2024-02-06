import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';




const SocialMedia = () => {

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
                                    <h4 class="card-title">Add Links</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="facebook">FaceBook </label>
                                            <input type="text" class="form-control" id="facebook" placeholder="Enter Link" name='facebook' onChange={onhandleChange} />
                                        </div>
                                        <div class="form-group">
                                            <label for="linkedin">LinkedIn </label>
                                            <input type="text" class="form-control" id="linkedin" placeholder="Enter Link" name='linkedin' onChange={onhandleChange} />
                                        </div>
                                        <div class="form-group">
                                            <label for="insta">Instagram </label>
                                            <input type="text" class="form-control" id="insta" placeholder="Enter Link" name='insta' onChange={onhandleChange} />
                                        </div>
                                        <div class="form-group">
                                            <label for="twit">Twitter </label>
                                            <input type="text" class="form-control" id="twit" placeholder="Enter Link" name='twit' onChange={onhandleChange} />
                                        </div>
                                        

                                        <button type="submit" class="btn btn-sm btn-primary mr-2">Submit</button>
                                        <Link to="/webapp/adminuser"><button class="btn btn-sm btn-light">Cancel</button></Link>
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

export default SocialMedia;