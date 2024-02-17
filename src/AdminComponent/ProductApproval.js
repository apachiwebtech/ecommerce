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
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";


const ProductApproval = () => {

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 1
    },
    {
      field: 'image', 
      headerName: 'Image', 
      renderCell: (params) => {
        return (
          <div>
            <Avatar  src={params.row.avatar} />
          </div>
        )
      },
      flex: 2,
      filterable: false,
      sortable: false
    },
    { 
      field: 'category', 
      headerName: 'Category',
      flex: 3
    },
    {
      field: 'subcategory',
      headerName: 'SubCategory',
      flex: 2
    },
    {
      field: 'vendor',
      headerName: 'Vendor Name',
      flex: 2
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 2
    },
    {
      field: 'status',
      headerName: 'Active',
      renderCell: (params) => {
        return (
          <div>
            <button className='btn btn-sm btn-danger'>Approve</button>
          </div>
        )
      },
      flex: 2
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => {
        return(
          <Link to={`/webapp/vendorform/${params.row.id}`}><RemoveRedEyeIcon /></Link>
        )
      },
      flex: 2
    },

  ];

  const rows = [
    {
      id: 1,
      avatar: "https://source.unsplash.com/random",
      category: "Harry@gmail.com",
      subcategory: "Active",
      vendor:"hello",
      price: "$120",
      status: "",
      action: "hello"
    },];

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
      <InnerHeader />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 class="card-title">Product Approval </h4>
                      <p class="card-description">List Of Products</p>
                    </div>
                  </div>
                  <div style={{ height: '100%', width: '300' }}>
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
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
