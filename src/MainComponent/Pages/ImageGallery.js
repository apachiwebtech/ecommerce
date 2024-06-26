import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}


const ImageGallery = () => {
    const [data, setData] = useState([])


    async function getimages() {

        axios.get(`${BASE_URL}/get_gallery`, data)
            .then((res) => {
                setData(res.data)
            })
    }

    useEffect(() => {
        getimages()
    }, [])

    return (
        <div>
            <div id="site-main" class="site-main">
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.top_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">
                        <div id="title" class="page-title">
                            <div class="section-container">
                                <div class="content-title-heading">
                                    <h1 class="text-title-heading">
                                        Gallery
                                    </h1>
                                </div>
                                <div class="breadcrumbs">
                                    <a href="index.html">Home</a><span class="delimiter"></span>Gallery
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">


                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="">
                                            <div class="block-widget-wrap">


                                                {/* <ImageList variant="masonry" cols={3} gap={8}>
                                                    {data.map((item) => (
                                                        <ImageListItem key={item.img}>
                                                            <img
                                                                srcSet={`${IMG_URL}/gallery/${item.upload_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                                src={`${IMG_URL}/gallery/${item.upload_image}?w=248&fit=crop&auto=format`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> */}

                                                <ImageList
                                                    sx={{ width: "100%" ,height : "auto" }}
                                                    variant="quilted"
                                                    cols={3}
                                                    // rowHeight={500}
                                                >
                                                    {data.map((item) => (
                                                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                                            <img
                                                                {...srcset(`${IMG_URL}/gallery/${item.upload_image}`,  item.rows, item.cols)}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList>


                                            </div>
                                        </div>
                                    </div>
                                </section>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageGallery;