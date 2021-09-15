import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  getCoupons,
  listCouponDetails,
} from "../../actions/couponsActions";
import * as Yup from "yup";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Form, Formik } from "formik";

import TextField from "../components/TextField";
import DatePicker from "../components/DatePicker";
import moment from "moment";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";
import { getAllShops, listShopDetails } from "../../actions/shopActions";

import { listProducts } from "../../actions/productActions";
import { DataEditing } from "@syncfusion/ej2-react-charts";
import Select from "react-select";

const AddNewCouponscreen = ({ history, match }) => {
  const [percentage, setIsPercentage] = useState({ checked: false });
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedShopOption, setSelectedShopOption] = useState([]);

  const [selectedProducts, setSelectedproducts] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);

  const [re, setre] = useState(false);

  const couponId = match.params.id;

  const couponCreate = useSelector((state) => state.couponCreate);
  const { loading: loadingcreate, error: errorcreate } = couponCreate;

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const productList = useSelector((state) => state.productList);
  const {
    loading: productloading,
    error: producterror,
    products,
    page,
    pages,
  } = productList;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading: load, error: err, shop } = shopListDetails;

  const couponsList = useSelector((state) => state.couponsList);
  const { loading: l, error: couponsError, coupons } = couponsList;

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const populateShops = () => {
    if (user.user.typeofuser === "A" || user.user.typeofuser === "U") {
      let objects = [2];
      objects[0] = {
        label: shop.shop_name,
        value: shop.id,
      };
      objects.unshift({ label: "choose", value: "" });
      return objects;
    }

    if (user.user.typeofuser === "S") {
      let objects = [shops.length];
      for (var x = 0; x < shops.length; x++) {
        objects[x] = { label: shops[x].shop_name_en, value: shops[x].id };
      }

      objects.unshift({ label: "Choose A Shop", value: "" });
      return objects;
    }
  };

  const populateOptions = () => {
    let objects = [products.length];
    for (var x = 0; x < products.length; x++) {
      objects[x] = { value: products[x].id, label: products[x].name_en };
    }
    return objects;
  };

  const PopulateProductIds = (products_ids) => {
    let b = products_ids.split(",").map((item) => {
      return parseInt(item, 10);
    });

    let options = populateOptions();

    let objects = new Array(b.length);
    for (var x = 0; x < options.length; x++) {
      if (b.includes(options[x].value)) {
        objects[x] = { value: options[x].value, label: options[x].label };
      }
    }

    b = objects;
    setSelectedOption(objects);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(1, "", ""));

    if (coupon) {
      if (coupon.ispercentage === true) {
        setIsPercentage({ checked: true });
      } else {
        setIsPercentage({ checked: false });
      }
    }
  }, [dispatch, coupon, re]);

  useEffect(() => {
    checkPermission(history, "coupon.add");
    if (couponId) {
      if (checkPermissionOnSubmit("coupon.update")) {
        history.push("/error");
        return;
      }
    }

    if (user.user.typeofuser === "U" || user.user.typeofuser === "A") {
      dispatch(listShopDetails(user.user.shop_id));
      populateShops();
    }
    if (user.user.typeofuser === "S") {
      dispatch(getAllShops());
      populateShops();
    }

    couponsList.coupons.map((item) => {
      if (couponId == item.id) {
        console.log(item);
        setCoupon(item);
        if (item.product_ids !== null) {
          PopulateProductIds(item.product_ids);
          setSelectedShopOption({
            value: item.shop_id,
            label: item.shop.shop_name_en,
          });
        }
      }
    });
  }, [dispatch, couponId]);

  const validate = Yup.object({
    code: Yup.string()
      .min(1, "Name must be atleast one character")
      .required("Required"),
    value: Yup.number().required("required"),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createCoupon(dispatch, formdata));
    dispatch(getCoupons());
    history.goBack();
  };

  return (
    <>
      {l || loadingcreate || productloading ? (
        <Loader />
      ) : couponsError || errorcreate || producterror ? (
        <Message variant="danger">
          {couponsError || errorcreate || producterror}
        </Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            code: coupon.code || "",
            description_en: coupon.description_en || "",
            description_ar: coupon.description_ar || "",
            value: coupon.value || "",
            expiry: coupon.expired_at || "",
            expire: coupon.expired_at || "",
            shop_id: "",
            product_id: [],
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            /*if (categoryId) {
              if (checkPermissionOnSubmit("category.update")) {
                history.push("/error");
                return;
              }
            }*/

            let formdata = new FormData();

            if (couponId) {
              formdata.append("id", couponId);
            }
            let newArray;
            let CommaSeperated;
            if (selectedOption !== null) {
              newArray = selectedOption.filter(
                (value) => JSON.stringify(value) !== "{}"
              );
            }

            console.log(newArray);
            if (newArray !== null && newArray !== undefined) {
              let objects = new Array(newArray.length);
              for (var x = 0; x < newArray.length; x++) {
                objects[x] = newArray[x].value + "";
                if (x === 0) {
                  CommaSeperated = newArray[x].value;
                } else {
                  CommaSeperated = CommaSeperated + "," + newArray[x].value;
                }
              }
            }
            console.log(CommaSeperated);
            if (
              CommaSeperated !== undefined &&
              CommaSeperated !== null &&
              CommaSeperated !== ""
            ) {
              formdata.append("product_ids", CommaSeperated);
            } else {
            }

            console.log(values.expiry);
            formdata.append("expired_at", values.expiry);
            formdata.append("code", values.code);
            formdata.append("description_en", values.description_en);
            formdata.append("description_ar", values.description_ar);
            formdata.append("value", values.value);

            if (
              selectedShopOption !== null &&
              selectedShopOption.value !== undefined &&
              selectedShopOption.value !== null &&
              selectedShopOption.value !== ""
            ) {
              formdata.append("shop_id", selectedShopOption.value);
            } else {
            }

            console.log(values.shop_id);
            if (user.user.typeofuser === "A" || user.user.typeofuser === "U") {
              formdata.append("shop_id", values.shop_id);
            }

            if (values.ispercentage === true) {
              formdata.append("ispercentage", 1);
            } else {
              formdata.append("ispercentage", 0);
            }

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <Form>
              <div>
                <div className="row g-3">
                  <div className="col-6">
                    <TextField label="Code" name="code" type="text" />
                  </div>
                  <div className="col-6">
                    <TextField label="Value" name="value" type="number" />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Descritpion English"
                      name="description_en"
                      type="text"
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      label="Descritpion Arabic"
                      name="description_ar"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 my-4">
                    <p className="mb-1">Select Product</p>
                    <Select
                      styles={{
                        control: (styles) => ({
                          background: "#fff",
                          border: "1px solid rgba(174, 121, 179, 0.39)",
                          color: "#6e6e6e",
                        }),
                      }}
                      options={populateOptions()}
                      value={selectedOption}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      name="product_id"
                      onChange={(e) => {
                        setSelectedOption(e);
                        formik.setFieldValue("product_id", e);
                        console.log(e);
                      }}
                    />
                  </div>

                  <div className="col-xl-4 my-4">
                    <p className="mb-1">Select Shop</p>
                    <Select
                      styles={{
                        control: (styles) => ({
                          background: "#fff",
                          border: "1px solid rgba(174, 121, 179, 0.39)",
                          color: "#6e6e6e",
                          overflow: "visible",
                        }),
                      }}
                      options={populateShops()}
                      value={selectedShopOption}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      name="shop_id"
                      isClearable
                      onChange={(e) => {
                        setSelectedShopOption(e);
                        formik.setFieldValue("shop_id", e);
                        console.log(e);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 my-4">
                    <label
                      label="Expiry date"
                      name="expiry"
                      className="my-2 mx-2"
                    >
                      {`Expiry Date : ${formik.values.expiry}`}
                    </label>
                    <input
                      className="form-control"
                      label="Expiry date"
                      name="expire"
                      type="datetime-local"
                      onChange={(e) => {
                        formik.setFieldValue("expiry", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div class="form-check form-switch my-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={percentage.checked}
                      onChange={(d) => {
                        percentage.checked === true ? (d = false) : (d = true);
                        setIsPercentage({ checked: d });
                        formik.setFieldValue("ispercentage", d);
                      }}
                    />

                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Is percentage
                    </label>
                  </div>
                </div>

                <button className="btn btn-secondary mt-3 my-2" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewCouponscreen;
