import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, IMG_URL } from "../AdminComponent/BaseUrl";
import InnerHeader from "./InnerHeader";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const View = () => {
  const [order, setOrder] = useState([])
  const [cart, setCart] = useState([])
  const [orderstatus, setOrderStatus] = useState()
  const { orderid } = useParams()


  const [value, setValue] = useState({
    tracking_no: "",
    courier_name: ""

  })


  const onTypeChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }



  async function getOrderDetails() {
    const data = {
      order_id: orderid
    }
    axios.post(`${BASE_URL}/order_view`, data)
      .then((res) => {
        setOrder(res.data[0])
        setValue({
          tracking_no: res.data[0].tracking_no,
          courier_name: res.data[0].courier_comp
        })
      })
  }

  async function getcartdata() {

    const data = {
      order_id: orderid
    }

    axios.post(`${BASE_URL}/getcartData`, data)
      .then((res) => {
        console.log(res)

        setCart(res.data)


      })
  }

  useEffect(() => {
    getcartdata()
    getOrderDetails()
  }, [])


  const timestamp = order.order_date;
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice();

  const formattedDate = `${day}-${month}-${year}`;


  const onhandleChange = (orderid) => {
    const data = {
      order_id: orderid,
      order_status: orderstatus
    }
    axios.post(`${BASE_URL}/order_status_update`, data)
      .then((res) => {
        alert("Status Changed")
        getOrderDetails()
      })
  }

  const handleChange = (e) => {
    setOrderStatus(e.target.value)

  }

  const handletracking = (e) => {
    e.preventDefault()

    const data = {
      tracking_no: value.tracking_no,
      courier_name: value.courier_name,
      order_id: orderid
    }

    axios.post(`${BASE_URL}/updatetrackingdetails`, data)
      .then((res) => {
        console.log(res.data)
        alert("Data Submitted")
      })
      .then((err) => {
        console.log(err)
      })


  }


  const totalcgst = cart.reduce((total, row) => total + Number(row.cgst), 0);
  const totalsgst = cart.reduce((total, row) => total + Number(row.sgst), 0);

  const totalgst = totalcgst + totalsgst;

  const finalamt = totalgst + Number(order.totalamt);



  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <div class="main-panel">
        <InnerHeader />

        <div class="content-wrapper">


          <div class="row">

            <div className="col-lg-4">
              <div class="card " style={{ height: "250px" }}>
                <div class="card-head">
                  <div class="card-head-label">
                    <h3
                      class="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <CallOutlinedIcon /> Contact information
                    </h3>
                  </div>
                </div>

                <div class="card-body">
                  <ul class="list-stats" style={{ paddingLeft: "0", width: "200px" }}>
                    <li class="">
                      <span class="lable">Customer name:</span>
                      &nbsp;<span class="value"><b>{order.sfirstname} {order.slastname}</b></span>
                    </li>
                    <li class="w-200 py-1">
                      <span class="lable">Address:</span>
                      &nbsp; <span class="value"><b>{order.shipaddress},{order.shipcity}-{order.shippostcode}</b></span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Mobile:</span>
                      &nbsp; <span class="value"><b>93264789</b></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div class="card " style={{ height: "250px" }}>
                <div class="card-head">
                  <div class="card-head-label">
                    <h3
                      class="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <DescriptionOutlinedIcon />  Order Details
                    </h3>
                  </div>
                </div>

                <div class="card-body">
                  <ul class="list-stats" style={{ paddingLeft: "0" }}>
                    <li class="py-1">
                      <span class="lable">Order No:</span>
                      &nbsp;<span class="value"><b>{order.orderno}</b></span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Order Date:</span>
                      &nbsp; <span class="value"><b>{formattedDate}</b></span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Order Amt:</span>
                      &nbsp; <span class="value"><b>₹{order.totalamt}</b></span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Order Status:</span>
                      &nbsp; <span class="value"><b>93264789</b></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">


              <div class="card " style={{ height: "250px" }}>
                <div class="card-head" style={{ padding: "20px 0.5625rem" }}>
                  <div class="card-head-label">
                    <h3
                      class="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <CreditCardRoundedIcon /> Payment Information
                    </h3>
                  </div>
                </div>

                <div class="card-body">
                  <ul class="list-stats" style={{ paddingLeft: "0" }}>
                    <li class="py-1">
                      <span class="lable">Payment Status:</span>
                      &nbsp;
                      <span class="value">
                        <span class="badge badge-success">
                          {!order.pstatus ? "Unpaid" : "Paid"}
                        </span>
                      </span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Payment mode:</span>
                      &nbsp;<span class="value"><b>{order.paymode}</b></span>
                    </li>
                    <li class="py-1">
                      <span class="lable">Transaction Id:</span>
                      &nbsp;<span class="value"><b>Wallet</b></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>


          <div class="row mt-4">


            <div class="col-lg-9">
              <form onSubmit={handletracking} className="row align-items-center">

                <div className="form-group col-lg-5">
                  <label htmlFor="courier_name">
                    Courier Name<span className="text-danger">*</span>

                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={value.courier_name}
                    onChange={onTypeChange}
                    name="courier_name"
                    placeholder="Enter courier name"
                  />
                </div>
                <div className="form-group col-lg-5">
                  <label htmlFor="tracking_no">
                    Tracking No<span className="text-danger">*</span>

                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={value.tracking_no}
                    onChange={onTypeChange}
                    name="tracking_no"
                    placeholder="Enter tracking number"
                  />
                </div>
                <div className="col-lg-2 mt-1">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>

              </form>
              <div>
                <div class="card" style={{ height: "min-content" }}>
                  <div class="card-head">
                    <div class="card-head-label">
                      <h3
                        class="card-head-title"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {/* <Link to='/webapp/orders'>
                          <ArrowCircleLeftSharpIcon class="arrow" />
                        </Link> */}
                        #Order No : {order.orderno}{" "}
                      </h3>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive pt-3">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th className='text-center' >Sr.No</th>
                            <th className='text-center' >Product Image</th>
                            <th className='text-center' >Product Name</th>
                            <th className='text-center' >Price</th>
                            <th className='text-center' >Size</th>
                            <th className='text-center' >Quantity</th>
                            <th className='text-center' >Total</th>
                          </tr>

                        </thead>
                        <tbody>
                          {cart.map((item, index) => {
                            const ptotal = item.price * item.pqty
                            return (
                              <tr>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>  <img style={{ width: "100px", height: "100px" }} src={`${IMG_URL}/productimg/` + item.image1} className="" alt="" /> </td>
                                <td className='text-center'>{item.pname}</td>
                                <td className='text-center'>₹{item.price}</td>
                                <td className='text-center'>xs</td>
                                <td className='text-center'>{item.pqty}</td>
                                <td className='text-center'>Rs .{ptotal}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <button className="btn btn-info">Print Invoice</button>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-3">

              <div class="card" style={{ height: "300px" }}>
                <div class="card-head">
                  <div class="card-head-label">
                    <h3
                      class="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <InsertDriveFileOutlinedIcon /> Order Summary{" "}
                    </h3>
                  </div>
                </div>

                <div class="card-body">
                  <div class="cart-summary">
                    <ul style={{ paddingLeft: "0" }}>
                      <li>
                        <span class="label">Added On</span>
                        <span class="value">{formattedDate}</span>
                      </li>
                      <li>
                        <span class="label">Cart Total</span>
                        <span class="value">
                          <span class="currency-value" dir="ltr">
                            <span class="currency-symbol">₹{order.totalamt}</span>
                          </span>{" "}
                        </span>
                      </li>
                      <li>
                        <span class="label">Cgst</span>
                        <span class="value">
                          <span class="currency-value" dir="ltr">
                            <span class="currency-symbol">₹{totalcgst}</span>
                          </span>{" "}
                        </span>
                      </li>
                      <li>
                        <span class="label">Sgst</span>
                        <span class="value">
                          <span class="currency-value" dir="ltr">
                            <span class="currency-symbol">₹{totalsgst}</span>
                          </span>{" "}
                        </span>
                      </li>
                      <li class="highlighted">
                        <span class="label">Net Amount</span>
                        <span class="value">
                          <span class="currency-value" dir="ltr">
                            <span class="currency-symbol">₹{finalamt}</span>
                          </span>{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="card mt-4" style={{ height: "300px" }}>
                <div class="card-head">
                  <div class="card-head-label">
                    <h3
                      class="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <InsertDriveFileOutlinedIcon /> Order Status{" "}
                    </h3>
                  </div>
                </div>

                <div class="card-body">

                  <label>Select Order Status</label>

                  <select class="form-select mb-3 w-100" style={{ height: "40px", borderColor: "lightgrey" }} onChange={(e) => handleChange(e)} value={order.ostatus} aria-label=".form-select-lg example">

                    <option value="pending">Pending</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button className="btn btn-primary w-100" onClick={() => onhandleChange(order.id)}>Update</button>


                </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default View;