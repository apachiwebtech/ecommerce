import React, { useEffect, useState } from 'react'
import brand1 from '../../assets/frontimg/brand/1.jpg'

import product4_2 from '../../assets/frontimg/product/4-2.jpg'
import product6_2 from '../../assets/frontimg/product/6-2.jpg'

import { Slider } from '@mui/material'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import ProductCard from '../Subcomponents/ProductCard'
import Icon from '@mdi/react'
import { mdiClose, mdiFilterVariant } from '@mdi/js'


const ShopProduct = () => {

    const [products, setProducts] = useState([])
    const [group, setGroup] = useState([])
    const [toggle, setToggle] = useState(false)
    const [header, SiteHeader] = useState()

    function valuetext(value) {
        return `₹${value}`;
    }

    const toggleSidebar = () => {
        setToggle(!toggle)
    }

    const marks = [
        {
            value: 0,
            label: '₹0',
        },

        {
            value: 25000,
            label: '₹25000',
        },
        {
            value: 50000,
            label: '₹50000',
        },
        {
            value: 75000,
            label: '₹75000',
        },
        {
            value: 100000,
            label: '₹100000',
        },
    ];



    // const dispatch = useDispatch();
    // const products = useSelector((state) => state.products.products);

    // useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);

    const { groupslug, catslug, subcatslug } = useParams()


    async function getproductdetails() {
        const data = {
            groupslug: groupslug,
            catslug: catslug,
            subcatslug: subcatslug
        }

        axios.post(`${BASE_URL}/getproductlisting`, data)
            .then((res) => {
                console.log(res)
                setProducts(res.data)
                SiteHeader(res.data[0].title)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getGroupData() {
        axios.get(`${BASE_URL}/group_data`)
            .then((res) => {
                console.log(res)
                setGroup(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getproductdetails()
        getGroupData()
    }, [groupslug, catslug, subcatslug])



    return (
        <div><div id="site-main" className="site-main">
            <div id="main-content" className="main-content">

                <div id="primary" className="content-area">
                    <div id="title" className="page-title">
                        <div className="section-container">
                            <div className="content-title-heading">
                                <h1 className="text-title-heading">
                                    {header}
                                </h1>
                            </div>
                            <div className="breadcrumbs">
                                <a href="index.html">Home</a><span className="delimiter"></span><a href="shop-grid-left.html">Shop</a><span className="delimiter"></span> {header}
                            </div>
                        </div>
                    </div>

                    <div id="content" className="site-content" role="main">
                        <div className="section-padding">
                            <div className="section-container p-l-r">
                                <div className="row">
                                    <div className={`col-xl-3 col-lg-3 col-md-12 col-12 mob-left-sidebar ${toggle ? `mob-left-view` : ``}  left-sidebar md-b-50`}>
                                        {/* <!-- Block Product Categories --> */}
                                        <div className="block block-product-cats">
                                            <div className="py-4  mob-left-sidebar-close " onClick={toggleSidebar} style={{ textAlign: "right", display: "none" }} >
                                                <Icon path={mdiClose} size={1} />
                                            </div>
                                            <div className="block-title"><h2>Categories</h2></div>
                                            <div className="block-content">
                                                <div className="product-cats-list">
                                                    <ul>
                                                        {group.map((item) => {
                                                            return (
                                                                <li className="current">
                                                                    <Link to={`/shoproduct/${item.slug}`}>{item.title}<span className="count">9</span></Link>
                                                                </li>
                                                            )
                                                        })}


                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Block Product Filter --> */}
                                        <div className="block block-product-filter">
                                            <div className="block-title"><h2>Price</h2></div>
                                            <div className="block-content">

                                                <Slider defaultValue={1000} getAriaValueText={valuetext} marks={marks} max={100000} aria-label="Default" valueLabelDisplay="auto" />
                                            </div>
                                        </div>

                                        {/* <!-- Block Product Filter --> */}
                                        <div className="block block-product-filter clearfix my-3">
                                            <div className="block-title"><h2>Size</h2></div>
                                            <div className="block-content">
                                                <ul className="filter-items text">
                                                    <li><span>L</span></li>
                                                    <li><span>M</span></li>
                                                    <li><span>S</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* <!-- Block Product Filter --> */}
                                        <div className="block block-product-filter clearfix my-3">
                                            <div className="block-title"><h2>Brands</h2></div>
                                            <div className="block-content">
                                                <ul className="filter-items image">
                                                    {products.map((brand) => {
                                                        return (

                                                            <li><span><img src={brand1} alt="Brand" /></span></li>
                                                        )
                                                    })}

                                                    {/* <li><span><img src={brand1} alt="Brand" /></span></li>
                                                    <li><span><img src={brand1} alt="Brand" /></span></li>
                                                    <li><span><img src={brand1} alt="Brand" /></span></li>
                                                    <li><span><img src={brand1} alt="Brand" /></span></li> */}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* <!-- Block Products --> */}
                                        <div className="block block-products">
                                            <div className="block-title"><h2>Feature Product</h2></div>
                                            <div className="block-content">
                                                <ul className="products-list">
                                                    {products.filter((featured) => featured.featured === 1).map((featured) => {
                                                        return (
                                                            <Link to={`/detailpage/${featured.slug}`} >
                                                                <li className="product-item my-2">
                                                                    <a href="shop-details.html" className="product-image">
                                                                        <img src={`${IMG_URL}/productimg/` + featured.image1} alt='product6' />
                                                                    </a>
                                                                    <div className="product-content">
                                                                        <h2 className="product-title">
                                                                            <Link to={`/detailpage/${featured.slug}`} >
                                                                                {featured.product_title}
                                                                            </Link>
                                                                        </h2>
                                                                        <div className="rating small">
                                                                            <div className="star star-5"></div>
                                                                        </div>

                                                                        {featured.disc_price ?
                                                                            (<span className="price">
                                                                                <del aria-hidden="true"><span>₹{featured.price}</span></del>
                                                                                <ins><span>₹{featured.disc_price}</span></ins>
                                                                            </span>) :
                                                                            (<span className="price">₹{featured.price}</span>)
                                                                        }
                                                                    </div>
                                                                </li>
                                                            </Link>
                                                        )
                                                    })}
                                                    {/* <li className="product-item">
                                                <a href="shop-details.html" className="product-image">
                                                    <img src={product8} alt='product8'/>
                                                </a>
                                                <div className="product-content">
                                                    <h2 className="product-title">
                                                        <a href="shop-details.html">
                                                            Spinning Pendant Lamp
                                                        </a>
                                                    </h2>
                                                    <div className="rating small">
                                                        <div className="star star-0"></div>
                                                    </div>
                                                    <span className="price">$120.00</span>
                                                </div>
                                            </li>
                                            <li className="product-item">
                                                <a href="shop-details.html" className="product-image">
                                                    <img src={product9} alt='product9'/>
                                                </a>
                                                <div className="product-content">
                                                    <h2 className="product-title">
                                                        <a href="shop-details.html">
                                                            Bora Armchair
                                                        </a>
                                                    </h2>
                                                    <div className="rating small">
                                                        <div className="star star-5"></div>
                                                    </div>
                                                    <span className="price">
                                                        <del aria-hidden="true"><span>$200.00</span></del> 
                                                        <ins><span>$180.00</span></ins>
                                                    </span>
                                                </div>
                                            </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                                        <div className="products-topbar clearfix ">

                                            <div className='d-flex justify-content-between'>
                                                <div className=''>
                                                    <div className="">
                                                        <div className="products-count">
                                                            Filter
                                                        </div>
                                                    </div>
                                                    <div className='mob-filter' style={{ display: "none" }}>
                                                        <Icon path={mdiFilterVariant} onClick={toggleSidebar} className='border p-1' size={1} />
                                                    </div>
                                                </div>


                                                <div>
                                                    <div className="">
                                                        <div className="products-count">
                                                            Showing all 21 results
                                                        </div>
                                                    </div>
                                                    <div className="products-topbar-right">
                                                        <div className="products-sort dropdown">
                                                            <span className="sort-toggle dropdown-toggle" data-toggle="dropdown" aria-expanded="true">Default sorting</span>
                                                            <ul className="sort-list dropdown-menu" x-placement="bottom-start">
                                                                <li className="active"><a href="#">Default sorting</a></li>
                                                                <li><a href="#">Sort by popularity</a></li>
                                                                <li><a href="#">Sort by average rating</a></li>
                                                                <li><a href="#">Sort by latest</a></li>
                                                                <li><a href="#">Sort by price: low to high</a></li>
                                                                <li><a href="#">Sort by price: high to low</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="tab-content">
                                            <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
                                                <div className="products-list grid">
                                                    <div className="row">
                                                        {products?.map((product) => {
                                                            //     return (
                                                            //     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                            //     <div className="products-entry clearfix product-wapper">
                                                            //         <div className="products-thumb">
                                                            //             <div className="product-lable">
                                                            //                 <div className="hot">Hot</div>
                                                            //             </div>
                                                            //             <div className="product-thumb-hover">
                                                            //                 <a href="shop-details.html">
                                                            //                     <img width="600" height="600" src={product6_2} className="post-image" alt=""/>
                                                            //                     <img width="600" height="600" src={product4_2} className="hover-image back" alt=""/>
                                                            //                 </a>
                                                            //             </div>		
                                                            //             <div className="product-button">
                                                            //                 <div className="btn-add-to-cart" data-title="Add to cart">
                                                            //                     <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                            //                 </div>
                                                            //                 <div className="btn-wishlist" data-title="Wishlist">
                                                            //                     <button className="product-btn">Add to wishlist</button>
                                                            //                 </div>
                                                            //             </div>
                                                            //         </div>
                                                            //         <div className="products-content">
                                                            //             <div className="contents text-center">
                                                            //                 <h3 className="product-title"><a href="shop-details.html">{product.title}</a></h3>
                                                            //                 {product.disc_price ? (<span className="price">
                                                            //                         <del aria-hidden="true"><span>$200.00</span></del> 
                                                            //                          <ins><span>$180.00</span></ins>
                                                            //                 </span>) :
                                                            //                 (<span className="price">{product.price  }</span>) 
                                                            //                 }
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>
                                                            //     )
                                                            return (
                                                                <ProductCard proid={product.proid} title={product.product_title} disc_price={product.disc_price} price={product.price} image1={product.image1} image2={product.image2} trending={product.trending} catid={product.catid} slug={product.slug} />
                                                            )
                                                        })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="layout-list" role="tabpanel">
                                                <div className="products-list list">
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Dining Table</a></h3>
                                                                    <span className="price">$150.00</span>
                                                                    <div className="rating">
                                                                        <div className="star star-5"></div>
                                                                        <div className="review-count">
                                                                            (1<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Pillar Dining Table Round</a></h3>
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>$150.00</span></del>
                                                                        <ins><span>$100.00</span></ins>
                                                                    </span>
                                                                    <div className="rating">
                                                                        <div className="star star-0"></div>
                                                                        <div className="review-count">
                                                                            (0<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Mags Sofa 2.5 Seater</a></h3>
                                                                    <span className="price">$150.00</span>
                                                                    <div className="rating">
                                                                        <div className="star star-4"></div>
                                                                        <div className="review-count">
                                                                            (1<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Spinning pendant lamp</a></h3>
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>$120.00</span></del>
                                                                        <ins><span>$100.00</span></ins>
                                                                    </span>
                                                                    <div className="rating">
                                                                        <div className="star star-0"></div>
                                                                        <div className="review-count">
                                                                            (0<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Bora Armchair</a></h3>
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>$100.00</span></del>
                                                                        <ins><span>$90.00</span></ins>
                                                                    </span>
                                                                    <div className="rating">
                                                                        <div className="star star-5"></div>
                                                                        <div className="review-count">
                                                                            (3<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Panton Dining Table</a></h3>
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>$79.00</span></del>
                                                                        <ins><span>$50.00</span></ins>
                                                                    </span>
                                                                    <div className="rating">
                                                                        <div className="star star-5"></div>
                                                                        <div className="review-count">
                                                                            (2<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Kittchen Table</a></h3>
                                                                    <span className="price">$120.00</span>
                                                                    <div className="rating">
                                                                        <div className="star star-4"></div>
                                                                        <div className="review-count">
                                                                            (1<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Mundo Sofa With Cushion</a></h3>
                                                                    <span className="price">
                                                                        <del aria-hidden="true"><span>$200.00</span></del>
                                                                        <ins><span>$180.00</span></ins>
                                                                    </span>
                                                                    <div className="rating">
                                                                        <div className="star star-5"></div>
                                                                        <div className="review-count">
                                                                            (4<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="products-entry clearfix product-wapper">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="products-thumb">
                                                                    <div className="product-lable">
                                                                        <div className="hot">Hot</div>
                                                                    </div>
                                                                    <div className="product-thumb-hover">
                                                                        <a href="shop-details.html">
                                                                            <img width="600" height="600" src={product6_2} className="post-image" alt="" />
                                                                            <img width="600" height="600" src={product4_2} className="hover-image back" alt="" />
                                                                        </a>
                                                                    </div>
                                                                    <span className="product-quickview" data-title="Quick View">
                                                                        <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="products-content">
                                                                    <h3 className="product-title"><a href="shop-details.html">Amp Pendant Light Large</a></h3>
                                                                    <span className="price">$140.00</span>
                                                                    <div className="rating">
                                                                        <div className="star star-5"></div>
                                                                        <div className="review-count">
                                                                            (1<span> review</span>)
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-button">
                                                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                                                            <a rel="nofollow" href="#" className="product-btn button">Add to cart</a>
                                                                        </div>
                                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                                            <button className="product-btn">Add to wishlist</button>
                                                                        </div>
                                                                        <div className="btn-compare" data-title="Compare">
                                                                            <button className="product-btn">Compare</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis…</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <nav className="pagination">
                                            <ul className="page-numbers">
                                                <li><a className="prev page-numbers" href="#">Previous</a></li>
                                                <li><span aria-current="page" className="page-numbers current">1</span></li>
                                                <li><a className="page-numbers" href="#">2</a></li>
                                                <li><a className="page-numbers" href="#">3</a></li>
                                                <li><a className="next page-numbers" href="#">Next</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ShopProduct