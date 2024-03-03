import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../assets/frontimg/slider/1.jpg'
import slider2 from '../../assets/frontimg/slider/2.jpg'
import slider3 from '../../assets/frontimg/slider/3.jpg'
import { BASE_URL } from '../../AdminComponent/BaseUrl';
import axios from 'axios';
const BannerSection = () => {
    const [data, setData] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    async function getTrendingData() {
        axios.get(`${BASE_URL}/main_Banner`)
            .then((res) => {
                console.log(res)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTrendingData()
    }, [])


    return (
        <section class="section">

            <div class="block block-sliders">
                <Slider {...settings}>

                    {data.map((item) => {
                        return (
                            <div class="item slick-slide">
                                <div class="item-content">
                                    <div class="content-image">
                                        <img width="1920" height="1080" src={slider2} alt="Slider" />
                                    </div>
                                    <div class="section-padding">
                                        <div class="section-container">
                                            <div class="item-info horizontal-start vertical-middle">
                                                <div class="content">
                                                    <div class="subtitle-slider">20%OFF.END MONDAY</div>
                                                    <h2 class="title-slider">Interior lighting</h2>
                                                    <div class="description-slider">Save up to $500 on outdoor packages </div>
                                                    <a class="button-slider button-white" href="shop-grid-left.html">SHOP NOW</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )


                    })}

                    <div class="item slick-slide">
                        <div class="item-content">
                            <div class="content-image">
                                <img width="1920" height="1080" src={slider1} alt="Slider" />
                            </div>
                            <div class="section-padding">
                                <div class="section-container">
                                    <div class="item-info horizontal-start vertical-middle">
                                        <div class="content">
                                            <div class="subtitle-slider">20%OFF.END MONDAY</div>
                                            <h2 class="title-slider">Chair Collection</h2>
                                            <div class="description-slider">Save up to $500 on outdoor packages </div>
                                            <a class="button-slider button-white" href="shop-grid-left.html">SHOP NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="item slick-slide">
                        <div class="item-content">
                            <div class="content-image">
                                <img width="1920" height="1080" src={slider3} alt="Slider" />
                            </div>
                            <div class="section-padding">
                                <div class="section-container">
                                    <div class="item-info horizontal-start vertical-middle">
                                        <div class="content">
                                            <div class="subtitle-slider">20%OFF.END MONDAY</div>
                                            <h2 class="title-slider">Home office</h2>
                                            <div class="description-slider">Save up to $500 on outdoor packages </div>
                                            <a class="button-slider button-white" href="shop-grid-left.html">SHOP NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>




            </div>
        </section>
    )
}

export default BannerSection