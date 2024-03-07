import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
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
import ProductApproval from './AdminComponent/ProductApproval';
import ProductCatalog from './AdminComponent/ProductCatalog';
import ProductOption from './AdminComponent/ProductOption';
import ProductTag from './AdminComponent/ProductTag';
import ReviewComment from './AdminComponent/ReviewComment';
import SellersProductInventory from './AdminComponent/SellersProductInventory';
import SettingPages from './AdminComponent/SettingPages';
import Shop from './AdminComponent/Shop';
import SocialMedia from './AdminComponent/SocialMedia';
import SubCatetgory from './AdminComponent/SubCategory';
import Testimonial from './AdminComponent/Testimonials';
import ThresholdProduct from './AdminComponent/ThresholdProduct';
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
import Group from './AdminComponent/Group';
import AddProductImg from './AdminComponent/AddProductImg';
import ShopCart from './MainComponent/Pages/ShopCart';
import ShopWishlist from './MainComponent/Pages/ShopWishlist';
import DetailPage from './MainComponent/Pages/DetailPage';


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
    path: '/webapp/addimages/:product_id/:product_name',
    element: <AddProductImg />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DashBoard />
      },
      {
        path: '/shopcart',
        element: <ShopCart />
      },
      {
        path: '/shopwishlist',
        element: <ShopWishlist />
      },
      {
        path: '/detailpage',
        element: <DetailPage />
      },
      {
        path: '/shoproduct',
        element: <ShopProduct/>
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
        path: '/webapp/category/',
        element: <Category />
      },
      {
        path: '/webapp/group/',
        element: <Group />
      },
      {
        path: '/webapp/productapproval',
        element: <ProductApproval />
      },
      {
        path: '/webapp/subcategory',
        element: <SubCatetgory />
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

      {
        path: '/webapp/settings',
        element: <SettingPages />
      },
      {
        path: '/webapp/color',
        element: <Color />
      },
      // {
      //   path: '/webapp/addimages/:product_id',
      //   element: <AddProductImg />
      // },

    ]
  }
])

function checkLocalStorageAndRedirect(navigate) {
  const user_id = Cookies.get('userid');
  if (user_id == null) {
    navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  }
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






  // const navigate = useNavigate();

  // async function accessToken() {
  //   axios.get(`${BASE_URL}/checkauth`, {
  //     headers: {
  //       'access-token': Cookies.get('token')
  //     }
  //   })
  //   .then((res) => {
  //     // console.log(res.data.status);

  //     checkLocalStorageAndRedirect(res.data.status); // Pass auth value to the function
  //   });
  // }

  // const checkLocalStorageAndRedirect = (authValue) => {

  //   // console.log(authValue,"ii")
  //   if (authValue !== 1) {
  //     navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  //   }
  // };



  // useEffect(() => {
  //   accessToken();
  // }, []); // Removed 'navigate' from the dependency array as it was causing unnecessary re-renders


  return (
    <>
      <div className="container-scroller d-flex">
        <Header />
        <Outlet  />
      </div>
    </>

  );
}

function App() {
  return (
    <>
      {/* <div id="page" class="hfeed page-wrapper"> */}
    
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      {/* </div> */}
    </>

  );
}

export default Router;
