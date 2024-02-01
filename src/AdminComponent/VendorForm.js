import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CustomHeder from './CustomHeder';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import md5 from 'js-md5'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const VendorForm = () => {
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState({
        email: "",
        mobile: "",
        // Add more fields as needed
    });

    const [value, setValue] = useState({
        email: "",
        mobile: "",
        username: "",
        password: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        personemail: "",
        personmobile: "",
        personname: "",
        gst: "",
        pancard: "",
        gstupload: "",
        panupload: "",
        agreementupload: "",
        account_name: "",
        account_no: "",
        ifsc_code: "",

    })

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Validate email
        if (!value.email) {
            isValid = false;
            newErrors.email = "email is required";
        }

        // Validate mobile number
        if (!value.mobile) {
            isValid = false;
            newErrors.mobile = "mobile number is required";
        }
        if (!value.username) {
            isValid = false;
            newErrors.username = "username is required";
        }
        if (!value.password) {
            isValid = false;
            newErrors.password = "password is required";
        }
        if (!value.address) {
            isValid = false;
            newErrors.address = "address is required";
        }
        if (!value.state) {
            isValid = false;
            newErrors.state = "state is required";
        }
        if (!value.city) {
            isValid = false;
            newErrors.city = "city is required";
        }
        if (!value.pincode) {
            isValid = false;
            newErrors.pincode = "pincode is required";
        }
        if (!value.personname) {
            isValid = false;
            newErrors.personname = "personname is required";
        }
        if (!value.personemail) {
            isValid = false;
            newErrors.personemail = "personemail is required";
        }
        if (!value.personmobile) {
            isValid = false;
            newErrors.personmobile = "personemail is required";
        }
        if (!value.gst) {
            isValid = false;
            newErrors.gst = "gst is required";
        }
        if (!value.pancard) {
            isValid = false;
            newErrors.pancard = "pancard is required";
        }
        if (!value.gstupload) {
            isValid = false;
            newErrors.gstupload = "gstupload is required";
        }
        if (!value.panupload) {
            isValid = false;
            newErrors.panupload = "panupload is required";
        }
        if (!value.agreementupload) {
            isValid = false;
            newErrors.agreementupload = "agreementupload is required";
        }
        if (!value.account_name) {
            isValid = false;
            newErrors.account_name = "account_name is required";
        }
        if (!value.account_no) {
            isValid = false;
            newErrors.account_no = "account_no is required";
        }
        if (!value.ifsc_code) {
            isValid = false;
            newErrors.ifsc_code = "ifsc_code is required";
        }

        // Add more validation for other fields as needed

        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        $('.file-upload-browse').on('click', function () {
            var file = $(this).parent().parent().parent().find('.file-upload-default');
            file.trigger('click');
        });
        $('.file-upload-default').on('change', function () {
            $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const hashpassword = md5(value.password)

            const data = {
                email: value.email,
                mobile: value.mobile,
                username: value.username,
                password: hashpassword,
                address: value.address,
                state: value.state,
                city: value.city,
                pincode: value.pincode,
                personemail: value.personemail,
                personmobile: value.personmobile,
                personname: value.personname,
                gst: value.gst,
                pancard: value.pancard,
                gstupload: value.gstupload,
                panupload: value.panupload,
                agreementupload: value.agreementupload,
                account_name: value.account_name,
                account_no: value.account_no,
                ifsc_code: value.ifsc_code,
            }

            axios.post(`${BASE_URL}/add_vendor`, data)
                .then((res) => {
                    alert(res.data)
                    console.log(res.data)
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
            <div class="main-panel">
                <div class="content-wrapper">
                    <CustomHeder />
                    <div class="row">
                        <div class="col-md-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Vendor</h4>
                                    <p class="card-description bg-light">
                                        Details
                                    </p>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Email</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" placeholder="Email" name="email" onChange={onhandleChange} />
                                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputEmail1">Mobile No</label>
                                                <input type="number" class="form-control" id="exampleInputEmail1" placeholder="Mobile No" name="mobile" onChange={onhandleChange} />
                                                {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputPassword1">Username</label>
                                                <input type="username" class="form-control" id="exampleInputPassword1" placeholder="Username" name="username" onChange={onhandleChange} />
                                                {errors.username && <div className="text-danger">{errors.username}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputConfirmPassword1">Password</label>
                                                <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password" name="password" onChange={onhandleChange} />
                                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                            </div>
                                            {/* <hr width="100%"></hr> */}
                                            <p class="card-description col-lg-12 bg-light">
                                                Additional Details
                                            </p>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Address</label>
                                                <textarea class="form-control" id="exampleTextarea1" rows="4" name='address' onChange={onhandleChange}></textarea>
                                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">state</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" onChange={onhandleChange} name='state'>
                                                    <option selected>Select state</option>
                                                    <option value="1">Maharashtra</option>
                                                    <option value="2">Goa</option>
                                                </select>
                                                {errors.state && <div className="text-danger">{errors.state}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="City" name='city' onChange={onhandleChange} />
                                                {errors.city && <div className="text-danger">{errors.city}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Pincode</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" placeholder="Pincode" name='pincode' onChange={onhandleChange} />
                                                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                                            </div>

                                            <p class="card-description col-lg-12 bg-light">
                                                Contact Person Details
                                            </p>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Name" name='personname' onChange={onhandleChange} />
                                                {errors.personname && <div className="text-danger">{errors.personname}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Email</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" placeholder="Email" name='personemail' onChange={onhandleChange} />
                                                {errors.personemail && <div className="text-danger">{errors.personemail}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Mobile</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" placeholder="Mobile" name='personmobile' onChange={onhandleChange} />
                                                {errors.personmobile && <div className="text-danger">{errors.personmobile}</div>}
                                            </div>
                                            <div className='col-lg-12 kyc-details py-3'>
                                                <p class="card-description col-lg-12 bg-light text-dark">
                                                    Kyc Details
                                                </p>
                                                <div className='row'>
                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Vendor GST</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Vendor GST" name='gst' onChange={onhandleChange} />
                                                        {errors.gst && <div className="text-danger">{errors.gst}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Vendor Pancard</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Vendor Pancard" name='pancard' onChange={onhandleChange} />
                                                        {errors.pancard && <div className="text-danger">{errors.pancard}</div>}
                                                    </div>


                                                </div>
                                                <p class="card-description col-lg-12 bg-light text-dark">
                                                    Upload Kyc
                                                </p>
                                                <div className='row'>

                                                    <div class="form-group col-lg-3">
                                                        <label>GST Certificate Upload</label>

                                                        <input type="file" class="form-control file-upload-info" name='gstupload' onChange={onhandleChange} />
                                                        {errors.gstupload && <div className="text-danger">{errors.gstupload}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label>Pancard Upload</label>

                                                        <input type="file" class="form-control file-upload-info" name='panupload' onChange={onhandleChange} />
                                                        {errors.panupload && <div className="text-danger">{errors.panupload}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label>Agreement Upload</label>

                                                        <input type="file" class="form-control file-upload-info" name='agreementupload' onChange={onhandleChange} />
                                                        {errors.agreementupload && <div className="text-danger">{errors.agreementupload}</div>}
                                                    </div>

                                                </div>
                                                <div class="">
                                                    <button className='btn btn-primary' onClick={handleClickOpen} type='button'> + Add Bank Info</button>
                                                </div>
                                            </div>
                                            <Dialog
                                                open={open}
                                                TransitionComponent={Transition}
                                                keepMounted
                                                onClose={handleClose}
                                                aria-describedby="alert-dialog-slide-description"

                                            >
                                                <DialogTitle>{"Add Bank Info"}</DialogTitle>
                                                <DialogContent style={{ width: "500px" }}>
                                                    <div className='row'>
                                                        <div class="form-group col-lg-12">
                                                            <label for="exampleInputUsername1">Account holder Name</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Name" name='account_name' onChange={onhandleChange} />
                                                            {errors.account_name && <div className="text-danger">{errors.account_name}</div>}
                                                        </div>
                                                        <div class="form-group col-lg-12">
                                                            <label for="exampleInputUsername1">Account Number</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Number" name='account_no' onChange={onhandleChange} />
                                                            {errors.account_no && <div className="text-danger">{errors.account_no}</div>}
                                                        </div>
                                                        <div class="form-group col-lg-12">
                                                            <label for="exampleInputUsername1">Ifsc Code</label>
                                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Code" name='ifsc_code' onChange={onhandleChange} />
                                                            {errors.ifsc_code && <div className="text-danger">{errors.ifsc_code}</div>}
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                                                    <Button onClick={handleClose}>Save</Button>
                                                </DialogActions>
                                            </Dialog>

                                        </div>
                                        <div className='mt-3 text-right'>
                                            <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button class="btn btn-light">Cancel</button>
                                        </div>

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

export default VendorForm




