import React from 'react'
import { IMG_URL } from '../../AdminComponent/BaseUrl'
import product1 from '../../assets/frontimg/product/1.jpg'
import { Link } from 'react-router-dom'


const ProductCard = (props) => {
    return (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
            <div className="products-entry clearfix product-wapper">
                <div className="products-thumb">
                    {props.trending === 1 ? <div className="product-lable">
                        <div className="hot">Hot</div>
                    </div> : <></>}
                    <div className="product-thumb-hover">
                        <Link to="/detailpage" >
                            <img width="600" height="600" src={product1} className="post-image" alt="" />
                            <img width="600" height="600" src={product1} className="hover-image back" alt="" />
                        </Link>
                    </div>
                    <div className="product-button">
                        <div className="btn-add-to-cart" data-title="Add to cart">
                            <Link rel="nofollow" to="/shopcart" className="product-btn button">Add to cart</Link>
                        </div>
                        <div className="btn-wishlist" data-title="Wishlist">
                            <Link to="/shopwishlist"><button className="product-btn">Add to wishlist</button></Link>
                        </div>
                    </div>
                </div>
                <div className="products-content">
                    <div className="contents text-center">
                        <h3 className="product-title"><Link href="shop-details.html">{props.title}</Link></h3>
                        {props.disc_price ? (<span className="price">
                            <del aria-hidden="true"><span>{props.price}</span></del>
                            <ins><span>{props.disc_price}</span></ins>
                        </span>) :
                            (<span className="price">{props.price}</span>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard