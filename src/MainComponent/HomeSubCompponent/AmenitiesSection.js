import React from 'react'
import retun from '../../assets/frontimg/return.png'
import payment from '../../assets/frontimg/wallet.png'
import shipping from '../../assets/frontimg/box.png'
import support from '../../assets/frontimg/support.png'
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
                                        <img style={{width: "40px"}} src={shipping} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                            Free Shipping
                                        </h3>
                                        <p class="box-description">
                                            You will love at great low prices
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={payment} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                            Flexible Payment
                                        </h3>
                                        <p class="box-description">
                                            Pay with Multiple Credit Cards
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={retun} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                            14 Day Returns
                                        </h3>
                                        <p class="box-description">
                                            Within 30 days for an exchange.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 md-b-15 lg-p-lr">
                                <div class="box">
                                    <div class="box-icon">
                                    <img style={{width: "40px"}} src={support} alt='' />
                                    </div>
                                    <div class="box-title-wrap">
                                        <h3 class="box-title">
                                            Online Support
                                        </h3>
                                        <p class="box-description">
                                            24 hours a day, 7 days a week
                                        </p>
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