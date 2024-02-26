import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid } from "@mui/x-data-grid";


const Banner = () => {


    const [errors, setErrors] = useState({})
    const [image, setImage] = useState()
    const [uid, setupdateDate] = useState([])
    const [banner, setBanner] = useState([])
    const [value, setValue] = useState({
        title: "" || uid.title,
        banner: "" || uid.banner,
        target: "" || uid.target,
        link: "" || uid.link,
        view:"" || uid.view

    })



    useEffect(() => {
        setValue({
            title:  uid.title,
            banner:  uid.banner,
            target:  uid.target,
            link:  uid.link,
            view: uid.view
           
        })
    },[uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.title) {
            isValid = false;
            newErrors.title = "Title is required";
        }
        if (!image) {
            isValid = false;
            newErrors.banner = "Banner is required"
        }
        if (!value.link) {
            isValid = false;
            newErrors.link = "Link is required"
        }
        if (!value.target) {
            isValid = false;
            newErrors.target = "Target is required"
        }
        if (!value.target) {
            isValid = false;
            newErrors.target = "Target is required"
        }
        if (!value.view) {
            isValid = false;
            newErrors.view = "View is required"
        }



        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);

        return isValid;


    }



    async function bannerdata() {
        axios.get(`${BASE_URL}/banner_data`)
            .then((res) => {
                console.log(res)
                setBanner(res.data)
            })
    }



    const handleUpdate = (id) => {

        const data = {
            bannerid: id
        }
        axios.post(`${BASE_URL}/banner_updateid`, data)
            .then((res) => {
                console.log(res)
                setupdateDate(res.data[0])
            })


    }






    useEffect(() => {
        bannerdata()
    }, [])













    const handleSubmit = (e, viewid) => {
        e.preventDefault()


        if (validateForm()) {

            const formdata = new FormData()
            formdata.append('title', value.title)
            formdata.append('image', image)
            formdata.append('link', value.link)
            formdata.append('target', value.target)
            formdata.append('viewid', value.view)
            formdata.append('uid', uid.id)



            axios.post(`${BASE_URL}/add_banner`, formdata)
                .then((res) => {
                    alert("Data Submitted Successfully")
                    bannerdata()
                    if (res.data) {
                        //    navigate('/vendormaster')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        }

    }


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

    };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    var viewid = String(value.view);
    
    const columns = [
        {
            field: 'index',
            headerName: '#',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'title', headerName: 'Title', flex: 2 },
        { field: 'target', headerName: 'Target', type: 'number', flex: 2 },
        { field: 'view', headerName: 'View', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                       <EditIcon onClick={() => handleUpdate(params.row.id)} />
                    </>
                )
            }
        },
    ];

    const rowsWithIds = banner.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div className="container-fluid page-body-wrapper">
            <InnerHeader />
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">


                                    <form onSubmit={(e) => handleSubmit(e, 1)}>
                                        <h4 className="card-title">Banner For Desktop</h4>
                                        <div className="form-group">
                                            <label htmlFor="title">Title<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id="title" placeholder="Title" name='title' value={value.title} onChange={onhandleChange} />
                                            {errors.title && <div className="text-danger">{errors.title}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ban_img">Banner Image<span className='text-danger'>*</span></label>
                                            <input type="file" className="form-control" id="ban_img" placeholder="" name='banner' onChange={handleUpload} />
                                            {errors.banner && <div className="text-danger">{errors.banner}</div>}
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="exampleFormControlSelect1">Target<span className='text-danger'>*</span></label>
                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='target' value={value.target} onChange={onhandleChange}>
                                                <option >Select</option>
                                                <option value="_blank">blank</option>
                                                <option value="_self">same</option>
                                            </select>
                                            {errors.target && <div className="text-danger">{errors.target}</div>}

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="link1">Link<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id="link1" placeholder="Link" value={value.link} name='link' onChange={onhandleChange} />
                                            {errors.link && <div className="text-danger">{errors.link}</div>}
                                        </div>
                                        <div className="form-group">
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="view"
                                                onChange={onhandleChange}
                                                value={viewid}
                                                defaultValue={viewid}
                                                >
                                                <FormControlLabel value="1" control={<Radio />} label="Mobile View" />
                                                <FormControlLabel value="2" control={<Radio />} label="Desktop View" />

                                            </RadioGroup>
                                                {errors.view && <div className="text-danger">{errors.view}</div>}

                                        </div>
                                        <button type="submit" className="btn btn-sm btn-primary mr-2">Submit</button>
                                        {/* <Link to="/webapp/banner"><button className="btn btn-sm btn-light">Cancel</button></Link> */}
                                    </form>
                                </div>



                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 className="card-title"> List Of Gallery </h4>

                                        </div>

                                    </div>

                                    <DataGrid
                                            rows= {rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                        />

                                    {/* <div className="table-responsive pt-3">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Title
                                                    </th>
                                                    <th>
                                                        Target
                                                    </th>
                                                    <th>
                                                        View
                                                    </th>

                                                    <th width="17%">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {banner.map((item, index) => {
                                                    return (
                                                        <tr  key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>
                                                                {item.target}
                                                            </td>
                                                            <td>
                                                                {item.view}
                                                            </td>

                                                            <td>
                                                               <Link><EditIcon onClick={() => handleUpdate(item.id)} /></Link> 
                                                                <Link style={{ color: "red" }}><DeleteIcon /></Link>
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button>
                                                            </td>

                                                        </tr>
                                                    )

                                                })}





                                            </tbody>
                                        </table>

                                    </div> */}
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