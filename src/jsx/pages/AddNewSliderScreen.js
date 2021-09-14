import React from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategory,
  listCategoryDetails,
} from '../../actions/categoryActions';
import * as Yup from 'yup';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ErrorMessage, Form, Formik } from 'formik';
import { Alert, Card, Carousel, Col, Image, Modal, Row } from 'react-bootstrap';
import TextField from '../components/TextField';
import checkPermission, { checkPermissionOnSubmit } from './checkpermission';
import {
  createSlider,
  deleteSlider,
  getSlider,
  listSliderDetails,
} from '../../actions/sliderActions';
import { listProducts } from '../../actions/productActions';
import Select from 'react-select';
import { getAllShops, listShops } from '../../actions/shopActions';
import { isFile } from '@babel/types';


const AddNewSliderScreen = ({ match, history }) => {
  const [sliderImage, setSliderImage] = useState([]);
  const [top, setTop] = useState({ checked: false });
  const [bottom, setBottom] = useState({ checked: false });

  
  const [deleteimageurl, setDeletedimageurl] = useState([]);
  const [show, setShow] = useState({ status: false, action: 'add', value: 0 });
  const [shopid, setShopId] = useState(null);
  const [showalter, setshowalert] = useState(false);
  const [id, setId] = useState(0);

  const sliderType = match.params.id;
  let sliderid = 0;

  const sliderDetails = useSelector((state) => state.sliderDetails);
  const { loading, error, sliderDetails: slider } = sliderDetails;

  const sliderList = useSelector((state) => state.sliderList);
  const { loading: slidersLoading, slidersError, sliders } = sliderList;

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedProductOption, setSelectedProductOption] = useState(null);

  const productList = useSelector((state) => state.productList);
  const {
    loading: productloading,
    error: producterror,
    products,
    page,
    pages,
  } = productList;

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const populateOptions = () => {
    let objects = [products.length];
    for (var x = 0; x < products.length; x++) {
      objects[x] = { value: products[x].id, label: products[x].name_en };
    }
    return objects;
  };

  const deleteSliderHandler = async (id) => {
    let formdata = new FormData();
    formdata.set('delete', id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteSlider(id));
    }
  };

  const populateshopOptions = () => {
    let objects = [shops.length];
    for (var x = 0; x < shops.length; x++) {
      objects[x] = { value: shops[x].id, label: shops[x].shop_name_en };
    }

    return objects;
  };

  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading: loadingcreate, error: errorcreate } = sliderCreate;

  const dispatch = useDispatch();

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setSliderImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue('image', e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (slider) {
    }
  }, [slider]);

  let slide = 0;

  useLayoutEffect(() => {
    //checkPermission(history, "category.add");
    dispatch(listProducts(1));
    dispatch(getAllShops());
    dispatch(getSlider());
    populateOptions();
    populateshopOptions();
  }, [dispatch, show, sliderType]);

  const validate = Yup.object({
    location: Yup.string()
      .min(1, 'Name must be atleast one character')
      .required('Required'),
    aspectratio: Yup.number().required('Required'),
    image:
      Yup.mixed().required('required') || Yup.string().required('required'),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createSlider(dispatch, formdata));
    dispatch(getSlider());
  };

  return (
    <>
      {loading ||
      loadingcreate ||
      slidersLoading ||
      productloading ||
      shoploading ? (
        <Loader />
      ) : error || errorcreate || slidersError || producterror ? (
        <Message variant="danger">
          {error || errorcreate || slidersError || producterror || shopError}
        </Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            location:
              sliderType === '1'
                ? sliders.top && sliders.top[0].location
                : sliders.bottom && sliders.bottom[0].location,
            aspectratio:
              sliderType === '1'
                ? sliders.top && sliders.top[0].aspectratio
                : sliders.bottom && sliders.bottom[0].aspectratio,
            image:
              sliderType === '1'
                ? sliders.top && sliders.top[0].fullurl
                : sliders.bottom && sliders.bottom[0].fullurl,
            shop_id: '1'
              ? sliders.top && sliders.top[0].shop_id
              : sliders.bottom && sliders.bottom[0].shop_id,
            product_id: '1'
              ? sliders.top && sliders.top[0].pid
              : sliders.bottom && sliders.bottom[0].pid,
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
            if (id !== 0) {
              formdata.append('id', id);
            }
            formdata.append('location', values.location);
            formdata.append('aspectratio', values.aspectratio);
            if (typeof values.image === 'string') {
              formdata.delete('file');
            } else {
              formdata.append('file', values.image);
            }
            if (selectedProductOption !== null) {
              formdata.append('pid', Number(values.product_id));
            }
            if (selectedOption !== null) {
              formdata.append('shop_id', Number(values.shop_id));
            }
            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div className="">
              <div>
                <div className="">
                  <div>
                    {sliderType === '1' ? (
                      <h4> Top Sliders </h4>
                    ) : (
                      <h4> Bottom Sliders </h4>
                    )}

                    <Card className="my-4">
                      <Card.Body>
                        <div>
                          {sliderType === '1' ? (
                            <Carousel pause="hover" className="bg-light">
                              {sliders &&
                                sliders.top &&
                                sliders.top.map((item, i) => (
                                  <Carousel.Item
                                    key={item._id}
                                    style={{
                                      height: '200px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      slide = Number(item.id);

                                      setSliderImage(item.fullurl);
                                      setId(Number(item.id));
                                      sliderid = item.id;
                                      const value =
                                        populateshopOptions().filter(
                                          (option) =>
                                            option.value == item.shop_id
                                        );

                                      setSelectedOption(value);
                                      const value2 = populateOptions().filter(
                                        (option) => option.value == item.pid
                                      );

                                      setSelectedProductOption(value2);
                                      setShow({
                                        status: true,
                                        action: 'update',
                                        value: Number(item.id),
                                      });
                                    }}
                                  >
                                    <Image
                                      src={item.fullurl}
                                      alt=""
                                      fluid
                                      style={{
                                        top: '0',
                                        left: '0',
                                        minWidth: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                      }}
                                    />
                                  </Carousel.Item>
                                ))}
                            </Carousel>
                          ) : (
                            <Carousel pause="hover" className="bg-light">
                              {sliders &&
                                sliders.bottom &&
                                sliders.bottom.map((item, i) => (
                                  <Carousel.Item
                                    key={item._id}
                                    style={{
                                      height: '200px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      slide = Number(item.id);
                                      console.log(slide);
                                      setId(Number(item.id));
                                      setSliderImage(item.fullurl);
                                      sliderid = item.id;

                                      const value =
                                        populateshopOptions().filter(
                                          (option) =>
                                            option.value == item.shop_id
                                        );
                                      setSelectedOption(value);
                                      const value2 = populateOptions().filter(
                                        (option) => option.value == item.pid
                                      );
                                      setSelectedProductOption(value2);
                                      setShow({
                                        status: true,
                                        action: 'update',
                                        value: Number(item.id),
                                      });
                                    }}
                                  >
                                    <Image
                                      src={item.fullurl}
                                      alt=""
                                      fluid
                                      style={{
                                        top: '0',
                                        left: '0',
                                        minWidth: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                      }}
                                    />
                                  </Carousel.Item>
                                ))}
                            </Carousel>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
              <Form>
                <div className="d-flex ">
                  <div className="col-md-4">
                    <TextField
                      label="Aspect Ratio"
                      name="aspectratio"
                      type="number"
                    />
                  </div>

                  <button
                    className="btn btn-secondary mt-4 w-25 h-50 mx-4"
                    onClick={(e) => {
                      e.preventDefault();
                      const id =
                        sliderType === '1'
                          ? sliders.top && sliders.top[0].id
                          : sliders.bottom && sliders.bottom[0].id;

                      setId(id);
                      formik.submitForm();
                      slide = 0;
                    }}
                  >
                    Update Ratio
                  </button>
                  <button
                    className="btn btn-secondary h-50 my-1 w-25 mx-4 mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.setFieldValue('image', '');
                      setSliderImage('');
                      setId(0);
                      setShow({ status: true, action: 'add', value: '' });
                      setSelectedProductOption(null);
                      setSelectedOption(null);
                    }}
                  >
                    Add New Image
                  </button>
                </div>
                <Modal
                  show={show.status}
                  onHide={() => {
                    setShow({ status: false, action: 'add', value: '' });
                    setId(0);
                    slide = 0;
                  }}
                  size="lg"
                  backdrop="static"
                >
                  <Modal.Header closeButton></Modal.Header>

                  <Modal.Body>
                    <div>
                      <Card
                        className="my-2 p-1 rounded"
                        style={{ height: '280px', objectFit: 'cover' }}
                      >
                        <Card.Img
                          style={{ height: '270px', objectFit: 'contain' }}
                          src={sliderImage}
                          variant="top"
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
                            name={'image'}
                          />
                          <i className="bx bx-cloud-upload mx-2"></i>Upload
                          Slider Image
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row g-3">
                        <div className="col-md-4 h-auto">
                          <label>Link To Product</label>
                          <Select
                            options={populateOptions()}
                            name="product_id"
                            placeholder="Search Product"
                            onChange={(e) => {
                              formik.setFieldValue('shop_id', '');
                              formik.setFieldValue('product_id', e.value);
                              setSelectedOption(null);
                              setSelectedProductOption(e);
                            }}
                            value={selectedProductOption}
                          />
                        </div>

                        <div className="col-md-4">
                          <label>Link To Shop</label>
                          <Select
                            options={populateshopOptions()}
                            name="shop_id"
                            placeholder="Search Shop"
                            onChange={(e) => {
                              formik.setFieldValue('product_id', '');
                              formik.setFieldValue('shop_id', e.value);
                              setSelectedProductOption(null);
                              setSelectedOption(e);
                            }}
                            value={selectedOption}
                          />
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-secondary mt-3 my-2 w-25"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          formik.values.image !== '' ||
                          formik.values.image !== null ||
                          formik.values.image !== undefined
                        ) {
                          formik.submitForm();
                          slide = 0;
                          setShow({ status: false });
                        } else {
                          setshowalert(true);
                        }
                      }}
                    >
                      Save
                    </button>

                    {show.action === 'update' ? (
                      <button
                        className="btn btn-danger mt-3 my-2 w-25 mx-2"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteSliderHandler(show.value);
                          slide = 0;
                          setShow({ status: false });
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                  {showalter ? (
                    <Alert variant="danger">Image is required</Alert>
                  ) : (
                    ''
                  )}
                </Modal>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewSliderScreen;
