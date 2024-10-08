import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";
import useBreadcrumb from '../../Utils/Breadcrum';

const ShippingPolicy = () => {

    const [data, setData] = useState([])
    const [metadata, setMeta] = useState([])

    const breaddata = useBreadcrumb()
    
    async function getmetadetail_policy() {

        axios.get(`${BASE_URL}/getfaq`, data)
            .then((res) => {
                setData(res.data)
            })
    }

    async function getmetadetail() {
        const data = {
            page_id: 11
        }
        axios.post(`${BASE_URL}/getmetadetail`, data)
            .then((res) => {
                setMeta(res.data[0])
            })
    }

    useEffect(() => {
        getmetadetail()
    }, [])

    return (
        <div>
            <div id="site-main" class="site-main">
                <Helmet>
                    <title>{metadata.seo_title}</title>
                    <meta name="description" content={metadata.seo_desc} dangerouslySetInnerHTML={{ __html: metadata.seo_desc }} />
                    <meta name="author" content={metadata.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">
                    <div id="title" className="page-title" style={{backgroundImage:`url('${IMG_URL}/Breadcrumbs/${breaddata.upload_image}')`}}>
                            <div class="section-container">
                                <div class="content-title-heading">
                                    <h1 class="text-title-heading">
                                        Shipping Policy
                                    </h1>
                                </div>
                                <div class="breadcrumbs">
                                    <a href="index.html">Home</a><span class="delimiter"></span>Shipping Policy
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">


                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="">
                                            <div class="block-widget-wrap">



                                                <div class="">
                                                    <h2>Shipping Policy</h2>
                                                    <p>
                                                        Processing Time
                                                        All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
                                                        If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email or phone.
                                                        Shipping Time
                                                        Domestic Shipping: Orders will be delivered within 3 to 4 weeks from the date of order confirmation.
                                                        Please note that delivery times may be affected by factors beyond our control, such as weather conditions, customs delays, and other unforeseen circumstances.</p>
                                                    <hr />
                                                </div>


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

export default ShippingPolicy;