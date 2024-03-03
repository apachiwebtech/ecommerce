import React from 'react'
import video1 from '../../assets/frontimg/banner/video-1.jpg'

const AboutSection = () => {
    return (
        <section class="section section-padding background-1 section-mb-l">
            <div class="section-container">
              
                <div class="block block-video">
                    <div class="section-row">
                        <div class="section-column left">
                            <div class="section-column-wrap">
                                <div class="block-widget-wrap">
                                    <div class="block-widget-video">
                                        <div class="video-thumb">
                                            <img width="565" height="635" class="img-responsive" src={video1} alt="" />
                                        </div>
                                        <div class="video-wrap">
                                            <div class="video" data-src="https://www.youtube.com/embed/VQOJaYUPZR8" data-toggle="modal" data-target="#video-popup">
                                                <i class="fa fa-play" aria-hidden="true"></i>
                                            </div>
                                            <div class="content-video modal fade" id="video-popup" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-body">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                            <div class="embed-responsive embed-responsive-16by9">
                                                                <iframe class="embed-responsive-item" src="" id="video" allowscriptaccess="always" title='new' allow="autoplay"></iframe>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section-column right">
                            <div class="section-column-wrap">
                                <div class="block-widget-wrap">
                                    <div class="block-widget-video">
                                        <div class="video-text">
                                            <h2 class="title">From bottle <br/>to chair</h2>
                                            <div class="description">In our design and production processes, we are always looking at where environmental thinking and economic improvement intersect – resulting in minimal waste in every aspect. The way we utilise PET Technology, emphasizes this vision.</div>
                                            <a href="#" class="button button-white">OUR STORIES</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection