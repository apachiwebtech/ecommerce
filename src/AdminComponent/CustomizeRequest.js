import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

const CustomizeRequest = () => {
  const [custom, setCustom] = useState([]);
  const [viewedItems, setViewedItems] = useState(new Set()); // To keep track of viewed items

  async function getCustomRequest() {
    axios
      .get(`${BASE_URL}/getcustomrequest`)
      .then((res) => {
        setCustom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // Get previously viewed items from local storage
    const storedViewedItems =
      JSON.parse(localStorage.getItem("viewedItems")) || [];
    setViewedItems(new Set(storedViewedItems));

    getCustomRequest();
  }, []);

  const updateRead = (id) => {
    const data = {
      tablename: "awt_productinquiry",
      product_id: id,
    };

    axios
      .post(`${BASE_URL}/updateread`, data)
      .then((res) => {
        setViewedItems((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.add(id); // Add the newly viewed item to the set

          // Save the updated set to local storage
          localStorage.setItem(
            "viewedItems",
            JSON.stringify(Array.from(updatedSet))
          );
          return updatedSet; // Return the updated set to update state
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">Customization Request</h4>
                      <p className="card-description">
                        List Of Customization request
                      </p>
                    </div>
                    <div>
                      {/* <Link to="/webapp/product">
                        <button className=" btn btn-primary">Add Product</button>
                        <Button variant="outlined" size="medium"><AddCircleOutlineIcon  style={{fontSize : "16px"}}/> Add Product</Button>
                      </Link> */}
                      {/* <Link to="/webapp/product" ><button className=' btn btn-primary'>Add Product</button></Link> */}
                    </div>
                  </div>

                  <div className="table-responsive pt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Customer Name</th>
                          <th>Email</th>
                          <th>Requested Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {custom.map((item, index) => {
                          const isoDateStr = item.created_date;
                          const dateObj = new Date(isoDateStr);
                          const formattedDate = `${dateObj.getUTCFullYear()}-${String(
                            dateObj.getUTCMonth() + 1
                          ).padStart(2, "0")}-${String(
                            dateObj.getUTCDate()
                          ).padStart(2, "0")}`;
                          
                          const isViewed = viewedItems.has(item.id);

                          return (
                            <tr key={item.id} style={{ backgroundColor: isViewed ? "transparent" : "#f8d7da"}}>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{formattedDate}</td>
                              <td>
                                <Link>
                                  <RemoveRedEyeIcon
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal-${item.id}`}
                                    onClick={() => updateRead(item.id)} // Mark as viewed on click
                                  />
                                </Link>
                              </td>

                              {/* Modal */}
                              <div
                                className="modal fade"
                                id={`exampleModal-${item.id}`}
                                tabIndex="-1"
                                aria-labelledby={`exampleModalLabel-${item.id}`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id={`exampleModalLabel-${item.id}`}
                                      >
                                        Add Message
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="col-lg-4">
                                        <div className="card-body">
                                          <ul
                                            className="list-stats"
                                            style={{
                                              paddingLeft: "0",
                                              width: "200px",
                                            }}
                                          >
                                            <li>
                                              <span className="lable">
                                                Product title:
                                              </span>{" "}
                                              <span className="value">
                                                <b>{item.title}</b>
                                              </span>
                                            </li>
                                            <li>
                                              <span className="lable">
                                                Customer name:
                                              </span>{" "}
                                              <span className="value">
                                                <b>{item.name}</b>
                                              </span>
                                            </li>
                                            <li>
                                              <span className="lable">
                                                Email
                                              </span>{" "}
                                              <span className="value">
                                                <b>{item.email}</b>
                                              </span>
                                            </li>
                                            <li>
                                              <span className="lable">
                                                Mobile
                                              </span>{" "}
                                              <span className="value">
                                                <b>{item.mobile}</b>
                                              </span>
                                            </li>
                                            <li>
                                              <span className="lable">
                                                Customization
                                              </span>{" "}
                                              <span className="value">
                                                <b>
                                                  {item.inquiry_description}
                                                </b>
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </tr>
                          );
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

export default CustomizeRequest;
