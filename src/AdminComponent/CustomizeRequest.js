import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

import noimg from '../assets/images/noimg.jpg'

const CustomizeRequest = () => {

    const [custom, setCustom] = useState([]);
    const [image, setImg] = useState([]);

    async function getcutomrequest() {
        axios
            .get(`${BASE_URL}/getcustomrequest`)
            .then((res) => {
                setCustom(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }



    useEffect(() => {
        getcutomrequest();
    }, []);



    const updateread = (id) => {

        const data = {
            tablename : "awt_productinquiry",
            product_id :id
        }
      
        axios
        .post(`${BASE_URL}/updateread`,data)
        .then((res) => {
          
        })
        .catch((err) => {
            console.log(err);
        });
    }




    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h4 class="card-title">Customization Request</h4>
                                            <p class="card-description">List Of Customization request</p>
                                        </div>
                                        <div>
                                            {/* <Link to="/webapp/product">
                        <button className=" btn btn-primary">Add Product</button>
                        <Button variant="outlined" size="medium"><AddCircleOutlineIcon  style={{fontSize : "16px"}}/> Add Product</Button>
                      </Link> */}
                                            {/* <Link to="/webapp/product" ><button className=' btn btn-primary'>Add Product</button></Link> */}
                                        </div>
                                    </div>

                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>Product Name</th>
                                                    <th>Customer Name</th>
                                                    <th>Email</th>
                                                    <th>Requested Date</th>

                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {custom.map((item, index) => {
                                                    const isoDateStr = item.created_date;

                                                    // Convert to Date object
                                                    const dateObj = new Date(isoDateStr);

                                                    // Extract year, month, and day
                                                    const year = dateObj.getUTCFullYear();
                                                    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                    const day = String(dateObj.getUTCDate()).padStart(2, '0');

                                                    // Format to desired date format (e.g., YYYY-MM-DD)
                                                    const formattedDate = `${year}-${month}-${day}`;

                                                    console.log(formattedDate);  // Outputs: 2024-06-03

                                                    return (
                                                        <tr>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                          
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                {item.email}
                                                            </td>
                                                            <td>
                                                                {formattedDate}
                                                            </td>
                                                            <td>
                                                                <Link >
                                                                    <RemoveRedEyeIcon type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                                                </Link>
                                                            </td>

                                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5 class="modal-title" id="exampleModalLabel">Add Message</h5>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            <div className='col-lg-4'>
                                                                                <div class="card-body">
                                                                                    <ul class="list-stats" style={{ paddingLeft: "0", width: "200px" }}>
                                                                                        <li class="">
                                                                                            <span class="lable">Product title:</span>
                                                                                            &nbsp;<span class="value"><b>{item.title}</b></span>
                                                                                        </li>
                                                                                        <li class="">
                                                                                            <span class="lable">Customer name:</span>
                                                                                            &nbsp;<span class="value"><b>{item.name}</b></span>
                                                                                        </li>
                                                                                        <li class="w-200 py-1">
                                                                                            <span class="lable">Email</span>
                                                                                            &nbsp; <span class="value"><b>{item.email}</b></span>
                                                                                        </li>
                                                                                        <li class="w-200 py-1">
                                                                                            <span class="lable">Mobile</span>
                                                                                            &nbsp; <span class="value"><b>{item.mobile}</b></span>
                                                                                        </li>
                                                                                        <li class="w-200 py-1">
                                                                                            <span class="lable">Customization</span>
                                                                                            &nbsp; <span class="value"><b>{item.inquiry_description}</b></span>
                                                                                        </li>

                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button onClick={() =>updateread(item.id)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                            {/* <button type="button" class="btn btn-success"  data-bs-dismiss="modal">Approve</button> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

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
    );
};

export default CustomizeRequest;
