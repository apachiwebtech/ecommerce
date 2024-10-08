import 'bootstrap/dist/css/bootstrap.css';
import Loader from "./Loader";
import React, {useState } from 'react';
import InnerHeader from './InnerHeader';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Advertise = () => {

    const [loader , setLoader] = useState(false)

  return (
    <div
      className="container-fluid page-body-wrapper col-lg-10"
      style={{ position: "relative" }}
    >
      <InnerHeader />
      {loader && <Loader />}
      <div className="container mt-5">
        <h3 className="mb-4">List of Advertisements</h3>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Advertisement Name</th>
                <th scope="col">Type</th>
                <th scope="col">Preview</th>
                <th scope="col">Position</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ad Slot 1</td>
                <td>Image</td>
                <td>
                  <img
                    src="./chair.jpg"
                    className="img-fluid"
                    width="50px"
                    alt="Ad Preview"
                  />
                </td>
                <td>2-slot</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked
                    />
                  </div>
                </td>
                <td>
                    <EditIcon  />
                    <DeleteIcon style={{ color: "red" }} />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ad Slot 2</td>
                <td>Iframe</td>
                <td>
                  <iframe
                    width="50"
                    height="50"
                    src="https://www.youtube.com/embed/ThPinA3THas?si=zg76TJCzVQchBZAU"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </td>
                <td>4-slot</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                </td>
                <td>
                    <EditIcon  />
                    <DeleteIcon style={{ color: "red" }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
