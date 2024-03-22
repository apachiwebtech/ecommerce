import React, { useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import product1 from '../../assets/frontimg/product/1.jpg'
import { Link } from 'react-router-dom'
// import UserID from '../../Utils/UserID';
import { wishListActions } from '../../Store/WishList/wishListSlice';
import { addToWishList } from '../../Store/WishList/wishlist-actions';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';
import custdecryptedUserId from '../../Utils/CustUserid';
import addToCart from '../../Utils/AddtoCart';
import { ToastContainer, toast } from 'react-toastify';
import LoginForm from '../Authentication/LoginForm';
import { getCartCount } from '../../Store/Cart/cart-action';
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

    // const addToCart = async (pro_id) => {
    //     console.log(pro_id, "0000")

    //     if (!Cookies.get("orderid") && !Cookies.get("custuserid")) {
    //         const randomUserId = Math.random().toString(36).substring(2);

    //         const user = {
    //             id: randomUserId,
    //             pro_id: pro_id
    //         }



    //         const response = await fetch(`${BASE_URL}/addToCart`, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 userId: user.id,
    //                 pro_id: user.pro_id,
    //                 pro_name: props.title,
    //                 catid: props.catid,
    //                 price: props.price,
    //                 p_qty: "1"

    //             }),
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         })

    //         const apiData = await response.json();
    //         Cookies.set("orderid", apiData[0].orderid)

    //     } else if (Cookies.get("custuserid") && !Cookies.get("orderid") ) {


    //         const user = {
    //             id: custdecryptedUserId(),
    //             pro_id: pro_id
    //         }


    //         const response = await fetch(`${BASE_URL}/addToCart`, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 userId: user.id,
    //                 pro_id: user.pro_id,
    //                 pro_name: props.title,
    //                 catid: props.catid,
    //                 price: props.price,
    //                 p_qty: "1"

    //             }),
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         })

    //         const apiData = await response.json();
    //         Cookies.set("orderid", apiData[0].orderid)
    //     }

    //     else if ((Cookies.get("custuserid") && Cookies.get("orderid")) || Cookies.get("orderid") ) {

    //         const user = {
    //             id: custdecryptedUserId(),
    //             orderid: Cookies.get("orderid"),
    //             pro_id: pro_id
    //         }



    //         const response = await fetch(`${BASE_URL}/addToCart`, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 userId: user.id,
    //                 orderid: user.orderid,
    //                 pro_id: user.pro_id,
    //                 pro_name: props.title,
    //                 catid: props.catid,
    //                 price: props.price,
    //                 p_qty: "1"
    //             }),
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         })

    //         const apiData = await response.json();


    //     }

    // }










    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <div className="products-entry clearfix product-wapper">
                <ToastContainer theme="dark"     position="bottom-right" />
                <div className="products-thumb">
                    {props.trending === 1 ? <div className="product-lable">
                        <div className="hot">Hot</div>
                    </div> : <></>}
                    <div className="product-thumb-hover">
                        <Link to={`/detailpage/${props.slug}`} >
                            <img width="600" height="600" src={`${IMG_URL}/productimg/` + props.image1} className="post-image" alt="" />
                            <img width="600" height="600" src={`${IMG_URL}/productimg/` + props.image2} className="hover-image back" alt="" />
                        </Link>
                    </div>
                    <div className="product-button">
                        <div className="btn-add-to-cart" data-title="Add to cart">
                            <button rel="nofollow" className="product-btn button" onClick={() => {
                                addToCart(props.proid, props.title, props.catid, props.price , dispatch)
                                notify()

                            }} >Add to cart</button>
                        </div>
                        <div className="btn-wishlist" data-title="Wishlist">
                            {/* <Link to="/shopwishlist"><button className="product-btn">Add to wishlist</button></Link> */}
                            {/* <button className="product-btn" onClick={() => {
                                addWishList(props.proid)
                                wishify()
                            }}>Add to wishlist</button> */}


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
                        <h3 className="product-title"><Link to={`/detailpage/${props.slug}`}>{props.title}</Link></h3>
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