import React, { useEffect, useState } from 'react'
import product2 from '../../assets/frontimg/product/2.jpg'
import header from '../../assets/frontimg/site-header.jpg'
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import { Link, useParams } from 'react-router-dom';
import addToCart from '../../Utils/AddtoCart';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import custdecryptedUserId from '../../Utils/CustUserid';
import { addToWishList } from '../../Store/WishList/wishlist-actions';
import Cookies from 'js-cookie';
import LoginForm from '../Authentication/LoginForm';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const DetailPage = () => {

	const [activeIndex, setActiveIndex] = useState();
	const [isMobile, setIsMobile] = useState(false);


	const handleSlideClick = (index) => {
		setActiveIndex(index);

		localStorage.setItem('initial', index)
		window.location.reload()

	};

	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	var settings = {
		dots: false,
		infinite: true,
		arrows: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	var settings2 = {

		dots: false,
		infinite: true,
		dotsClass: "slick-dots slick-thumb",
		vertical: true,
		arrows: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1
	};

	const { productslug } = useParams()
	const [productdata, setProductdata] = useState([])
	const [catid, setCatid] = useState('')
	const [image, setProductImg] = useState([])
	const [value, setValue] = useState(1)
	const [colorimg, setImgcolordata] = useState([]);
	const [open, setOpen] = useState(false);
	const [r_stock, setReservestock] = useState();
	const [relatedproduct, setRelatedProduct] = useState([])

	const handleToggle = (e) => {
		setOpen(!open);
	}
	const notify = () => toast("Product added to the cart");


	const wishify = () => toast("Product added to the wishlist");

	async function getProductDetails() {

		const data = {
			productslug: productslug
		}

		axios.post(`${BASE_URL}/getproductDetails`, data)
			.then((res) => {
				setProductdata(res.data.data)
				setReservestock(res.data.r_stock)
				getrelatedproduct(res.data.data[0].catid, res.data.data[0].id)
				if (res.data) {
					getProductImage(res.data.data[0].id)

				}

				// setproductid(res.data[0].id)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const getrelatedproduct = async (catid,pro_id) => {
		const data = {
			catid: catid,
			product_id : pro_id
		}
		axios.post(`${BASE_URL}/getrelatedproduct`, data)
			.then((res) => {
				setRelatedProduct(res.data)
			})
	}




	async function getProductImage(id) {

		const data = {
			product_id: id
		}

		axios.post(`${BASE_URL}/product_img_data`, data)
			.then((res) => {
				console.log(res)
				setProductImg(res.data)
				setImgcolordata(res.data[0].images)

			})
			.catch((err) => {
				console.log(err)
			})
	}

	const getcolorimgData = async (colorid) => {
		const data = {
			colorid: colorid,
		}


		axios.post(`${BASE_URL}/getcolorimg`, data)
			.then((res) => {
				console.log(res)
				setImgcolordata(res.data[0].images)
			})
	}






	useEffect(() => {

		getProductDetails()

	}, [productslug])



	const dispatch = useDispatch();
	const addWishList = (data) => {

		const id = data;
		const userId = custdecryptedUserId();
		const wishData = {
			id,
			userId,
		}

		dispatch(addToWishList(wishData));

	}

	useEffect(() => {
		// Update the state based on screen width
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768); // Define 768px as the breakpoint for mobile
		};

		// Attach the event listener on mount and remove it on cleanup
		window.addEventListener("resize", handleResize);

		// Call the function initially to set the state
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);


	return (

		<div>
			<div id="site-main" class="site-main">
				<div id="main-content" class="main-content">
					<ToastContainer theme="dark" position="bottom-right" />
					<div id="primary" class="content-area">
						{productdata?.map((item) => {
							return (
								<>
									<div id="title" class="page-title">
										<div class="section-container">
											<div class="content-title-heading">
												<h1 class="text-title-heading">
													{item.title}
												</h1>
											</div>
											<div class="breadcrumbs">
												<Link to={`/`}>Home</Link><span class="delimiter"></span><Link href="shop-grid-left.html">Shop</Link><span class="delimiter"></span>{item.title}
											</div>
										</div>


									</div>

									<div id="content" class="site-content" role="main">
										<div class="shop-details zoom" data-product_layout_thumb="scroll" data-zoom_scroll="true" data-zoom_contain_lens="true" data-zoomtype="inner" data-lenssize="200" data-lensshape="square" data-lensborder="" data-bordersize="2" data-bordercolour="#f9b61e" data-popup="false">
											<div class="product-top-info">
												<div class="section-padding">
													<div class="section-container p-l-r">

														<div class="row">
															<div class="product-images col-lg-7 col-md-12 col-12">
																<div className="row">
																	<div className="col-md-2">
																		<div className="content-thumbnail-scroll">
																			<div className="image-thumbnail slick-vertical">
																				<Swiper
																					spaceBetween={isMobile ? 1 : 0}
																					slidesPerView={isMobile ? 3 : 3}
																					modules={[Mousewheel, Navigation, Thumbs]}
																					navigation
																					direction={isMobile ? "horizontal" : "vertical"}
																					mousewheel
																					watchSlidesProgress={true}
																					breakpoints={{
																						320: {
																							slidesPerView: 3,
																						},
																						640: {
																							slidesPerView: 3,
																						},
																						768: {
																							slidesPerView: 3,
																						},
																						1024: {
																							slidesPerView: 3,
																						},
																					}}
																				>
																					{colorimg.map((item, index) => {
																						if (item !== "") {
																							return (
																								<SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
																									<div className="img-item slick-slide">
																										<span className="img-thumbnail-scroll">
																											<img
																												width="600"
																												height="600"
																												src={`${IMG_URL}/productimg/` + item}
																												alt=""
																											/>
																										</span>
																									</div>
																								</SwiperSlide>
																							);
																						}
																						return null;
																					})}
																				</Swiper>
																			</div>
																		</div>
																	</div>

																	<div className="col-md-10">
																		<div className="scroll-image main-image">
																			<div className="image-additional">
																				<Swiper initialSlide={localStorage.getItem("initial") || activeIndex} navigation modules={[Mousewheel, Navigation, Thumbs]}>
																					{colorimg.map((item, index) => {
																						if (item !== "") {
																							return (
																								<SwiperSlide key={index}>
																									<div className="img-item">
																										<span className="img-thumbnail-scroll">
																											<img
																												width="600"
																												height="600"
																												src={`${IMG_URL}/productimg/` + item}
																												alt=""
																											/>
																										</span>
																									</div>
																								</SwiperSlide>
																							);
																						}
																						return null;
																					})}
																				</Swiper>
																			</div>
																		</div>
																	</div>
																</div>
															</div>

															<div class="product-info col-lg-5 col-md-12 col-12 ">
																<h1 class="title">{item.title}</h1>
																<span class="price">
																	<del aria-hidden="true"><span>₹{item.price}</span></del>
																	<ins><span>₹{item.disc_price}</span></ins>
																</span>
																{item.customizable == 1 && <div className="product-lable">
																	<div className="hot text-light bg-success">
																		customizable</div>
																</div>}
															
																<div class="rating">
																	<div class="star star-5"></div>
																	<div class="review-count">
																		(3<span> reviews</span>)
																	</div>
																</div>
																<div class="description">
																	<p>{item.description}</p>
																</div>
																<div class="variations">
																	<table cellspacing="0">
																		<tbody>
																			{/* <tr>
																				<td class="label">Size</td>
																				<td class="attributes">
																					<ul class="text">
																						<li><span>L</span></li>
																						<li><span>M</span></li>
																						<li><span>S</span></li>
																					</ul>
																				</td>
																			</tr> */}
																			<tr>
																				<td class="label">Color</td>
																				<td class="attributes">
																					<ul class="colors">
																						<div>
																							{image.map((item, index) => (
																								<li key={index}>
																									<button
																										className="color-1"
																										style={{ background: `${item.colorcode}`, width: "50px", height: "50px" }}
																										value={item.colorcode}
																										onClick={(e) => {
																											getcolorimgData(item.id)

																										}}
																									></button>
																								</li>
																							))}
																						</div>


																					</ul>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>

																<div class="buttons">
																	<div class="btn-wishlist d-block" data-title="Wishlist">
																		{/* <button class="product-btn">Add to wishlist</button> */}
																		{!Cookies.get(`custuserid`) ? <button class="product-btn" onClick={() => {

																			handleToggle()
																		}}>Add to wishlist</button> : <button class="product-btn" onClick={() => {
																			addWishList(item.id)
																			wishify()


																		}}>Add to wishlist</button>}
																	</div>

																	{item.stock == null || item.stock == 0 || item.stock == r_stock || item.stock < 0 ?  <div>
																		<div class="button  text-danger" >Out Of Stock</div>

																	</div> :item.customizable == 1 ? <>satya</> :  <div class="add-to-cart-wrap ">
																		<div class="quantity">
																			<button type="button" onClick={() => {

																				if (value < item.stock - r_stock) {
																					setValue(value + 1)

																				}else{
																					alert(`Available stock is ${item.stock - r_stock}`)
																				}

																			}} class="plus">+</button>

																			<input type="number" class="qty" step="1" min="0" max="" name="quantity" value={value} title="Qty" size="4" placeholder="" inputmode="numeric" autocomplete="off" />

																			<button type="button" onClick={() => {
																				if (value > 1) {
																					setValue(value - 1)
																				}
																			}
																			} class="minus" >-</button>
																		</div>
																		<div class="btn-add-to-cart">
																			<div class="button" onClick={() => {

																				if (item.stock == null) {
																					alert("out of stock")
																				} else {
																					addToCart(item.id, item.title, item.catid, item.disc_price, dispatch, value, item.v_id, item.gst)
																					notify();
																				}


																			}}  >Add to cart</div>
																		</div>
																	</div>}



																	{/* <div class="btn-quick-buy" data-title="Wishlist">
																		<button class="product-btn">Buy It Now</button>
																	</div> */}


																	{/* <div class="btn-compare" data-title="Compare">
																		<button class="product-btn">Compare</button>
																	</div> */}
																</div>
																<div class="product-meta">
																	{/* <span class="sku-wrapper">SKU: <span class="sku">D2300-3-2-2</span></span> */}
																	<span class="posted-in">Category: <Link rel="tag">{item.category}</Link></span>
																	<span class="tagged-as">Tags: <Link to={``} rel="tag">{item.Tags}</Link></span>
																</div>
																{/* <div class="social-share">
																	<Link href="#" title="Facebook" class="share-facebook" target="_blank"><i class="fa fa-facebook"></i>Facebook</Link>
																	<Link href="#" title="Twitter" class="share-twitter"><i class="fa fa-twitter"></i>Twitter</Link>
																	<Link href="#" title="Pinterest" class="share-pinterest"><i class="fa fa-pinterest"></i>Pinterest</Link>
																</div> */}
															</div>
														</div>
													</div>
												</div>
											</div>

											{open && <LoginForm setOpen={setOpen} open={open} />}
											<div class="product-tabs">
												<div class="section-padding">
													<div class="section-container p-l-r">
														<div class="product-tabs-wrap">

															<nav>
																<ul class="nav nav-tabs" id="nav-tab" role="tablist">
																	<li class="nav-item">
																		<Link class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Additional information</Link>
																	</li>
																	<li className='nav-item'>
																		<Link class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</Link>
																	</li>
																	{/* <li className='nav-item'>


																		<Link class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Reviews (1)</Link>
																	</li> */}
																</ul>
															</nav>
															<div class="tab-content" id="nav-tabContent">
																<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><p dangerouslySetInnerHTML={{ __html: item.specification }} /></div>
																<div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">CommingSoon...</div>
																{/* <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">.kk..</div> */}
															</div>

														</div>
													</div>
												</div>
											</div>
											<div class="product-related">
												<div class="section-padding">
													<div class="section-container p-l-r">
														<div class="block block-products slider">
															<div class="block-title"><h2>Related Products</h2></div>
															<div class="block-content">
																<div class="content-product-list slick-wrap">
																	<div class="slick-sliders products-list grid" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="3" data-columns1="3" data-columns1440="4" data-columns="4">
																		<Swiper
																			spaceBetween={20}
																			slidesPerView={5}
																			mousewheel={true}
																			navigation
																			breakpoints={{
																				320: {
																					slidesPerView: 2,
																				},
																				640: {
																					slidesPerView: 3,
																				},
																				768: {
																					slidesPerView: 4,
																				},
																				1024: {
																					slidesPerView: 5,
																				},
																			}}
																			modules={[Mousewheel, Navigation, Thumbs]}
																			onSlideChange={() => console.log('slide change')}
																			onSwiper={(swiper) => console.log(swiper)}
																		>

																			{relatedproduct.map((item) => {
																				return (
																					<SwiperSlide>
																						<div class="">

																							<div class="products-entry clearfix product-wapper">
																								<div class="products-thumb">
																								{item.customizable == 1 && 	<div className="product-lable">
																										<div className="hot text-light bg-success">
																											customizable</div>
																									</div>}
																								
																									<div class="product-thumb-hover">
																										<Link to={``}>
																											<img style={{ height: "200px" }} src={`${IMG_URL}/productimg/` + item.image1} alt="" />
																										</Link>
																									</div>
																									<div class="product-button">
																										<div class="btn-add-to-cart" data-title="Add to cart">
																											<Link rel="nofollow" href="#" class="product-btn button"
																												onClick={() => {
																													addToCart(item.id, item.title, item.catid, item.disc_price, dispatch, "1", item.v_id, item.gst);
																													notify();
																												}}>Add to cart</Link>
																										</div>
																										<div class="btn-wishlist" data-title="Wishlist">
																											{!Cookies.get(`custuserid`) ? <button class="product-btn" onClick={() => {

																												handleToggle()
																											}}>Add to wishlist</button> : <button class="product-btn" onClick={() => {
																												addWishList(item.id)
																												wishify()


																											}}>Add to wishlist</button>}
																										</div>

																									</div>
																								</div>
																								<div class="products-content">
																									<div class="contents text-center">
																										<h3 class="product-title"><Link href="shop-details.html">{item.title}</Link></h3>
																										{/* <div class="rating">
																											<div class="star star-5"></div>
																										</div> */}
																										{item.disc_price ? (<span className="price">
																											<del aria-hidden="true"><span>₹{item.price}</span></del>
																											<ins><span>₹{item.disc_price}</span></ins>
																										</span>) :
																											(<span className="price">{item.price}</span>)
																										}
																									</div>
																								</div>
																							</div>


																						</div>
																					</SwiperSlide>
																				)

																			})}

																		</Swiper>




																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						})}

					</div>
				</div>
				{open && <LoginForm setOpen={setOpen} open={open} />}
			</div>
		</div>
	)
}

export default DetailPage