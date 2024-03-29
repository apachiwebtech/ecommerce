import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import Cookies from "js-cookie";

const Gallery = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState()
    const [uid , setUpdateData] = useState([])
    const [gallery, setGallery] = useState([])
    const [value, setValue] = useState({
        title: "" || uid.title,
        image: '',


    })

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 14

    }
    
    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);
    
    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    useEffect(()=>{
    setValue({
        title : uid.title
    })
    },[uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.title) {
            isValid = false;
            newErrors.email = "Email is required";
        }
        if (!image) {
            isValid = false;
            newErrors.firstname = "FirstName is required"
        }




        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }



    async function getGalleryData() {
        axios.get(`${BASE_URL}/gallery_data`)
            .then((res) => {

                setGallery(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getGalleryData()
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

    const handleupdateId = (id) =>{
        const data = {
            gallery_id : id
        }
        axios.post(`${BASE_URL}/gallery_update_data`,data)
        .then((res)=>{
            console.log(res)
            setUpdateData(res.data[0])
        })
    }

    const handleDelete = (id) => {


        const data = {
            gallery_id: id
        }


        axios.post(`${BASE_URL}/gallery_delete`, data)
            .then((res) => {
                getGalleryData()
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


            const formdata = new FormData()

            formdata.append("title", value.title)
            formdata.append('image', image)
            formdata.append('u_id', uid.id)

            axios.post(`${BASE_URL}/add_gallery`, formdata)
                .then((res) => {
                    alert(res.data)
                    getGalleryData()
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


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

    };

    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
           {roleaccess > 1 && <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Image / Video</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="brand">Title</label>
                                            <input type="text" class="form-control" id="image" placeholder="Enter title" value={value.title} name='title' onChange={onhandleChange} />
                                            {errors.title && <div className="text-danger">{errors.title}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="image">Image / Video</label>
                                            <input type="file" class="form-control" id="image" placeholder="" name='image' onChange={handleUpload} />
                                            {errors.image && <div className="text-danger">{errors.image}</div>}
                                        </div>
                                        {roleaccess > 2 && <button type="submit" class="btn btn-primary mr-2">Submit</button>}
                                        {roleaccess > 2 && <button type='button' onClick={()=>{
                                            setValue({title : '' , image : ''})
                                        }} class="btn btn-light">Cancel</button>}
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

                                                    <th width="30%">
                                                        Action
                                                    </th>
                                                </tr>


                                            </thead>
                                            <tbody>

                                                {
                                                    gallery.map((item, index) => {
                                                        return (
                                                            <tr >
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {item.title}
                                                                </td>


                                                                <td>
                                                                    <Link><EditIcon  onClick={() =>handleupdateId(item.id)}/></Link>
                                                                    {roleaccess === 4 && <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />}

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
                                                    })
                                                }

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> }
        </div>

    )
}

export default Gallery;