import React from 'react'
import Support from '../../assets/frontimg/MCSC2.png'
import Artisanal from '../../assets/frontimg/MCSC3.png'
import Customisation from '../../assets/frontimg/MCSC4.png'
import Delivery from '../../assets/frontimg/MCSC1.png'
import { Box } from '@mui/material'
const AmenitiesSection = () => {
    return (
        <section class="section section-padding m-b-70">
            <div class="section-container">

                <div class="block block-feature">
                    <div class="block-widget-wrap">
                        <div class="row lg-m-lr">
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                        <img style={{width: "40px"}} src={Customisation} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                        Customisation & Consultation

                                        </h3>
                                        {/* <p class="box-description">
                                            You will love at great low prices
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={Artisanal} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                        Artisanal Brands
                                        </h3>
                                        {/* <p class="box-description">
                                            Pay with Multiple Credit Cards
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={Support} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                        Online Support
                                        </h3>
                                        {/* <p class="box-description">
                                            Within 30 days for an exchange.
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={Delivery} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                        Hassle-Free Delivery
                                        </h3>
                                        {/* <p class="box-description">
                                            24 hours a day, 7 days a week
                                        </p> */}
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

export default AmenitiesSection