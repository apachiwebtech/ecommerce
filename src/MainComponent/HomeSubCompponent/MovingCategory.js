import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Slider from 'react-slick';
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Link } from 'react-router-dom'
import addToCart from '../../Utils/AddtoCart'
import SiteLoader from '../Ui/SiteLoader'
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import custdecryptedUserId from '../../Utils/CustUserid';
import { addToWishList } from '../../Store/WishList/wishlist-actions';
import LoginForm from '../Authentication/LoginForm'
import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { getCartCount } from '../../Store/Cart/cart-action';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';




const MovingCategory = () => {


    const [cat, setCat] = useState([])


    async function getTrendingData() {
        axios.get(`${BASE_URL}/moving_category`)
            .then((res) => {
                console.log(res)
                setCat(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    useEffect(() => {
        getTrendingData()
    }, [])


    return (
        <section class="section section-padding " >
            <div class="section-container">
                {/* {loader && <h1>hiffjj</h1>} */}
                <ToastContainer theme="dark" position="bottom-right" />
                <div class="block block-products slider">
                    <div class="block-widget-wrap">
                        <div class="block-title"><h2>Categories</h2></div>
                        <div class="block-content moving-cat" style={{padding:"0px 120px"}}>
                            <div class="content-product-list slick-wrap">
                                <div class="slick-sliders products-list grid" data-slidestoscroll="true" data-dots="false" data-nav="1" data-columns4="1" data-columns3="2" data-columns2="3" data-columns1="3" data-columns1440="4" data-columns="4">
                                    <Swiper spaceBetween={20}
                                        slidesPerView={4}
                                        modules={[Navigation, Thumbs]}
                                        navigation
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 3,
                                            },
                                            640: {
                                                slidesPerView: 3,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                            },
                                        }}>

                                        {cat.map((item) => {
                                            return (
                                                <SwiperSlide>
                                                    <div className='text-center'>
                                                    <Link to={`/shoproduct/${item.group_slug}/${item?.slug}`}>
                                                        <div className='cat-parent' style={{background:"#FFFFFF"}}>
                                                            <img className='cat-img' src={`${IMG_URL}/category/${item?.image}`} alt="Banner" />
                                                        </div>
                                                        </Link>
                                                        <div>
                                                        <h4 className='mt-2 '>{item.title}</h4>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })}












                                    </Swiper>











                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovingCategory