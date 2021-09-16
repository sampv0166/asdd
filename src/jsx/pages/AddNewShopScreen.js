import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createShop,
  listShopDetails,
  listShops,
} from "../../actions/shopActions";
import * as Yup from "yup";
import TextField from "../components/TextField";
import Loader from "../components/Loader";
import Message from "../components/Message";

import CheckboxGroup from "../components/CheckboxGroup";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";
const AddNewShopScreen = ({ match, history }) => {
  const [prodAdd, setProdadd] = useState({ checked: false });
  const [prodUpdate, setProdUpdate] = useState({ checked: false });
  const [prodDelete, setProdDelete] = useState({ checked: false });

  const [shopAdd, setshopadd] = useState({ checked: false });
  const [shopUpdate, setshopUpdate] = useState({ checked: false });
  const [shopDelete, setshopDelete] = useState({ checked: false });

  const [CategoryAdd, setCategoryAdd] = useState({ checked: false });
  const [categoryUpdate, setcategoryUpdate] = useState({ checked: false });
  const [categoryDelete, setcategoryDelete] = useState({ checked: false });

  const [variationAdd, setvariationAdd] = useState({ checked: false });
  const [variationUpdate, setvariationUpdate] = useState({ checked: false });
  const [variationDelete, setvariationDelete] = useState({ checked: false });

  const [ordersAdd, setordersAdd] = useState({ checked: false });
  const [ordersUpdate, setordersUpdate] = useState({ checked: false });
  const [ordersDelete, setordersDelete] = useState({ checked: false });

  const [usersAdd, setusersAdd] = useState({ checked: false });
  const [usersUpdate, setusersUpdate] = useState({ checked: false });
  const [usersDelete, setusersDelete] = useState({ checked: false });

  const [couponAdd, setcouponAdd] = useState({ checked: false });
  const [couponUpdate, setcouponUpdate] = useState({ checked: false });
  const [couponDelete, setcouponDelete] = useState({ checked: false });

  const [currentShop, setCurrentShop] = useState([]);
  const [shopCoverImage, setShopCoverImage] = useState([]);
  const [shopBannerImage, setShopBannerImage] = useState([]);
  const [open, setopen] = useState({ checked: false });
  const [active, setActive] = useState({ checked: false });

  const [permissions, setPermissions] = useState([
    { key: "add", value: "add" },
    { key: "update", value: "update" },
    { key: "delete", value: "delete" },
  ]);

  const shopId = match.params.id;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading, error, shop } = shopListDetails;

  const shopCreate = useSelector((state) => state.shopCreate);
  const { loading: loadingcreate, error: errorcreate } = shopCreate;

  const shopList = useSelector((state) => state.shopList);
  const { loading: shoploadingcreate, error: shoperrorcreate } = shopList;

  const dispatch = useDispatch();

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setShopCoverImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  const handleBannerImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setShopBannerImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("bannerimage", e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (shop) {
      setShopCoverImage(shop.coverimage);
      setShopBannerImage(shop.bannerimage);
      if (shop.open === true) {
        setopen({ checked: true });
      } else {
        setopen({ checked: false });
      }

      if (shop.status === true) {
        setActive({ checked: true });
      } else {
        setActive({ checked: false });
      }
    }
  }, [shop]);

  useLayoutEffect(() => {
    dispatch(listShopDetails(shopId));
  }, [dispatch, shopId]);

  const validate = Yup.object({
    shop_name_en: Yup.string().required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    image:
      Yup.mixed().required("required") || Yup.string().required("required"),
    password: Yup.string().required("Required"),
    shop_trn: Yup.string(),
    shop_mob: Yup.string(),
    shop_website: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),
    bannerimage:
      Yup.mixed().required("required") || Yup.string().required("required"),
  });

  const validateWithoutPassword = Yup.object({
    shop_name_en: Yup.string().required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    image:
      Yup.mixed().required("required") || Yup.string().required("required"),
    shop_trn: Yup.string(),
    shop_mob: Yup.string(),
    shop_website: Yup.string(),
    bannerimage:
      Yup.mixed().required("required") || Yup.string().required("required"),
  });

  const validateform = () => {
    if (shopId) {
      return validateWithoutPassword;
    } else {
      return validate;
    }
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleSubmit = async (formdata) => {
    dispatch(createShop(dispatch, formdata));

    if (userInfo.user.typeofuser === "S") {
      dispatch(listShops(1));
    }
    history.goBack();
  };

  return (
    <>
      {loading || loadingcreate || shoploadingcreate ? (
        <Loader />
      ) : error || errorcreate || shoperrorcreate ? (
        <Message variant="danger">
          {error || errorcreate || shoperrorcreate}
        </Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            shop_name_en: (shop && shop.shop_name_en) || "",
            email: (shop && shop.shop_email) || "",
            image: (shop && shop.coverimage) || "",
            bannerimage: (shop && shop.bannerimage) || "",
            password: "",
            shop_trn: (shop && shop.shop_trn) || "",
            shop_mob: (shop && shop.shop_mob) || "",
            shop_website: (shop && shop.shop_website) || "",
            open: (shop && shop.open) || "",
            isactive: (shop && shop.false) || "",
            name: (shop && shop.name) || "",

            prodadd: false,
            produpdate: false,
            proddelete: false,

            shopadd: false,
            shopdelete: false,
            shopupdate: false,

            categoryadd: false,
            categorydelete: false,
            categoryupdate: false,

            variationadd: false,
            variationdelete: false,
            variationupdate: false,

            ordersadd: false,
            ordersdelete: false,
            ordersupdate: false,

            usersadd: false,
            usersdelete: false,
            usersupdate: false,

            couponadd: false,
            coupondelete: false,
            couponupdate: false,
          }}
          validationSchema={validateform}
          onSubmit={(values) => {
            if (checkPermissionOnSubmit("shop.update")) {
              history.push("/error");
              return;
            }

            let formdata = new FormData();

            if (shopId) {
              formdata.append("id", shopId);
            }

            formdata.append("shop_name_en", values.shop_name_en);
            formdata.append("shop_name_ar", values.shop_name_en);
            formdata.append("name_en", values.shop_name_en);
            formdata.append("email", values.email);
            if (typeof values.image === "string") {
              formdata.delete("image");
            } else {
              formdata.append("image", values.image);
            }

            if (typeof values.bannerimage === "string") {
              formdata.delete("banner");
            } else {
              formdata.append("banner", values.bannerimage);
            }

            formdata.append("password", values.password);
            formdata.append("shop_trn", values.shop_trn);
            formdata.append("shop_mob", values.shop_mob);
            formdata.append("shop_website", values.shop_website);

            
            values.open === true
              ? formdata.append("open", 1)
              : formdata.append("open", 0);

            values.isactive === true
              ? formdata.append("status", 1)
              : formdata.append("status", 0);


            if (prodAdd.checked) {
              formdata.append("add_permission[]", "product.add");
            }

            if (prodUpdate.checked) {
              formdata.append("add_permission[]", "product.update");
            }

            if (prodDelete.checked) {
              formdata.append("add_permission[]", "product.delete");
            }

            if (shopAdd.checked) {
              formdata.append("add_permission[]", "shop.add");
            }

            if (shopUpdate.checked) {
              formdata.append("add_permission[]", "shop.update");
            }

            if (shopDelete.checked) {
              formdata.append("add_permission[]", "shop.delete");
            }

            if (CategoryAdd.checked) {
              formdata.append("add_permission[]", "category.add");
            }

            if (categoryUpdate.checked) {
              formdata.append("add_permission[]", "category.update");
            }

            if (categoryDelete.checked) {
              formdata.append("add_permission[]", "category.delete");
            }

            if (variationAdd.checked) {
              formdata.append("add_permission[]", "variation.add");
            }

            if (variationUpdate.checked) {
              formdata.append("add_permission[]", "variation.update");
            }

            if (variationDelete.checked) {
              formdata.append("add_permission[]", "variation.delete");
            }

            if (ordersAdd.checked) {
              formdata.append("add_permission[]", "orders.add");
            }

            if (ordersUpdate.checked) {
              formdata.append("add_permission[]", "orders.update");
            }

            if (ordersDelete.checked) {
              formdata.append("add_permission[]", "orders.delete");
            }

            if (usersAdd.checked) {
              formdata.append("add_permission[]", "users.add");
            }

            if (usersUpdate.checked) {
              formdata.append("add_permission[]", "users.update");
            }

            if (usersDelete.checked) {
              formdata.append("add_permission[]", "users.delete");
            }

            if (couponAdd.checked) {
              formdata.append("add_permission[]", "coupon.add");
            }

            if (couponUpdate.checked) {
              formdata.append("add_permission[]", "coupon.update");
            }

            if (couponDelete.checked) {
              formdata.append("add_permission[]", "coupon.delete");
            }

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div>
              <Form>
                {shopId ? (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: "280px", objectFit: "cover" }}
                    >
                      <Card.Img
                        style={{ height: "270px", objectFit: "contain" }}
                        src={shopBannerImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleBannerImageChange(e, formik)}
                          name="bannerimage"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={"bannerimage"}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Banner
                        Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: "280px", objectFit: "cover" }}
                    >
                      <Card.Img
                        style={{ height: "270px", objectFit: "contain" }}
                        src={shopBannerImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleBannerImageChange(e, formik)}
                          name="bannerimage"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={"bannerimage"}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload Banner
                        Image
                      </label>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    {shopId ? (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={shopCoverImage}
                            style={{ height: "270px", objectFit: "contain" }}
                            roundedCircle
                          />
                        </div>
                        <div className="d-flex my-2 ">
                          <label className="custom-file-upload w-100">
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, formik)}
                              name="image"
                            />
                            <ErrorMessage
                              component="div"
                              className="error text-danger"
                              name={"image"}
                            />
                            <i className="bx bx-cloud-upload mx-2"></i>Upload
                            Cover Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-center">
                          <Image
                            src={shopCoverImage}
                            style={{ height: "270px", objectFit: "contain" }}
                            roundedCircle
                          />
                        </div>

                        <div className="d-flex my-2 ">
                          <label className="custom-file-upload w-100">
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, formik)}
                              name="image"
                            />
                            <ErrorMessage
                              component="div"
                              className="error text-danger"
                              name={"image"}
                            />
                            <i className="bx bx-cloud-upload mx-2"></i>Upload
                            Cover Image
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <TextField
                          label="English Name"
                          name="shop_name_en"
                          type="text"
                        />
                      </div>
                      {shopId ? (
                        ""
                      ) : (
                        <div className="col-md-6">
                          <TextField
                            label="Password"
                            name="password"
                            type="password"
                          />
                        </div>
                      )}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <TextField
                          label="Shop TRN"
                          name="shop_trn"
                          type="text"
                        />
                      </div>

                      <Col>
                        <TextField label="Email" name="email" type="text" />
                      </Col>
                    </div>
                    <div className="row g-3">
                      <Col>
                        <TextField
                          label="Shop Website"
                          name="shop_website"
                          type="text"
                        />
                      </Col>
                      <div className="col-md-6">
                        <TextField
                          label="Shop Mob"
                          name="shop_mob"
                          type="text"
                        />
                      </div>
                    </div>
                    <Row>
                      <Col className="col-3">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={active.checked}
                            onChange={(d) => {
                              active.checked === true
                                ? (d = false)
                                : (d = true);
                              setActive({ checked: d });
                              formik.setFieldValue("isactive", d);
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckDefault"
                          >
                            Active
                          </label>
                        </div>
                      </Col>
                      {
                        <Col className="col-3">
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              checked={open.checked}
                              onChange={(d) => {
                                open.checked === true
                                  ? (d = false)
                                  : (d = true);
                                setopen({ checked: d });
                                formik.setFieldValue("open", d);
                              }}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              Open
                            </label>
                          </div>
                        </Col>
                      }
                    </Row>
                  </div>
                  {userInfo.user.typeofuser === "S" && !shopId ? (
                    <Row className="container-fluid">
                      <Col className="col-md-3 my-4">
                        Product Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={prodAdd.checked}
                            onChange={(d) => {
                              prodAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setProdadd({ checked: d });
                              formik.setFieldValue("prodadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={prodUpdate.checked}
                            onChange={(d) => {
                              prodUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setProdUpdate({ checked: d });
                              formik.setFieldValue("produpdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={prodDelete.checked}
                            onChange={(d) => {
                              prodDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setProdDelete({ checked: d });
                              formik.setFieldValue("proddelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Shop Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={shopAdd.checked}
                            onChange={(d) => {
                              shopAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setshopadd({ checked: d });
                              formik.setFieldValue("shopadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={shopUpdate.checked}
                            onChange={(d) => {
                              shopUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setshopUpdate({ checked: d });
                              formik.setFieldValue("shopupdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={shopDelete.checked}
                            onChange={(d) => {
                              shopDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setshopDelete({ checked: d });
                              formik.setFieldValue("shopdelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Category Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={CategoryAdd.checked}
                            onChange={(d) => {
                              CategoryAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setCategoryAdd({ checked: d });
                              formik.setFieldValue("categoryadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={categoryUpdate.checked}
                            onChange={(d) => {
                              categoryUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setcategoryUpdate({ checked: d });
                              formik.setFieldValue("categoryupdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={categoryDelete.checked}
                            onChange={(d) => {
                              categoryDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setcategoryDelete({ checked: d });
                              formik.setFieldValue("categoryDelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Variation Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={variationAdd.checked}
                            onChange={(d) => {
                              variationAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setvariationAdd({ checked: d });
                              formik.setFieldValue("variationAdd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={variationUpdate.checked}
                            onChange={(d) => {
                              variationUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setvariationUpdate({ checked: d });
                              formik.setFieldValue("variationUpdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={variationDelete.checked}
                            onChange={(d) => {
                              variationDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setvariationDelete({ checked: d });
                              formik.setFieldValue("variationDelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Orders Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={ordersAdd.checked}
                            onChange={(d) => {
                              ordersAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setordersAdd({ checked: d });
                              formik.setFieldValue("ordersadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={ordersUpdate.checked}
                            onChange={(d) => {
                              ordersUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setordersUpdate({ checked: d });
                              formik.setFieldValue("ordersupdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={ordersDelete.checked}
                            onChange={(d) => {
                              ordersDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setordersDelete({ checked: d });
                              formik.setFieldValue("ordersdelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Users Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={usersAdd.checked}
                            onChange={(d) => {
                              usersAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setusersAdd({ checked: d });
                              formik.setFieldValue("usersadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={usersUpdate.checked}
                            onChange={(d) => {
                              usersUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setusersUpdate({ checked: d });
                              formik.setFieldValue("usersupdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={usersDelete.checked}
                            onChange={(d) => {
                              usersDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setusersDelete({ checked: d });
                              formik.setFieldValue("usersdelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col className="col-md-3 my-4">
                        Coupon Permissions
                        <div className="form-check form-switch my-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={couponAdd.checked}
                            onChange={(d) => {
                              couponAdd.checked === true
                                ? (d = false)
                                : (d = true);
                              setcouponAdd({ checked: d });
                              formik.setFieldValue("couponadd", d);
                            }}
                          />
                          <label className="form-check-label">Add</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={couponUpdate.checked}
                            onChange={(d) => {
                              couponUpdate.checked === true
                                ? (d = false)
                                : (d = true);
                              setcouponUpdate({ checked: d });
                              formik.setFieldValue("couponupdate", d);
                            }}
                          />
                          <label className="form-check-label">Update</label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={couponDelete.checked}
                            onChange={(d) => {
                              couponDelete.checked === true
                                ? (d = false)
                                : (d = true);
                              setcouponDelete({ checked: d });
                              formik.setFieldValue("coupondelete", d);
                            }}
                          />
                          <label className="form-check-label">Delete</label>
                        </div>
                      </Col>

                      <Col>
                        <button
                          className="btn btn-secondary mt-3 w-100"
                          type="submit"
                        >
                          Save
                        </button>
                      </Col>
                    </Row>
                  ) : (
                    <Col>
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-secondary mt-3 w-25"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </Col>
                  )}
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewShopScreen;
