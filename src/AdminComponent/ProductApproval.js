import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InnerHeader from "./InnerHeader";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import chair from '../assets/images/chair.jpg'


const ProductApproval = () => {
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

  const handleConfirmation = () => {
    
  }

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
      <InnerHeader/>
      <div class="main-panel">
        <div class="content-wrapper">
        <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Search By </h4>

                                        </div>
                                    </div>
                                    <form class="forms-sample" >
                                        <div className='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Product Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Product Name" name='title' />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Category</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Category" name='title' />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Sub Category</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Sub Category" name='title' />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Vendor</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Vendor" name='title' />
                                            </div>
                                            <div className="row" style={{border:"lightgrey solid 1px" , margin : "10px"}}>
                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Min</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="Order No" name='title' />
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="exampleInputUsername1">Max</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="Order No" name='title' />
                                            </div>
                                            </div>
                                            <div class="form-group col-lg-2" style={{margin : "10px"}}>
                                                <label for="exampleFormControlSelect1">Status</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"  name='state'>
                                                    <option selected>All</option>
                                                    <option value="1">Enable</option>
                                                    <option value="2">Disable</option>
                                                    <option value="3">Approved</option>
                                                    <option value="4">Pending</option>
                                                </select>
                                      
                                            </div>
                                            {/* <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Status</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1"  name='state'>
                                                    <option selected>All</option>
                                                    <option value="1">Paid</option>
                                                    <option value="2">Cod</option>
                                                </select>
                                      
                                            </div> */}


                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Search</button>
                                        <Link to="/webapp/adminuser"><button class="btn btn-light">Cancel</button></Link>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 class="card-title">Product Approval </h4>
                      <p class="card-description">List Of Products</p>
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
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Subcategory</th>
                          <th>Vendor Name</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            1
                          </td>
                          <td><img src={chair} alt="" /></td>
                          <td>Chair</td>
                          <td>Chair</td>
                          <td>Office Chair</td>
                          <td>Satyam</td>
                          <td>2000</td>
                        
                          <td>
                            {" "}
                            <FormControlLabel
                              control={<Android12Switch defaultChecked />}
                            />
                          </td>
                          <td>
                             <button className='btn btn-sm btn-danger' onClick={handleConfirmation}>Approve</button>
                           </td>
                          <td>
                            <Link>
                              <RemoveRedEyeIcon />
                            </Link>
                            {/* <Link>
                              <DeleteIcon  className="text-danger"/>
                            </Link> */}
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
  );
};

export default ProductApproval;
