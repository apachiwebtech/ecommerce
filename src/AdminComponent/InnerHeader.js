import React from 'react'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../assets/images/prof.png";

const InnerHeader = () => {

    const location = useLocation();
    const getPageName = () => {
        switch (location.pathname) {
            case '/webapp':
                return 'Dashboard';
            case '/webapp/vendormaster':
                return 'Vendor Master';
            case '/webapp/adminuser':
                return 'Admin Users';
            case '/webapp/productcatalog':
                return 'Product catalog';
            case '/webapp/category':
                return 'Category';
            case '/webapp/subcategory':
                return 'SubCategory';
            case '/webapp/brand':
                return 'Brand';
            case '/webapp/productapproval':
                return 'Product Approval';
            case '/webapp/orders':
                return 'Orders';
            case '/webapp/banner':
                return 'Banner';
            case '/webapp/socialmedia':
                return 'Social Media';
            case location.pathname.match(/^\/addservice\/\d+$/) ? location.pathname : '':
                return 'Add Service'

            default:
                return '';
        }
    };
    return (
        <div>
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <div class="page-title">
                            <h1>{getPageName()}</h1>
                        </div>
                        <div class="main-header-toolbar">
                            <div class="header-action">
                                <div class="header-action__item">
                                    <Link class="link"><DesktopWindowsRoundedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><SearchRoundedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><StorefrontOutlinedIcon style={{ fontSize: "17px" }} /></Link>
                                </div>
                                <div class="header-action__item">
                                    <Link class="link"><NotificationsActiveTwoToneIcon style={{ fontSize: "17px" }} /></Link>
                                </div>

                                <div class="header-action__item header-acc">
                                    <span class="header-account__img"><Link class="link"><img src={img1} alt="" /></Link></span>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default InnerHeader