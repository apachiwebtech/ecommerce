import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../AdminComponent/BaseUrl';
// import UserID from '../../Utils/UserID';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addToWishList } from '../../Store/WishList/wishlist-actions';
import addToCart from '../../Utils/AddtoCart';
import custdecryptedUserId from '../../Utils/CustUserid';
import LoginForm from '../Authentication/LoginForm';
const ProductCard = (props) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const addWishList = (data) => {

        const id = data;
        const userId = custdecryptedUserId();
        const wishData = {
            id,
            userId,
        }

        dispatch(addToWishList(wishData));

    }

    const handleToggle = (e) => {
        setOpen(!open);
    }




    const notify = () => toast("Product added to the cart");
    const wishify = () => toast("Product added to the wishlist");




    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <div className="products-entry clearfix product-wapper">
                <ToastContainer theme="dark" position="bottom-right" />
                <div className="products-thumb">
                    {props.customizable == 1 &&
                        <div className="product-lable">
                            <div className="hot text-light bg-success">
                                customizable</div>
                        </div>}
                        
                    <div className="product-thumb-hover">

                        <Link to={`/product/${props.slug}`} >
                            <img src={`${IMG_URL}/productimg/` + props.image1} className="post-image" alt="" />
                            <img src={`${IMG_URL}/productimg/` + props.image2} className="hover-image back" alt="" />
                        </Link>
                    </div>
                    <div className="product-button">
                        {props.stock == null || props.stock == 0 || props.stock == props.r_stock || props.stock < 0 ? null : <div className="btn-add-to-cart" data-title="Add to cart">
                            <button rel="nofollow" className="product-btn button" onClick={() => {
                                addToCart(props.proid, props.title, props.catid, props.price, dispatch, "1", props.v_id, props.gst)
                                notify()

                            }} >Add to cart</button>
                        </div>}


                        <div className="btn-wishlist" data-title="Wishlist">



                            {!Cookies.get(`custuserid`) ? <button class="product-btn" onClick={() => {

                                handleToggle()
                            }}>Add to wishlist</button> : <button class="product-btn" onClick={() => {
                                addWishList(props.proid)
                                wishify()

                            }}>Add to wishlist</button>}

                        </div>
                    </div>
                </div>
                <div className="products-content">
                    <div className="contents text-center">
                        <h3 className="product-title"><Link to={`/product/${props.slug}`}>{props.title}</Link></h3>
                        {props.disc_price ? (<span className="price">
                            <del aria-hidden="true"><span>₹{props.price}</span></del>
                            <ins><span>₹{props.disc_price}</span></ins>
                        </span>) :
                            (<span className="price">{props.price}</span>)
                        }
                    </div>
                </div>

                {open && <LoginForm setOpen={setOpen} open={open} />}
            </div>
        </div>
    )
}

export default ProductCard