import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import InnerHeader from "./InnerHeader";
import Loader from "./Loader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { BASE_URL } from "./BaseUrl";

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

const Advertise = () => {
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [targetValue, setTargetValue] = useState("");

  const handleAddClick = () => {
    setShowForm(true);
    clearForm();
  };

  const resetForm = () => {
    clearForm();
    setEditId(null);
  };

  const clearForm = () => {
    setEditId(null);
    setSelectedSlot("");
    setSelectedType("");
    setTitleValue("");
    setLinkValue("");
    setTargetValue("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      slot: selectedSlot,
      type: selectedType,
      title: titleValue,
      link: linkValue,
      target: targetValue,
      created_by: 1, // Replace with actual user ID
    };

    try {
      if (editId) {
        data.id = editId;
        await axios.post(`${BASE_URL}/update_advertisement`, data);
        alert("Advertisement Updated Successfully!");
      } else {
        await axios.post(`${BASE_URL}/add_advertisement`, data);
        alert("Advertisement Added Successfully!");
      }
      getAdvertisements();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error adding/updating advertisement");
    }
  };

  const getAdvertisements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/advertisements`);
      setAdvertisements(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (advertisement) => {
    setSelectedSlot(advertisement.slot);
    setSelectedType(advertisement.type);
    setTitleValue(advertisement.title);
    setLinkValue(advertisement.link);
    setTargetValue(advertisement.target);
    setEditId(advertisement.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        await axios.post(`${BASE_URL}/delete_advertisement`, { id });
        alert("Advertisement Deleted Successfully!");
        getAdvertisements();
      } catch (err) {
        console.error(err);
        alert("Error deleting advertisement");
      }
    }
  };

  useEffect(() => {
    getAdvertisements();
  }, []);

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />

      <div className="main-panel">
        <div className="content-wrapper">
          {showForm && (
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="card-title">
                          {editId
                            ? "Edit Advertisement"
                            : "Add New Advertisement"}
                        </h4>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label>Slot:</label>
                          <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Slot</option>
                            <option value="Slot-1">Slot-1</option>
                            <option value="Slot-2">Slot-2</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Advertisement Type:</label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Adv.. Type</option>
                            <option value="Image">Image</option>
                            <option value="Iframe">Iframe</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Title:</label>
                          <input
                            type="text"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            placeholder="Enter title"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label>Link:</label>
                          <input
                            type="text"
                            value={linkValue}
                            onChange={(e) => setLinkValue(e.target.value)}
                            placeholder="Enter Link"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Target:</label>
                          <select
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Target Type</option>
                            <option value="On Page">On Page</option>
                            <option value="Diff.. Page">Diff.. Page</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">
                        {editId
                          ? "Update Advertisement"
                          : "Add New Advertisement"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn btn-light"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">Advertisements </h4>
                      <p className="card-description">List of Advertisements</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary h-25"
                      onClick={handleAddClick}
                    >
                      ADD
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Slot</th>
                          <th scope="col">Title</th>
                          <th scope="col">Adv.. Type</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {advertisements.map((ad) => (
                          <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td>{ad.slot}</td>
                            <td>{ad.title}</td>
                            <td>{ad.type}</td>
                            <td>
                              <FormControlLabel control={<Android12Switch />} />
                            </td>
                            <td>
                              <EditIcon
                                onClick={() => handleEdit(ad)}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                              <DeleteIcon
                                onClick={() => handleDelete(ad.id)}
                                style={{ color: "red", cursor: "pointer" }}
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

export default Advertise;
