import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import Cookies from 'js-cookie';
import { Component, useEffect, useState } from 'react';
import { Outlet, createHashRouter, useNavigate, useLocation } from 'react-router-dom';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import AdminUser from './AdminComponent/AdminUser';
import Banner from './AdminComponent/Banner';
import { BASE_URL } from './AdminComponent/BaseUrl';
import Brand from './AdminComponent/Brand';
import Category from './AdminComponent/Category';
import Color from './AdminComponent/Color';
import Gallery from './AdminComponent/Gallery';
import Header from './AdminComponent/Header';
import Orders from './AdminComponent/Orders';
import PageNotFound from './AdminComponent/PageNotFound';
import Product from './AdminComponent/Product';
import VProduct from './VendorComponents/Product'
import ProductApproval from './AdminComponent/ProductApproval';
import ProductCatalog from './AdminComponent/ProductCatalog';
import ReviewComment from './AdminComponent/ReviewComment';
import SettingPages from './AdminComponent/SettingPages';
import SocialMedia from './AdminComponent/SocialMedia';
import SubCatetgory from './AdminComponent/SubCategory';
import VendorForm from './AdminComponent/VendorForm';
import VendorMaster from './AdminComponent/VendorMaster';
import View from './AdminComponent/View';
import WebLogin from './AdminComponent/WebLogin';
import './App.css';
import SiteHeader from './MainComponent/Layout/SiteHeader';
import SiteFooter from './MainComponent/Layout/SiteFooter';
import DashBoard from './MainComponent/Pages/Home';
import ShopProduct from './MainComponent/Pages/ShopProduct'
import '../src/MainComponent/Library/Fontawsome/Font-awsome.css'
import '../src/MainComponent/Library/Icomoonfont/icomoon.css'
import '../src/MainComponent/Library/elegant-icons/css/elegant.css'
import '../src/MainComponent/Library/feather-font/css/iconfont.css'
import '../src/MainComponent/Library/wpbingofont/css/wpbingofont.css'
import './Responsive.css';
import './Style.css';
import Productapprovalview from './AdminComponent/Productapprovalview'
import Group from './AdminComponent/Group';
import AddProductImg from './AdminComponent/AddProductImg';
import ShopCart from './MainComponent/Pages/ShopCart';
import ShopWishlist from './MainComponent/Pages/ShopWishlist';
import DetailPage from './MainComponent/Pages/DetailPage';
import SiteLoader from './MainComponent/Ui/SiteLoader';
import decryptedUserId from './Utils/UserID';


import Checkout from './MainComponent/Pages/Checkout';
import { getCartCount } from './Store/Cart/cart-action';
import { useDispatch } from 'react-redux';
import Profile from './MainComponent/Pages/ProfileComponent/Profile';
import ProfileWish from './MainComponent/Pages/ProfileComponent/ProfileWish';
import Address from './MainComponent/Pages/ProfileComponent/ProfileAddress';
import ProfileOrder from './MainComponent/Pages/ProfileComponent/ProfileOrders';
import OrderView from './MainComponent/Pages/ProfileComponent/OrderView';
import RoleAssignment from './AdminComponent/RoleAssignment';
import AddRole from './AdminComponent/AddRole';


// vendor Component

import VendorSettingPages from './VendorComponents/VendorSettingPages';
import VendorHeader from './VendorComponents/Header';
import VendorUser from './VendorComponents/VendorUser';
import VendorCategory from './VendorComponents/VendorCategory';
import VendorOrder from './VendorComponents/Orders';
import VendorProductCatalog from './VendorComponents/ProductCatalog';
import AddProduct from './VendorComponents/Product';
import VendorProduct from './VendorComponents/Product'
import '../src/MainComponent/Library/Fontawsome/Font-awsome.css'
import '../src/MainComponent/Library/Icomoonfont/icomoon.css'
import '../src/MainComponent/Library/elegant-icons/css/elegant.css'
import '../src/MainComponent/Library/feather-font/css/iconfont.css'
import '../src/MainComponent/Library/wpbingofont/css/wpbingofont.css'
import VendorLogin from './VendorComponents/VendorLogin';
import BrandRequest from './AdminComponent/BrandRequest';
import BlogCategory from './AdminComponent/BlogCategory';
import BlogPosts from './AdminComponent/BlogPosts';
import Faq from './AdminComponent/Faq';
import AddBrand from './VendorComponents/AddBrand';
import Deleteduser from './AdminComponent/Deleteduser';
import Adminuserform from './AdminComponent/Adminuserform';
import Contact from './MainComponent/Pages/Contact';
import VendorRegister from './MainComponent/Pages/VendorRegistration';
import VendorRequest from './AdminComponent/VendorRequest';
import Returnrequest from './AdminComponent/Returnrequest';
import Returnrequestview from './AdminComponent/Returnrequestview';
import CancellationReasons from './AdminComponent/CancellationReasons';
import Seo from './AdminComponent/Seo';
import SeoForm from './AdminComponent/SeoForm';
import SiteFaq from './MainComponent/Pages/Faq';
import AboutUS from './AdminComponent/AboutUs';
import SalesReport from './AdminComponent/SalesReport';
import ProductTag from './AdminComponent/ProductTag';
import About from './MainComponent/Pages/About';
import ImageGallery from './MainComponent/Pages/ImageGallery';
import ProductStock from './VendorComponents/ProductStock';
import custdecryptedUserId from './Utils/CustUserid';
import ThankYou from './MainComponent/Pages/ThankYouPage';
import MyDocument from './AdminComponent/MyDocument';
import Tags from './AdminComponent/Tags';
import Terms from './MainComponent/Pages/Terms';
import Privacy from './MainComponent/Pages/Privacy';
import ShippingPolicy from './MainComponent/Pages/ShippingPolicy';
import Refund from './MainComponent/Pages/Refund';
import PaymentFailed from './MainComponent/Pages/PaymentFailed';
import CommingSoon from './MainComponent/CommingSoon';





const Router = createHashRouter([
  {
    path: '/weblog',
    element: <WebLogin />
  },
  {
    path: '/vendorlog',
    element: <VendorLogin />
  },
  {
    path: '/doc',
    element: <MyDocument />
  },
  {
    path: '/webapp/vendorform/:id',
    element: <VendorForm />
  },
  {
    path: '/webapp/addimages/:product_id/:product_name',
    element: <AddProductImg />
  },
  {
    path: '/webapp/addtags/:product_id/:product_name',
    element: <Tags />
  },
  {
    path: '/vendor/addimages/:product_id',
    element: <AddProductImg />
  },
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/',
      //   element: <CommingSoon />
      // },
      {
        path: '/',
        element: <DashBoard />
      },
      {
        path: '/shopcart',
        element: <ShopCart />
      },
      {
        path: '/:brand_id',
        element: <ShopProduct />
      },

      {
        path: '/shopwishlist',
        element: <ShopWishlist />
      },
      {
        path: '/detailpage/:productslug',
        element: <DetailPage />
      },
      {
        path: '/shoproduct',
        element: <ShopProduct />
      },
      {
        path: '/payment-success',
        element: <ThankYou />
      },
      {
        path: '/payment-failure',
        element: <PaymentFailed />
      },

      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/sitefaq',
        element: <SiteFaq />
      },
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/privacy',
        element: <Privacy />
      },
      {
        path: '/shippingpolicy',
        element: <ShippingPolicy />
      },
      {
        path: '/refund',
        element: <Refund />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/imagegallery',
        element: <ImageGallery />
      },
      {
        path: '/vendorregister',
        element: <VendorRegister />
      },

      {
        path: '/shoproduct/:groupslug',
        element: <ShopProduct />
      },
      {
        path: '/shoproduct/:groupslug/:catslug',
        element: <ShopProduct />
      },
      {
        path: '/shoproduct/:groupslug/:catslug/:subcatslug',
        element: <ShopProduct />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/profile/wishlist',
        element: <ProfileWish />
      },
      {
        path: '/profile/address',
        element: <Address />
      },
      {
        path: '/profile/order',
        element: <ProfileOrder />
      },
      {
        path: '/profile/order/:orderid',
        element: <OrderView />
      },
      {
        path: '/checkout/:orderid',
        element: <Checkout />
      },
    ]
  },


  {
    path: '/webapp',
    element: <WebApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/webapp',
        element: <AdminDashBoard />
      },
      {
        path: '/webapp/gallery',
        element: <Gallery />
      },

      {
        path: '/webapp/vendormaster',
        element: <VendorMaster />
      },
      {
        path: '/webapp/adminuser',
        element: <AdminUser />
      },
      {
        path: '/webapp/adminuser/:userid',
        element: <Adminuserform />
      },
      {
        path: '/webapp/category/',
        element: <Category />
      },
      {
        path: '/webapp/group/',
        element: <Group />
      },
      {
        path: '/webapp/vendorrequest',
        element: <VendorRequest />
      },
      {
        path: '/webapp/returnrequest',
        element: <Returnrequest />
      },
      {
        path: '/webapp/returnrequestview/:requestid',
        element: <Returnrequestview />
      },
      {
        path: '/webapp/productapproval',
        element: <ProductApproval />
      },
      {
        path: '/webapp/cancelreasons',
        element: <CancellationReasons />
      },
      {
        path: '/webapp/subcategory',
        element: <SubCatetgory />
      },
      {
        path: '/webapp/deleteduser',
        element: <Deleteduser />
      },
      {
        path: '/webapp/seo',
        element: <Seo />
      },
      {
        path: '/webapp/seo/:seoid',
        element: <SeoForm />
      },
      {
        path: '/webapp/Aboutus',
        element: <AboutUS />
      },

      {
        path: '/webapp/producttag',
        element: <ProductTag />
      },
      {
        path: '/webapp/salesreport',
        element: <SalesReport />
      },
      {
        path: '/webapp/product/:update_id',
        element: <Product />
      },

      {
        path: '/webapp/productcatalog',
        element: <ProductCatalog />

      },


      {
        path: '/webapp/brand',
        element: <Brand />
      },
      {
        path: '/webapp/brandrequest',
        element: <BrandRequest />
      },
      {
        path: '/webapp/orders',
        element: <Orders />
      },




      {
        path: '/webapp/view/:orderid',
        element: <View />
      },

      {
        path: '/webapp/banner',
        element: <Banner />
      },

      {
        path: '/webapp/reviewcomment',
        element: <ReviewComment />
      },


      {
        path: '/webapp/socialmedia',
        element: <SocialMedia />
      },

      {
        path: '/webapp/settings',
        element: <SettingPages />
      },
      {
        path: '/webapp/color',
        element: <Color />
      },
      {
        path: '/webapp/roleassign',
        element: <RoleAssignment />
      },
      {
        path: '/webapp/addrole',
        element: <AddRole />
      },
      {
        path: '/webapp/blogcategory',
        element: <BlogCategory />
      },
      {
        path: '/webapp/blogposts',
        element: <BlogPosts />
      },
      {
        path: '/webapp/faq',
        element: <Faq />
      },
      {
        path: '/webapp/productapprovalview/:productid',
        element: <Productapprovalview />
      },
      // {
      //   path: '/webapp/addimages/:product_id',
      //   element: <AddProductImg />
      // },

    ]
  },


  {
    path: '/vendor',
    element: <VendorApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/vendor',
        element: <AdminDashBoard />
      },
      {
        path: '/vendor/addProduct/:update_id',
        element: <AddProduct />
      },

      {
        path: '/vendor/vendormaster',
        element: <VendorMaster />
      },
      {
        path: '/vendor/vendoruser',
        element: <VendorUser />
      },
      {
        path: '/vendor/',
        element: <VendorUser />
      },
      {
        path: '/vendor/product/:update_id',
        element: <VProduct />
      },

      {
        path: '/vendor/orders',
        element: <VendorOrder />
      },
      {
        path: '/vendor/productstock',
        element: <ProductStock />
      },
      {
        path: '/vendor/productcatalog',
        element: <VendorProductCatalog />
      },

      {
        path: '/vendor/view',
        element: <View />
      },
      {
        path: '/vendor/addbrand',
        element: <AddBrand />
      },
      {
        path: '/vendor/settings',
        element: <VendorSettingPages />
      },



    ]
  }
])

function checkLocalStorageAndRedirect(navigate) {
  const user_id = Cookies.get('userid');
  if (user_id == null) {
    navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  }
}


function checkLocalStorage(navigate) {
  const user_id = Cookies.get('vendorid');
  if (user_id == null) {
    navigate('/vendorlog'); // Redirect to dashboard if id exists in localStorage
  }
}


function ScrollToTop() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function WebApp() {

  const [id, setId] = useState(null)

  async function accessSession() {
    axios.get(`${BASE_URL}/checkauth`)
      .then((res) => {
        if (res.data.valid) {
          // setId(res.data.id)
        } else {
          navigate('/weblog')
        }
      });
  }



  // axios.defaults.withCredentials = true

  const navigate = useNavigate();
  useEffect(() => {
    checkLocalStorageAndRedirect(navigate);
    accessSession()

  }, [navigate]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);





  return (
    <>

      <div className="container-scroller row">
        <Header />
        <Outlet />
      </div>
    </>

  );
}

function VendorApp() {

  const [id, setId] = useState(null)

  async function accessSession() {
    axios.get(`${BASE_URL}/checkauth`)
      .then((res) => {
        if (res.data.valid) {
          // setId(res.data.id)
        } else {
          navigate('/vendorlog')
        }
      });
  }



  const navigate = useNavigate();
  useEffect(() => {
    checkLocalStorage(navigate);
    accessSession()
  }, [navigate]);








  return (
    <>
      <div className="container-scroller d-flex">
        {/* <Header /> */}
        <VendorHeader />
        <Outlet />
      </div>
    </>

  );
}



function App() {
  const [loader, setLoader] = useState(true)
  const location = useLocation();
  const { pathname } = useLocation();

  const [cartCount, setCartCount] = useState(0);




  async function fetchCartCount() {
    try {
      const data = {
        order_id: Cookies.get(`orderid`),
      };
      const response = await axios.post(`${BASE_URL}/getcartcount`, data);
      setCartCount(response.data[0].count); // Assuming the response has a count property
    } catch (err) {

    }
  };




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartCount())

    setLoader(true);

    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, 1000);


    return () => clearTimeout(timeoutId);
  }, [location.pathname]);



  return (
    <>
      <ScrollToTop />
      {/* <div id="page" class="hfeed page-wrapper"> */}
      {loader && <SiteLoader />}
      <SiteHeader cartCount={cartCount} />
      <Outlet fetchcount={fetchCartCount} />
      <SiteFooter />
      {/* </div> */}
    </>

  );
}

export default Router;
