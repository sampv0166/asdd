import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product, history }) => {
  return (
    <div className="">
      <div className="card">
        <div className="card-body">
          <small> {`${product.id}`}</small>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/ecom/product-edit/${product.id}`);
            }}
            className="new-arrival-product"
          >
            <div className="new-arrivals-img-contnent">
              <img
                style={{ height: "230px" }}
                className="img-fluid"
                src={
                  product.variations.length > 0 &&
                  product.variations[0].images[0]
                }
                alt=""
              />
            </div>

            <div className="new-arrival-content text-center mt-3">
              <h5>{`${product.name_en}`}</h5>
              {product.variations && product.variations[0] ? (
                <strong> {`AED : ${product.variations[0].price}`}</strong>
              ) : (
                ""
              )}

              {product.deleted_at === null ? (
                ""
              ) : (
                <h4 className="text-danger">DELETED</h4>
              )}

              {/*rating*/}

              {/* <span className="">AED {price}</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
