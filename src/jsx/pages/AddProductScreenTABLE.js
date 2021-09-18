import { ErrorMessage, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from '../components/Select';
import TextField from '../components/TextField';
import './Style2.css';
import CreatableSelect from 'react-select/creatable';

const userinfo = JSON.parse(localStorage.getItem('userInfo'));

let variationList;

const AddProductScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formikFileArray, setFormikFileArray] = useState([]);
  const [active, setActive] = useState({ checked: false });
  const [special, setSpecial] = useState({ checked: false });
  const [bestSeller, setBestSeller] = useState({ checked: false });
  const [offer, setOffer] = useState({ checked: false });
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [productVariationList, setProductVariationList] = useState([]);

  const productDetails = useSelector((state) => state.productDetails);
  const {
    product,
    loadingproductDetails,
    errorproductDetails,
    successproductDetails,
  } = productDetails;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading, error, shop } = shopListDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategory, categoryError, category } = categoryList;

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const populateCategory = () => {
    let objects = [category.length];
    for (var x = 0; x < category.length; x++) {
      objects[x] = { key: category[x].name, value: category[x].id };
    }
    objects.unshift({ key: 'choose', value: '' });
    return objects;
  };

  const populateShops = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user.user.typeofuser === 'A' || user.user.typeofuser === 'U') {
      let objects = [2];

      objects[0] = {
        key: shop.shop_name_en,
        value: shop.id,
      };
      objects.unshift({ key: 'choose', value: '' });

      return objects;
    }

    if (user.user.typeofuser === 'S') {
      let objects = [shops.length];
      for (var x = 0; x < shops.length; x++) {
        objects[x] = { key: shops[x].shop_name_en, value: shops[x].id };
      }

      objects.unshift({ key: 'choose', value: '' });

      return objects;
    }
  };

  const handleRemoveVariationImage = (
    e,
    fileToRemove,
    index,
    source,
    formikFileArray,
    formik
  ) => {
    e.preventDefault();
    setSelectedFiles(source);
    const files = Array.from(formikFileArray).filter((file, i) => index !== i);
    formik.setFieldValue('image', files);
    setFormikFileArray(files);
  };

  const renderPhotos = (source, formik) => {
    return source.map((photo, index) => {
      return photo !== 'https://khaymatapi.mvp-apps.ae/storage/' ? (
        <div className="">
          <Card
            className="my-2 p-1 rounded"
            style={{ height: '180px', objectFit: 'contain' }}
          >
            <Card.Img
              style={{ height: '170px', objectFit: 'contain' }}
              src={photo}
              variant="top"
              key={photo}
            />
            <button
              onClick={(e) =>
                handleRemoveVariationImage(
                  e,
                  source[index],
                  index,
                  source,
                  formikFileArray,
                  formik
                )
              }
              type="button px-1"
              className="btn btn-white text-danger rounded fs-3"
              style={{ position: 'absolute' }}
            >
              <i className="bx bx-trash"></i>
            </button>
          </Card>
        </div>
      ) : (
        ''
      );
    });
  };

  const handleVariationImageChange = (e, formik) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }

    const files = Array.from(e.target.files).map((file) => file);

    Array.from(e.target.files).forEach((file) => {
      formikFileArray.push(file);
    });
    formik.setFieldValue('image', formikFileArray);
  };

  const renderImageUpload = (formik) => {
    return (
      <div>
        <div className="row g-3">
          <div className="col-12">
            <label
              style={{ cursor: 'pointer' }}
              className="text-nowrap border shadow py-3 px-4 bg-white text-success add-photo rounded w-100"
              htmlFor="file"
            >
              <i className="bx bx-cloud-upload mx-2"></i>Upload New Image
            </label>
          </div>
          <div className="col">
            <input
              name="image"
              type="file"
              id="file"
              multiple
              onChange={(e) => handleVariationImageChange(e, formik)}
            />
            <div className="result rounded">
              {renderPhotos(selectedFiles, formik)}
            </div>
          </div>
        </div>
        <ErrorMessage
          component="div"
          className="error text-danger"
          name={'image'}
        />
      </div>
    );
  };

  const renderPriceStock = (formik) => {
    return (
      <>
        <Row>
          <Col className="col-md-6">
            <TextField label="Price" name="price" type="number" min="0" />
          </Col>
          <Col className="col-md-6">
            <TextField label="Stock" name="stocks" type="number" />
          </Col>
        </Row>
        {offer.checked ? (
          <Row>
            <Col className="col-md-12">
              <TextField
                label="Offer Price"
                name="offerprice"
                type="number"
                min="0"
              />
            </Col>
          </Row>
        ) : (
          ''
        )}

        <Row>
          <Col className="col-md-6 my-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={offer.checked}
                onChange={(d) => {
                  offer.checked === true ? (d = false) : (d = true);
                  setOffer({ checked: d });
                  formik.setFieldValue('hasoffer', d);
                  formik.setFieldValue('offerprice', formik.values.price);
                }}
              />

              <label className="form-check-label">Has Offer</label>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const myValue = useMemo(() => {
    console.log(productVariationList);
    //console.log(myValue)
  }, [productVariationList]);

  const handleSizeChange = (newValue, actionMeta) => {
    setSizeOptions(newValue);
    if (newValue) {
      console.log(newValue);

      let k = 0;

      if (
        newValue.length > 0 &&
        colorOptions &&
        sizeOptions &&
        colorOptions.length > 0
      ) {
        variationList = new Array(sizeOptions.length * colorOptions.length);
        for (let i = 0; i < newValue.length; i++) {
          for (let j = 0; j < colorOptions.length; j++) {
            variationList[k] = {
              variant: `${newValue[i].label}/${colorOptions[j].label}`,
              size: newValue[i].label,
              color: colorOptions[j].label,
            };

            k = k + 1;
          }
        }
      } else {
        variationList = new Array(newValue.length);
        for (let i = 0; i < newValue.length; i++) {
          variationList[k] = { size: `${newValue[i].label}` };
          k = k + 1;
        }
      }
      setProductVariationList(variationList);
    } else {
      if (
        colorOptions === null ||
        colorOptions === '' ||
        colorOptions === undefined
      ) {
        setProductVariationList([]);
      } else {
        variationList = new Array(colorOptions.length);
        for (let i = 0; i < colorOptions.length; i++) {
          variationList[i] = { color: `${colorOptions[i].label}` };
        }
      }
    }
  };

  const handleColorChange = (newValue, actionMeta) => {
    setColorOptions(newValue);
    if (newValue) {
      console.group('Value Changed');
      console.log(newValue);
      console.groupEnd();
      let k = 0;

      if (newValue.length > 0 && colorOptions) {
        variationList = new Array(
          sizeOptions ? sizeOptions.length : 1 * colorOptions.length
        );
        for (let i = 0; i < newValue.length; i++) {
          for (let j = 0; j < sizeOptions.length; j++) {
            variationList[k] = {
              color: newValue[i].label,
              size: sizeOptions[j].label,
            };
            k = k + 1;
          }
        }
      } else {
        variationList = new Array(newValue.length);
        for (let i = 0; i < newValue.length; i++) {
          variationList[k] = [{ color: `${newValue[i].label}` }];
          k = k + 1;
        }
      }
      setProductVariationList(variationList);
    } else {
      if (
        sizeOptions === null ||
        sizeOptions === '' ||
        sizeOptions === undefined
      ) {
        setProductVariationList([]);
      } else {
        console.log('kkkkk');
        variationList = new Array(sizeOptions.length);
        for (let i = 0; i < sizeOptions.length; i++) {
          variationList[i] = { size: `${sizeOptions[i].label}` };
        }
      }
      setProductVariationList(variationList);
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name_ar: product.length === 0 ? '' : product[0].name_ar,
          name_en: product.length === 0 ? '' : product[0].name_en,
          image:
            product.length === 0 || product[0].variations.length === 0
              ? ''
              : product[0].variations[0].images,

          shop_id: product.length === 0 ? shop.id : product[0].shop_id,

          description_ar: product.length === 0 ? '' : product[0].description_ar,
          description_en: product.length === 0 ? '' : product[0].description_en,
          category_id: product.length === 0 ? '' : product[0].category_id,

          bestseller: product.length === 0 ? false : product[0].bestseller,
          special: product.length === 0 ? false : product[0].special,
          isactive: product.length === 0 ? false : product[0].isactive,
          hasoffer:
            product.length === 0 || product[0].variations.length === 0
              ? false
              : product[0].variations[0].hasoffer,
          price:
            product.length === 0 || product[0].variations.length === 0
              ? ''
              : product[0].variations[0].price,
          offerprice:
            product.length === 0 || product[0].variations.length === 0
              ? 0
              : product[0].variations[0].offerprice,

          stocks:
            product.length === 0 || product[0].variations.length === 0
              ? ''
              : product[0].variations[0].stocks,
        }}
        //innerRef={submitform}
        // validationSchema={validate()}
        onSubmit={(values, { resetForm }) => {
          // handleformdata(values, 1);
        }}
      >
        {(formik) => (
          <div>
            <Form>
              <Row className="my-2">
                <Col className="w-auto">{renderImageUpload(formik)}</Col>
              </Row>

              <Row>
                <Col className="col-md-6">
                  <TextField label="Arabic Name" name="name_ar" type="text" />
                </Col>
                <Col className="col-md-6">
                  <TextField label="English Name" name="name_en" type="text" />
                </Col>
              </Row>

              <Row>
                <Col className="col-md-6">
                  <TextField
                    label="Arabic Description"
                    name="description_ar"
                    type="text"
                  />
                </Col>
                <Col className="col-md-6">
                  <TextField
                    label="English Description"
                    name="description_en"
                    type="text"
                  />
                </Col>
              </Row>

              <Row>
                <Col className="col-md-6">
                  <Select
                    control="select"
                    label="Category"
                    name="category_id"
                    options={populateCategory()}
                  ></Select>
                </Col>

                {userinfo.user.typeofuser === 'S' ? (
                  <Col className="col-md-6">
                    <Select
                      control="select"
                      label="Shop Name"
                      name="shop_id"
                      options={populateShops()}
                    ></Select>
                  </Col>
                ) : (
                  ''
                )}

                {userinfo.user.typeofuser === 'A' ||
                userinfo.user.typeofuser === 'U' ? (
                  <Col className="col-md-6">
                    <Select
                      control="select"
                      label="Shop Name"
                      name="shop_id"
                      options={populateShops()}
                    ></Select>
                  </Col>
                ) : (
                  ''
                )}
              </Row>

              {renderPriceStock(formik)}

              <Row>
                <Col>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="Active"
                      checked={active.checked}
                      onChange={(d) => {
                        active.checked === true ? (d = false) : (d = true);
                        setActive({ checked: d });
                        formik.setFieldValue('isactive', d);
                      }}
                    />

                    <label className="form-check-label" htmlFor="Active">
                      Active Status
                    </label>
                  </div>
                </Col>

                <Col>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={special.checked}
                      onChange={(d) => {
                        special.checked === true ? (d = false) : (d = true);
                        setSpecial({ checked: d });
                        formik.setFieldValue('special', d);
                      }}
                    />
                    <label className="form-check-label">Special</label>
                  </div>
                </Col>

                <Col>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={bestSeller.checked}
                      onChange={(d) => {
                        bestSeller.checked === true ? (d = false) : (d = true);
                        setBestSeller({ checked: d });
                        formik.setFieldValue('bestseller', d);
                      }}
                    />
                    <label className="form-check-label">Best Seller</label>
                  </div>
                </Col>
              </Row>
            </Form>
            <div className="row mb-4 mt-3">
              {' '}
              <div className="col-6">
                <label>Size Options </label>
                <CreatableSelect isMulti onChange={handleSizeChange} />
              </div>
              <div className="col-6">
                <label>Color Options </label>
                <CreatableSelect isMulti onChange={handleColorChange} />
              </div>
            </div>

            <div className="row mb-4 mt-3">
              <Table responsive hover className="header-border verticle-middle">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">IMAGE</th>
                    {productVariationList[0] &&
                    productVariationList[0].color ? (
                      <th scope="col">COLOR</th>
                    ) : (
                      ''
                    )}
                    {productVariationList[0] && productVariationList[0].size ? (
                      <th scope="col">SIZE</th>
                    ) : (
                      ''
                    )}
                    <th scope="col">INFO</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">HAS OFFER</th>
                  </tr>
                </thead>
                <tbody>
                  {productVariationList.map((item, i) => (
                    <tr key={i}>
                      <td>{i}</td>

                      <td>
                        {' '}
                        <span>
                          <Card.Img
                            style={{
                              height: '50px',
                              width: '50px',
                              objectFit: 'contain',
                            }}
                            src="https://www.sisega.com.mx/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
                            variant="top"
                          />
                        </span>
                      </td>

                      {item.color ? <td>{item.color}</td> : ''}
                      {item.size ? <td>{item.size}</td> : ''}
                      <td>
                        <input className="form-control"></input>
                      </td>
                      <td>
                        <input className="form-control"></input>
                      </td>
                      <td>
                        <input className="form-control"></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddProductScreen;
