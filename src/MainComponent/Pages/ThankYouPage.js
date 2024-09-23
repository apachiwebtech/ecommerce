import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';
import check from '../../assets/images/check.png';
import { useLocation } from 'react-router-dom';

const ThankYou = () => {

    const Name = localStorage.getItem('Name')
    const OrderNo = Cookies.get('orderno')

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionid');
   
    console.log(transactionId)

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
                                                <p>Dear <b>{Name}</b> ,Your transactionid is <b>{transactionId}</b> ,Your Order No is <b>#{OrderNo}</b> and your shipment will process soon...</p>
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