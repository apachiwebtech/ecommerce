import logo from './logo.svg';
import './App.css';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'
import Header from './AdminComponent/Header';
import "bootstrap-icons/font/bootstrap-icons.css";
import VendorMaster from './AdminComponent/VendorMaster';
import VendorForm from './AdminComponent/VendorForm';
import AdminUser from './AdminComponent/AdminUser';
import SubCatetgory from './AdminComponent/SubCategory';
import { useEffect, useState } from 'react';
import Category from './AdminComponent/Category';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import WebLogin from './AdminComponent/WebLogin';
import DashBoard from './MainComponent/DashBoard';
import Product from './AdminComponent/Product';
import ProductCatalog from './AdminComponent/ProductCatalog';
import SellersProductInventory from './AdminComponent/SellersProductInventory';
import Brand from './AdminComponent/Brand';
import Shop from './AdminComponent/Shop';
import ProductOption from './AdminComponent/ProductOption';
import ProductTag from './AdminComponent/ProductTag';
import ThresholdProduct from './AdminComponent/ThresholdProduct';
import Orders from './AdminComponent/Orders';
import View from './AdminComponent/View';
import Banner from './AdminComponent/Banner';
import ReviewComment from './AdminComponent/ReviewComment';
import Testimonial from './AdminComponent/Testimonials';
import SocialMedia from './AdminComponent/SocialMedia';
import ProductApproval from './AdminComponent/ProductApproval';
import Gallery from './AdminComponent/Gallery';
import axios from 'axios';
import { BASE_URL } from './AdminComponent/BaseUrl';
const Router = createBrowserRouter([
  {
    path: '/weblog',
    element: <WebLogin />
  },
  {
    path: '/webapp/vendorform/:id',
    element: <VendorForm />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DashBoard />
      },
    ]
  },


  {
    path: '/webapp',
    element: <WebApp />,
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
        path: '/webapp/category/',
        element: <Category />
      },
      {
        path:'/webapp/productapproval',
        element :<ProductApproval/>
      },
      {
        path: '/webapp/subcategory',
        element: <SubCatetgory />
      },

      {
        path: '/webapp/product',
        element: <Product />
      },

      {
        path: '/webapp/productcatalog',
        element: <ProductCatalog />
      },

      {
        path: '/webapp/sellersproductinventory',
        element: <SellersProductInventory />
      },

      {
        path: '/webapp/brand',
        element: <Brand />
      },
      {
        path: '/webapp/orders',
        element: <Orders />
      },
      {
        path: '/webapp/shop',
        element: <Shop />
      },

      {
        path: '/webapp/productoption',
        element: <ProductOption />
      },

      {
        path: '/webapp/producttag',
        element: <ProductTag />
      },

      {
        path: '/webapp/thresholdproduct',
        element: <ThresholdProduct />
      },
      {
        path: '/webapp/view',
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
        path: '/webapp/testimonial',
        element: <Testimonial />
      },

      {
        path: '/webapp/socialmedia',
        element: <SocialMedia />
      },

    ]
  }
])





function WebApp() {
  const [auth , setauth] = useState()

  const navigate = useNavigate();

  function checkLocalStorageAndRedirect(navigate) {

    if (auth !== 1) {
      navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
    }else{
      alert("token is not correct")
    }
  }


  async function accesstoken (){
    axios.get(`${BASE_URL}/checkauth`,{
      headers : {
        'access-token' : localStorage.getItem('token')
      }
    })
    .then((res)=>{
      setauth(res.data.status)
    })
  }

  useEffect(() => {
    accesstoken()
    checkLocalStorageAndRedirect(navigate);
  }, [navigate]);


  return (
    <>
      <div className="container-scroller d-flex">
        <Header />
        <Outlet />
      </div>
    </>

  );
}

function App() {
  return (
    <>
      <div className="container-scroller d-flex">
        <Outlet />
      </div>
    </>

  );
}

export default Router;
