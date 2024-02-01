import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";

const Product = () => {
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
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add Product</h4>

                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group ">
                          <label for="prod_id">
                            Product Id <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="prod_id"
                            placeholder="Product Id"
                            name="prod_id"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group ">
                          <label for="name">Name </label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="Name"
                            name="name"
                          />
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group ">
                          <label for="slug">Slug </label>
                          <input
                            type="text"
                            class="form-control"
                            id="slug"
                            placeholder="slug"
                            name="slug"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="category">
                            Category<span class="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            class="form-control"
                            id="category"
                            placeholder="Category"
                            name="category"
                          >
                            <option value="0">Select Category</option>
                            <option value="1">Category1</option>
                            <option value="2">Category2</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="subcategory">
                            Sub Category<span class="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            class="form-control"
                            id="subcategory"
                            placeholder="Subcategory"
                            name="subcategory"
                          >
                            <option value="0">Select Subcategory</option>
                            <option value="1">Subcategory1</option>
                            <option value="2">Subcategory2</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="brand">
                            Brand<span class="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            class="form-control"
                            id="brand"
                            placeholder="Brand"
                            name="brand"
                          >
                            <option value="0">Select Brand</option>
                            <option value="1">Brand1</option>
                            <option value="2">Brand2</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="color">
                            Color<span class="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            class="form-control"
                            id="color"
                            placeholder="Color"
                            name="color"
                          >
                            <option value="0">Select Color</option>
                            <option value="1">Red</option>
                            <option value="2">Yellow</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group ">
                          <label for="description">Description</label>
                          <textarea
                            class="form-control"
                            id="description"
                            rows="4"
                            name="description"
                            onChange={onhandleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group ">
                          <label for="addi_info">Additional Information</label>
                          <textarea
                            class="form-control"
                            id="addi_info"
                            rows="4"
                            name="addi_info"
                            onChange={onhandleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group ">
                          <label for="wash">Wash and Care Information</label>
                          <textarea
                            class="form-control"
                            id="wash"
                            rows="4"
                            name="wash"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2">
                        <div class="form-group ">
                          <label for="small_bust">Small Bust Size</label>
                          <input
                            type="text"
                            class="form-control"
                            id="small_bust"
                            placeholder=" Small Bust Size"
                            name="small_bust"
                          />
                        </div>
                      </div>

                      <div class="col-md-2">
                        <div class="form-group ">
                          <label for="med_bust">Medium Bust Size </label>
                          <input
                            type="text"
                            class="form-control"
                            id="med_bust"
                            placeholder="Medium Bust Size"
                            name="med_bust"
                          />
                        </div>
                      </div>

                      <div class="col-md-2">
                        <div class="form-group ">
                          <label for="larg_bust">Large Bust Size </label>
                          <input
                            type="text"
                            class="form-control"
                            id="larg_bust"
                            placeholder="Large Bust Size"
                            name="larg_bust"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="exlarg_bust">
                            Extra Large Bust Size{" "}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exlarg_bust"
                            placeholder="Extra Large Bust Size"
                            name="exlarg_bust"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group ">
                          <label for="seo_title">
                            SEO Title <span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="seo_title"
                            placeholder="SEO Title"
                            name="seo_title"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group ">
                          <div class="form-group ">
                            <label for="seo_desc">SEO Description</label>
                            <textarea
                              class="form-control"
                              id="seo_desc"
                              rows="4"
                              name="seo_desc"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="thumb1">
                            Thumb Image (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="thumb1"
                            placeholder="Product Id"
                            name="thumb1"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image1">
                            Image1 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image1"
                            placeholder="Product Id"
                            name="image1"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image2">
                            Image2 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image2"
                            placeholder="Product Id"
                            name="image2"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image3">
                            Image3 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image3"
                            placeholder="Product Id"
                            name="image3"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image4">
                            Image4 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image4"
                            placeholder="Product Id"
                            name="image4"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image5">
                            Image5 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image5"
                            placeholder="Product Id"
                            name="image5"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image6">
                            Image6 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image6"
                            placeholder="Product Id"
                            name="image6"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image7">
                            Image7 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image7"
                            placeholder="Product Id"
                            name="image7"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image8">
                            Image8 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image8"
                            placeholder="Product Id"
                            name="image8"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image9">
                            Image9 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image9"
                            placeholder="Product Id"
                            name="image9"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group ">
                          <label for="image10">
                            Image10 (1111 x 1667)
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="image10"
                            placeholder="Product Id"
                            name="image10"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">
                      Submit
                    </button>
                    <Link to="/webapp/adminuser">
                      <button class="btn btn-light">Cancel</button>
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

export default Product;
