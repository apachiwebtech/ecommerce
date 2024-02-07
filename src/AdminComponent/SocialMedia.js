import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import img1 from "../assets/images/prof.png";

const SocialMedia = () => {
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

  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
      <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <div class="page-title">
                            <h1>Social Media Links</h1>
                        </div>
                        <div class="main-header-toolbar">
                            <div class="header-action">
                                <div class="header-action__item">
                                    <Link class="link"><DesktopWindowsRoundedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><SearchRoundedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><StorefrontOutlinedIcon style={{fontSize : "17px"}}/></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><NotificationsActiveTwoToneIcon style={{fontSize : "17px"}}/></Link>
                                </div>

                                <div class="header-action__item header-acc">
                                    <span class="header-account__img"><Link class="link"><img  src={img1} alt="" /></Link></span>
                                    
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
                <a href="/admin/subscription-orders">Social Media Links </a>
              </li>
            
            </ul>
          </div>
          <div class="row">
            <div class="col-lg-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">List Of Links</h4>
                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th width="18%">Sr. No.</th>
                          <th width="60%">Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Facebook</td>
                          <td>
                            <Link>
                              <EditIcon />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>LinkedIn</td>
                          <td>
                            <Link>
                              <EditIcon />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Instagram</td>
                          <td>
                            <Link>
                              <EditIcon />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Twitter</td>
                          <td>
                            <Link>
                              <EditIcon />
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Youtube</td>
                          <td>
                            <Link>
                              <EditIcon />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 ">
              <div class="card">
                <div class="card-body">
                <h4 class="card-title">Add Links</h4>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label for="title">Title </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Title"
                        name="title"
                        
                      />
                    </div>
                    <div class="form-group">
                      <label for="link">Link </label>
                      <input
                        type="text"
                        class="form-control"
                        id="link"
                        placeholder="Enter Link"
                        name="link"
                        
                      />
                    </div>
                    <div class="form-group">
                      <label for="insta">Colorcode </label>
                      <input
                        type="text"
                        class="form-control"
                        id="colorcode"
                        placeholder="Enter Color Code"
                        name="colorcode"
                        
                      />
                    </div>
                   

                    <button type="submit" class="btn btn-sm btn-primary mr-2">
                      Update
                    </button>
                    <Link to="/webapp/socialmedia">
                      <button class="btn btn-sm btn-light">Cancel</button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
