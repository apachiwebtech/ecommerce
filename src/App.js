import logo from './logo.svg';
import './App.css';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'
import Header from './AdminComponent/Header';
import "bootstrap-icons/font/bootstrap-icons.css";
import EmergencyForm from './AdminComponent/EmergencyForm';
import VendorMaster from './AdminComponent/VendorMaster';
import VendorForm from './AdminComponent/VendorForm';
import AdminUser from './AdminComponent/AdminUser';
import SubCatetgory from './AdminComponent/SubCategory';
import { useEffect } from 'react';
import Category from './AdminComponent/Category';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import WebLogin from './AdminComponent/WebLogin';
import DashBoard from './MainComponent/DashBoard';
import Product from './AdminComponent/Product';
import Product_Catalog from './AdminComponent/Product_Catalog';
import SellersProductInventory from './AdminComponent/SellersProductInventory';
import Brand from './AdminComponent/Brand';
import Shop from './AdminComponent/Shop';
import ProductOption from './AdminComponent/ProductOption';
import ProductTag from './AdminComponent/ProductTag';
import ThresholdProduct from './AdminComponent/ThresholdProduct';
const Router = createBrowserRouter([
  {
    path: '/weblog',
    element: <WebLogin />
  },
  {
    path: '/webapp/vendorform',
    element: <VendorForm />
  },
  {
    path:'/',
    element :<App/>,
    children:[
      {
        path: '/',
        element: <DashBoard/>
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
        path: '/webapp/eform',
        element: <EmergencyForm />
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
        path: '/webapp/category',
        element: <Category />
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
        path: '/webapp/product_catalog',
        element: <Product_Catalog />
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
      
    ]
  }
])


function checkLocalStorageAndRedirect(navigate) {
  const user_id = localStorage.getItem('userid');
  if (user_id == null) {
    navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  }
}


function WebApp() {

  const navigate = useNavigate();

  useEffect(() => {
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

function App(){
  return (
    <>
      <div className="container-scroller d-flex">
        <Outlet />
      </div>
    </>

  );
}

export default Router;
