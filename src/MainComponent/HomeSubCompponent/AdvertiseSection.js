import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/frontimg/banner/banner-1.jpg'
import banner2 from '../../assets/frontimg/banner/banner-2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import { Link } from 'react-router-dom';


const AdvertiseSection = () => {

	const [data, setData] = useState([]);
	const [slot, setSlot] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	async function getLocation() {
		const requestData = { locid: 1 };

		try {
			const response = await axios.post(`${BASE_URL}/getlocation`, requestData);

			setData(response.data);
			setSlot(Number(response.data[0].slot));
			setIsLoading(false); // Stop loading after data is fetched
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	useEffect(() => {
		getLocation();
	}, []);

	// if (isLoading) {
	// 	return <div>Loading...</div>; 
	// }


	  


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
									slidesPerView: 1,
								},
								640: {
									slidesPerView: 1
								},
								768: {
									slidesPerView: slot,
								},
								1024: {
									slidesPerView: slot,
								},
							}}>
							{data.map((item) => {
								return (
									<SwiperSlide>
									{item.type === 'Image' 
									  ? <Link to={item.link} target={item.target}> <img src={`${IMG_URL}/Advertisement/` + item.image} alt={item.title} /> </Link>
									  : <div dangerouslySetInnerHTML={{ __html: item.iframe}}>{item.ifram}</div>}
								  </SwiperSlide>
								  
								)
							})}

						</Swiper>


					</div>

				</div>
			</section>
		</div>
	)
}

export default AdvertiseSection