import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './BaseUrl'

const VendorMaster = () => {
    const [vendordata, setVendorData] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

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

    useEffect(() => {
        getVendordata()
    }, [])

    const handleClick = (id) =>{
        setConfirmationVisibleMap((prev)=>({
            ...prev,
            [id] : true
        }))
    }

    const handleCancel = (id) =>{
        setConfirmationVisibleMap((prev)=>({
            ...prev,
            [id] :false
        }))
    }

    const handleDelete = (id) => {
        const data = {
            vendor_id: id
        }

        axios.post(`${BASE_URL}/vendor_delete`,data)
            .then((res) => {
                console.log(res)
                getVendordata()
            })
            .catch((err) => {
                console.log(err)
            })

            setConfirmationVisibleMap((prev)=>({
                ...prev,
                [id]:false
            }))
    }


    return (
        <div class="container-fluid page-body-wrapper">
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
                                            <Link to="/webapp/vendorform"><button className=' btn btn-primary'>Add Vendor</button></Link>
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
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                {vendordata.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {item.id}
                                                            </td>
                                                            <td>
                                                                {item.username}
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

export default VendorMaster