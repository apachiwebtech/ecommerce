import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiApps, mdiCheckDecagram, mdiLandPlotsCircle, mdiMagnifyPlusOutline, mdiMenu } from '@mdi/js';
import { mdiAccountGroupOutline } from '@mdi/js';
import { mdiAccountOutline } from '@mdi/js'
import { ExpandLess, ExpandMore, Star } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { mdiFormatListBulletedSquare } from '@mdi/js';
import { mdiStore } from '@mdi/js';
import { mdiTagTextOutline } from '@mdi/js';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { mdiMap } from '@mdi/js';
import { mdiCartOutline } from '@mdi/js';
import { mdiArrowUUpRight } from '@mdi/js';
import { mdiMessageDraw } from '@mdi/js';
import { mdiArchive } from '@mdi/js';
import { mdiHome } from '@mdi/js';

const Header = () => {

  const [openStates, setOpenStates] = useState({
    order: false,
    product: false,
    home: false,
    // Add more menu items as needed
  });

  const handleToggle = (itemName) => {
    
    setOpenStates((prevState) =>({
      ...prevState,

      [itemName]: !prevState[itemName],
    }));

  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" wordBreak='break-word' overflowWrap='break-word'>
      <ul className="nav">

        <li className="nav-item">
          <Link className="nav-link" to="/webapp">
            <Icon path={mdiMenu} size={1} className='mx-3' />
            <span className="menu-title">Dashboard</span>
            {/* <div className="badge badge-info badge-pill">2</div> */}
          </Link>
        </li>
        <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/webapp/vendormaster">
            <Icon path={mdiAccountGroupOutline} size={1} className='mx-3' />
            <span className="menu-title">Vendor Master</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/adminuser'>
            <Icon path={mdiAccountOutline} size={1} className='mx-3' />
            <span className="menu-title">Admin User</span>
          </Link>
        </li>


        {/* <li className="nav-item">
          <Link className="nav-link" to='' onClick={handleClick}>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product </span>
          </Link>
        </li> */}

        <li className="nav-item" onClick={() => handleToggle('product')}>
          <div className="nav-link" >
            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Product</span>
            {openStates.product ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>
        
        <Collapse in={openStates.product} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/productcatalog'>
                <Icon path={mdiMap} size={1} className='mx-3' />
                <span className="menu-title">Product Catalog</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/category'>
                <Icon path={mdiLandPlotsCircle} size={1} className='mx-3' />
                <span className="menu-title">Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/subcategory'>
                <Icon path={mdiApps} size={1} className='mx-3' />
                <span className="menu-title">SubCategory</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/brand'>
                <Icon path={mdiMagnifyPlusOutline} size={1} className='mx-3' />
                <span className="menu-title">Brand</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/productapproval'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Product Approval</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/SellersProductInventory'>
                <Icon path={mdiArchive} size={1} className='mx-3' />
                <span className="menu-title">SellersProductInventory</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/shop'>
                <Icon path={mdiStore} size={1} className='mx-3' />

                <span className="menu-title">Shop</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/productoption'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Product Option</span>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/producttag'>
                <Icon path={mdiTagTextOutline} size={1} className='mx-3' />
               
                <span className="menu-title">Product Tag</span>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
           
                <ProductionQuantityLimitsIcon className='mx-3' />
                <span className="menu-title">Threshold Product</span>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/view'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">View</span>
              </Link>
            </li>
        
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/reviewcomment'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Review & Comment</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/testimonial'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Testimonials</span>
              </Link>
            </li> */}
          
          </ul>
        </Collapse>











        <li className="nav-item" onClick={() => handleToggle('order')}>
          <div className="nav-link" >
            <Icon path={mdiCartOutline} size={1} className='mx-3' />
            <span className="menu-title">Orders</span>
            {openStates.order ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse  in={openStates.order} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/orders'>

                <Icon path={mdiCartOutline} size={1} className='mx-3' />
                <span className="menu-title">Orders</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Subscription Orders</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
                <Icon path={mdiArrowUUpRight} size={1} className='mx-3' />
                <span className="menu-title">Order Return Reasons</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
                <Icon path={mdiMessageDraw} size={1} className='mx-3' />
                <span className="menu-title">Product Reviews</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
                <Star className='mx-3' />
                <span className="menu-title">Abandoned Cart</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/thresholdproduct'>
                <Icon path={mdiCartOutline} size={1} className='mx-3' />
                <span className="menu-title">Order Cancellation Reasons</span>
              </Link>
            </li> */}
          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('home')}>
          <div className="nav-link" >

            <Icon path={mdiHome} size={1} className='mx-3' />
            <span className="menu-title">Home</span>
            {openStates.home ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse  in={openStates.home} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/banner'>

                <Icon path={mdiCartOutline} size={1} className='mx-3' />
                <span className="menu-title">Banner</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/socialmedia'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Social Link</span>
              </Link>
            </li>



          </ul>
        </Collapse>


      </ul>
    </nav>
  )
}

export default Header