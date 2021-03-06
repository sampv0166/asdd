import React, { useState } from "react";

/// React router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import AddProductScreen from "./pages/AddProductScreen";
/// Widget
import Widget from "./pages/Widget";

/// Deshboard
import Home from "./components/Dashboard/Home";
import WorkoutStatistic from "./components/Dashboard/WorkoutStatistic";
import WorkoutPlan from "./components/Dashboard/WorkoutPlan";
import DistanceMap from "./components/Dashboard/DistanceMap";
import DietFoodMenu from "./components/Dashboard/DietFoodMenu";
import PersonalRecord from "./components/Dashboard/PersonalRecord";

/// Bo
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Chirt
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";

import BtcChart from "./components/charts/apexcharts/ApexChart";

/// Table
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";
import ApexChart from "./components/charts/apexcharts";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pulgin
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import RechartJs from "./components/charts/rechart";
import PrivateRoute from "./PrivateRoute";
import LoginScreen from "./pages/LoginScreen";
import { ShopScreen } from "./pages/ShopScreen";
import OrdersScreen from "./pages/OrdersScreen";
import OrderDetailsScreen from "./pages/OrderDetailsScreen";
import AddNewShopScreen from "./pages/AddNewShopScreen";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../actions/categoryActions";
import { listShops } from "../actions/shopActions";
import CategoryScreen from "./pages/CategoryScreen";
import AddNewCategoryScreen from "./pages/AddNewCategoryScreen";
import UsersScreen from "./pages/UsersScreen";
import AddNewUserScreen from "./pages/AddNewUserScreen";
import Loader from "./components/Loader";
import Message from "./components/Message";
import CouponsScreen from "./pages/CouponsScreen";
import AddNewCouponscreen from "./pages/AddNewCouponscreen";
import SliderScreen from "./pages/SliderScreen";
import AddNewSliderScreen from "./pages/AddNewSliderScreen";
import Settings from "./pages/Settings";

const Markup = ({ history }) => {
  const routes = [
    /// Deshborad
    { url: "/", component: Home },
    { url: "workout-statistic", component: WorkoutStatistic },
    { url: "workout-plan", component: WorkoutPlan },
    { url: "distance-map", component: DistanceMap },
    { url: "diet-food-menu", component: DietFoodMenu },
    { url: "personal-record", component: PersonalRecord },
    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },
    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    { url: "post-details", component: PostDetails },
    /// Shop

    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-btc", component: BtcChart },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// table
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// Plugin

    { url: "uc-select2", component: Select2 },
    { url: "uc-nestable", component: Nestable },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },

    /// pages
    { url: "widget-basic", component: Widget },

    { url: "page-lock-screen", component: LockScreen },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  return (
    <Router basename="">
      <div id="main-wrapper" className="show">
        {localStorage.getItem("userInfo") ? (
          <Nav userLogin={userInfo} history={history} />
        ) : (
          ""
        )}
        <div className="content-body" >
          <div className="container-fluid">
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
              <PrivateRoute
                exact
                path="/react"
                render={({ match, history, location }) => (
                  <Home match={match} history={history} location={location} />
                )}
              ></PrivateRoute>

              <Route
                exact
                path="/page-register"
                render={({ match, history, location }) => (
                  <Registration
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></Route>

              <PrivateRoute
                exact
                path="/ecom-product-grid/page/:pageNumber"
                render={({ match, history, location }) => (
                  <ProductGrid
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/ecom-product-grid/page/:pageNumber"
                render={({ match, history, location }) => (
                  <ProductGrid
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/ecom/product-edit/:id"
                render={({ match, history, location }) => (
                  <AddProductScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/ecom/addnewproduct"
                render={({ match, history, location }) => (
                  <AddProductScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/shops/page/:pageNumber"
                render={({ match, history, location }) => (
                  <ShopScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/shops/createshop"
                render={({ match, history, location }) => (
                  <AddNewShopScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/shops/createshop/:id"
                render={({ match, history, location }) => (
                  <AddNewShopScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/orders/page/:pageNumber"
                render={({ match, history, location }) => (
                  <OrdersScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/orders/orderdetails/:id"
                render={({ match, history, location }) => (
                  <OrderDetailsScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/category"
                render={({ match, history, location }) => (
                  <CategoryScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/coupons"
                render={({ match, history, location }) => (
                  <CouponsScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/addnewcoupon"
                render={({ match, history, location }) => (
                  <AddNewCouponscreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/coupon/edit/:id"
                render={({ match, history, location }) => (
                  <AddNewCouponscreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              {userInfo && userInfo.user && userInfo.user.typeofuser === "S" ? (
                <PrivateRoute
                  exact
                  path="/sliders/:id"
                  render={({ match, history, location }) => (
                    <AddNewSliderScreen
                      match={match}
                      history={history}
                      location={location}
                    />
                  )}
                ></PrivateRoute>
              ) : (
                ""
              )}

              {userInfo && userInfo.user && userInfo.user.typeofuser === "S" ? (
                <PrivateRoute
                  exact
                  path="/addnewslider/:sliderType"
                  render={({ match, history, location }) => (
                    <AddNewSliderScreen
                      match={match}
                      history={history}
                      location={location}
                    />
                  )}
                ></PrivateRoute>
              ) : (
                ""
              )}

              {userInfo && userInfo.user && userInfo.user.typeofuser === "S" ? (
                <PrivateRoute
                  exact
                  path="/slider/edit/:slidertype"
                  render={({ match, history, location }) => (
                    <AddNewSliderScreen
                      match={match}
                      history={history}
                      location={location}
                    />
                  )}
                ></PrivateRoute>
              ) : (
                ""
              )}

              <PrivateRoute
                exact
                path="/category/addcategory"
                render={({ match, history, location }) => (
                  <AddNewCategoryScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/category/addcategory/:id"
                render={({ match, history, location }) => (
                  <AddNewCategoryScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/usersList/page/:pageNumber"
                render={({ match, history, location }) => (
                  <UsersScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/user/addnewuser"
                render={({ match, history, location }) => (
                  <AddNewUserScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/users/edit/:id"
                render={({ match, history, location }) => (
                  <AddNewUserScreen
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path="/settings"
                render={({ match, history, location }) => (
                  <Settings
                    match={match}
                    history={history}
                    location={location}
                  />
                )}
              ></PrivateRoute>
            </Switch>
          </div>
        </div>

        {/*<Footer />*/}
      </div>
      <Route
        exact
        path="/page-login"
        render={({ match, history, location }) => (
          <LoginScreen match={match} history={history} location={location} />
        )}
      ></Route>

      <Route
        exact
        path="/error"
        render={({ match, history, location }) => (
          <Error400 match={match} history={history} location={location} />
        )}
      ></Route>
    </Router>
  );
};

export default Markup;
