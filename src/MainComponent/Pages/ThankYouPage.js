import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";
import check from '../../assets/images/check.png'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'


const ThankYou = () => {

    const Name = localStorage.getItem('Name')
    const OrderNo = Cookies.get('orderno')
    return (
        <div>
            <div id="site-main" class="site-main">

                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">


                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="">
                                            <div class="block-widget-wrap text-center my-5">
                                                <img src={check} style={{width : "100px"}} alt='logo' />
                                                <h1 className='my-2'>Thank You </h1>
                                                <p>Dear <b>{Name}</b> ,Your Order No is <b>#{OrderNo}</b> and your shipment will process soon...</p>
                                                <Link style={{color : "blue",textDecoration : "underline"}} to="/profile/order">Click here to check more details</Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThankYou;