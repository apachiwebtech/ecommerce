import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&::before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        "&::after": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}));
const VendorMaster = () => {
    const [vendordata, setVendorData] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [hide, setHide] = useState(false)
    async function getVendordata() {
        axios.get(`${BASE_URL}/vendor_data`)
            .then((res) => {
                console.log(res.data)
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleConfirmation = (id) => {
        const userConfirmed = window.confirm('Are you sure you want to proceed?');

        if (userConfirmed) {
            // User clicked 'OK', proceed with the action
            console.log('Action confirmed!');

            const data = {
                vendor_id: id,
            }

            axios.post(`${BASE_URL}/vendor_approve`, data)
                .then((res) => {
                    console.log(res)
                    getVendordata()
                })

            setHide(true)
        } else {
            setHide(false)
            // User clicked 'Cancel', do something else or nothing
            console.log('Action canceled.');
        }
    };

    useEffect(() => {
        getVendordata()
    }, [])

    const handleClick = (id) => {
        setConfirmationVisibleMap((prev) => ({
            ...prev,
            [id]: true
        }))
    }

    const handleCancel = (id) => {
        setConfirmationVisibleMap((prev) => ({
            ...prev,
            [id]: false
        }))
    }

    const handleDelete = (id) => {
        const data = {
            vendor_id: id
        }

        axios.post(`${BASE_URL}/vendor_delete`, data)
            .then((res) => {
                console.log(res)
                getVendordata()
            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prev) => ({
            ...prev,
            [id]: false
        }))
    }


    const handlestatus = (e, id) => {
        const value = e.target.value

        const data = {
            vendor_id: id,
            status:value
        }

        axios.post(`${BASE_URL}/vendor_status`, data)
            .then((res) => {
                console.log(res)
                getVendordata()
            })

    }


    return (
        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Vendor </h4>
                                            <p class="card-description">
                                                List Of Vendor
                                            </p>
                                        </div>
                                        <div>
                                            <Link to="/webapp/vendorform/:id"><button className=' btn btn-primary'>Add Vendor</button></Link>
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
                                                        Vendor Name
                                                    </th>
                                                    <th>
                                                        Contact
                                                    </th>
                                                    <th>
                                                        Email
                                                    </th>
                                                    <th>
                                                        Address
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                {vendordata.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.vendor_name}
                                                            </td>
                                                            <td>
                                                                {item.mobile}
                                                            </td>
                                                            <td>
                                                                {item.emailid}
                                                            </td>
                                                            <td>
                                                                {item.address}
                                                            </td>
                                                            <td>
                                                                {item.address !== null && item.aggrement_upload !== "" && item.city !== null && item.emailid !== null && item.gst_upload !== "" && item.gstno !== null && item.mobile !== null && item.panupload !== "" && item.picode !== null && item.state !== null && item.username && item.vendor_name && item.vendor_pan ? <div>{item.approve == 0 ? <button className='btn btn-sm btn-danger' onClick={() => handleConfirmation(item.id)}>Approve</button> : <>{item.active == 1 ? <FormControlLabel
                                                                    control={<Android12Switch value="0" onChange={(e) => handlestatus(e, item.id)} defaultChecked />}
                                                                /> : <FormControlLabel
                                                                    control={<Android12Switch value="1" onChange={(e) => handlestatus(e, item.id)} />}
                                                                />} </>} </div> :
                                                                    <FormControlLabel
                                                                        control={<Android12Switch disabled />}
                                                                    />}
                                                            </td>
                                                            <td>
                                                                <Link to={`/webapp/vendorform/${item.id}`}><EditIcon /></Link>
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

export default VendorMaster