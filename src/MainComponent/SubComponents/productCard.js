import React from 'react'
import { IMG_URL } from '../../Utils/BaseUrl'
const ProductCard = (props) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
    <div className="products-entry clearfix product-wapper">
        <div className="products-thumb">
            {props.trending === 1 ?  <div className="product-lable">
                <div className="hot">Hot</div>
            </div> : <></>}
            <div className="product-thumb-hover">
                <a href="shop-details.html">
                    <img width="600" height="600" src={`${IMG_URL}/uploads/sizechart/${props.image1}`} className="post-image" alt=""/>
                    <img width="600" height="600" src={props.image2} className="hover-image back" alt=""/>
                </a>
            </div>		
            <div className="product-button">
                <div className="btn-add-to-cart" data-title="Add to cart">
                    <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                </div>
                <div className="btn-wishlist" data-title="Wishlist">
                    <button className="product-btn">Add to wishlist</button>
                </div>
            </div>
        </div>
        <div className="products-content">
            <div className="contents text-center">
                <h3 className="product-title"><a href="shop-details.html">{props.title}</a></h3>
                {props.disc_price ? (<span className="price">
                        <del aria-hidden="true"><span>{props.price}</span></del> 
                         <ins><span>{props.disc_price}</span></ins>
                </span>) :
                (<span className="price">{props.price  }</span>) 
                }
            </div>
        </div>
    </div>
</div>
  )
}

export default ProductCard