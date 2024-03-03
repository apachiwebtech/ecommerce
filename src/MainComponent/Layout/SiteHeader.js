import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/frontimg/logo.png'
import product3 from '../../assets/frontimg/product/3.jpg'
import product1 from '../../assets/frontimg/product/1.jpg'
import blog1 from '../../assets/frontimg/blog/1.jpg';
import blog2 from '../../assets/frontimg/blog/2.jpg';
import blog3 from '../../assets/frontimg/blog/3.jpg';
const SiteHeader = () => {
  return (
    <div>
        	<header id="site-header" className="site-header header-v1">
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
										<Link href="index.html">
											<img  width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
										</Link>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
									<div className="ruper-topcart dropdown">
										<div className="dropdown mini-cart top-cart">
											<div className="remove-cart-shadow"></div>
											<Link className="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">2</span></div>
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
														<div className="total-percent"><div className="percent" style={{width:"20%"}}></div></div>
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
							<Link href="shop-wishlist.html"><i className="wpb-icon-heart"></i></Link>
						</div>
					</div>
				</div>

				<div className="header-desktop">
					<div className="header-wrapper">
						<div className="section-padding">
							<div className="section-container p-l-r">
								<div className="row">
									<div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12 header-left">
										<div className="site-logo">
											<Link href="index.html">
												<img width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
											</Link>
										</div>
									</div>

									<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
										<div className="site-navigation">
											<nav id="main-navigation">
												<ul id="menu-main-menu" className="menu">
													<li className="level-0 menu-item menu-item-has-children mega-menu current-menu-item">
														<Link href="index.html"><span className="menu-item-text">Home</span></Link>
														<div className="sub-menu">
															<div className="row">
																<div className="col-md-6">
																	<div className="menu-section">
																		<h2 className="sub-menu-title">Furniture 1</h2>
																		<ul className="menu-list">
																			<li>
																				<Link href="index.html"><span className="menu-item-text">Home Categories</span></Link>
																			</li>
																			<li>
																				<Link href="index2.html"><span className="menu-item-text">Home Clean</span></Link>
																			</li>
																			<li>
																				<Link href="index3.html"><span className="menu-item-text">Home Collection</span></Link>
																			</li>
																			<li>
																				<Link href="index4.html"><span className="menu-item-text">Home Grid</span></Link>
																			</li>
																			<li>
																				<Link href="index5.html"><span className="menu-item-text">Home Minimal</span></Link>
																			</li>
																			<li>
																				<Link href="index6.html"><span className="menu-item-text">Home Modern</span></Link>
																			</li>
																			<li>
																				<Link href="index7.html"><span className="menu-item-text">Home Stylish</span></Link>
																			</li>
																			<li>
																				<Link href="index8.html"><span className="menu-item-text">Home Unique</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="menu-section">
																		<h2 className="sub-menu-title">Furniture 2</h2>
																		<ul className="menu-list">
																			<li>
																				<Link href="index9.html"><span className="menu-item-text">Home Split</span></Link>
																			</li>
																			<li>
																				<Link href="index10.html"><span className="menu-item-text">Home Gothic</span></Link>
																			</li>
																			<li>
																				<Link href="index11.html"><span className="menu-item-text">Home Luxury</span></Link>
																			</li>
																			<li>
																				<Link href="index12.html"><span className="menu-item-text">Home Scandinavian</span></Link>
																			</li>
																			<li>
																				<Link href="index13.html"><span className="menu-item-text">Home Mid-Century</span></Link>
																			</li>
																			<li>
																				<Link href="index14.html"><span className="menu-item-text">Home Retro</span></Link>
																			</li>
																			<li>
																				<Link href="index15.html"><span className="menu-item-text">Home Color Block</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</li>
													<li className="level-0 menu-item menu-item-has-children">
														<Link href="shop-grid-left.html"><span className="menu-item-text">Shop</span></Link>
														<ul className="sub-menu">
															<li className="level-1 menu-item menu-item-has-children">
																<Link href="shop-grid-left.html"><span className="menu-item-text">Shop - Products</span></Link>
																<ul className="sub-menu">
																	<li>
																		<Link href="shop-grid-left.html"><span className="menu-item-text">Shop Grid - Left Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-list-left.html"><span className="menu-item-text">Shop List - Left Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-grid-right.html"><span className="menu-item-text">Shop Grid - Right Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-list-right.html"><span className="menu-item-text">Shop List - Right Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-grid-fullwidth.html"><span className="menu-item-text">Shop Grid - No Sidebar</span></Link>
																	</li>
																</ul>
															</li>
															<li>
																<Link href="shop-details.html"><span className="menu-item-text">Shop Details</span></Link>
															</li>
															<li>
																<Link href="shop-cart.html"><span className="menu-item-text">Shop - Cart</span></Link>
															</li>
															<li>
																<Link href="shop-checkout.html"><span className="menu-item-text">Shop - Checkout</span></Link>
															</li>
															<li>
																<Link href="shop-wishlist.html"><span className="menu-item-text">Shop - Wishlist</span></Link>
															</li>
														</ul>
													</li>
													<li className="level-0 menu-item menu-item-has-children mega-menu mega-menu-fullwidth align-center">
														<Link href="blog-grid-left.html"><span className="menu-item-text">Blog</span></Link>
														<div className="sub-menu">
															<div className="row">
																<div className="col-md-5">
																	<div className="menu-section">
																		<h2 className="sub-menu-title">Blog Category</h2>
																		<ul className="menu-list">
																			<li>
																				<Link href="blog-grid-left.html"><span className="menu-item-text">Blog Grid - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-grid-right.html"><span className="menu-item-text">Blog Grid - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-list-left.html"><span className="menu-item-text">Blog List - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-list-right.html"><span className="menu-item-text">Blog List - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-grid-fullwidth.html"><span className="menu-item-text">Blog Grid - No Sidebar</span></Link>
																			</li>
																		</ul>
																	</div>

																	<div className="menu-section">
																		<h2 className="sub-menu-title">Blog Details</h2>
																		<ul className="menu-list">
																			<li>
																				<Link href="blog-details-left.html"><span className="menu-item-text">Blog Details - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-details-right.html"><span className="menu-item-text">Blog Details - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-details-fullwidth.html"><span className="menu-item-text">Blog Details - No Sidebar</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-md-7">
																	<div className="menu-section">
																		<h2 className="sub-menu-title">Recent Posts</h2>
																		<div className="block block-posts recent-posts p-t-5">
																			<ul className="posts-list">
																				<li className="post-item">
																					<Link href="blog-details-right.html" className="post-image">
																						<img src={blog1} alt='blog' />
																					</Link>
																					<div className="post-content">
																						<h2 className="post-title">
																							<Link href="blog-details-right.html">
																								Easy Fixes For Home Decor
																							</Link>
																						</h2>
																						<div className="post-time">
																							<span className="post-date">May 30, 2022</span>
																							<span className="post-comment">4 Comments</span>
																						</div>
																					</div>
																				</li>
																				<li className="post-item">
																					<Link href="blog-details-right.html" className="post-image">
																						<img src={blog2} alt='blog2' />
																					</Link>
																					<div className="post-content">
																						<h2 className="post-title">
																							<Link href="blog-details-right.html">
																								How To Make Your Home A Showplace
																							</Link>
																						</h2>
																						<div className="post-time">
																							<span className="post-date">Aug 24, 2022</span>
																							<span className="post-comment">2 Comments</span>
																						</div>
																					</div>
																				</li>
																				<li className="post-item">
																					<Link href="blog-details-right.html" className="post-image">
																						<img src={blog3} alt='blog3' />
																					</Link>
																					<div className="post-content">
																						<h2 className="post-title">
																							<Link href="blog-details-right.html">
																								Stunning Furniture With Aesthetic Appeal
																							</Link>
																						</h2>
																						<div className="post-time">
																							<span className="post-date">Dec 06, 2022</span>
																							<span className="post-comment">1 Comment</span>
																						</div>
																					</div>
																				</li>
																			</ul>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</li>
													<li className="level-0 menu-item menu-item-has-children">
														<Link href="#"><span className="menu-item-text">Pages</span></Link>
														<ul className="sub-menu">
															<li>
																<Link href="page-login.html"><span className="menu-item-text">Login / Register</span></Link>
															</li>
															<li>
																<Link href="page-forgot-password.html"><span className="menu-item-text">Forgot Password</span></Link>
															</li>
															<li>
																<Link href="page-my-account.html"><span className="menu-item-text">My Account</span></Link>
															</li>
															<li>
																<Link href="page-about.html"><span className="menu-item-text">About Us</span></Link>
															</li>
															<li>
																<Link href="page-contact.html"><span className="menu-item-text">Contact</span></Link>
															</li>
															<li>
																<Link href="page-faq.html"><span className="menu-item-text">FAQ</span></Link>
															</li>
															<li>
																<Link href="page-404.html"><span className="menu-item-text">Page 404</span></Link>
															</li>
														</ul>
													</li>
													<li className="level-0 menu-item">
														<Link href="page-contact.html"><span className="menu-item-text">Contact</span></Link>
													</li>
												</ul>
											</nav>
										</div>
									</div>

									<div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 header-right">
										<div className="header-page-link">
										
											<div className="login-header">
												<Link className="active-login" href="#">Login</Link>
												<div className="form-login-register">
													<div className="box-form-login">
														<div className="active-login"></div>
														<div className="box-content">
															<div className="form-login active">
																<form id="login_ajax" method="post" className="login">
																	<h2>Sign in</h2>
																	<p className="status"></p>
																	<div className="content">
																		<div className="username">
																			<input type="text" required="required" className="input-text" name="username" id="username" placeholder="Your name"/>
																		</div>
																		<div className="password">
																			<input className="input-text" required="required" type="password" name="password" id="password" placeholder="Password"/>
																		</div>
																		<div className="rememberme-lost">
																			<div className="rememberme">
																				<input name="rememberme" type="checkbox" id="rememberme" value="forever"/>
																				<label htmlFor="rememberme" className="inline">Remember me</label>
																			</div>
																			<div className="lost_password">
																				<Link href="forgot-password.html">Lost your password?</Link>
																			</div>
																		</div>
																		<div className="button-login">
																			<input type="submit" className="button" name="login" value="Login"/>
																		</div>
																		<div className="button-next-reregister">Create An Account</div>
																	</div>						
																</form>
															</div>
															<div className="form-register">
																<form method="post" className="register">
																	<h2>REGISTER</h2>
																	<div className="content">
																		<div className="email">
																			<input type="email" className="input-text" placeholder="Email" name="email" id="reg_email" value=""/>
																		</div>
																		<div className="password">
																			<input type="password" className="input-text" placeholder="Password" name="password" id="reg_password"/>
																		</div>															
																		<div className="button-register">
																			<input type="submit" className="button" name="register" value="Register"/>
																		</div>
																		<div className="button-next-login">Already has an account</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>

										
											<div className="search-box">
												<div className="search-toggle"><i className="icon-search"></i></div>
											</div>
											
											
											<div className="wishlist-box">
												<Link href="shop-wishlist.html"><i className="icon-heart"></i></Link>
												<span className="count-wishlist">1</span>
											</div>
										
											<div className="ruper-topcart dropdown light">
												<div className="dropdown mini-cart top-cart">
													<div className="remove-cart-shadow"></div>
													<Link className="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														<div className="icons-cart"><i className="icon-large-paper-bag"></i><span className="cart-count">2</span></div>
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
																<div className="total-percent"><div className="percent" style={{width:"20%"}}></div></div>
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
				</div>
			</header>
    </div>
  )
}

export default SiteHeader