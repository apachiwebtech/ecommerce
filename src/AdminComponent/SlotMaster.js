import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";
import { BASE_URL } from "./BaseUrl"; // Make sure to add your base URL here

const SlotMaster = () => {
  const [slotMasterData, setSlotMasterData] = useState([]);
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [formValue, setFormValue] = useState({
    location: "",
    slot: "",
    title: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [locations, setLocations] = useState([]);

  // Fetch SlotMaster data
  const getSlotMasterData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/SlotMaster_data`);
      setSlotMasterData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSlotMasterData();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/LocationMaster_data`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);
  const handleChange = (e) => {
    setFormValue({ ...formValue, location: e.target.value });
  };

  // Handle form submission for adding or updating SlotMaster
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        location: formValue.location,
        slot: formValue.slot,
        title: formValue.title,
        user_id: 1,
      };

      if (editId) {
        data.id = editId;
        try {
          await axios.post(`${BASE_URL}/update_SlotMaster`, data);
          alert("SlotMaster Updated Successfully!");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(`${BASE_URL}/add_SlotMaster`, data);
          alert("SlotMaster Added Successfully!");
        } catch (err) {
          console.log(err);
        }
      }
      resetForm();
      getSlotMasterData();
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!formValue.location) {
      isValid = false;
      newErrors.location = "Location is required";
    }
    if (!formValue.slot) {
      isValid = false;
      newErrors.slot = "Slot is required";
    }
    if (!formValue.title) {
      isValid = false;
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return isValid;
  };

  // Reset form
  const resetForm = () => {
    setFormValue({ location: "", slot: "", title: "" });
    setEditId(null);
    setErrors({});
  };

  // Delete SlotMaster
  const handleDelete = async (id) => {
    try {
      await axios.post(`${BASE_URL}/delete_SlotMaster`, { id });
      alert("SlotMaster Deleted Successfully!");
      getSlotMasterData();
    } catch (err) {
      console.log(err);
    }
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  // Load SlotMaster data into the form for editing
  const handleEdit = (id) => {
    const slotData = slotMasterData.find((item) => item.id === id);
    setFormValue({
      location: slotData.location,
      slot: slotData.slot,
      title: slotData.title,
    });
    setEditId(id);
  };

  const handleCancel = (id) => {
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  return (
    <div class="container-fluid page-body-wrapper position-relative col-lg-10">
      <InnerHeader />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-5 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Slot-Master</h4>
                  <form class="forms-sample py-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Location</label>
                      <select
                        className="form-control"
                        name="location"
                        value={formValue.location}
                        onChange={handleChange}
                      >
                        <option value="">Select a location</option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.location}>
                            {loc.location}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                        <div className="text-danger">{errors.location}</div>
                      )}
                    </div>
                    <div class="form-group">
                      <label>
                        Slot<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Add slot"
                        name="slot"
                        value={formValue.slot}
                        onChange={(e) =>
                          setFormValue({ ...formValue, slot: e.target.value })
                        }
                      />
                      {errors.slot && (
                        <div className="text-danger">{errors.slot}</div>
                      )}
                    </div>
                    <div class="form-group">
                      <label>
                        Title<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter title"
                        name="title"
                        value={formValue.title}
                        onChange={(e) =>
                          setFormValue({ ...formValue, title: e.target.value })
                        }
                      />
                      {errors.title && (
                        <div className="text-danger">{errors.title}</div>
                      )}
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      class="btn btn-light"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-7 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 class="card-title">Slot-Master</h4>
                    <p class="card-description">List of Slot-Master</p>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Location</th>
                          <th>Slot</th>
                          <th>Title</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slotMasterData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.location}</td>
                            <td>{item.slot}</td>
                            <td>{item.title}</td>
                            <td>
                              <EditIcon onClick={() => handleEdit(item.id)} />
                              <DeleteIcon
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => handleDelete(item.id)}
                              />
                            </td>
                          </tr>
                        ))}
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

export default SlotMaster;
