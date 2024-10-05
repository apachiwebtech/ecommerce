import React, { useEffect, useState } from 'react'
import product4_2 from '../../assets/frontimg/product/4-2.jpg'
import product6_2 from '../../assets/frontimg/product/6-2.jpg'
import { Chip, Slider } from '@mui/material'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import ProductCard from '../Subcomponents/ProductCard'
import { mdiClose, mdiFilterVariant } from '@mdi/js'
import Icon from '@mdi/react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Store/Products/product-actions'
import { FormControl, MenuItem, Select } from '@mui/material'

const ShopProduct = () => {

    const [products, setProducts] = useState([])
    const [group, setGroup] = useState([])
    const [brand, setBrand] = useState([])
    const [toggle, setToggle] = useState(false)
    const [header, SiteHeader] = useState()
    const [sort, setSort] = useState('')
    const [brandid, setBrandid] = useState('')
    const [brandname, setBrandName] = useState('')
    const [value, setValue] = React.useState('');

    function valuetext(value) {
        return `₹${value}`;
    }

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };


    const toggleSidebar = () => {
        setToggle(!toggle)
    }

    const marks = [
        {
            value: 0,
            label: '₹0',
        },

        {
            value: 5000,
            label: '₹5000',
        },
        {
            value: 10000,
            label: '₹10000',
        },
        {
            value: 15000,
            label: '₹15000',
        },
        {
            value: 20000,
            label: '₹20000',
        },
    ];



    const dispatch = useDispatch();
    const productnew = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { groupslug, catslug, subcatslug, brand_id } = useParams()


    async function getproductdetails() {
        const data = {
            groupslug: groupslug,
            catslug: catslug,
            subcatslug: subcatslug,
            brand_id: brand_id,
            sort: sort,
            price: value,
            brandid: brandid
        }

        axios.post(`${BASE_URL}/getproductlisting`, data)
            .then((res) => {
                console.log(res)
                setProducts(res.data)

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

    async function getbrand() {
        const data = {
            groupslug: groupslug,
            catslug: catslug,
            subcatslug: subcatslug,
            brand_id: brand_id
        }
        axios.post(`${BASE_URL}/getbrand`, data)
            .then((res) => {
                console.log(res)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getbrand()
        getproductdetails()
        getGroupData()
        SiteHeader(subcatslug || catslug || groupslug)
    }, [groupslug, catslug, subcatslug, brand_id, sort, value, brandid])



    const handleChange = (event, newValue) => {
        setValue(newValue);

    };



    const handlesortchange = (e) => {

        setSort(e.target.value)
    }


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
                            <div className="breadcrumbs" >
                                <Link to={`/`}>Home</Link><span className="delimiter"></span><Link style={{ textTransform: "capitalize" }}>{header}</Link>
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
                                                                    <Link onClick={toggleSidebar} to={`/shoproduct/${item.slug}`}>{item.title}</Link>
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

                                                <Slider step={5000} onChange={handleChange} style={{ width: "90%" }} defaultValue={100} getAriaValueText={valuetext} marks={marks} value={value} max={20000} aria-label="Always visible" valueLabelDisplay="auto" sx={{
                                                    color: 'black',
                                                    '& .MuiSlider-thumb': {
                                                        borderColor: 'black',
                                                    },
                                                    '& .MuiSlider-track': {
                                                        borderColor: 'black',
                                                    },
                                                    '& .MuiSlider-rail': {
                                                        borderColor: 'black',
                                                    },
                                                }} />
                                            </div>
                                        </div>




                                        <div className="block block-product-filter clearfix my-3">
                                            <div className="block-title"><h2>Brands</h2></div>
                                            <div className="block-content">
                                                <ul className="filter-items image">
                                                    {brand.map((brand) => {
                                                        return (
                                                            <li><span onClick={() => {
                                                                setBrandid(brand.id)
                                                                setBrandName(brand.title)
                                                            }}><img src={`${IMG_URL}/brand/` + brand.logo} alt="Brand" /></span></li>
                                                        )
                                                    })}

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
                                                            <Link to={`/product/${featured.slug}`} onClick={toggleSidebar} >
                                                                <li className="product-item my-2">
                                                                    
                                                                    <Link to={``} className="product-image">
                                                                    
                                                                        <img src={`${IMG_URL}/productimg/` + featured.image1} alt='product6' />
                                                                    </Link>
                                                                    <div className="product-content">
                                                                        
                                                                        <h2 className="product-title">
                                                                            <Link to={`/product/${featured.slug}`} >
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

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                                        <div className="products-topbar clearfix ">

                                            <div className='d-flex justify-content-between align-items-center' >
                                                <div className='d-flex'>

                                                    <div className='mob-filter' style={{ display: "none" }}>
                                                        <Icon path={mdiFilterVariant} onClick={toggleSidebar} className='border p-1' size={1} />
                                                    </div>

                                                    <div>
                                                  
                                                        {value > 0 && <Chip className='mx-1' sx={{
                                                            color: 'green',           // Text color
                                                            borderColor: 'green',     // Border color
                                                            '& .MuiChip-deleteIcon': {
                                                                color: 'black'           // Delete icon color
                                                            }
                                                        }} label={`0 to ${value}`} variant="outlined" onDelete={() => {
                                                            setValue(0)
                                                        }} />}
                                                        {brandname && <Chip sx={{
                                                            color: 'green',           // Text color
                                                            borderColor: 'green',     // Border color
                                                            '& .MuiChip-deleteIcon': {
                                                                color: 'black'           // Delete icon color
                                                            }
                                                        }} className='mx-1' label={brandname} variant="outlined" onDelete={() => {
                                                            setBrandName('')
                                                            setBrandid('')
                                                        }} />}
                                                    </div>
                                                </div>




                                                <div>
                                                    <div className="">
                                                        <div className="products-count">
                                                            Showing all {products.length} results
                                                        </div>
                                                    </div>
                                                    <div className="products-topbar-right">
                                                        <div className="products-sort dropdown">


                                                            <FormControl sx={{ m: 0.5, minWidth: 150 }}>
                                                                <Select

                                                                    onChange={handlesortchange}
                                                                    // displayEmpty
                                                                    defaultValue={`default`}
                                                                    sx={{
                                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                            borderColor: 'rgba(0, 0, 0, 1)',
                                                                        },
                                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                            borderColor: 'rgba(0, 0, 0, 1)',
                                                                        },// Add more specific selector
                                                                    }}
                                                                >
                                                                    <MenuItem value="default">
                                                                        Default sorting
                                                                    </MenuItem>
                                                                    {/* <MenuItem value={10}>Sort by popularity</MenuItem>
                                                                    <MenuItem value={20}>Sort by average rating</MenuItem> */}
                                                                    <MenuItem value={"latest"}>Sort by latest</MenuItem>
                                                                    <MenuItem value={"low"}>Sort by price: low to high</MenuItem>
                                                                    <MenuItem value={"high"}>Sort by price: high to low</MenuItem>
                                                                </Select>
                                                            </FormControl>
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

                                                            return (
                                                                <ProductCard proid={product.proid} title={product.product_title} disc_price={product.disc_price} price={product.disc_price} image1={product.image1} image2={product.image2} trending={product.trending} catid={product.catid} slug={product.slug} v_id={product.v_id} gst={product.gst} r_stock={product.r_stock} stock={product.stock} customizable={product.customizable} />
                                                            )
                                                        })
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <nav className="pagination">
                                            <ul className="page-numbers">
                                                <li><a className="prev page-numbers" href="#">Previous</a></li>
                                                <li><span aria-current="page" className="page-numbers current">1</span></li>
                                                <li><a className="page-numbers" href="#">2</a></li>
                                                <li><a className="page-numbers" href="#">3</a></li>
                                                <li><a className="next page-numbers" href="#">Next</a></li>
                                            </ul>
                                        </nav> */}

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