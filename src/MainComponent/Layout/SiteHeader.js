
import { Link } from 'react-router-dom'
import logo from '../../assets/frontimg/logo.png'
import product3 from '../../assets/frontimg/product/3.jpg'
import product1 from '../../assets/frontimg/product/1.jpg'
import blog1 from '../../assets/frontimg/blog/1.jpg';
import blog2 from '../../assets/frontimg/blog/2.jpg';
import blog3 from '../../assets/frontimg/blog/3.jpg';
import { getCartCount, } from '../../Store/Cart/cart-action';
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoginForm from '../Authentication/LoginForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SiteHeader = (cartCount) => {
	const [banner, setBanner] = useState([])
	const [cat, setCatData] = useState([])
	const [subcat, setsubCatData] = useState([])
	const custuser_id = Cookies.get('custuserid');
	async function getTrendingData() {
		axios.get(`${BASE_URL}/group_data`)
			.then((res) => {
				// console.log(res)
				setBanner(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}


	async function getcatData() {
		axios.get(`${BASE_URL}/category_data`)
			.then((res) => {
				// console.log(res.data)
				setCatData(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}



	async function getsubcatData() {
		axios.get(`${BASE_URL}/subcategory_data`)
			.then((res) => {
				setsubCatData(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}



	useEffect(() => {
		getsubcatData()
		getcatData()
		getTrendingData()
		
	}, [])

	const [open, setOpen] = useState(false);
	const handleToggle = (e) => {
		setOpen(!open);
	}



	const dispatch = useDispatch();
    const count = useSelector((state) => state.cartCount);

	console.log(count,"6666")




	useEffect(()=>{
		dispatch(getCartCount())
	},[])

	



	return (
		<div>
			<header id="site-header" className="site-header header-v1" style={{ background: "#F8E9D5" }}>

				<div className="header-mobile">
					<div className="section-padding">
						<div className="section-container">
							<div className="row">
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
									<div className="navbar-header">
										<button type="button" id="show-megamenu" className="navbar-toggle"></button>
									</div>
								</div>

								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
									<div className="site-logo">
										<Link to="/">
											<img width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
										</Link>
									</div>
								</div>

								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
									<div className="ruper-topcart dropdown">
										<div className="dropdown mini-cart top-cart">
											<div className="remove-cart-shadow"></div>
											<Link className="dropdown-toggle cart-icon" to="/shopcart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count"></span></div>
											</Link>

											<div className="dropdown-menu cart-popup">
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
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="header-mobile-fixed">

						<div className="shop-page">
							<Link href="shop-grid-left.html"><i className="wpb-icon-shop"></i></Link>
						</div>


						<div className="my-account">
							<div className="login-header">
								<Link href="page-my-account.html"><i className="wpb-icon-user"></i></Link>
							</div>
						</div>


						<div className="search-box">
							<div className="search-toggle"><i className="wpb-icon-magnifying-glass"></i></div>
						</div>


						<div className="wishlist-box">
							<Link to="/shopwishlist"><i className="wpb-icon-heart"></i></Link>
						</div>
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
												<img width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
											</Link>
										</div>
									</div>

									<div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 text-center header-center">
										<div className="site-navigation">
											<nav id="main-navigation">
												<ul id="menu-main-menu" className="menu">
													<li className="level-0 menu-item  mega-menu">
														{/* current-menu-item it is class for active */}
														<Link ><span className="menu-item-text">Home</span></Link>

													</li>
													<li className="level-0 menu-item menu-item-has-children">
														<Link to={`/shoproduct/${banner[0]?.slug}`}><span className="menu-item-text">{banner[0]?.title}</span></Link>
														<ul className="sub-menu">
															{cat.filter((item) => (item.group_id == banner[0]?.id)).map((item) => {
																return (
																	<li className="level-1 menu-item menu-item-has-children">
																		<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}`} ><span className={item.title == "" ? "menu-item-text" : ""}>{item.title}</span></Link>
																		<ul className="sub-menu">
																			{subcat.filter((ele) => ele.cat_id == item.id).map((ele) => {
																				return (
																					< li >
																						<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`} ><span className={ele.title !== null ? "menu-item-text" : ""}>{ele.title}</span></Link>
																					</li>
																				)

																			})}


																		</ul>
																	</li>
																)
															})}


														</ul>
													</li>
													<li className="level-0 menu-item menu-item-has-children">
														<Link to={`/shoproduct/${banner[1]?.slug}`}><span className="menu-item-text">{banner[1]?.title}</span></Link>
														<ul className="sub-menu">
															{cat.filter((item) => (item.group_id == banner[1]?.id)).map((item) => {
																return (
																	<li className="level-1 menu-item menu-item-has-children">
																		<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}><span className="menu-item-text">{item.title}</span></Link>
																		<ul className="sub-menu">
																			{subcat.filter((ele) => ele.cat_id == item.id).map((ele) => {
																				return (
																					< li >
																						<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`} ><span className={ele.title !== null ? "menu-item-text" : ""}>{ele.title}</span></Link>
																					</li>
																				)

																			})}


																		</ul>
																	</li>
																)
															})}


														</ul>

													</li>
													<li className="level-0 menu-item menu-item-has-children">
														<Link to={`/shoproduct/${banner[2]?.slug}`}><span className="menu-item-text">{banner[2]?.title}</span></Link>

														<ul className="sub-menu">
															{cat.filter((item) => (item.group_id == banner[2]?.id)).map((item) => {
																return (
																	<li className="level-1 menu-item menu-item-has-children">
																		<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}`}><span className="menu-item-text">{item.title}</span></Link>
																		<ul className="sub-menu">
																			{subcat.filter((ele) => ele.cat_id == item.id).map((ele) => {
																				return (
																					< li >
																						<Link to={`/shoproduct/${banner[0]?.slug}/${item.slug}/${ele.slug}`}><span className={ele.title !== null ? "menu-item-text" : ""}>{ele.title}</span></Link>
																					</li>
																				)

																			})}


																		</ul>
																	</li>
																)
															})}


														</ul>
													</li>
													<li className="level-0 menu-item">
														<Link href="page-contact.html"><span className="menu-item-text">Contact</span></Link>
													</li>
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

												{!custuser_id ? <Link  to="#" className="active-login" onClick={handleToggle}>Login</Link> : <Link to="/profile" className="active-login" ><i className="icon-user"></i></Link>}



											</div>


											<div className="search-box">
												<div className="search-toggle"><i className="icon-search"></i></div>
											</div>


											<div className="wishlist-box">
												<Link to="/shopwishlist"><i className="icon-heart"></i></Link>
												<span className="count-wishlist">1</span>
											</div>

											<div className="ruper-topcart dropdown light">
												<div className="dropdown mini-cart top-cart">
													<div className="remove-cart-shadow"></div>
													<Link className="dropdown-toggle cart-icon" to="/shopcart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														<div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">{cartCount.cartCount}</span></div>
													</Link>
													<div className="dropdown-menu cart-popup">
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
																	<Link href="shop-details.html" className="product-image"><img width="600" height="600" src={product3} alt="pro" /></Link>
																	<Link href="shop-details.html" className="product-name">Chair Oak Matt Lacquered</Link>
																	<div className="quantity">Qty: 1</div>
																	<div className="price">$150.00</div>
																</li>
																<li className="mini-cart-item">
																	<Link href="#" className="remove" title="Remove this item"><i className="icon_close"></i></Link>
																	<Link href="shop-details.html" className="product-image"><img width="600" height="600" src={product1} alt="pro" /></Link>
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
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div >
			</header >
		</div >
	)
}

export default SiteHeader