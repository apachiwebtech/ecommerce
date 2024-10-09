import { BASE_URL } from "./BaseUrl";
import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";

const LocationMaster = () => {
  const [locations, setLocations] = useState([]);

  // Function to fetch locations from the server
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

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="card-title">Location Master</h4>
                    <p className="card-description">List of Location Master</p>
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Location</th>
                        <th scope="col">Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locations.map((loc) => (
                        <tr key={loc.id}>
                          <td>{loc.id}</td>
                          <td>{loc.location}</td>
                          <td>{loc.title}</td>
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
  );
};

export default LocationMaster;
