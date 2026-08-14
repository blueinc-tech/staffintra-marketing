export default function Cta() {
  return (
    <>
      <section className="cta pos-rel" data-bg-color="#1b0042">
                  <div className="as-cta-wrapper pos-rel">
                      <div className="container">
                          <div className="as-cta-inner">
                              <div className="xb-item--inner">
                                  <div className="sec-title sec-title--three mb-45"> 
                                      <h2 className="title wow xb-animetion-left" data-wow-delay="0ms" data-wow-duration="700ms">Make Automation Your Competitive Advantage</h2>
                                      <p className="content">Enterprise-grade security keeps your workflows and data protected</p>
                                  </div>
                                  <div className="xb-item--btn ul_li">
                                      <a className="thm-btn thm-btn--gradient2" data-split-link="" aria-label="Start a 14-Days Free Trial" href="#">
                                          <div className="inner">
                                              <div className="text" data-link-shadow="">Start a 14-Days Free Trial</div>
                                              <div className="arrow"><img src="/sastik/assets/img/icon/multi-star.svg" alt="icon" /></div>
                                          </div>
                                          <div className="btn-shape">
                                              <div className="shape shape--1"></div>
                                              <div className="shape shape--2"></div>
                                              <div className="shape shape--3"></div>
                                          </div>
                                      </a>
                                      <a className="thm-btn thm-btn--gradient2 bg_white popup-video" data-split-link="" aria-label="Watch 2 Minutes Demo" href="https://www.youtube.com/watch?v=7e90gBu4pas">
                                          <div className="inner">
                                              <div className="text" data-link-shadow="">Watch 2 Minutes Demo</div>
                                              <div className="arrow"><img src="/sastik/assets/img/icon/play-icon.svg" alt="icon" /></div>
                                          </div>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="cta-bg-video">
                          <video loop muted autoPlay playsInline poster="/sastik/assets/img/cta/video-poster.png">
                              <source src="/sastik/assets/img/cta/cta-video.mp4" />
                          </video>
                      </div>
                      <div className="blur-bottom-shape"></div>
                  </div>
                  <div className="as-sec-shape">
                      <div className="shape shape--5"><img src="/sastik/assets/img/shape/corner-shape05.png" alt="" /></div>
                      <div className="shape shape--6"><img src="/sastik/assets/img/shape/corner-shape06.png" alt="" /></div>
                  </div>
              </section>
    </>
  );
}
