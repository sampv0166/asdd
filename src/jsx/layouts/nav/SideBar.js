import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
import drump from "../../../images/card/drump.png";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const MM = (props) => {
  return (
    <div className="mm-wrapper">
      <ul className="metismenu" ref={(el) => (el = props.el)}>
        {props.children}
      </ul>
    </div>
  );
};

const SideBar = () => {
  useLayoutEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }

    btn.addEventListener("click", toggleFunc);
  }, []);

  const path = window.location.pathname;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  /// Active menu
  let deshBoard = [
      "",
      "workout-statistic",
      "workout-plan",
      "distance-map",
      "diet-food-menu",
      "personal-record",
    ],
    app = [
      "app-profile",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid/page",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
    ],
    charts = [
      "chart-flot",
      "chart-morris",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-peity",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-media-object",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",
      "uc-nestable",
      "uc-sweetalert",
      "uc-toastr",
      "uc-jqvmap",
      "uc-noui-slider",
    ],
    widget = ["widget"],
    shop = ["shops"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"];

  return (
    <div className="deznav  " id="no-print">
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li
            className={`${
              deshBoard.includes(path.slice(1)) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-networking"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              {/*<li>
                         <Link to="/workout-statistic">
                            Workout Statistic
                         </Link>
                      </li>
                      <li>
                         <Link to="/workout-plan">Workout Plan</Link>
                      </li>
                      <li>
                         <Link to="/distance-map">Distance Map</Link>
                      </li>
                      <li>
                         <Link to="/diet-food-menu">DIet Food Menu</Link>
                      </li>
                      <li>
                         <Link to="/personal-record">Personal Record</Link>
                      </li>*/}
            </ul>
          </li>

          <li
            className={`${
              path.slice(1).includes("ecom-product-grid") ? "mm-active" : ""
            }`}
          >
            <Link
              to={`/ecom-product-grid/page/${1}`}
              className="ai-icon"
              aria-expanded="false"
            >
              <i className="flaticon-381-box"></i>
              <span className="nav-text">Products</span>
            </Link>
          </li>

          <li
            className={`${path.slice(1).includes("shops") ? "mm-active" : ""}`}
          >
            <Link
              to={`/shops/page/1`}
              className="ai-icon"
              aria-expanded="false"
            >
              <i className="bx bx-store"></i>
              <span className="nav-text">Shop</span>
            </Link>
          </li>

          <li
            className={`${path.slice(1).includes("orders") ? "mm-active" : ""}`}
          >
            <Link
              to={`/orders/page/1`}
              className="ai-icon"
              aria-expanded="false"
            >
              <i className="bx bx-cart"></i>
              <span className="nav-text">Orders</span>
            </Link>
          </li>

          <li
            className={`${
              path.slice(1).includes("category") ? "mm-active" : ""
            }`}
          >
            <Link to={`/category`} className="ai-icon" aria-expanded="false">
              <i className="bx bx-list-ol"></i>
              <span className="nav-text">Category</span>
            </Link>
          </li>

          {userInfo.user.typeofuser === "S" ||
          userInfo.user.typeofuser === "A" ? (
            <li
              className={`${
                path.slice(1).includes("usersList") ? "mm-active" : ""
              }`}
            >
              <Link
                to={`/usersList/page/1`}
                className="ai-icon"
                aria-expanded="false"
              >
                <i className="bx bx-user"></i>
                <span className="nav-text">Users</span>
              </Link>
            </li>
          ) : (
            ""
          )}

          <li
            className={`${
              path.slice(1).includes("coupons") ? "mm-active" : ""
            }`}
          >
            <Link to={`/coupons`} className="ai-icon" aria-expanded="false">
              <i class="bx bxs-coupon"></i>
              <span className="nav-text">Coupons</span>
            </Link>
          </li>

          {userInfo.user.typeofuser === "S" ? (
            <li
              className={`${
                path.slice(1).includes("sliders") ? "mm-active" : ""
              }`}
            >
              <Link to={`/sliders/1`} className="ai-icon" aria-expanded="false">
                <i class="bx bx-carousel"></i>
                <span className="nav-text">Sliders</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link to={`/sliders/1`}>Top Sliders</Link>
                </li>
                <li>
                  <Link to="/sliders/2">Bottom Sliders</Link>
                </li>
              </ul>
            </li>
          ) : (
            ""
          )}

          {userInfo.user.typeofuser === "S" ? (
            <li
              className={`${
                path.slice(1).includes("settings") ? "mm-active" : ""
              }`}
            >
              <Link className="ai-icon" to={"/settings"} aria-expanded="false">
                <i class="bx bxs-truck"></i>
                <span className="nav-text">Delivery Charges</span>
              </Link>
            </li>
          ) : (
            ""
          )}

          {/*<li className={`${app.includes(path.slice(1)) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-television"></i>
              <span className="nav-text">Apps</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/app-profile">Profile</Link>
              </li>
              <li>
                <Link className="has-arrow" to="#" aria-expanded="false">
                  Email
                </Link>
                <ul aria-expanded="false">
                  <li>
                    <Link to="/email-compose">Compose</Link>
                  </li>
                  <li>
                    <Link to="/email-inbox">Inbox</Link>
                  </li>
                  <li>
                    <Link to="/email-read">Read</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/app-calender">Calendar</Link>
              </li>
              <li>
                <Link className="has-arrow" to="#" aria-expanded="false">
                  Shop
                </Link>
                <ul aria-expanded="false">
                  <li>
                    <Link to="/ecom-product-grid">Product Grid</Link>
                  </li>
                  <li>
                    <Link to="/ecom-product-list">Product List</Link>
                  </li>
                  <li>
                    <Link to="/ecom-product-detail">Product Details</Link>
                  </li>
                  <li>
                    <Link to="/ecom-product-order">Order</Link>
                  </li>
                  <li>
                    <Link to="/ecom-checkout">Checkout</Link>
                  </li>
                  <li>
                    <Link to="/ecom-invoice">Invoice</Link>
                  </li>
                  <li>
                    <Link to="/ecom-customers">Customers</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li
            className={`${charts.includes(path.slice(1)) ? "mm-active" : ""}`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-controls-3"></i>
              <span className="nav-text">Charts</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/chart-rechart">RechartJs</Link>
              </li>
              <li>
                <Link to="/chart-chartjs">Chartjs</Link>
              </li>
              <li>
                <Link to="/chart-chartist">Chartist</Link>
              </li>
              <li>
                <Link to="/chart-sparkline">Sparkline</Link>
              </li>
              <li>
                <Link to="/chart-apexchart">Apexchart</Link>
              </li>
            </ul>
          </li>
          <li
            className={`${
              bootstrap.includes(path.slice(1)) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-internet"></i>
              <span className="nav-text">Bootstrap</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/ui-accordion">Accordion</Link>
              </li>
              <li>
                <Link to="/ui-alert">Alert</Link>
              </li>
              <li>
                <Link to="/ui-badge">Badge</Link>
              </li>
              <li>
                <Link to="/ui-button">Button</Link>
              </li>
              <li>
                <Link to="/ui-modal">Modal</Link>
              </li>
              <li>
                <Link to="/ui-button-group">Button Group</Link>
              </li>
              <li>
                <Link to="/ui-list-group">List Group</Link>
              </li>
              <li>
                <Link to="/ui-media-object">Media Object</Link>
              </li>
              <li>
                <Link to="/ui-card">Cards</Link>
              </li>
              <li>
                <Link to="/ui-carousel">Carousel</Link>
              </li>
              <li>
                <Link to="/ui-dropdown">Dropdown</Link>
              </li>
              <li>
                <Link to="/ui-popover">Popover</Link>
              </li>
              <li>
                <Link to="/ui-progressbar">Progressbar</Link>
              </li>
              <li>
                <Link to="/ui-tab">Tab</Link>
              </li>
              <li>
                <Link to="/ui-typography">Typography</Link>
              </li>
              <li>
                <Link to="/ui-pagination">Pagination</Link>
              </li>
              <li>
                <Link to="/ui-grid">Grid</Link>
              </li>
            </ul>
          </li>
          <li
            className={`${
              plugins.includes(path.slice(1)) ? "mm-active" : ""
            }`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-heart"></i>
              <span className="nav-text">Plugins</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/uc-select2">Select 2</Link>
              </li>
              <li>
                <Link to="/uc-nestable">Nestedable</Link>
              </li>
              <li>
                <Link to="/uc-noui-slider">Noui Slider</Link>
              </li>
              <li>
                <Link to="/uc-sweetalert">Sweet Alert</Link>
              </li>
              <li>
                <Link to="/uc-toastr">Toastr</Link>
              </li>
              <li>
                <Link to="/map-jqvmap">Jqv Map</Link>
              </li>
            </ul>
          </li>

          <li
            className={`${widget.includes(path.slice(1)) ? "mm-active" : ""}`}
          >
            <Link to="widget-basic" className="ai-icon" aria-expanded="false">
              <i className="flaticon-381-settings-2"></i>
              <span className="nav-text">Widget</span>
            </Link>
          </li>

          <li
            className={`${forms.includes(path.slice(1)) ? "mm-active" : ""}`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-notepad"></i>
              <span className="nav-text forms">Forms</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/form-element">Form Elements</Link>
              </li>
              <li>
                <Link to="/form-wizard">Wizard</Link>
              </li>
              <li>
                <Link to="/form-editor-summernote">Summernote</Link>
              </li>
              <li>
                <Link to="form-pickers">Pickers</Link>
              </li>
              <li>
                <Link to="form-validation-jquery">Jquery Validate</Link>
              </li>
            </ul>
          </li>
          <li
            className={`${table.includes(path.slice(1)) ? "mm-active" : ""}`}
          >
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-network"></i>
              <span className="nav-text">Table</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="table-bootstrap-basic">Bootstrap</Link>
              </li>
              <li>
                <Link to="table-datatable-basic">Datatable</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
              <i className="flaticon-381-layer-1"></i>
              <span className="nav-text">Pages</span>
            </Link>
            <ul aria-expanded="false">
              <li>
                <Link to="/page-register">Register</Link>
              </li>
              <li>
                <Link to="/page-login">Login</Link>
              </li>
              <li>
                <Link className="has-arrow" to="#" aria-expanded="false">
                  Error
                </Link>
                <ul aria-expanded="false">
                  <li>
                    <Link to="/page-error-400">Error 400</Link>
                  </li>
                  <li>
                    <Link to="/page-error-403">Error 403</Link>
                  </li>
                  <li>
                    <Link to="/page-error-404">Error 404</Link>
                  </li>
                  <li>
                    <Link to="/page-error-500">Error 500</Link>
                  </li>
                  <li>
                    <Link to="/page-error-503">Error 503</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/page-lock-screen">Lock Screen</Link>
              </li>
            </ul>
          </li>*/}
        </MM>
        {/*<div className="drum-box mt-5">
          <img src={drump} alt="" />
          <p className="fs-18 font-w500 mb-4">Start Plan Your Workout</p>
          <Link className to={"./personal-record"}>
            Check schedule
            <svg
              className="ml-3"
              width={6}
              height={12}
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12L6 6L0 0" fill="#BCD7FF" />
            </svg>
          </Link>
        </div>

        <div className="copyright">
          <p>
            <strong>Fito Dashboard</strong> ©All Rights Reserved
          </p>
          <p>by DexignZone</p>
        </div>
       */}
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
