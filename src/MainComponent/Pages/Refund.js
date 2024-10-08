import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";

const Refund = () => {

    const [data, setData] = useState([])
    const [metadata, setMeta] = useState([])


    async function getmetadetail_refund() {

        axios.get(`${BASE_URL}/getfaq`, data)
            .then((res) => {
                setData(res.data)
            })
    }

    async function getmetadetail() {
        const data = {
            page_id: 10
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
                        <div id="title" class="page-title">
                            <div class="section-container">
                                <div class="content-title-heading">
                                    <h1 class="text-title-heading">
                                        Return & Refund
                                    </h1>
                                </div>
                                <div class="breadcrumbs">
                                    <a href="index.html">Home</a><span class="delimiter"></span>Return & Refund
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
                                                    <h2>Return & Refund</h2>
                                                    <p> We have a 5-day return policy, which means you have 5 days after receiving your item to request a return.

                                                        Refunds
                                                        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                                                        If more than 15 business days have passed since we’ve approved your return, please contact us at</p>
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

export default Refund;