import React from 'react'
import banner1 from '../../assets/frontimg/banner/banner-1.jpg'
import banner2 from '../../assets/frontimg/banner/banner-2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Advertise2 = () => {
  return (
    <div>
      <section class="section section-padding m-b-70">
        <div class="section-container">


          <div class="row">
            <Swiper spaceBetween={20}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
              navigation
              breakpoints={{
                320: {
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}>
              <div className='col-lg-4 mt-2'>
                <SwiperSlide>
                <img src={banner1} alt="" />

                </SwiperSlide>
              </div>
              <div className='col-lg-4 mt-2'>
              <SwiperSlide>
                <img src={banner1} alt="" />

                </SwiperSlide>

              </div>
              <div className='col-lg-4 mt-2'>
              <SwiperSlide>
                <img src={banner1} alt="" />

                </SwiperSlide>

              </div>
            </Swiper>

          </div>

        </div>
      </section>
    </div>
  )
}

export default Advertise2