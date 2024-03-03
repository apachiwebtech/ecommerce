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
        	<header id="site-header" class="site-header header-v1">
				<div class="header-mobile">
					<div class="section-padding">
						<div class="section-container">
							<div class="row">
								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
									<div class="navbar-header">
										<button type="button" id="show-megamenu" class="navbar-toggle"></button>
									</div>
								</div>
								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
									<div class="site-logo">
										<Link href="index.html">
											<img  width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
										</Link>
									</div>
								</div>
								<div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
									<div class="ruper-topcart dropdown">
										<div class="dropdown mini-cart top-cart">
											<div class="remove-cart-shadow"></div>
											<Link class="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<div class="icons-cart"><i class="icon-large-paper-bag"></i><span class="cart-count">2</span></div>
											</Link>
											<div class="dropdown-menu cart-popup">
												<div class="cart-empty-wrap">
													<ul class="cart-list">
														<li class="empty">
															<span>No products in the cart.</span>
															<Link class="go-shop" href="shop-grid-left.html">GO TO SHOP<i aria-hidden="true" class="arrow_right"></i></Link>
														</li>
													</ul>
												</div>
												<div class="cart-list-wrap">
													<ul class="cart-list ">
														<li class="mini-cart-item">
															<Link href="#" class="remove" title="Remove this item"><i class="icon_close"></i></Link>
															<Link href="shop-details.html" class="product-image"><img width="600" height="600" src={product3} alt="" /></Link>
															<Link href="shop-details.html" class="product-name">Chair Oak Matt Lacquered</Link>		
															<div class="quantity">Qty: 1</div>
															<div class="price">$150.00</div>
														</li>
														<li class="mini-cart-item">
															<Link href="#" class="remove" title="Remove this item"><i class="icon_close"></i></Link>													
															<Link href="shop-details.html" class="product-image"><img width="600" height="600" src={product1} alt="" /></Link>
															<Link href="shop-details.html" class="product-name">Zunkel Schwarz</Link>
															<div class="quantity">Qty: 1</div>
															<div class="price">$100.00</div>						
														</li>
													</ul>
													<div class="total-cart">
														<div class="title-total">Total: </div>
														<div class="total-price"><span>$100.00</span></div>
													</div>
													<div class="free-ship">
														<div class="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
														<div class="total-percent"><div class="percent" style={{width:"20%"}}></div></div>
													</div>
													<div class="buttons">
														<Link href="shop-cart.html" class="button btn view-cart btn-primary">View cart</Link>
														<Link href="shop-checkout.html" class="button btn checkout btn-default">Check out</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="header-mobile-fixed">
					
						<div class="shop-page">
							<Link href="shop-grid-left.html"><i class="wpb-icon-shop"></i></Link>
						</div>

						
						<div class="my-account">
							<div class="login-header">
								<Link href="page-my-account.html"><i class="wpb-icon-user"></i></Link>
							</div>
						</div>

					
						<div class="search-box">
							<div class="search-toggle"><i class="wpb-icon-magnifying-glass"></i></div>
						</div>

					
						<div class="wishlist-box">
							<Link href="shop-wishlist.html"><i class="wpb-icon-heart"></i></Link>
						</div>
					</div>
				</div>

				<div class="header-desktop">
					<div class="header-wrapper">
						<div class="section-padding">
							<div class="section-container p-l-r">
								<div class="row">
									<div class="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12 header-left">
										<div class="site-logo">
											<Link href="index.html">
												<img width="400" height="79" src={logo} alt="Ruper – Furniture HTML Theme" />
											</Link>
										</div>
									</div>

									<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
										<div class="site-navigation">
											<nav id="main-navigation">
												<ul id="menu-main-menu" class="menu">
													<li class="level-0 menu-item menu-item-has-children mega-menu current-menu-item">
														<Link href="index.html"><span class="menu-item-text">Home</span></Link>
														<div class="sub-menu">
															<div class="row">
																<div class="col-md-6">
																	<div class="menu-section">
																		<h2 class="sub-menu-title">Furniture 1</h2>
																		<ul class="menu-list">
																			<li>
																				<Link href="index.html"><span class="menu-item-text">Home Categories</span></Link>
																			</li>
																			<li>
																				<Link href="index2.html"><span class="menu-item-text">Home Clean</span></Link>
																			</li>
																			<li>
																				<Link href="index3.html"><span class="menu-item-text">Home Collection</span></Link>
																			</li>
																			<li>
																				<Link href="index4.html"><span class="menu-item-text">Home Grid</span></Link>
																			</li>
																			<li>
																				<Link href="index5.html"><span class="menu-item-text">Home Minimal</span></Link>
																			</li>
																			<li>
																				<Link href="index6.html"><span class="menu-item-text">Home Modern</span></Link>
																			</li>
																			<li>
																				<Link href="index7.html"><span class="menu-item-text">Home Stylish</span></Link>
																			</li>
																			<li>
																				<Link href="index8.html"><span class="menu-item-text">Home Unique</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
																<div class="col-md-6">
																	<div class="menu-section">
																		<h2 class="sub-menu-title">Furniture 2</h2>
																		<ul class="menu-list">
																			<li>
																				<Link href="index9.html"><span class="menu-item-text">Home Split</span></Link>
																			</li>
																			<li>
																				<Link href="index10.html"><span class="menu-item-text">Home Gothic</span></Link>
																			</li>
																			<li>
																				<Link href="index11.html"><span class="menu-item-text">Home Luxury</span></Link>
																			</li>
																			<li>
																				<Link href="index12.html"><span class="menu-item-text">Home Scandinavian</span></Link>
																			</li>
																			<li>
																				<Link href="index13.html"><span class="menu-item-text">Home Mid-Century</span></Link>
																			</li>
																			<li>
																				<Link href="index14.html"><span class="menu-item-text">Home Retro</span></Link>
																			</li>
																			<li>
																				<Link href="index15.html"><span class="menu-item-text">Home Color Block</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</li>
													<li class="level-0 menu-item menu-item-has-children">
														<Link href="shop-grid-left.html"><span class="menu-item-text">Shop</span></Link>
														<ul class="sub-menu">
															<li class="level-1 menu-item menu-item-has-children">
																<Link href="shop-grid-left.html"><span class="menu-item-text">Shop - Products</span></Link>
																<ul class="sub-menu">
																	<li>
																		<Link href="shop-grid-left.html"><span class="menu-item-text">Shop Grid - Left Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-list-left.html"><span class="menu-item-text">Shop List - Left Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-grid-right.html"><span class="menu-item-text">Shop Grid - Right Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-list-right.html"><span class="menu-item-text">Shop List - Right Sidebar</span></Link>
																	</li>
																	<li>
																		<Link href="shop-grid-fullwidth.html"><span class="menu-item-text">Shop Grid - No Sidebar</span></Link>
																	</li>
																</ul>
															</li>
															<li>
																<Link href="shop-details.html"><span class="menu-item-text">Shop Details</span></Link>
															</li>
															<li>
																<Link href="shop-cart.html"><span class="menu-item-text">Shop - Cart</span></Link>
															</li>
															<li>
																<Link href="shop-checkout.html"><span class="menu-item-text">Shop - Checkout</span></Link>
															</li>
															<li>
																<Link href="shop-wishlist.html"><span class="menu-item-text">Shop - Wishlist</span></Link>
															</li>
														</ul>
													</li>
													<li class="level-0 menu-item menu-item-has-children mega-menu mega-menu-fullwidth align-center">
														<Link href="blog-grid-left.html"><span class="menu-item-text">Blog</span></Link>
														<div class="sub-menu">
															<div class="row">
																<div class="col-md-5">
																	<div class="menu-section">
																		<h2 class="sub-menu-title">Blog Category</h2>
																		<ul class="menu-list">
																			<li>
																				<Link href="blog-grid-left.html"><span class="menu-item-text">Blog Grid - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-grid-right.html"><span class="menu-item-text">Blog Grid - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-list-left.html"><span class="menu-item-text">Blog List - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-list-right.html"><span class="menu-item-text">Blog List - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-grid-fullwidth.html"><span class="menu-item-text">Blog Grid - No Sidebar</span></Link>
																			</li>
																		</ul>
																	</div>

																	<div class="menu-section">
																		<h2 class="sub-menu-title">Blog Details</h2>
																		<ul class="menu-list">
																			<li>
																				<Link href="blog-details-left.html"><span class="menu-item-text">Blog Details - Left Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-details-right.html"><span class="menu-item-text">Blog Details - Right Sidebar</span></Link>
																			</li>
																			<li>
																				<Link href="blog-details-fullwidth.html"><span class="menu-item-text">Blog Details - No Sidebar</span></Link>
																			</li>
																		</ul>
																	</div>
																</div>
																<div class="col-md-7">
																	<div class="menu-section">
																		<h2 class="sub-menu-title">Recent Posts</h2>
																		<div class="block block-posts recent-posts p-t-5">
																			<ul class="posts-list">
																				<li class="post-item">
																					<Link href="blog-details-right.html" class="post-image">
																						<img src={blog1} alt='blog' />
																					</Link>
																					<div class="post-content">
																						<h2 class="post-title">
																							<Link href="blog-details-right.html">
																								Easy Fixes For Home Decor
																							</Link>
																						</h2>
																						<div class="post-time">
																							<span class="post-date">May 30, 2022</span>
																							<span class="post-comment">4 Comments</span>
																						</div>
																					</div>
																				</li>
																				<li class="post-item">
																					<Link href="blog-details-right.html" class="post-image">
																						<img src={blog2} alt='blog2' />
																					</Link>
																					<div class="post-content">
																						<h2 class="post-title">
																							<Link href="blog-details-right.html">
																								How To Make Your Home A Showplace
																							</Link>
																						</h2>
																						<div class="post-time">
																							<span class="post-date">Aug 24, 2022</span>
																							<span class="post-comment">2 Comments</span>
																						</div>
																					</div>
																				</li>
																				<li class="post-item">
																					<Link href="blog-details-right.html" class="post-image">
																						<img src={blog3} alt='blog3' />
																					</Link>
																					<div class="post-content">
																						<h2 class="post-title">
																							<Link href="blog-details-right.html">
																								Stunning Furniture With Aesthetic Appeal
																							</Link>
																						</h2>
																						<div class="post-time">
																							<span class="post-date">Dec 06, 2022</span>
																							<span class="post-comment">1 Comment</span>
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
													<li class="level-0 menu-item menu-item-has-children">
														<Link href="#"><span class="menu-item-text">Pages</span></Link>
														<ul class="sub-menu">
															<li>
																<Link href="page-login.html"><span class="menu-item-text">Login / Register</span></Link>
															</li>
															<li>
																<Link href="page-forgot-password.html"><span class="menu-item-text">Forgot Password</span></Link>
															</li>
															<li>
																<Link href="page-my-account.html"><span class="menu-item-text">My Account</span></Link>
															</li>
															<li>
																<Link href="page-about.html"><span class="menu-item-text">About Us</span></Link>
															</li>
															<li>
																<Link href="page-contact.html"><span class="menu-item-text">Contact</span></Link>
															</li>
															<li>
																<Link href="page-faq.html"><span class="menu-item-text">FAQ</span></Link>
															</li>
															<li>
																<Link href="page-404.html"><span class="menu-item-text">Page 404</span></Link>
															</li>
														</ul>
													</li>
													<li class="level-0 menu-item">
														<Link href="page-contact.html"><span class="menu-item-text">Contact</span></Link>
													</li>
												</ul>
											</nav>
										</div>
									</div>

									<div class="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 header-right">
										<div class="header-page-link">
										
											<div class="login-header">
												<Link class="active-login" href="#">Login</Link>
												<div class="form-login-register">
													<div class="box-form-login">
														<div class="active-login"></div>
														<div class="box-content">
															<div class="form-login active">
																<form id="login_ajax" method="post" class="login">
																	<h2>Sign in</h2>
																	<p class="status"></p>
																	<div class="content">
																		<div class="username">
																			<input type="text" required="required" class="input-text" name="username" id="username" placeholder="Your name"/>
																		</div>
																		<div class="password">
																			<input class="input-text" required="required" type="password" name="password" id="password" placeholder="Password"/>
																		</div>
																		<div class="rememberme-lost">
																			<div class="rememberme">
																				<input name="rememberme" type="checkbox" id="rememberme" value="forever"/>
																				<label for="rememberme" class="inline">Remember me</label>
																			</div>
																			<div class="lost_password">
																				<Link href="forgot-password.html">Lost your password?</Link>
																			</div>
																		</div>
																		<div class="button-login">
																			<input type="submit" class="button" name="login" value="Login"/>
																		</div>
																		<div class="button-next-reregister">Create An Account</div>
																	</div>						
																</form>
															</div>
															<div class="form-register">
																<form method="post" class="register">
																	<h2>REGISTER</h2>
																	<div class="content">
																		<div class="email">
																			<input type="email" class="input-text" placeholder="Email" name="email" id="reg_email" value=""/>
																		</div>
																		<div class="password">
																			<input type="password" class="input-text" placeholder="Password" name="password" id="reg_password"/>
																		</div>															
																		<div class="button-register">
																			<input type="submit" class="button" name="register" value="Register"/>
																		</div>
																		<div class="button-next-login">Already has an account</div>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>
											</div>

										
											<div class="search-box">
												<div class="search-toggle"><i class="icon-search"></i></div>
											</div>
											
											
											<div class="wishlist-box">
												<Link href="shop-wishlist.html"><i class="icon-heart"></i></Link>
												<span class="count-wishlist">1</span>
											</div>
										
											<div class="ruper-topcart dropdown light">
												<div class="dropdown mini-cart top-cart">
													<div class="remove-cart-shadow"></div>
													<Link class="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														<div class="icons-cart"><i class="icon-large-paper-bag"></i><span class="cart-count">2</span></div>
													</Link>
													<div class="dropdown-menu cart-popup">
														<div class="cart-empty-wrap">
															<ul class="cart-list">
																<li class="empty">
																	<span>No products in the cart.</span>
																	<Link class="go-shop" href="shop-grid-left.html">GO TO SHOP<i aria-hidden="true" class="arrow_right"></i></Link>
																</li>
															</ul>
														</div>
														<div class="cart-list-wrap">
															<ul class="cart-list ">
																<li class="mini-cart-item">
																	<Link href="#" class="remove" title="Remove this item"><i class="icon_close"></i></Link>
																	<Link href="shop-details.html" class="product-image"><img width="600" height="600" src={product3} alt="pro" /></Link>
																	<Link href="shop-details.html" class="product-name">Chair Oak Matt Lacquered</Link>		
																	<div class="quantity">Qty: 1</div>
																	<div class="price">$150.00</div>
																</li>
																<li class="mini-cart-item">
																	<Link href="#" class="remove" title="Remove this item"><i class="icon_close"></i></Link>													
																	<Link href="shop-details.html" class="product-image"><img width="600" height="600" src={product1} alt="pro" /></Link>
																	<Link href="shop-details.html" class="product-name">Zunkel Schwarz</Link>
																	<div class="quantity">Qty: 1</div>
																	<div class="price">$100.00</div>						
																</li>
															</ul>
															<div class="total-cart">
																<div class="title-total">Total: </div>
																<div class="total-price"><span>$100.00</span></div>
															</div>
															<div class="free-ship">
																<div class="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
																<div class="total-percent"><div class="percent" style={{width:"20%"}}></div></div>
															</div>
															<div class="buttons">
																<Link href="shop-cart.html" class="button btn view-cart btn-primary">View cart</Link>
																<Link href="shop-checkout.html" class="button btn checkout btn-default">Check out</Link>
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