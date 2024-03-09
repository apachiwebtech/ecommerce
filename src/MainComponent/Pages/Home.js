import React from 'react'
import { Link } from 'react-router-dom'
import AboutSection from '../HomeSubCompponent/AboutSection'
import AdvertiseSection from '../HomeSubCompponent/AdvertiseSection'
import AmenitiesSection from '../HomeSubCompponent/AmenitiesSection'
import TrendingSection from '../HomeSubCompponent/TrendingSection'
import BannerSection from '../HomeSubCompponent/BannerSection'
import CategorySection from '../HomeSubCompponent/CategorySection'




const DashBoard = () => {


  return (
    <div id="site-main" class="site-main">
    
      <div id="main-content" class="main-content">
        <div id="primary" class="content-area">
          <div id="content" class="site-content" role="main">

            <BannerSection />

            <CategorySection />

            <TrendingSection />

            <AdvertiseSection />

            <AboutSection />

            <AmenitiesSection />


          </div>
        </div>
      </div>
    </div>

  )
}

export default DashBoard