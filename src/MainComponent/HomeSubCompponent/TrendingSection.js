import React, { useEffect, useState } from 'react'
import product1 from '../../assets/frontimg/product/1.jpg'
import product2 from '../../assets/frontimg/product/2.jpg'
import product3 from '../../assets/frontimg/product/3.jpg'
import product4 from '../../assets/frontimg/product/4.jpg'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Link } from 'react-router-dom'

var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay :true
       
};



const TrendingSection = () => {
    const [data, setData] = useState([])

    async function getTrendingData() {
        axios.get(`${BASE_URL}/trending_products`)
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
        <section class="section section-padding">
            <div class="section-container">

                <div class="block block-products slider">
                    <div class="block-widget-wrap">
                        <div class="block-title"><h2>Best Seller</h2></div>
                        <div class="block-content">
                            <div class="content-product-list slick-wrap">
                                <div class="slick-sliders products-list grid" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="3" data-columns1="3" data-columns1440="4" data-columns="4">
                                    <Slider {...settings}>

                                        {data.map((item) => {
                                            return (
                                                <div class="item-product slick-slide">
                                                    <div class="items">
                                                        <div class="products-entry clearfix product-wapper">
                                                            <div class="products-thumb">
                                                                {/* <div class="product-lable">
                                                                    <div class=""><i className='icon-heart'/></div>
                                                                </div> */}
                                                                <div class="product-thumb-hover">
                                                                    <Link to={`/detailpage/${item.slug}`} >
                                                                        <img width="600" height="600" src={`${IMG_URL}/productimg/` +item.image1} class="post-image" alt="" />

                                                                        <img width="600" height="600" src={`${IMG_URL}/productimg/` +item.image2} class="hover-image back" alt="" />

                                                                    </Link>
                                                                </div>
                                                                <div class="product-button">
                                                                    <div class="btn-wishlist" data-title="Wishlist">
                                                                        <button class="product-btn">Add to wishlist</button>
                                                                    </div>
                                                                    {/* <div class="btn-compare" data-title="Compare">
                                                                        <button class="product-btn">Compare</button>
                                                                    </div>
                                                                    <span class="product-quickview" data-title="Quick View">
                                                                        <Link href="#" class="quickview quickview-button">Quick View <i class="icon-search"></i></Link>
                                                                    </span> */}
                                                                </div>
                                                            </div>
                                                            <div class="products-content">
                                                                <div class="contents">
                                                                    <h3 class="product-title"><Link to={`/detailpage/${item.slug}`}>{item.title}</Link></h3>
                                                                    <span class="price">₹{item.price}</span>
                                                                    <div class="btn-add-to-cart">
                                                                        <div data-title="Add to cart">
                                                                            <Link to="/shopcart" class="button">Add to cart</Link>
                                                                        </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrendingSection