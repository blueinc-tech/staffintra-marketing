export default function Header() {
  return (
    <>
      <header id="xb-header-area" className="header-area header-area--three header-transparent is-sticky"> 
              <div className="xb-header stricky">
                  <div className="container">
                      <div className="header__wrap ul_li_between">
                          <div className="xb-header-logo">
                              <a href="#" className="logo"><img src="/sastik/assets/img/logo/logo-white.svg" alt="logo" /></a>
                          </div>
                          <div className="main-menu__wrap navbar navbar-expand-lg p-0">
                              <nav className="main-menu collapse navbar-collapse">
                                  <ul>
                                      <li className="menu-item-has-children has-mega-menu active"><a href="#"><span>Home</span></a>
                                          <ul className="submenu mega-menu">
                                              <li>
                                                  <div className="mega-menu-content">
                                                      <div className="row">
                                                          <div className="col col-md-3">
                                                              <div className="demo-item">
                                                                  <div className="demo-pic">
                                                                      <a href="#">
                                                                          <img src="/sastik/assets/img/demo/demo-1.png" alt="image" />
                                                                      </a>
                                                                  </div>
                                                                  <h3 className="title"><a href="#">01: Help Desk</a></h3>
                                                              </div>
                                                          </div>
                                                          <div className="col col-md-3">
                                                              <div className="demo-item">
                                                                  <div className="demo-pic">
                                                                      <a href="#">
                                                                          <img src="/sastik/assets/img/demo/demo-2.png" alt="image" />
                                                                      </a>
                                                                  </div>
                                                                  <h3 className="title"><a href="#">02: Fintech SaaS</a></h3>
                                                              </div>
                                                          </div>
                                                          <div className="col col-md-3">
                                                              <div className="demo-item">
                                                                  <div className="demo-pic active">
                                                                      <a href="#">
                                                                          <img src="/sastik/assets/img/demo/demo-3.png" alt="image" />
                                                                      </a>
                                                                  </div>
                                                                  <h3 className="title"><a href="#">03: Automation SaaS</a></h3>
                                                              </div>
                                                          </div>
                                                          <div className="col col-md-3">
                                                              <div className="demo-item">
                                                                  <div className="demo-pic">
                                                                      <a href="#">
                                                                          <img src="/sastik/assets/img/demo/demo-4.png" alt="image" />
                                                                      </a>
                                                                  </div>
                                                                  <h3 className="title"><a href="#">04: Task Management SaaS</a></h3>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </li>
                                          </ul>
                                      </li>
                                      <li className="menu-item-has-children">
                                          <a href="#!"><span>pages</span></a>
                                          <ul className="submenu">
                                              <li><a href="#"><span>team</span></a></li>
                                              <li><a href="#"><span>career</span></a></li>
                                              <li><a href="#"><span>career details</span></a></li>
                                              <li><a href="#"><span>case details</span></a></li>
                                              <li><a href="#"><span>error</span></a></li>
                                          </ul>
                                      </li>
                                      <li><a href="#"><span>about us</span></a></li>
                                      <li className="menu-item-has-children">
                                          <a href="#"><span>blog</span></a>
                                          <ul className="submenu">
                                              <li><a href="#"><span>blog</span></a></li>
                                              <li><a href="#"><span>blog details</span></a></li>
                                          </ul>
                                      </li>
                                      <li><a href="#"><span>contact</span></a></li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="xb-header-btn d-lg-block d-none">
                              <a className=" thm-btn thm-btn--gradient2" data-split-link="" aria-label="Talk to Sales" href="#">
                                  <div className="inner">
                                      <div className="text" data-link-shadow="">Talk to Sales</div>
                                      <div className="arrow"><img src="/sastik/assets/img/icon/sms-icon02.svg" alt="icon" /></div>
                                  </div>
                                  <div className="btn-shape">
                                      <div className="shape shape--1"></div>
                                      <div className="shape shape--2"></div>
                                      <div className="shape shape--3"></div>
                                  </div>
                              </a>
                          </div>
                          <div className="header-bar-mobile side-menu d-lg-none">
                              <a className="xb-nav-mobile" href="#">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                              </a>
                          </div>
                      </div>
                      <div className="xb-header-wrap">
                          <div className="xb-header-menu">
                              <div className="xb-header-menu-scroll">
                                  <div className="xb-menu-close xb-hide-xl xb-close"></div>
                                  <div className="xb-logo-mobile xb-hide-xl">
                                  <a href="#" rel="home"><img src="/sastik/assets/img/logo/logo.svg" alt="logo" /></a></div>
                                  <div className="xb-header-mobile-search xb-hide-xl">
                                      <form role="search" action="#">
                                          <input type="text" placeholder="Search..." name="s" className="search-field" />
                                          <button className="search-submit" type="submit"><i className="far fa-search"></i></button>
                                      </form>
                                  </div>
                                  <nav className="xb-header-nav">
                                      <ul className="xb-menu-primary clearfix">
                                          <li className="menu-item menu-item-has-children">
                                              <a href="#!"><span>Home</span></a>
                                              <ul className="sub-menu">
                                                  <li><a href="#"><span>Help Desk</span></a></li>
                                                  <li><a href="#"><span>Fintech SaaS</span></a></li>
                                                  <li><a href="#"><span>Automation SaaS</span></a></li>
                                                  <li><a href="#"><span>Task Management SaaS</span></a></li>
                                              </ul>
                                          </li>
                                          <li className="menu-item menu-item-has-children">
                                              <a href="#!"><span>page</span></a>
                                              <ul className="sub-menu">
                                                  <li><a href="#"><span>team</span></a></li>
                                                  <li><a href="#"><span>career</span></a></li>
                                                  <li><a href="#"><span>career details</span></a></li>
                                                  <li><a href="#"><span>case details</span></a></li>
                                                  <li><a href="#"><span>error</span></a></li>
                                              </ul>
                                          </li>
                                          <li><a href="#"><span>about us</span></a></li>
                                          <li className="menu-item menu-item-has-children">
                                              <a href="#"><span>blog</span></a>
                                              <ul className="sub-menu">
                                                  <li><a href="#"><span>blog</span></a></li>
                                                  <li><a href="#"><span>blog details</span></a></li>
                                              </ul>
                                          </li>
                                          <li><a href="#"><span>contact</span></a></li>
                                      </ul>
                                  </nav>
                              </div>
                          </div>
                          <div className="xb-header-menu-backdrop"></div>
                      </div>
                  </div>
              </div>
          </header>


          <div className="body-overlay"></div>
    </>
  );
}
