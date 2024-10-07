import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AboutSection from '../HomeSubCompponent/AboutSection'
import AdvertiseSection from '../HomeSubCompponent/AdvertiseSection'
import AmenitiesSection from '../HomeSubCompponent/AmenitiesSection'
import TrendingSection from '../HomeSubCompponent/TrendingSection'
import BannerSection from '../HomeSubCompponent/BannerSection'
import CategorySection from '../HomeSubCompponent/CategorySection'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import custdecryptedUserId from '../../Utils/CustUserid'
import Cookies from 'js-cookie';
import { getCartCount } from '../../Store/Cart/cart-action'
import { useDispatch } from 'react-redux'
import MovingCategory from '../HomeSubCompponent/MovingCategory'
import Advertise2 from '../HomeSubCompponent/Advertise2'




const DashBoard = () => {




  return (
    <div id="site-main" class="site-main">
    
      <div id="main-content" class="main-content">
        <div id="primary" class="content-area">
          <div id="content" class="site-content" role="main">

            <BannerSection />

            <MovingCategory/>

            <AdvertiseSection />
            <Advertise2 />

            {/* <CategorySection /> */}

            <TrendingSection />


            {/* <AboutSection /> */}

            <AmenitiesSection />


          </div>
        </div>
      </div>
    </div>

  )
}

export default DashBoard