import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import img1 from "../assets/images/product_default_image.jpg";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Product = () => {
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
        <div class="content-wrapper">
          <h4 class="card-title">Add Product</h4>
          <div class="row">
            <div class="col-lg-3 grid-margin stretch-card">
              <div class="sticky-top">
              <div class="card" style={{ height: "600px" }}>
                <div class="card-body list">
                  <ul class="prod_list">
                    <li class="prod_li">
                      <a href="#basic_info" class="prod_flex"> 
                        <div style={{ marginRight: "8px" }}>
                          <DescriptionOutlinedIcon />
                        </div>
                        <div>
                          <h5>Basic Details</h5>
                          <span class="weight para">
                            Manage the product's basic information.
                          </span>
                        </div>
                      </a>
                    </li>
                    <hr></hr>
                    <li class="prod_li">
                      <a href="#varients" class="prod_flex">
                        <div style={{ marginRight: "8px" }}>
                          <MenuIcon />
                        </div>
                        <div>
                          <h5>Variants & options</h5>
                          <span class="weight para">
                            Customize the product variants, including size,
                            color, etc.
                          </span>
                        </div>
                      </a>
                    </li>
                    <hr></hr>
                    <li class="prod_li">
                      <a href="#media" class="prod_flex">
                        <div style={{ marginRight: "8px" }}>
                          <PermMediaIcon />
                        </div>
                        <div>
                          <h5>Media</h5>
                          <span class="weight para">
                            {" "}
                            Manage your product's image gallery.{" "}
                          </span>
                        </div>
                      </a>
                    </li>
                    <hr></hr>
                    <li class="prod_li">
                      <a href="#specification" class="prod_flex">
                        <div style={{ marginRight: "8px" }}>
                          <DescriptionOutlinedIcon />
                        </div>
                        <div>
                          <h5>Specifications</h5>
                          <span class="weight para">
                            Manage the product-related specifications.
                          </span>
                        </div>
                      </a>
                    </li>
                    <hr></hr>
                    <li class="prod_li">
                      <a href="#tax" class="prod_flex">
                        <div style={{ marginRight: "8px" }}>
                          <LocalShippingIcon />
                        </div>
                        <div>
                          <h5>Tax and shipping</h5>
                          <span class="weight para">
                            Set up the tax and shipping information of the
                            product.
                          </span>
                        </div>
                      </a>
                    </li>
                    <hr></hr>
                  </ul>
                </div>
              </div>
              </div>
            </div>

            <div
              class="col-lg-6 grid-margin stretch-card"
              style={{ display: "block" }}
            >
              <div>
                <h3>Add Product</h3>
                <p class="para">Fields with (*) are mandatory</p>
              </div>
              <div class="card" id="basic_info">
                <div
                  class="card-head"
                  style={{ borderBottom: "1px solid gray", padding: "15px" }}
                >
                  <h5
                    style={{
                      color: "#000000DE",
                      fontSize: "20px",
                      margin: "0",
                    }}
                  >
                    Basic Information
                  </h5>
                  <p class="para">Manage the product's basic information.</p>
                </div>
                <div class="card-body" style={{ padding: "20px 10px" }}>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6" style={{ padding: "0 10px" }}>
                          <div class="form-group">
                            <label class="label">
                              Product type<span class="">*</span>
                            </label>
                            <ul class="list-radio">
                              <li>
                                <label class="radio">
                                  <input
                                    type="radio"
                                    class="form-control"
                                    id="physical"
                                    placeholder="Product Id"
                                    name="physical"
                                    value="1"
                                  />
                                  <i class="input-helper"></i>Physical
                                </label>
                              </li>
                              <li>
                                <label class="radio">
                                  <input
                                    type="radio"
                                    class="form-control"
                                    id="physical"
                                    placeholder="Product Id"
                                    name="physical"
                                    value="2"
                                  />
                                  <i class="input-helper"></i>Digital
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="category">
                              User<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="category"
                              placeholder="Category"
                              name="category"
                            >
                              <option value="0">Select User</option>
                              <option value="1">user1</option>
                              <option value="2">user2</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group ">
                            <label for="prod_id">
                              Product identifier
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="prod_id"
                              placeholder="Product Id"
                              name="prod_id"
                            />
                            <p class="para" style={{ fontSize: "12px" }}>
                              Enter a unique identifier associated with the
                              product name.{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="category">
                              Brand<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="brand"
                              placeholder="Brand"
                              name="brand"
                            >
                              <option value="0">Select Brand</option>
                              <option value="1">Brand1</option>
                              <option value="2">Brand2</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="category">
                              Category<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="category"
                              placeholder="Category"
                              name="category"
                            >
                              <option value="0">Select Category</option>
                              <option value="1">Category1</option>
                              <option value="2">Category2</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="prod_id">
                              Model#<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="model"
                              placeholder="Model"
                              name="model"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="name">
                              Min Selling Price{" "}
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="min_sell"
                              placeholder="Enter.."
                              name="min_sell"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="slug">Product Warranty </label>
                            <input
                              type="text"
                              class="form-control"
                              id="warranty"
                              placeholder="Enter.."
                              name="warranty"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="slug">YouTube video URL </label>
                            <input
                              type="text"
                              class="form-control"
                              id="youtub"
                              placeholder="Enter.."
                              name="youtub"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group ">
                            <label for="description">Description</label>
                            <textarea
                              class="form-control"
                              id="description"
                              rows="4"
                              name="description"
                              onChange={onhandleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card mt-3" id="varients">
                <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                  <h5
                    style={{
                      color: "#000000DE",
                      fontSize: "20px",
                      margin: "0",
                    }}
                  >
                    Variants & options
                  </h5>
                  <p class="para">
                    Customize the product variants, including size, color, etc.
                  </p>
                </div>
                <div class="card-body" style={{ padding: "20px 10px" }}>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="table-responsive table-scrollable js-scrollable scroll-hint">
                          <table class="table table-variants">
                            <thead>
                              <tr>
                                <th width="40%">Options</th>
                                <th width="40%">Option values</th>
                                <th class="align-right" width="20%"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    class="col-md-12"
                                    style={{ padding: "0" }}
                                  >
                                    <div class="form-group ">
                                      <select
                                        type="text"
                                        class="form-control"
                                        id="option"
                                        placeholder="Select Option"
                                        name="option"
                                      >
                                        <option value="0">Select Option</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                      </select>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div
                                    class="col-md-12"
                                    style={{ padding: "0" }}
                                  >
                                    <div class="form-group ">
                                      <input
                                        type="search"
                                        class="form-control"
                                        id="search"
                                        placeholder="Type to search"
                                        name="search"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <hr></hr>
                      </div>

                      <div class="row">
                        <div class="col-md-7">
                          <p>
                            Product has the same EAN/UPC code for all variants
                          </p>
                        </div>
                        <div class="col-md-5">
                          <ul class="list-radio">
                            <li>
                              <label class="radio">
                                <input
                                  type="radio"
                                  class="form-control"
                                  id="yes"
                                  name="yes"
                                  value="1"
                                />
                                <i class="input-helper"></i>Yes
                              </label>
                            </li>
                            <li>
                              <label class="radio">
                                <input
                                  type="radio"
                                  class="form-control"
                                  id="no"
                                  name="no"
                                  value="2"
                                />
                                <i class="input-helper"></i>No
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div class="table-responsive table-scrollable js-scrollable scroll-hint">
                          <table class="table table-variants">
                            <thead>
                              <tr>
                                <th width="40%">Variants</th>
                                <th width="60%">EAN/UPC/GTIN Code</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <p>All variants</p>
                                </td>
                                <td>
                                  <div
                                    class="col-md-12"
                                    style={{ padding: "0" }}
                                  >
                                    <div class="form-group ">
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="varient"
                                        name="varient"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    <div class="row" style={{ justifyContent: "end" }}>
                      <div style={{ padding: "20px" }}>
                        <Link to="#">
                          <Button variant="outlined" size="small">
                            <AddCircleOutlineIcon
                              style={{ fontSize: "16px" }}
                            />{" "}
                            Add Product Option
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                      <ul
                        class="uploaded-stocks ui-sortable"
                        id="productDefaultImagesJs"
                      >
                        <li class="browse unsortableJs">
                          <button
                            type="button"
                            class="browse-button"
                            onclick="$('#hiddenMediaFrmFileJs').click();"
                          >
                            <strong> Upload images(s)</strong>
                            <span class="text-muted form-text">
                              Png,jpeg accepted
                            </span>
                          </button>
                        </li>
                        <li class="unsortableJs">
                          <div class="uploaded-stocks-item" data-ratio="1:1">
                            <img
                              class="uploaded-stocks-img"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              src={img1}
                              title=""
                              alt=""
                              data-bs-original-title=""
                            ></img>
                            <div class="uploaded-stocks-actions"></div>
                          </div>
                        </li>
                        <li class="unsortableJs">
                          <div class="uploaded-stocks-item" data-ratio="1:1">
                            <img
                              class="uploaded-stocks-img"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              src={img1}
                              title=""
                              alt=""
                              data-bs-original-title=""
                            ></img>
                            <div class="uploaded-stocks-actions"></div>
                          </div>
                        </li>
                        <li class="unsortableJs">
                          <div class="uploaded-stocks-item" data-ratio="1:1">
                            <img
                              class="uploaded-stocks-img"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              src={img1}
                              title=""
                              alt=""
                              data-bs-original-title=""
                            ></img>
                            <div class="uploaded-stocks-actions"></div>
                          </div>
                        </li>
                        <li class="unsortableJs">
                          <div class="uploaded-stocks-item" data-ratio="1:1">
                            <img
                              class="uploaded-stocks-img"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              src={img1}
                              title=""
                              alt=""
                              data-bs-original-title=""
                            ></img>
                            <div class="uploaded-stocks-actions"></div>
                          </div>
                        </li>
                      </ul>
                      <p class="para">Preferred Dimensions 1500 x 1500</p>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card mt-3" id="specification">
                <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                  <h5
                    style={{
                      color: "#000000DE",
                      fontSize: "20px",
                      margin: "0",
                    }}
                  >
                    Specifications
                  </h5>
                  <p class="para">Manage the product-related specifications.</p>
                </div>
                <div class="card-body" style={{ padding: "20px 10px" }}>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="name">
                              Name<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              placeholder="Enter.."
                              name="name"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="value">
                              Value
                              <span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="value"
                              placeholder="Enter.."
                              name="value"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="value">Group </label>
                            <input
                              type="text"
                              class="form-control"
                              id="value"
                              placeholder="Enter.."
                              name="value"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="value"> </label>
                            <Button
                              variant="contained"
                              style={{
                                marginTop: "35px",
                                marginRight: "15px",
                                borderRadius: "0",
                              }}
                            >
                              Add
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginTop: "35px", borderRadius: "0" }}
                            >
                              Clear
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card mt-3" id="tax">
                <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                  <h5
                    style={{
                      color: "#000000DE",
                      fontSize: "20px",
                      margin: "0",
                    }}
                  >
                    Tax and shipping
                  </h5>
                  <p class="para">
                    Set up the tax and shipping information of the product.
                  </p>
                </div>
                <div class="card-body" style={{ padding: "20px 10px" }}>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group ">
                            <label for="category">
                              Tax Category<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="tx_category"
                              placeholder=""
                              name="tx_category"
                            >
                              <option value="0">Select Category</option>
                              <option value="1">cat 1</option>
                              <option value="2">cat 2</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="method">
                              Fulfillment method
                              <span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="method"
                              placeholder=""
                              name="method"
                            >
                              <option value="0">Select Method</option>
                              <option value="1">method 1</option>
                              <option value="2">method 2</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="ship">
                              Shipping package<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="ship"
                              placeholder=""
                              name="ship"
                            >
                              <option value="0">Select Package</option>
                              <option value="1">Package 1</option>
                              <option value="2">Package 2</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="weight">
                              Weight<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="weight"
                              placeholder=""
                              name="weight"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="wt_unit">
                              Weight Unit<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="wt_unit"
                              placeholder=""
                              name="wt_unit"
                            >
                              <option value="0">Select Unit</option>
                              <option value="1">Gram</option>
                              <option value="2">KiloGram</option>
                              <option value="3">Pound</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="country">
                              Country Of Origine
                              <span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="country"
                              placeholder=""
                              name="country"
                            >
                              <option value="0">Select Country</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group ">
                            <label for="ship_prpfile">
                              Shipping Profile<span class="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              class="form-control"
                              id="ship_prpfile"
                              placeholder=""
                              name="ship_prpfile"
                            >
                              <option value="0">Select </option>
                              <option value="1">Order Level Shipping</option>
                              <option value="2">Item Level Shipping</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-3 grid-margin stretch-card">
              <div class="">
                <div class="card" style={{ height: "300px" }}>
                  <div
                    class="card-body "
                    style={{ padding: "1.4rem 0.875rem" }}
                  >
                    <button
                      type="submit"
                      class="btn btn-brand btn-block submitBtnJs"
                      style={{ borderRadius: "0" }}
                    >
                      Save
                    </button>
                    <div class="mt-3">
                      <div class="form-group">
                        <div class="setting-block">
                          <div>
                            <label
                              htmlFor=""
                              class="switch switch-sm switch-icon"
                            >
                              Activate it
                            </label>
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Android12Switch defaultChecked />}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-group">
                        <div class="setting-block">
                          <label
                            htmlFor=""
                            class="switch switch-sm switch-icon"
                          >
                            Approval status
                          </label>
                          <FormControlLabel
                            control={<Android12Switch defaultChecked />}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-group">
                        <div class="setting-block">
                          <label
                            htmlFor=""
                            class="switch switch-sm switch-icon"
                          >
                            Update other languages data
                          </label>
                          <FormControlLabel
                            control={<Android12Switch defaultChecked />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mt-3" style={{ height: "300px" }}>
                  <div
                    class="card-body "
                    style={{ padding: "1.4rem 0.875rem" }}
                  >
                    <div class="">
                      <div class="form-group">
                        <div></div>
                        <div class="setting-block">
                          <div>
                            <label
                              htmlFor=""
                              class="switch switch-sm switch-icon"
                            >
                              Mark as featured
                            </label>
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Android12Switch defaultChecked />}
                            />
                          </div>
                        </div>
                        <p
                          class="para"
                          style={{ fontSize: "12px", lineHeight: "15px" }}
                        >
                          Mark this product as a featured product, and it will
                          be displayed under the featured product list on the
                          front end.
                        </p>
                      </div>
                    </div>
                    <div class="mt-3">
                      <div class="form-group">
                        <div class="setting-block">
                          <label
                            htmlFor=""
                            class="switch switch-sm switch-icon"
                          >
                            Available for cash on delivery (COD)
                          </label>
                          <FormControlLabel
                            control={<Android12Switch defaultChecked />}
                          />
                        </div>
                        <p
                          class="para"
                          style={{ fontSize: "12px", lineHeight: "15px" }}
                        >
                          Activate this if the product is available for COD.
                          This feature is only allowed if the fulfillment method
                          is Shipping.
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div class="card mt-3" style={{ height: "200px" }}>
                  <div
                    class="card-body "
                    style={{ padding: "1.4rem 0.875rem" }}
                  >
                    <h6>Tags</h6>
                    <p class="para" style={{ fontSize: "12px"}}>Categorize your store products and organize search results for customers.</p> <hr />

                     <div class="col-md-12">
                          <div class="form-group ">
                           
                            <input
                              type="text"
                              class="form-control"
                              id="tag"
                              placeholder="Enter.."
                              name="tag"
                            />
                          </div>
                        </div>
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

export default Product;
