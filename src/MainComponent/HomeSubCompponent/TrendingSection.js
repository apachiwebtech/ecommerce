import React, { useEffect, useState } from 'react'

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
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

var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    responsive: [
        {
            breakpoint: 600, // Adjust this breakpoint according to your needs
            settings: {
                slidesToShow: 1
            }
        }
    ]
};



const notify = () => toast("Product added to the cart");
const wishify = () => toast("Product added to the wishlist");


const TrendingSection = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)

    const handleToggle = (e) => {
        setOpen(!open);
    }

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


    const dispatch = useDispatch();
    const addWishList = (data) => {

        const id = data;
        const userId = custdecryptedUserId();
        const wishData = {
            id,
            userId,
        }

        dispatch(addToWishList(wishData));

    }

    return (
        <section class="section section-padding">
            <div class="section-container">
                {/* {loader && <h1>hiffjj</h1>} */}
                <ToastContainer theme="dark" position="bottom-right" />
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
                                                                        <img width="600" height="600" src={`${IMG_URL}/productimg/` + item.image1} class="post-image" alt="" />

                                                                        <img width="600" height="600" src={`${IMG_URL}/productimg/` + item.image2} class="hover-image back" alt="" />

                                                                    </Link>
                                                                </div>
                                                                <div class="product-button">
                                                                    <div class="btn-wishlist" data-title="Wishlist">

                                                                        {!Cookies.get(`custuserid`) ? <button class="product-btn" onClick={() => {

                                                                            handleToggle()
                                                                        }}>Add to wishlist</button> : <button class="product-btn" onClick={() => {
                                                                            addWishList(item.id)
                                                                            wishify()


                                                                        }}>Add to wishlist</button>}


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
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>₹{item.price}</span></del>
                                                                        <ins><span>₹{item.disc_price}</span></ins>
                                                                    </span>
                                                                    <div class="btn-add-to-cart">
                                                                        <div data-title="Add to cart">
                                                                            <Link
                                                                                class="button"
                                                                                onClick={() => {
                                                                                    addToCart(item.id, item.title, item.catid, item.disc_price, dispatch, "1", item.v_id ,item.gst);
                                                                                    notify();
                                                                                }}
                                                                            >
                                                                                Add to cart
                                                                            </Link>
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
                        {open && <LoginForm setOpen={setOpen} open={open} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrendingSection