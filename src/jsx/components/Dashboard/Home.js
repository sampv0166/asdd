import React, { useEffect, useLayoutEffect } from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAnalytics } from "../../../actions/analyticsActions";
import { listOrders } from "../../../actions/orderActions";
import avatar from "../../../images/avatar/5.png";
import Loader from "../Loader";
import Message from "../Message";



const Home = ({ history }) => {
  const analytics = useSelector((state) => state.analytics);
  const { loading, error, analysis } = analytics;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderloading, error: ordererror, orders } = orderList;

  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useLayoutEffect(() => {
    if (userInfo.user.typeofuser === "S") {
      dispatch(getAnalytics());
    }

    if (userInfo.user.typeofuser === "U" || userInfo.user.typeofuser === "A") {
      dispatch(getAnalytics(userInfo.user.shop_id));
    }

    dispatch(listOrders(1));
  }, [dispatch]);

  return (
    <>
      {loading || orderloading ? (
        <Loader />
      ) : error || ordererror ? (
        <Message variant="danger">{error || ordererror}</Message>
      ) : analysis.confirmedorders ? (
        <div>
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-danger">
                <div className="card-body  p-4">
                  <div className="media">
                    <span className="mr-3">
                      <i className="flaticon-381-calendar-1"></i>
                    </span>
                    <div className="media-body text-white text-right">
                      <p className="mb-1">Total Orders</p>
                      <h3 className="text-white">{analysis.orders}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-info">
                <div className="card-body p-4">
                  <div className="media">
                    <span className="mr-3">
                      <i className="flaticon-381-box"></i>
                    </span>
                    <div className="media-body text-white text-right">
                      <p className="mb-1">Total Products</p>
                      <h3 className="text-white">{analysis.products}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-primary">
                <div className="card-body p-4">
                  <div className="media">
                    <span className="mr-3">
                      <i className="flaticon-381-user-7"></i>
                    </span>
                    <div className="media-body text-white text-right">
                      <p className="mb-1">Number Of Users</p>
                      <h3 className="text-white">{analysis.users}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-sm-6">
              <div className="widget-stat card bg-success">
                <div className="card-body p-4">
                  <div className="media">
                    <span className="mr-3">
                      {/*<i className="flaticon-381-diamond"></i>*/}
                    </span>
                    <div className="media-body text-white text-right">
                      <p className="mb-1"></p>
                      <h3 className="text-white">0</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>Order Overview</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <div className="col">
                      <div className="widget-stat card bg-white ">
                        <div className="card-body shadow-lg p-4">
                          <div className="media">
                            <div className="media-body text-dark">
                              <p className="mb-1">Pending</p>
                              <h3 className="text-dark">
                                {" "}
                                {analysis.pendingorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-stat card bg-white">
                        <div className="card-body shadow-lg p-4">
                          <div className="media">
                            <div className="media-body text-blue">
                              <p className="mb-1">Ready For Shipment</p>
                              <h3 className="text-blue">
                                {" "}
                                {analysis.confirmedorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className="col">
                      <div className="widget-stat card bg-white">
                        <div className="card-body shadow-lg  p-4">
                          <div className="media">
                            <div className="media-body text-danger">
                              <p className="mb-1">Cancelled</p>
                              <h3 className="text-danger">
                                {analysis.cancelledorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-stat card bg-white">
                        <div className="card-body shadow-lg p-4">
                          <div className="media">
                            <div className="media-body text-success">
                              <p className="mb-1">Delivered</p>
                              <h3 className="text-success">
                                {" "}
                                {analysis.deliveredorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*<div className="col">
                      <div className="widget-stat card bg-white">
                        <div className="card-body shadow-lg p-4">
                          <div className="media">
                            <div className="media-body text-warning">
                              <p className="mb-1">Rejected</p>
                              <h3 className="text-warning">
                                {analysis.rejectedorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
      </div>*/}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <div className="col-xl-6 col-lg-12 ">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Latest Users</h4>
                </div>
                <div className="card-body pb-0">
                  <div className="widget-media">
                    <ul className="timeline">
                      {analysis.last10users.map((item, i) => (
                        <li key={i}>
                          {i < 5 ? (
                            <div className="timeline-panel">
                              <div className="media mr-2">
                                <img alt="" width="50" src={item.photolink} />
                              </div>
                              <div className="media-body">
                                <h5 className="mb-1">{item.name}</h5>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <Col lg={12}>
            <Card>
              <Card.Header>
                <Card.Title>Latest Orders</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive className="header-border ">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>User</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                      >
                        <td>{`Order #${item.id}`}</td>
                        <td>{item.user.name}</td>

                        <td>$ {item.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
