import React from "react";
import { Dropdown } from "react-bootstrap";
import avatar from "../../../images/avatar/5.png";
const Home = () => {
  return (
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
                  <h3 className="text-white">76</h3>
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
                  <i className="flaticon-381-diamond"></i>
                </span>
                <div className="media-body text-white text-right">
                  <p className="mb-1">Earning</p>
                  <h3 className="text-white">$56K</h3>
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
                  <h3 className="text-white">783K</h3>
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
                  <h3 className="text-white">$76</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                      <h5 className="mb-1">Dr sultads Send you Photo</h5>
                      <small className="d-block">29 July 2020 - 02:26 PM</small>
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
                            <circle fill="#000000" cx="12" cy="12" r="2" />
                            <circle fill="#000000" cx="19" cy="12" r="2" />
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
    </div>
  );
};

export default Home;
