import { BASE_URL } from "./BaseUrl";
import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";

const LocationMaster = () => {
  const [locations, setLocations] = useState([]);
  const [slot, setSlot] = useState([]) 

  // Function to fetch locations from the server
  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/locationMaster_data`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };


  const updateSlot = async (id, selectedSlot,slot) => {
    setSlot(slot)
    try {
      const response = await fetch(`${BASE_URL}/updateSlot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, slot: selectedSlot }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log(result); // Log success message or handle it accordingly
    } catch (error) {
      console.error('Error updating slot:', error);
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
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locations.map((loc) => (
                        <tr key={loc.id}>
                          <td>{loc.id}</td>
                          <td>{loc.name}</td>
                          <td><select class="form-control form-control-lg" id="exampleFormControlSelect1" value={slot} name='role' onChange={(e) => updateSlot(loc.id, e.target.value,loc.slot)}>
                            <option selected>Select Slot</option>
                            <option value={`1`}>1</option>
                            <option value={`2`}>2</option>
                            <option value={`3`}>3</option>
                            <option value={`4`}>4</option>
                          </select>
                          </td>
                          <td>
                              
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
  );
};

export default LocationMaster;
