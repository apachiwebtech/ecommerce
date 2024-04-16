import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/product_default_image.jpg";
import EditIcon from "@mui/icons-material/Edit";
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import { Autocomplete, TextField } from '@mui/material';

const AddProductImg = () => {
    const [value, setValue] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: ""
    })

    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [selectedOption, setSelectedOption] = useState(null);
    const [color_id, setId] = useState("")
    const [color, setColor] = useState([])


    async function getColorData() {
        axios.get(`${BASE_URL}/color_data`)
            .then((res) => {
                console.log(res.data)
                setColor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getColorData()
    }, [])





    async function ImageBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

        return data;
    }

    const handleupload1 = async (e) => {
        const file = e.target.files[0];
        setImage1(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image1: data,
            };
        });
    }

    const handleupload2 = async (e) => {
        const file = e.target.files[0];
        setImage2(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image2: data,
            };
        });
    }

    const handleupload3 = async (e) => {
        const file = e.target.files[0];
        setImage3(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image3: data,
            };
        });
    }

    const handleupload4 = async (e) => {
        const file = e.target.files[0];
        setImage4(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image4: data,
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata("image1", image1)
        formdata("image2", image2)
        formdata("image3", image3)
        formdata("image4", image4)
        formdata("color_id", color_id)

        axios.post(`${BASE_URL}/add_product_img`, formdata)
            .then((res) => {
                console.log(res)
            })

    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue, "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
        }
    };





    return (
        <div class="container-fluid page-body-wrapper position-relative" >
            <InnerHeader />

            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-6 grid-margin stretch-card">
                            <form onSubmit={handleSubmit} method='POST'>
                                <div class="card">
                                    <div class="card-body">

                                        <div class="card mt-3" id="media">
                                            <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                                                <h5
                                                    style={{
                                                        color: "#000000DE",
                                                        fontSize: "20px",
                                                        margin: "0",
                                                    }}
                                                >
                                                    Media
                                                </h5>
                                                <p class="para">Manage your product's image gallery.</p>
                                            </div>

                                            <div class="card-body" style={{ padding: "20px 10px" }}>




                                                <div className='row'>

                                                    <div class="form-group col-lg-6">
                                                        <label>Upload 1<span className='text-danger'>*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image1' onChange={handleupload1} />
                                                        {/* {errors.gstupload && <div className="text-danger"></div>} */}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>Upload 2<span className='text-danger'>*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image2' onChange={handleupload2} />
                                                        {/* {errors.panupload && <div className="text-danger">{errors.panupload}</div>} */}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>Upload 3<span className='text-danger text-underline' >*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image3' onChange={handleupload3} />
                                                        {/* {errors.agreementupload && <div className="text-danger">{errors.agreementupload}</div>} */}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>upload 4<span className='text-danger text-underline' >*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image4' onChange={handleupload4} />
                                                        {/* {errors.agreementupload && <div className="text-danger">{errors.agreementupload}</div>} */}
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Colour<span className='text-danger'>*</span></label>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={color}
                                                            // value={setSelectedOption}
                                                            size='small'
                                                            getOptionLabel={(option) => option.title}
                                                            getOptionSelected={(option, value) => option.id === value.id}
                                                            sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                            renderInput={(params) => <TextField  label="Select Colour" {...params} />}
                                                            onChange={(event, value) => HandleChange(value)}
                                                            name="color"

                                                        />
                                                        {/* {error.group && <span className='text-danger'>{error.group}</span>} */}
                                                    </div>

                                                </div>





                                                <div className='row'>
                                                    <div className="col-lg-12 my-3">
                                                        <button type='submit' className="btn btn btn-primary mr-2">Add</button>
                                                        <button type='button' onClick={() => {
                                                            window.location.reload()
                                                        }} class="btn btn-light">Cancel</button>
                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">List Of Images</h4>
                                    <div className='row'>
                                        <div className='col-lg-6 py-2' >
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image1 == "" ? img1 : value.image1}

                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6 py-2'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image2 == "" ? img1 : value.image2}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image3 == "" ? img1 : value.image3}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image4 == "" ? img1 : value.image4}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">List Of Images</h4>
                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th width="18%">Sr. No.</th>
                                                    <th width="60%">Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                <tr>
                                                    <td>1</td>
                                                    <td>1</td>
                                                    <td>
                                                        <Link>
                                                            <EditIcon />
                                                        </Link>
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

export default AddProductImg