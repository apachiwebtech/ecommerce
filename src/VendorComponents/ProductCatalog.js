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
import chair from '../assets/images/chair.jpg'
const ProductCatalog = () => {
  const [product, setProductData] = useState([]);
  const [toggleValues, setToggleValues] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({ id: "", status: "" });


  async function getcatData() {
    axios
      .get(`${BASE_URL}/product_data`)
      .then((res) => {
        console.log(res.data);
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    getcatData();
  }, []);




  const handleToggle = (productId) => {
    setToggleValues((prevValues) => {
      const updatedValues = { ...prevValues };
      if (productId in updatedValues) {
        updatedValues[productId] = updatedValues[productId] === 0 ? 1 : 0;
      } else {
        updatedValues[productId] = 1; // Assuming initial value is 1 if not present
      }
      return updatedValues;
    });
  };
  const toggleProductStatus = (productId, status) => {
    const newStatus = status ? 0 : 1; // Toggle between 0 and 1
    setSelectedProduct({ id: productId, status: newStatus });    // Send the updated status to the server if needed
    // await axios.put(`${BASE_URL}/product/${productId}/status`, { status: status });

    updateStatus({ id: productId, status: newStatus })

  };
const updateStatus = async (productData)=>{
  const response = await fetch(`${BASE_URL}/vendor/updateStataus`, {
    method : "POST",
    body :JSON.stringify({
      id : productData.id,
      status : productData.status,
    }),
    headers : {
      'Content-Type' : 'application/json'
    }
  })

  const data = await response.json();

  console.log(data);
}
console.log(selectedProduct)

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
  const handlestatus = (e,id,column) => {
    const value = e.target.value

    const data = {
        product_id: id,
        status: value,
        column:column
    }

    axios.post(`${BASE_URL}/vendor/product_status`, data)
        .then((res) => {
            console.log(res)
            // setProductData()
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
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 class="card-title">Products </h4>
                      <p class="card-description">List Of Products</p>
                    </div>
                    <div>

                      {/* <Link to="/vendor/product/:update_id" ><button className=' btn btn-primary'>Add Product</button></Link> */}
                      <Link to="/vendor/addProduct" ><button className=' btn btn-primary'>Add Product</button></Link>
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
                          <th>Images</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {product.map((item, index) => {
                          return (
                            <tr>

                              <td>
                                {index + 1}
                              </td>
                              <td><img src={chair} alt="" /></td>
                              <td>{item.title}</td>
                              <td>{item.category}</td>
                              <td>{item.subcategory}</td>
                              <td>{item.vendor}</td>
                              <td>{item.price}</td>
                              <td><Link to={`/webapp/addimages/${item.id}`}><Button
                                color="primary"
                                disabled={false}
                                size="medium"
                                variant="outlined"
                              >Add</Button></Link></td>
                              <td>
                                {/* {" "}
                                <FormControlLabel
                                  control={<Android12Switch
                                    checked={item.approve === 1}
                                    onChange={() => toggleProductStatus(item.id, selectedProduct.status)}

                          />}
                                  
                                /> */}
                                {item.approve == 1 ? <FormControlLabel
                                  control={<Android12Switch value="0" onChange={(e) =>handlestatus(e,item.id,"approve") } defaultChecked />}
                                /> : <FormControlLabel
                                onChange={(e) =>handlestatus(e,item.id,"approve") }
                                  value="1"
                                  control={<Android12Switch />}
                                />}
                              </td>
                              <td>
                                <Link to={`/webapp/product/${item.id}`}>
                                  <EditIcon />
                                </Link>
                                {/* <Link>
                                  <DeleteIcon  className="text-danger"/>
                                </Link> */}
                              </td>
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

export default ProductCatalog;
