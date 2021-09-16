import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Badge, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrderDetailsById } from "../../actions/orderActions";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ReactToPrint from "react-to-print";
import Logo from "../.././images/logo.png";
import OrderDetailsScreenforPrint from "./OrderDetailsScreenold";

const OrderDetailsScreen = ({ match, history, setHasVariant }) => {
  const orderDetailsList = useSelector((state) => state.orderDetailsList);
  const { loading, error, ordersDetails } = orderDetailsList;
  const componentRef = useRef();
  const orderId = match.params.id;

  const dispatch = useDispatch();
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  useEffect(() => {
    dispatch(listOrderDetailsById(orderId));
  }, [dispatch, orderId]);

  useLayoutEffect(() => {
    dispatch(listOrderDetailsById(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <div className="d-flex my-3 justify-content-end">
        <ReactToPrint
          trigger={() => <button className="btn btn-secondary">Print</button>}
          content={() => componentRef.current}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div ref={componentRef}>
          {ordersDetails && ordersDetails.user && (
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="d-flex justify-content-center bg-light shadow-sm">
                    <div className="brand-logo mb-3">
                      <img
                        className="logo-abbr mr-2 img-fluid"
                        src={Logo}
                        alt=""
                        style={{
                          height: "150px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                  <div className="card-header">
                    {" "}
                    Invoice <strong>{utc}</strong>{" "}
                    <span className="float-right">
                      <strong>Status:</strong>{" "}
                      {ordersDetails && ordersDetails.payment_status === 0 ? (
                        <Badge variant="warning">pending</Badge>
                      ) : (
                        ""
                      )}
                      {ordersDetails && ordersDetails.payment_status === 1 ? (
                        <Badge variant="success">Ready For Shipment</Badge>
                      ) : (
                        ""
                      )}
                      {ordersDetails.payment_status === 2 ? (
                        <Badge variant="primary">shipping</Badge>
                      ) : (
                        ""
                      )}
                      {ordersDetails.payment_status === 3 ? (
                        <Badge variant="danger">Cancelled</Badge>
                      ) : (
                        ""
                      )}
                      {ordersDetails.payment_status === 4 ? (
                        <Badge variant="secondary">delivered</Badge>
                      ) : (
                        ""
                      )}
                      {ordersDetails.payment_status === 5 ? (
                        <Badge variant="danger">cancelled</Badge>
                      ) : (
                        ""
                      )}
                    </span>{" "}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 mb-4">
                        <h6>From:</h6>
                        <div>
                          {" "}
                          <strong>KHAYAMAT ZAMAN</strong>{" "}
                        </div>
                        <div>Madalinskiego 8</div>
                        <div>71-101 ABUDHABI</div>
                        <div>Email: info@webz.com.pl</div>
                        <div>Phone: +971 </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 mb-4">
                        <h6>To:</h6>
                        <div>
                          {" "}
                          <strong>
                            {ordersDetails &&
                              ordersDetails.user &&
                              ordersDetails.user.name}
                          </strong>{" "}
                        </div>
                        <div>{ordersDetails.user.email}</div>
                        <div>{ordersDetails.address}</div>
                        <div>{ordersDetails.phone}</div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="center">#</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th className="right">Unit Cost</th>
                            <th className="center">Qty</th>
                            <th className="right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersDetails.products &&
                            ordersDetails.products.map((item, index) => (
                              <tr>
                                <td className="center">1</td>
                                <td className="left strong">{item.name_en}</td>
                                <td className="left">{item.name_en}</td>
                                <td className="right">{item.product_price}</td>
                                <td className="center">{item.quantity} </td>
                                <td className="right">
                                  {" "}
                                  {item.quantity * item.product_price}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-sm-5"> </div>
                      <div className="col-lg-4 col-sm-5 ml-auto">
                        <table className="table table-clear">
                          <tbody>
                            <tr>
                              <td className="left">
                                <strong>Delivery Charges</strong>
                              </td>
                              <td className="right">
                                {ordersDetails.delivery_charge}
                              </td>
                            </tr>
                            <tr>
                              <td className="left">
                                <strong>Discount </strong>
                              </td>
                              <td className="right">
                                {ordersDetails.couponvalue}
                              </td>
                            </tr>
                            <tr>
                              <td className="left">
                                <strong>VAT (5%)</strong>
                              </td>
                              <td className="right">{ordersDetails.tax}</td>
                            </tr>
                            <tr>
                              <td className="left">
                                <strong>Total</strong>
                              </td>
                              <td className="right">
                                <strong>${ordersDetails.total_amount}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetailsScreen;
