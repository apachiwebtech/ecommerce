import React from 'react'
import logo from '../../assets/frontimg/logo.png'
import payments from '../../assets/frontimg/payments.png'
import '../../Style.css'
const SiteFooter = () => {
	const handleTop = () =>{
		window.scrollTo(0, 0);
	}
	return (
		<div>
			<footer id="site-footer" className="site-footer">
				<div className="footer">
					<div className="section-padding">
						<div className="section-container">
							<div className="block-widget-wrap">
								<div className="row">
									<div className="col-lg-3 col-md-6">
										<div className="block block-image">
											<img width="100" src={logo} alt="logo.png" />
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-menu">
											<h2 className="block-title">Contact Us</h2>
											<div className="block-content">
												<ul>
													<li>
														<a href="page-contact.html">616.774.0561</a>
													</li>
													<li>
														<a href="page-contact.html">866.453.4748</a>
													</li>
													<li>
														<a href="page-contact.html">HR Fax: 810.222.5439</a>
													</li>
													<li>
														<a href="page-contact.html">sales@ruperfurniture.com</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-menu">
											<h2 className="block-title">Services</h2>
											<div className="block-content">
												<ul>
													<li>
														<a href="page-about.html">Sale</a>
													</li>
													<li>
														<a href="page-about.html">Quick Ship</a>
													</li>
													<li>
														<a href="page-about.html">New Designs</a>
													</li>
													<li>
														<a href="page-about.html">Accidental Fabric Protection</a>
													</li>
													<li>
														<a href="page-about.html">Furniture Care</a>
													</li>
													<li>
														<a href="page-about.html">Gift Cards</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-newsletter">
											<h2 className="block-title">Newsletter</h2>
											<div className="block-content">
												<div className="newsletter-text">Enter your email below to be the first to know about new collections and product launches.</div>
												<form action="" method="post" className="newsletter-form">
													<input type="email" name="your-email" value="" size="40" placeholder="Email address" />
													<span className="btn-submit">
														<input type="submit" value="Subscribe" />
													</span>
												</form>
											</div>
										</div>

										<div className="block block-image">
											<img width="400" height="79" src={payments} alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="back-top button-show" onClick={handleTop}>
					<i class="arrow_carrot-up"></i>
				</div>


				<div className="footer-bottom">
					<div className="section-padding">
						<div className="section-container">
							<div className="block-widget-wrap">
								<div className="row">
									<div className="col-md-6">
										<div className="footer-left">
											<p className="copyright">Copyright © 2022. All Right Reserved</p>
										</div>
									</div>
									<div className="col-md-6">
										<div className="footer-right">
											<div className="block block-social">
												<ul className="social-link">
													<li><a href="#"><i className="fa fa-twitter"></i></a></li>
													<li><a href="#"><i className="fa fa-instagram"></i></a></li>
													<li><a href="#"><i className="fa fa-dribbble"></i></a></li>
													<li><a href="#"><i className="fa fa-behance"></i></a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default SiteFooter