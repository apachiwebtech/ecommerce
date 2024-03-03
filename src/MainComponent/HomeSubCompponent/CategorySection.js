import React from 'react'
import procat1 from '../../assets/frontimg/banner/product-cat-1.jpg'
import procat2 from '../../assets/frontimg/banner/product-cat-2.jpg'
import procat3 from '../../assets/frontimg/banner/product-cat-3.jpg'
import procat4 from '../../assets/frontimg/banner/product-cat-4.jpg'

const CategorySection = () => {
  return (
    <section class="section section-padding m-b-60">
    <div class="section-container">

      <div class="block block-banners layout-1 banners-effect">
        <div class="section-row">
          <div class="section-column left sm-m-b">
            <div class="section-column-wrap">
              <div class="block-widget-wrap">
                <div class="block-widget-banner layout-1">
                  <div class="bg-banner">
                    <div class="banner-wrapper banners">
                      <div class="banner-image">
                        <a href="shop-grid-left.html">
                          <img width="571" height="622" src={procat1} alt="Banner" />
                        </a>
                      </div>
                      <div class="banner-wrapper-infor">
                        <div class="info">
                          <div class="content">
                            <a class="button button-white" href="shop-grid-left.html">Furniture</a>
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
              <div class="block-widget-wrap p-0">
                <div class="block-section m-b-15">
                  <div class="section-container">
                    <div class="section-row">
                      <div class="section-column column-50 sm-m-b">
                        <div class="block-widget-wrap">
                          <div class="block-widget-banner layout-1">
                            <div class="bg-banner">
                              <div class="banner-wrapper banners">
                                <div class="banner-image">
                                  <a href="shop-grid-left.html">
                                    <img width="406" height="304" src={procat2} alt="Banner" />
                                  </a>
                                </div>
                                <div class="banner-wrapper-infor">
                                  <div class="info">
                                    <div class="content">
                                      <a class="button button-white" href="shop-grid-left.html">Lighting</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="section-column column-50">
                        <div class="block-widget-wrap">
                          <div class="block-widget-banner layout-1">
                            <div class="bg-banner">
                              <div class="banner-wrapper banners">
                                <div class="banner-image">
                                  <a href="shop-grid-left.html">
                                    <img width="406" height="304" src={procat3} alt="Banner" />
                                  </a>
                                </div>
                                <div class="banner-wrapper-infor">
                                  <div class="info">
                                    <div class="content">
                                      <a class="button button-white" href="shop-grid-left.html">Modern</a>
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
                <div class="block-section">
                  <div class="section-container">
                    <div class="section-row">
                      <div class="section-column">
                        <div class="block-widget-wrap">
                          <div class="block-widget-banner layout-1">
                            <div class="bg-banner">
                              <div class="banner-wrapper banners">
                                <div class="banner-image">
                                  <a href="shop-grid-left.html">
                                    <img width="406" height="304" src={procat4} alt="Banner" />
                                  </a>
                                </div>
                                <div class="banner-wrapper-infor">
                                  <div class="info">
                                    <div class="content">
                                      <a class="button button-white" href="shop-grid-left.html">Accessories</a>
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
        </div>
      </div>
    </div>
  </section>
  )
}

export default CategorySection