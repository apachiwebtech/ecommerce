import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import img1 from "../assets/images/prof.png";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';

const View = () => {
  const [cat, setCatData] = useState([]);
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [value, setValue] = useState({
    title: "",
    description: "",
  });

  async function getcatData() {
    axios
      .get(`${BASE_URL}/category_data`)
      .then((res) => {
        console.log(res.data);
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getcatData();
  }, []);

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
      cat_id: id,
    };

    axios
      .post(`${BASE_URL}/category_delete`, data)
      .then((res) => {
        getcatData();
      })
      .catch((err) => {
        console.log(err);
      });

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: value.title,
      description: value.description,
      user_id: localStorage.getItem("userid"),
    };

    axios
      .post(`${BASE_URL}/add_category`, data)
      .then((res) => {
        alert(res.data);
        getcatData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <header class="main-header">
          <div class="container-fluid">
            <div class="main-header-inner">
              <div class="page-title">
                <h1>Subscription order #O9072076874</h1>
              </div>
              <div class="main-header-toolbar">
                <div class="header-action">
                  <div class="header-action__item">
                    <Link class="link"><DesktopWindowsRoundedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><SearchRoundedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><StorefrontOutlinedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><NotificationsActiveTwoToneIcon style={{ fontSize: "17px" }} /></Link>
                  </div>

                  <div class="header-action__item header-acc">
                    <span class="header-account__img"><Link class="link"><img src={img1} alt="" /></Link></span>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="content-wrapper">

          <div class="breadcrumb-wrap">
            <ul class="breadcrumb ">
              <li class="breadcrumb-item">
                <a href="/admin">Home </a>
              </li>
              <li class="breadcrumb-item">
                <a href="/admin/subscription-orders">Subscription Orders </a>
              </li>
              <li class="breadcrumb-item">O9072076874 </li>
            </ul>
          </div>

          <div class="row">
            <div class="col-lg-9 grid-margin stretch-card">
              <div>
                <div class="card" style={{ height: "min-content" }}>
                  <div class="card-head">
                    <div class="card-head-label">
                      <h3
                        class="card-head-title"
                        style={{ fontSize: "1.1rem" }}
                      >
                        <Link>
                          <ArrowCircleLeftSharpIcon class="arrow" />
                        </Link>
                        Order #O9072076874{" "}
                      </h3>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive pt-3">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Order Invoice ID</th>
                            <th>Status</th>
                            <th>Subscription Details</th>
                            <th>Subscription Period</th>
                            <th width="10%">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>-S0001</td>
                            <td>Expired</td>
                            <td>Basic Plan - $0.00For 2 Days</td>
                            <td>31/07/2023 - 02/08/2023</td>
                            <td>
                              <Link>
                                <RemoveRedEyeSharpIcon />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="card mt-3" style={{ height: "min-content" }}>
                  <div class="card-head">
                    <div class="card-head-label">
                      <h3 class="card-head-title">Order Payments </h3>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive pt-3">
                      <table class="table table-responsive table-bordered">
                        <thead>
                          <tr>
                            <th>Added On</th>
                            <th>Transaction ID</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                            <th>Response</th>
                            <th>Status</th>
                            <th width="10%">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>31/07/2023</td>
                            <td>W-1690796274</td>
                            <td>User Wallet</td>
                            <td>$0.00</td>
                            <td>
                              <Link>View</Link>
                            </td>
                            <td>Approved</td>
                            <td>
                              <Link>
                                <MessageSharpIcon />
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
            <div class="col-lg-3 grid-margin ">
              <div class="">
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
                          <span class="value">31/07/2023</span>
                        </li>
                        <li>
                          <span class="label">Cart Total</span>
                          <span class="value">
                            <span class="currency-value" dir="ltr">
                              <span class="currency-symbol">$</span>0.00
                            </span>{" "}
                          </span>
                        </li>
                        <li class="highlighted">
                          <span class="label">Net Amount</span>
                          <span class="value">
                            <span class="currency-value" dir="ltr">
                              <span class="currency-symbol">$</span>0.00
                            </span>{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="card mt-3" style={{ height: "250px" }}>
                  <div class="card-head">
                    <div class="card-head-label">
                      <h3
                        class="card-head-title"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Contact information
                      </h3>
                    </div>
                  </div>

                  <div class="card-body">
                    <ul class="list-stats" style={{ paddingLeft: "0" }}>
                      <li class="list-stats-item">
                        <span class="lable">Customer name:</span>
                        <span class="value">Marzia Hsu</span>
                      </li>
                      <li class="list-stats-item">
                        <span class="lable">Email:</span>
                        <span class="value">marziahsu@dummyid.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card mt-3" style={{ height: "250px" }}>
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
                      <li class="list-stats-item">
                        <span class="lable">Payment Status:</span>
                        <span class="value"><span class="badge badge-success">Paid</span></span>
                      </li>
                      <li class="list-stats-item">
                        <span class="lable">Payment mode:</span>
                        <span class="value">Wallet</span>
                      </li>
                    </ul>
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

export default View;