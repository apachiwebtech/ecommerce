import {
  mdiClose,
  mdiFacebook,
  mdiInstagram,
  mdiLinkedin,
  mdiPinterest,
} from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import logo from "../../assets/frontimg/logo.png";
import { getCartCount } from "../../Store/Cart/cart-action";
import { getWishCount } from "../../Store/WishList/wishlist-actions";
import LoginForm from "../Authentication/LoginForm";
import '../../Style.css';

const SiteHeader = (cartCount) => {
  const [banner, setBanner] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cat, setCatData] = useState([]);
  const [subcat, setsubCatData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [searchtoggle, setsearchtoggle] = useState(false);
  const custuser_id = Cookies.get("custuserid");
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const [isSubMenuVisible, setSubMenuVisible] = useState(false); 

  // const [isScrolled, setIsScrolled] = useState(false);

  // const handleScroll = () => {
  //   if (window.scrollY > 100) {
  //     setIsScrolled(true);
  //   } else {
  //     setIsScrolled(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  async function getTrendingData() {
    axios
      .get(`${BASE_URL}/group_data`)
      .then((res) => {
        // console.log(res)
        setBanner(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const closeSideheader = () => {
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  async function getcatData() {
    axios
      .get(`${BASE_URL}/category_data`)
      .then((res) => {
        // console.log(res.data)
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getsubcatData() {
    axios
      .get(`${BASE_URL}/subcategory_data`)
      .then((res) => {
        setsubCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getsubcatData();
    getcatData();
    getTrendingData();
  }, []);

  const [open, setOpen] = useState(false);
  const handleToggle = (e) => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartCount.cartCount);
  const wishcount = useSelector((state) => state.wishlist.wishCount);
  const handlechangesearch = (e) => {
    setSearch(e.target.value);

    axios.post(`${BASE_URL}/searchproduct`, { search: search }).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    dispatch(getCartCount());
    dispatch(getWishCount());
  }, []);

  const handlesearch = () => {
    setsearchtoggle(!searchtoggle);
  };
  const searchclose = () => {
    setsearchtoggle(false);
  };

  const handleclose = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <header
        id="site-header"
        className="site-header header-v1 fixed-top scrole-header"
      >
        <div className="header-mobile">
          <div className="section-padding">
            <div className="section-container">
              <div className="row">
                {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
									<div className="navbar-header">
										<button type="button" id="show-megamenu" onClick={toggleSidebar} className="navbar-toggle"></button>
									</div>
								</div> */}

                {/* {location.pathname !== "/home" && (
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                    <div className="navbar-header">
                      <button
                        type="button"
                        id="back-button"
                        onClick={() => window.history.back()}
                        style={{ backgroundColor: "#F8E9D5" }}
                      >
                        <i
                          class="fa fa-chevron-circle-left"
                          aria-hidden="true"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                )} */}
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                  <div className="navbar-header">
                    {!isHomePage ? (
                      // Back button for all pages except Home.js
                      <button
                        type="button"
                        id="back-button"
                        onClick={() => window.history.back()}
                        style={{ backgroundColor: "#F8E9D5" }}
                      >
                        <i
                          className="fa fa-chevron-circle-left"
                          style={{ fontSize: "24px" }}
                        ></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        id="show-megamenu"
                        onClick={toggleSidebar}
                        className="navbar-toggle"
                      >
                        {/* <i
                          className="fa fa-bars"
                          style={{ fontSize: "24px" }}
                        ></i> */}
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                  <div className="site-logo">
                    <Link to="/">
                      <img
                        width="400"
                        height="79"
                        src={logo}
                        alt="Ruper – Furniture HTML Theme"
                      />
                    </Link>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                  <div className="ruper-topcart dropdown">
                    <div className="dropdown mini-cart top-cart">
                      {/* <div className="remove-cart-shadow"></div>
                      <Link
                        className="dropdown-toggle cart-icon"
                        to="/shopcart"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="icons-cart">
                          <i className="icon-large-paper-bag"></i>
                          <span className="cart-count">{count}</span>
                        </div>
                      </Link> */}

                      {/* <div className="dropdown-menu ">
												<div className="cart-empty-wrap">
													<ul className="cart-list">
														<li className="empty">
															<span>No products in the cart.</span>
															<Link className="go-shop" href="shop-grid-left.html">GO TO SHOP<i aria-hidden="true" className="arrow_right"></i></Link>
														</li>
													</ul>
												</div>

												<div className="cart-list-wrap">
													<ul className="cart-list ">
														<li className="mini-cart-item">
															<Link href="#" className="remove" title="Remove this item"><i className="icon_close"></i></Link>
															<Link href="shop-details.html" className="product-image"><img width="600" height="600" src={product3} alt="" /></Link>
															<Link href="shop-details.html" className="product-name">Chair Oak Matt Lacquered</Link>
															<div className="quantity">Qty: 1</div>
															<div className="price">$150.00</div>
														</li>
														<li className="mini-cart-item">
															<Link href="#" className="remove" title="Remove this item"><i className="icon_close"></i></Link>
															<Link href="shop-details.html" className="product-image"><img width="600" height="600" src={product1} alt="" /></Link>
															<Link href="shop-details.html" className="product-name">Zunkel Schwarz</Link>
															<div className="quantity">Qty: 1</div>
															<div className="price">$100.00</div>
														</li>
													</ul>
													<div className="total-cart">
														<div className="title-total">Total: </div>
														<div className="total-price"><span>$100.00</span></div>
													</div>
													<div className="free-ship">
														<div className="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
														<div className="total-percent"><div className="percent" style={{ width: "20%" }}></div></div>
													</div>
													<div className="buttons">
														<Link href="shop-cart.html" className="button btn view-cart btn-primary">View cart</Link>
														<Link href="shop-checkout.html" className="button btn checkout btn-default">Check out</Link>
													</div>
												</div>
											</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header-mobile-fixed">
            <div className="shop-page">
                <Link href="shop-grid-left.html">
                  <i className="wpb-icon-shop"></i>
                </Link>
            </div>

            <div className="my-account">
              <div className="login-header">
                {!Cookies.get(`custuserid`) ? (
                  <div onClick={() => {
                      handleToggle();
                    }}
                  >
                    <i className="wpb-icon-user"></i>
                  </div>
                ) : (
                  <Link to="/profile">
                    <i className="wpb-icon-user"></i>
                  </Link>
                )}
              </div>
            </div>

            <div className="search-box">
              <div className="search-toggle" onClick={handlesearch}>
                <i className="wpb-icon-magnifying-glass"></i>
              </div>
            </div>

            <div className="wishlist-box">
              {!Cookies.get(`custuserid`) ? (
                <div  onClick={() => {
                  handleToggle();
                }}>
                  <i className="wpb-icon-heart"></i>
                </div>
              ) : (
                <Link to="/shopwishlist">
                  <i className="wpb-icon-heart"></i>
                </Link>
              )}
            </div>

             {open && <LoginForm setOpen={setOpen} open={open} />}
            
            {/* <div className="ruper-topcart dropdown light">
              <div className="dropdown mini-cart top-cart"> */}
              
                <div
                  class={
                    searchtoggle
                      ? `search-overlay overlay-open`
                      : `search-overlay `
                  }
                >
                  <div class="close-search"></div>

                  <div
                    class={
                      searchtoggle
                        ? `wrapper-search wrapper-open`
                        : `wrapper-search `
                    }
                  >
                    <div
                      class="search-from ajax-search"
                      style={{ position: "relative" }}
                    >
                      <div class="search-box">
                        <button
                          className="close-searchbar"
                          onClick={handlesearch}
                        >
                          <Icon
                            path={mdiClose}
                            size={1}
                            style={{ float: "right" }}
                          />
                        </button>
                     

                        <input
                          id=""
                          onChange={handlechangesearch}
                          type="text"
                          placeholder="Search..."
                        />

                        <div className="block block-products">
                          <div className="block-title">
                            <h2>item Product</h2>
                          </div>
                          <div className="block-content">
                            <ul className="products-list">
                              {products.map((item) => {
                                return (
                                  <Link to={`/product/${item.slug}`}>
                                    <li className="product-item my-2">
                                      <a
                                        href="shop-details.html"
                                        className="product-image"
                                      >
                                        <img
                                          onClick={searchclose}
                                          src={
                                            `${IMG_URL}/productimg/` +
                                            item.image1
                                          }
                                          alt="product6"
                                        />
                                      </a>
                                      <div
                                        onClick={searchclose}
                                        className="product-content"
                                      >
                                        <h2 className="product-title">
                                          <Link to={`/product/${item.slug}`}>
                                            {item.title}
                                          </Link>
                                        </h2>
                                        <div className="rating small">
                                          <div className="star star-5"></div>
                                        </div>

                                        {item.disc_price ? (
                                          <span className="price">
                                            {item.price !== 0 &&
                                            item.price !== item.disc_price ? (
                                              <del aria-hidden="true">
                                                <span>₹{item.price}</span>
                                              </del>
                                            ) : null}
                                            <ins>
                                              <span>₹{item.disc_price}</span>
                                            </ins>
                                          </span>
                                        ) : (
                                          <span className="price">
                                            ₹{item.price}
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  </Link>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                        <div class="content-menu_search">
                          <label>Suggested</label>
                          <ul id="menu_search" class="menu">
                            <li>
                              <Link to={`/shoproduct/${banner[0]?.slug}`}>
                                Furniture
                              </Link>
                            </li>
                            <li>
                              <a href="#">Accessories</a>
                            </li>
                            <li>
                              <a href="#">Kitchen & Dining</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/* </div>
            </div> */}
            {/* after clickinh search on mobile view ecd /==================================================== */}
          </div>
        </div>

        <div className="header-desktop">
          <div className="header-wrapper">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 header-left">
                    <div className="site-logo">
                      <Link href="index.html">
                        <img
                          width="400"
                          height="79"
                          src={logo}
                          alt="Ruper – Furniture HTML Theme"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 text-center header-center">
                    <div className="site-navigation">
                      <nav id="main-navigation">
                        <ul id="menu-main-menu" className="menu">
                          <li className="level-0 menu-item  mega-menu">
                            {/* current-menu-item it is class for active */}
                            <Link>
                              <span className="menu-item-text">Home</span>
                            </Link>
                          </li>
                          <li className="level-0 menu-item menu-item-has-children">
                            <Link to={`/shoproduct/${banner[0]?.slug}`}>
                              <span className="menu-item-text">
                                {banner[0]?.title}
                              </span>
                            </Link>
                      
                            <ul className="sub-menu">
                              {cat
                                .filter(
                                  (item) => item.group_id == banner[0]?.id 
                                )
                                .map((item) => {
                                  return (
                                    <li className="level-1 menu-item menu-item-has-children">
                                      <Link
                                        to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}
                                      >
                                        <span
                                          className={
                                            item.title == ""
                                              ? "menu-item-text"
                                              : ""
                                          }
                                        >
                                          {item.title}
                                        </span>
                                      </Link>
                                   
                                      <ul className="sub-menu">
                                        {subcat
                                          .filter(
                                            (ele) => ele.cat_id == item.id 
                                          )
                                          .map((ele) => {
                                            return (
                                              <li>
                                                <Link
                                                  to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`}
                                                >
                                                  <span
                                                    className={
                                                      ele.title !== null
                                                        ? "menu-item-text"
                                                        : ""
                                                    }
                                                  >
                                                    {ele.title}
                                                  </span>
                                                </Link>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                 
                                    </li>
                                  );
                                })}
                            </ul>
                           
                          </li>
                          <li className="level-0 menu-item menu-item-has-children">
                            <Link to={`/shoproduct/${banner[1]?.slug}`} >
                              <span className="menu-item-text">
                                {banner[1]?.title}
                              </span>
                            </Link>
                    
                            <ul className="sub-menu">
                              {cat
                                .filter(
                                  (item) => item.group_id == banner[1]?.id 
                                )
                                .map((item) => {
                                  return (
                                    <li className="level-1 menu-item menu-item-has-children">
                                      <Link
                                        to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}
                                      >
                                        <span className="menu-item-text">
                                          {item.title}
                                        </span>
                                      </Link>
                              
                                      <ul className="sub-menu">
                                        {subcat
                                          .filter(
                                            (ele) => ele.cat_id == item.id
                                          )
                                          .map((ele) => {
                                            return (
                                              <li>
                                                <Link
                                                  to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`}
                                                >
                                                  <span
                                                    className={
                                                      ele.title !== null
                                                        ? "menu-item-text"
                                                        : ""
                                                    }
                                                  >
                                                    {ele.title}
                                                  </span>
                                                </Link>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                  
                                    </li>
                                  );
                                })}
                            </ul>
                           
                          </li>
                          <li className="level-0 menu-item menu-item-has-children">
                            <Link to={`/shoproduct/${banner[2]?.slug}`} >
                              <span className="menu-item-text">
                                {banner[2]?.title}
                              </span>
                            </Link>
                        
                            <ul className="sub-menu">
                              {cat
                                .filter(
                                  (item) => item.group_id == banner[2]?.id && item.active === 1
                                )
                                .map((item) => {
                                  return (
                                    <li className="level-1 menu-item menu-item-has-children">
                                      <Link
                                        to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}
                                      >
                                        <span className="menu-item-text">
                                          {item.title}
                                        </span>
                                      </Link>
                                    
                                      <ul className="sub-menu">
                                        {subcat
                                          .filter(
                                            (ele) => ele.cat_id == item.id
                                          )
                                          .map((ele) => {
                                            return (
                                              <li>
                                                <Link
                                                  to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`}
                                                >
                                                  <span
                                                    className={
                                                      ele.title !== null
                                                        ? "menu-item-text"
                                                        : ""
                                                    }
                                                  >
                                                    {ele.title}
                                                  </span>
                                                </Link>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                   
                                    </li>
                                  );
                                })}
                            </ul>
                     
                          </li>
                          <li className="level-0 menu-item ">
                            <Link to={`/shoproduct/${banner[3]?.slug}`}>
                              <span className="menu-item-text">
                                {banner[3]?.title}
                              </span>
                            </Link>

                            {cat.length > 0 && (
                              <ul className="sub-menu">
                                {cat
                                  .filter(
                                    (item) => item.group_id == banner[3]?.id
                                  )
                                  .map((item) => {
                                    return (
                                      <li className="level-1 menu-item menu-item-has-children">
                                        <Link
                                          to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}
                                        >
                                          <span className="menu-item-text">
                                            {item.title}
                                          </span>
                                        </Link>
                                        <ul className="sub-menu">
                                          {subcat
                                            .filter(
                                              (ele) => ele.cat_id == item.id
                                            )
                                            .map((ele) => {
                                              return (
                                                <li>
                                                  <Link
                                                    to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`}
                                                  >
                                                    <span
                                                      className={
                                                        ele.title !== null
                                                          ? "menu-item-text"
                                                          : ""
                                                      }
                                                    >
                                                      {ele.title}
                                                    </span>
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                        </ul>
                                      </li>
                                    );
                                  })}
                              </ul>
                            )}
                          </li>
                          <li className="level-0 menu-item">
                            <Link to="/customizationpage">
                              <span className="menu-item-text">
                                Customization
                              </span>
                            </Link>
                          </li>
                          <li className="level-0 menu-item">
                            <Link to="/contact">
                              <span className="menu-item-text">Contact Us</span>
                            </Link>
                          </li>
                          {/* <li className="level-0 menu-item">
														<Link to="/vendorregister"><span className="menu-item-text">Vendor Request</span></Link>
													</li> */}
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-right">
                    <div className="header-page-link">
                      <div className="login-header">
                        {/* {console.log(Cookies.get('userid'), "???")} */}
                        {/* {Cookies.get('userid') == undefined ?
													<Link className="active-login" onClick={handleToggle}>Login</Link> : <Link className="active-login" onClick={handleLogout}>Logout</Link>} */}
                        {open && <LoginForm setOpen={setOpen} open={open} />}

                        {!custuser_id ? (
                          <Link
                            to="#"
                            className="active-login"
                            onClick={handleToggle}
                          >
                            Login
                          </Link>
                        ) : (
                          <Link to="/profile" className="active-login">
                            <i className="icon-user"></i>
                          </Link>
                        )}
                      </div>

                      <div className="search-box">
                        <div className="search-toggle" onClick={handlesearch}>
                          <i className="icon-search"></i>
                        </div>
                      </div>

                      <div className="wishlist-box">
                        <Link to="/shopwishlist">
                          <i className="icon-heart"></i>
                        </Link>
                        <span className="count-wishlist">{wishcount}</span>
                      </div>

                      <div className="ruper-topcart dropdown light">
                        <div className="dropdown mini-cart top-cart">
                          <div className="remove-cart-shadow"></div>
                          <Link
                            className="dropdown-toggle cart-icon"
                            to="/shopcart"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <div className="icons-cart">
                              <i className="icon-large-paper-bag"></i>
                              <span className="cart-count">{count}</span>
                            </div>
                          </Link>

                          <div
                            class={
                              searchtoggle
                                ? `search-overlay overlay-open`
                                : `search-overlay `
                            }
                          >
                            <div class="close-search"></div>

                            <div
                              class={
                                searchtoggle
                                  ? `wrapper-search wrapper-open`
                                  : `wrapper-search `
                              }
                            >
                              <div
                                class="search-from ajax-search"
                                style={{ position: "relative" }}
                              >
                                <div class="search-box">
                                  <button
                                    className="close-searchbar"
                                    onClick={handlesearch}
                                  >
                                    <Icon
                                      path={mdiClose}
                                      size={1}
                                      style={{ float: "right" }}
                                    />
                                  </button>
                                  {/* <button id="searchsubmit" class="btn" type="submit">
																		<i class="icon-search"></i>
																	</button> */}

                                  <input
                                    id=""
                                    onChange={handlechangesearch}
                                    type="text"
                                    placeholder="Search..."
                                  />

                                  <div className="block block-products">
                                    <div className="block-title">
                                      <h2>item Product</h2>
                                    </div>
                                    <div className="block-content">
                                      <ul className="products-list">
                                        {products.map((item) => {
                                          return (
                                            <Link to={`/product/${item.slug}`}>
                                              <li className="product-item my-2">
                                                <a
                                                  href="shop-details.html"
                                                  className="product-image"
                                                >
                                                  <img
                                                    onClick={searchclose}
                                                    src={
                                                      `${IMG_URL}/productimg/` +
                                                      item.image1
                                                    }
                                                    alt="product6"
                                                  />
                                                </a>
                                                <div
                                                  onClick={searchclose}
                                                  className="product-content"
                                                >
                                                  <h2 className="product-title">
                                                    <Link
                                                      to={`/product/${item.slug}`}
                                                    >
                                                      {item.title}
                                                    </Link>
                                                  </h2>
                                                  <div className="rating small">
                                                    <div className="star star-5"></div>
                                                  </div>

                                                  {item.disc_price ? (
                                                    <span className="price">
                                                      {item.price !== 0 &&
                                                      item.price !==
                                                        item.disc_price ? (
                                                        <del aria-hidden="true">
                                                          <span>
                                                            ₹{item.price}
                                                          </span>
                                                        </del>
                                                      ) : null}
                                                      <ins>
                                                        <span>
                                                          ₹{item.disc_price}
                                                        </span>
                                                      </ins>
                                                    </span>
                                                  ) : (
                                                    <span className="price">
                                                      ₹{item.price}
                                                    </span>
                                                  )}
                                                </div>
                                              </li>
                                            </Link>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                  <div class="content-menu_search">
                                    <label>Suggested</label>
                                    <ul id="menu_search" class="menu">
                                      <li>
                                        <Link
                                          to={`/shoproduct/${banner[0]?.slug}`}
                                        >
                                          Furniture
                                        </Link>
                                      </li>
                                      <li>
                                        <a href="#">Accessories</a>
                                      </li>
                                      <li>
                                        <a href="#">Kitchen & Dining</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`header-mobile-sidebar ${toggle ? `mob-left-view` : ``}  `}
      >
        <div
          className="p-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#F8E9D5",
          }}
        >
          <div className="">
            <img
              width="130"
              height="79"
              src={logo}
              alt="Ruper – Furniture HTML Theme"
            />
          </div>
          <div
            className="py-4  mob-left-sidebar-close "
            onClick={toggleSidebar}
            style={{ textAlign: "right", display: "none" }}
          >
            <Icon path={mdiClose} size={1} />
          </div>
        </div>

        <hr className="m-0" />
        <div className="mobile-cat p-3">
          <h5>
            <Link to={`/shoproduct/${banner[0]?.slug}`} onClick={closeSideheader}>
              <span className="menu-item-text">{banner[0]?.title}</span>
            </Link>
          </h5>
          <h5>
            <Link to={`/shoproduct/${banner[1]?.slug}`}  onClick={closeSideheader}>
              <span className="menu-item-text">{banner[1]?.title}</span>
            </Link>
          </h5>
          <h5>
            <Link to={`/shoproduct/${banner[2]?.slug}`}  onClick={closeSideheader}>
              <span className="menu-item-text">{banner[2]?.title}</span>
            </Link>
          </h5>
        </div>

        <div
          className="mobile-footer d-flex "
          style={{
            justifyContent: "space-evenly",
            position: "absolute",
            width: "100%",
            bottom: "15px",
          }}
        >
          <Icon path={mdiFacebook} size={1.2} />
          <Icon path={mdiInstagram} size={1.3} />
          <Icon path={mdiLinkedin} size={1.3} />
          <Icon path={mdiPinterest} size={1.3} />
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
