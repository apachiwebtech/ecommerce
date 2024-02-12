import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "js-md5";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const VenRoleRightAssignment = () => {
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [errors, setErrors] = useState({});
  const [admindata, setData] = useState([]);
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!value.email) {
      isValid = false;
      newErrors.email = "Email is required";
    }
    if (!value.firstname) {
      isValid = false;
      newErrors.firstname = "FirstName is required";
    }
    if (!value.lastname) {
      isValid = false;
      newErrors.lastname = "Lastname is required";
    }
    if (!value.password) {
      isValid = false;
      newErrors.password = "Password is required";
    }
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (!passwordPattern.test(value.password)) {
      isValid = false;
      newErrors.password =
        "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.";
    }

    setErrors(newErrors);
    setTimeout(() => {
      setErrors("");
    }, 5000);
    return isValid;
  };

  async function getAdminuserData() {
    axios
      .get(`${BASE_URL}/adminuser_data`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAdminuserData();
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
      adminuser_id: id,
    };

    axios
      .post(`${BASE_URL}/adminuser_delete`, data)
      .then((res) => {
        getAdminuserData();
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
    if (validateForm()) {
      const hashpassword = md5(value.password);

      const data = {
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: hashpassword,
      };

      axios
        .post(`${BASE_URL}/add_adminuser`, data)
        .then((res) => {
          alert(res.data);
          getAdminuserData();
          if (res.data) {
            //    navigate('/vendormaster')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Role Right Assignment</h4>

                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="col-md-6">
                      <div class="form-group ">
                        <label for="category">Select Role</label>
                        <select
                          type="text"
                          class="form-control"
                          id="role"
                          placeholder="Role"
                          name="role"
                        >
                          <option value="0">Select Role</option>
                          <option value="1">Admin</option>
                          <option value="2">user1</option>
                        </select>
                      </div>
                    </div>

                    <div class="table-responsive pt-3">
                      <table class="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th class="text-left">Role Rights</th>
                            <th>Hide</th>
                            <th>View</th>
                            <th>Add / Update</th>
                            <th>Full</th>
                          </tr>
                        </thead>
                        <tbody>
                          <td class="text-left">Home</td>
                          <td>
                            {" "}
                            <FormControlLabel
                              value=""
                              control={<Radio />}
                              label=""
                              size="small"
                            />
                          </td>
                          <td>
                            {" "}
                            <FormControlLabel
                              value=""
                              control={<Radio />}
                              label=""
                              size="small"
                            />
                          </td>
                          <td>
                            {" "}
                            <FormControlLabel
                              value=""
                              control={<Radio />}
                              label=""
                              size="small"
                            />
                          </td>
                          <td>
                            {" "}
                            <FormControlLabel
                              value=""
                              control={<Radio />}
                              label=""
                              size="small"
                            />
                          </td>
                        </tbody>
                      </table>
                    </div>
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

export default VenRoleRightAssignment;
