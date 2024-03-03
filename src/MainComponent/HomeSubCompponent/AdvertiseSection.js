import React from 'react'
import banner1 from '../../assets/frontimg/banner/banner-1.jpg'
import banner2 from '../../assets/frontimg/banner/banner-2.jpg'

const AdvertiseSection = () => {
  return (
    <div>
           <section class="section section-padding m-b-70">
								<div class="section-container">
							
									<div class="block block-banners layout-2 banners-effect">
										<div class="section-row">
											<div class="section-column left sm-m-b">
												<div class="section-column-wrap">
													<div class="block-widget-wrap">
														<div class="block-widget-banner layout-2">
															<div class="bg-banner">
																<div class="banner-wrapper banners">
																	<div class="banner-image">
																		<a href="shop-grid-left.html">
																			<img width="825" height="475" src={banner1} alt="Banner" />
																		</a>
																	</div>
																	<div class="banner-wrapper-infor">
																		<div class="info">
																			<div class="content">
																				<a class="link-title" href="shop-grid-left.html">
																					<h3 class="title-banner">Let the adventure<br/> begin. </h3>
																				</a>
																				<div class="banner-image-description">
																					Sed lectus. Aliquam lorem ante, <br/>dapibus in, viverra quis, feugiat a, tellus
																				</div>
																				<a class="button button-outline" href="shop-grid-left.html">SHOP NOW</a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="section-column right">
												<div class="section-column-wrap">
													<div class="block-widget-wrap">
														<div class="block-widget-banner layout-3">
															<div class="bg-banner">
																<div class="banner-wrapper banners">
																	<div class="banner-image">
																		<a href="shop-grid-left.html">
																			<img width="571" height="475" src={banner2} alt="Banner" />
																		</a>
																	</div>
																	<div class="banner-wrapper-infor">
																		<div class="info">
																			<div class="content">
																				<a class="link-title" href="shop-grid-left.html">
																					<h3 class="title-banner">UP TO <span>20% OFF</span></h3>
																				</a>
																				<div class="banner-image-description">
																					Don't miss savings on bedroom, living,
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
							</section>
    </div>
  )
}

export default AdvertiseSection