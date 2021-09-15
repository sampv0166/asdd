import React, { useEffect, useLayoutEffect } from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAnalytics } from "../../../actions/analyticsActions";
import { listOrders } from "../../../actions/orderActions";
import avatar from "../../../images/avatar/5.png";
import Loader from "../Loader";
import Message from "../Message";
const Home = () => {
  const analytics = useSelector((state) => state.analytics);
  const { loading, error, analysis } = analytics;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderloading, error: ordererror, orders } = orderList;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAnalytics());
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
          {console.log(analysis)}
          {console.log(orders)}
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
                      <p className="mb-1">Latest Users</p>
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
                      <div className="widget-stat card bg-dark">
                        <div className="card-body  p-4">
                          <div className="media">
                            <div className="media-body text-white">
                              <p className="mb-1">Pending</p>
                              <h3 className="text-white">
                                {" "}
                                {analysis.pendingorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-stat card bg-blue">
                        <div className="card-body  p-4">
                          <div className="media">
                            <div className="media-body text-white">
                              <p className="mb-1">Confirmed</p>
                              <h3 className="text-white">
                                {" "}
                                {analysis.confirmedorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-stat card bg-primary">
                        <div className="card-body  p-4">
                          <div className="media">
                            <div className="media-body text-white">
                              <p className="mb-1">Delivered</p>
                              <h3 className="text-white">
                                {" "}
                                {analysis.deliveredorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className="col">
                      <div className="widget-stat card bg-danger">
                        <div className="card-body  p-4">
                          <div className="media">
                            <div className="media-body text-white">
                              <p className="mb-1">Cancelled</p>
                              <h3 className="text-white">
                                {analysis.cancelledorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="widget-stat card bg-warning">
                        <div className="card-body  p-4">
                          <div className="media">
                            <div className="media-body text-white">
                              <p className="mb-1">Rejected</p>
                              <h3 className="text-white">
                                {analysis.rejectedorders.length}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <div className="col-xl-6 col-lg-12 ">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h4 className="card-title">Top Products</h4>
                </div>
                <div className="card-body pb-0">
                  <div className="widget-media">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-panel">
                          <div className="media mr-2">
                            <img alt="" width="50" src={avatar} />
                          </div>
                          <div className="media-body">
                            <h5 className="mb-1">Product Name</h5>
                          </div>
                          <Dropdown className="dropdown">
                            <Dropdown.Toggle
                              variant="primary light"
                              className="icon-false sharp"
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect x="0" y="0" width="24" height="24" />
                                  <circle fill="#000000" cx="5" cy="12" r="2" />
                                  <circle
                                    fill="#000000"
                                    cx="12"
                                    cy="12"
                                    r="2"
                                  />
                                  <circle
                                    fill="#000000"
                                    cx="19"
                                    cy="12"
                                    r="2"
                                  />
                                </g>
                              </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Dropdown.Item className="dropdown-item" href="#">
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item className="dropdown-item" href="#">
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </li>
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
                      <tr>
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
