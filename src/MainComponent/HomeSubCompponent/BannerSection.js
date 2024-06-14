import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import { Link } from 'react-router-dom';
const BannerSection = () => {
    const [banner, setBanner] = useState([])

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
                console.log(res.data)
                setBanner(res.data)
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

                    {banner?.map((item) => {
                        return (
                            <div class="item slick-slide">
                                <div class="item-content">
                                    <div class="content-image">
                                        <img width="1920" height="1080" src={`${IMG_URL}/banner/${item.upload_image}`}  alt="Slider" />
                                    </div>
                                    <div class="section-padding">
                                        <div class="section-container">
                                            <div class="item-info horizontal-start vertical-middle">
                                                <div class="content">
                                                    {/* <div class="subtitle-slider">20%OFF.END MONDAY</div> */}
                                                    <h2 class="title-slider">{item.title}</h2>
                                                    <div class="description-slider">{item.description} </div>
                                                    <Link to={item.link} class="button-slider button-white" target={item.target} >SHOP NOW</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )


                    })}

                
                </Slider>




            </div>
        </section>
    )
}

export default BannerSection