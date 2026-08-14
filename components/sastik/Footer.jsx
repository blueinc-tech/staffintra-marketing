export default function Footer() {
  return (
    <>
      <footer className="footer pb-40" data-bg-color="#000">
              <div className="as-footer-wrapper">
                  <div className="as-blur-shape">
                      <div className="shape shape--1"></div>
                      <div className="shape shape--2"></div>
                  </div>
                  <div className="container">
                      <div className="as-footer-inner">
                          <div className="row mt-none-50">
                              <div className="col-lg-6 mt-50">
                                  <div className="as-footer-newsletter">
                                      <h2 className="xb-item--title">Join Our Newsletter</h2>
                                      <form className="xb-item--input_field">
                                          <input type="text" placeholder="Enter your  mail" />

                                          <a href="#!">Subscribe</a>
                                      </form>
                                      <ul className="xb-social-media list-unstyled ul_li">
                                          <li><a href="#!"><i className="fa-brands fa-instagram"></i></a></li>
                                          <li><a href="#!"><i className="fa-brands fa-facebook-f"></i></a></li>
                                          <li><a href="#!"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M8.42619 6.12687L13.697 0H12.448L7.87135 5.31988L4.216 0H0L5.52759 8.0446L0 14.4696H1.24908L6.08212 8.85159L9.94243 14.4696H14.1584L8.42589 6.12687H8.42619ZM6.7154 8.11547L6.15534 7.31441L1.69914 0.940285H3.61766L7.21386 6.08441L7.77392 6.88547L12.4486 13.572H10.5301L6.7154 8.11578V8.11547Z" fill="#045857"></path>
                                          </svg></a></li>
                                          <li><a href="#!"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="col-lg-6 mt-50">
                                  <div className="as-footer-widget-wrap">
                                      <div className="as-footer-widget">
                                          <span className="footer-widget-title">Pages</span>
                                          <ul className="widget-list list-unstyled">
                                              <li><a href="#!">Problems</a></li>
                                              <li><a href="#!">Solutions</a></li>
                                              <li><a href="#!">How it works</a></li>
                                              <li><a href="#!">Use case</a></li>
                                              <li><a href="#!">Features</a></li>
                                          </ul>
                                      </div>
                                      <div className="as-footer-widget">
                                          <span className="footer-widget-title">Pages</span>
                                          <ul className="widget-list list-unstyled">
                                              <li><a href="#!">AI introduction</a></li>
                                              <li><a href="#!">pricing</a></li>
                                              <li><a href="#!">FAQ</a></li>
                                              <li><a href="#!">Integrations</a></li>
                                              <li><a href="#!">Security</a></li>
                                          </ul>
                                      </div>
                                      <div className="as-footer-widget">
                                          <span className="footer-widget-title">Help</span>
                                          <ul className="widget-list list-unstyled">
                                              <li><a href="#!">24/7 Support</a></li>
                                              <li><a href="#">Contact us</a></li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="xb-footer_bottom hd-footer-bottom as-footer-bottom ul_li_between">
                              <p>Copyright © 2026 <a href="#">Sastik,</a> All rights reserved.</p>
                              <p><a href="#!">terms of service .</a> <a href="#!">privacy policy</a></p>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
    </>
  );
}
