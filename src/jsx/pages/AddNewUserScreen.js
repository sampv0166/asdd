import React from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, listUserDetails } from "../../actions/userActions";
import * as Yup from "yup";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ErrorMessage, Form, Formik } from "formik";
import TextField from "../components/TextField";
import { Card, Col, Row } from "react-bootstrap";
import CheckboxGroup from "../components/CheckboxGroup";
import Select from "../components/Select";
import { getCategory } from "../../actions/categoryActions";
import { getAllShops, listShops } from "../../actions/shopActions";
import checkbox from "../components/checkbox";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";

const AddNewUserScreen = ({ match, history }) => {
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

  const [userImage, setUserImage] = useState([]);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userCreate = useSelector((state) => state.userCreate);
  const { loading: loadingcreate, error: errorcreate } = userCreate;
  const dispatch = useDispatch();

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const populateShops = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user.user.typeofuser === "A") {
      let objects = [2];

      objects[0] = {
        key: user.user.name,
        value: user.user.shop_id,
      };
      objects.unshift({ key: "choose", value: "" });

      return objects;
    }

    if (user.user.typeofuser === "S") {
      let objects = [shops.length];
      for (var x = 0; x < shops.length; x++) {
        objects[x] = { key: shops[x].shop_name, value: shops[x].id };
      }
      objects.unshift({ key: "choose", value: "" });
      return objects;
    }
  };

  const userId = match.params.id;

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setUserImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue("image", e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (userId && user) {
      setUserImage(user.photo);
      if (user.permissions && user.permissions.includes("product.add")) {
        setProdadd({ checked: true });
      } else {
        setProdadd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("product.update")) {
        setProdUpdate({ checked: true });
      } else {
        setProdUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("product.delete")) {
        setProdDelete({ checked: true });
      } else {
        setProdDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("shop.add")) {
        setshopadd({ checked: true });
      } else {
        setshopadd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("shop.update")) {
        setshopUpdate({ checked: true });
      } else {
        setshopUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("shop.delete")) {
        setshopDelete({ checked: true });
      } else {
        setshopDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("category.add")) {
        setCategoryAdd({ checked: true });
      } else {
        setCategoryAdd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("category.update")) {
        setcategoryUpdate({ checked: true });
      } else {
        setcategoryUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("category.delete")) {
        setcategoryDelete({ checked: true });
      } else {
        setcategoryDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("variation.add")) {
        setvariationAdd({ checked: true });
      } else {
        setvariationAdd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("variation.update")) {
        setvariationUpdate({ checked: true });
      } else {
        setvariationUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("variation.delete")) {
        setvariationDelete({ checked: true });
      } else {
        setvariationDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("orders.add")) {
        setordersAdd({ checked: true });
      } else {
        setordersAdd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("orders.update")) {
        setordersUpdate({ checked: true });
      } else {
        setordersUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("orders.delete")) {
        setordersDelete({ checked: true });
      } else {
        setordersDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("users.add")) {
        setusersAdd({ checked: true });
      } else {
        setusersAdd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("users.update")) {
        setusersUpdate({ checked: true });
      } else {
        setusersUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("users.delete")) {
        setusersDelete({ checked: true });
      } else {
        setusersDelete({ checked: false });
      }

      if (user.permissions && user.permissions.includes("coupon.add")) {
        setcouponAdd({ checked: true });
      } else {
        setcouponAdd({ checked: false });
      }

      if (user.permissions && user.permissions.includes("coupon.update")) {
        setcouponUpdate({ checked: true });
      } else {
        setcouponUpdate({ checked: false });
      }

      if (user.permissions && user.permissions.includes("coupon.delete")) {
        setcouponDelete({ checked: true });
      } else {
        setcouponDelete({ checked: false });
      }
    }
  }, [user]);

  useLayoutEffect(() => {
    checkPermission(history, "users.add");
    if (userId) {
      if (checkPermissionOnSubmit("users.update")) {
        history.push("/error");
        return;
      }
    }

    if (userInfo.user.typeofuser === "S") {
      dispatch(getAllShops());
    }
    if (user && userId) {
      dispatch(listUserDetails(userId));
    }
  }, [dispatch, userId]);

  const validate = Yup.object({
    name: Yup.string()
      .min(1, "Name must be atleast one character")
      .required("Required"),
    email: Yup.string().email("email is invalid").required("Required"),
    password: Yup.string()
      .min(6, "password must be 6 characters")
      .required("Required"),
  });

  const validateWithoutPassword = Yup.object({
    name: Yup.string()
      .min(1, "Name must be atleast one character")
      .required("Required"),
    email: Yup.string().email("email is invalid").required("Required"),
  });

  const validateform = () => {
    if (userId) {
      return validateWithoutPassword;
    } else {
      return validate;
    }
  };

  const handleSubmit = async (formdata, values) => {
    dispatch(createUser(dispatch, formdata, values, userId));
    history.push("/usersList/page/1");
  };

  return (
    <>
      {loading || loadingcreate ? (
        <Loader />
      ) : error || errorcreate ? (
        <Message variant="danger">{error || errorcreate}</Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
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

            name: (userId && user.name) || "",
            email: (userId && user.email) || "",
            password: "",
            image: "",
            shop_id: (userId && user.shop_id) || "",
          }}
          validationSchema={validateform}
          onSubmit={(values) => {
            let formdata = new FormData();

            if (userId) {
              formdata.append("user_id", userId);
            }
            formdata.append("name", values.name);
            formdata.append("email", values.email);
            formdata.append("password", values.password);

            if (typeof values.image === "string") {
              formdata.delete("image");
            } else {
              formdata.append("photo", values.image);
            }

            if (userInfo.user.typeofuser === "S") {
              formdata.append("shop_id", values.shop_id);
            }

            if (userInfo.user.typeofuser === "A") {
              formdata.append("shop_id", userInfo.user.shop_id);
            }

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

            handleSubmit(formdata, values);
          }}
        >
          {(formik) => (
            <Form>
              <div>
                <div className="row">
                  <div className="col-md-6">
                    {userId ? (
                      <div>
                        <Card
                          className="my-2 p-1 rounded"
                          style={{
                            height: "280px",
                            objectFit: "cover",
                          }}
                        >
                          <Card.Img
                            style={{
                              height: "270px",
                              objectFit: "contain",
                            }}
                            src={userImage}
                            variant="top"
                            rounded
                          />
                        </Card>

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
                            New Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Card
                          className="my-2 p-1 rounded"
                          style={{
                            height: "280px",
                            objectFit: "cover",
                          }}
                        >
                          <Card.Img
                            style={{
                              height: "270px",
                              objectFit: "contain",
                            }}
                            src={userImage}
                            variant="top"
                            rounded
                          />
                        </Card>

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
                            New Image
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <TextField
                          label="Name"
                          name="name"
                          type="text"
                          pattern=".*\S+.*"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          label="email"
                          name="email"
                          type="text"
                          pattern=".*\S+.*"
                        />
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <TextField
                          label="Password"
                          name="password"
                          type="password"
                          pattern=".*\S+.*"
                        />
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-12">
                        {userInfo.user.typeofuser === "S" ? (
                          <Col className="col">
                            <Select
                              control="select"
                              label="Shop Name"
                              name="shop_id"
                              options={populateShops()}
                            ></Select>
                          </Col>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-secondary mt-3 my-2 px-5"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                {userInfo.user.typeofuser !== "U" ? (
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
                            prodAdd.checked === true ? (d = false) : (d = true);
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
                            shopAdd.checked === true ? (d = false) : (d = true);
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

                    <Col className="col-md-4 my-4">
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
                  </Row>
                ) : (
                  ""
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewUserScreen;
