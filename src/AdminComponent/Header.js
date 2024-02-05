import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiApps, mdiCheckDecagram, mdiLandPlotsCircle, mdiMagnifyPlusOutline, mdiMenu } from '@mdi/js';
import { mdiAccountGroupOutline } from '@mdi/js';
import { mdiAccountOutline } from '@mdi/js'
const Header = () => {

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">

        <li className="nav-item">
          <Link className="nav-link" to="/webapp">
            <Icon path={mdiMenu} size={1} className='mx-3' />
            <span className="menu-title">Dashboard</span>
            <div className="badge badge-info badge-pill">2</div>
          </Link>
        </li>
        <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
           
            <span className="menu-title">Master</span>
            <i className="menu-arrow"></i>
          </a> */}
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> Buttons</li>
              <li className="nav-item">Typography</li>
            </ul>
          </div>
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
          <Link className="nav-link" to='/webapp/adminuser'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product Approval</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/product'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product </span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to='/webapp/product_catalog'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product Catalog</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/SellersProductInventory'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">SellersProductInventory</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/shop'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Shop</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/productoption'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product Option</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/producttag'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Product Tag</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/webapp/thresholdproduct'>
            <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
            <span className="menu-title">Threshold Product</span>
          </Link>
        </li>
        {/* <li className="nav-item sidebar-category">
          <p>Pages</p>
          <span></span>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i className="mdi mdi-account menu-icon"></i>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
            </ul>
          </div>
        </li>
        <li className="nav-item sidebar-category">
          <p>Apps</p>
          <span></span>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="docs/documentation.html">
            <i className="mdi mdi-file-document-box-outline menu-icon"></i>
            <span className="menu-title">Documentation</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="http://www.bootstrapdash.com/demo/spica/template/">
            <button className="btn bg-danger btn-sm menu-title">Upgrade to pro</button>
          </a>
        </li> */}
      </ul>
    </nav>
  )
}

export default Header