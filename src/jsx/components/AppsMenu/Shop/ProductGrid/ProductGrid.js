import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Products from "./Products";
import debounce from "lodash.debounce";
import Select from "../../../Select";

/// Data
import productData from "../productData";

import PageTitle from "../../../../layouts/PageTitle";

import { Button, Dropdown, Nav, Pagination } from "react-bootstrap";
import Paginate from "../../../Paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  listProducts,
} from "../../../../../actions/productActions";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import Message from "../../../Message";
import { Formik } from "formik";
import { set } from "date-fns";
import { getAllShops } from "../../../../../actions/shopActions";

const ProductGrid = ({ match, history }) => {
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [all, setAll] = useState({ checked: true });
  const [deleted, setDeleted] = useState({ checked: false });

  const [active, setActive] = useState({ checked: false });

  const [selectedvalue, setSelectedValue] = useState("");

  let pageNumber = match.params.pageNumber || 1;
  const selectref = useRef();

  let items = [];
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: productDetailsLoading, error: errorProductLoading } =
    productDetails;

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading: load, error: err, shop } = shopListDetails;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [shopss, setShopss] = useState([{ key: "", value: "" }]);

  let shopid;

  const populateShops = () => {
    if (user.user.typeofuser === "A" || user.user.typeofuser === "U") {
      let objects = [2];

      objects[0] = {
        key: shop.shop_name,
        value: shop.id,
      };
      objects.unshift({ key: "choose", value: "" });
      setShopss(objects);

      return objects;
    }

    if (user.user.typeofuser === "S") {
      let objects = [shops.length];
      for (var x = 0; x < shops.length; x++) {
        objects[x] = { key: shops[x].shop_name_en, value: shops[x].id };
      }

      objects.unshift({ key: "Choose A Shop", value: "" });
      setShopss(objects);
      return objects;
    }
  };

  const paginationClicked = async (e, number) => {
    e.preventDefault();
    pageNumber = number;
    dispatch(listProducts(pageNumber, inputValue, selectedvalue));
    history.push(`/ecom-product-grid/page/${number}`);
  };

  const debouncedSave = useCallback(
    debounce(
      (newValue) => dispatch(listProducts(1, newValue, selectedvalue)),
      1000
    ),
    [dispatch]
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  };

  useEffect(() => {
    populateShops();
  }, [dispatch, pageNumber, products]);

  useLayoutEffect(() => {
    dispatch(listProducts(pageNumber, inputValue, selectedvalue));
    dispatch(listProductDetails(0));
    dispatch(getAllShops());
    populateShops();
  }, [dispatch, pageNumber]);

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={(event) => paginationClicked(event, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const pag = (size, gutter, variant, bg, circle) => (
    <Pagination
      size={size}
      className={`mt-4  ${gutter ? "pagination-gutter" : ""} ${
        variant && `pagination-${variant}`
      } ${!bg && "no-bg"} ${circle && "pagination-circle"}`}
    >
      {items}
    </Pagination>
  );

  return (
    <>
      {loading || productDetailsLoading ? (
        <Loader />
      ) : error || errorProductLoading ? (
        <Message variant="danger">{error || errorProductLoading}</Message>
      ) : (
        <Fragment>
          <div className="d-flex justify-content-between my-4">
            <div className="d-flex w-50">
              <input
                className="form-control shadow-none rounded mx-2"
                placeholder="Search Products"
                onChange={(input) => {
                  setInputValue(input.target.value);
                  //updateValue(input.target.value)
                  console.log(selectedvalue);
                }}
                value={inputValue}
                autoFocus
              />
              <div
                className="d-flex my-3 justify-content-end"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => {
                  dispatch(listProducts(1, inputValue, selectedvalue));
                }}
              >
                <i
                  class="bx bx-search-alt-2"
                  style={{
                    fontSize: "2rem",
                    position: "absolute",
                    marginRight: "15px",
                  }}
                ></i>
              </div>
            </div>

            {user.user.typeofuser === "S" ? (
              <div>
                <div className>
                  <select
                    name="shop_id"
                    className={`form-select form-control`}
                    onChange={(e) => {
                      shopid = e.target.value;
                      setSelectedValue(e.target.value);
                      dispatch(listProducts(1, inputValue, e.target.value));
                    }}
                    ref={selectref}
                    value={selectedvalue}
                  >
                    {shopss.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.key}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}

            {/*<div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={all.checked}
                onChange={(d) => {
                  all.checked === true ? (d = false) : (d = true);
                  setAll({ checked: d });
                }}
              />
              <label className="form-check-label">ALL</label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={deleted.checked}
                onChange={(d) => {
                  deleted.checked === true ? (d = false) : (d = true);
                  setDeleted({ checked: d });
                }}
              />
              <label className="form-check-label">DELETED</label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={active.checked}
                onChange={(d) => {
                  active.checked === true ? (d = false) : (d = true);
                  setActive({ checked: d });
                }}
              />
              <label className="form-check-label">ACTIVE</label>
              </div>*/}

            <div>
              <button
                className="btn  btn-secondary"
                onClick={() => {
                  history.push("/ecom/addnewproduct");
                  dispatch(listProductDetails(0));
                }}
              >
                Add New Product
              </button>
            </div>
          </div>

          <div className="row">
            {products &&
              products.map((product) => (
                <Products
                  key={product.key}
                  product={product}
                  history={history}
                />
              ))}
          </div>
          <Nav>{pag("", true, "danger", true, false)}</Nav>
        </Fragment>
      )}
    </>
  );
};

export default ProductGrid;