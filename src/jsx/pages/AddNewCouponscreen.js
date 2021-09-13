import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  createCoupon,
  getCoupons,
  listCouponDetails,
} from '../../actions/couponsActions';
import * as Yup from 'yup';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Form, Formik } from 'formik';

import TextField from '../components/TextField';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import checkPermission, { checkPermissionOnSubmit } from './checkpermission';
import { getAllShops, listShopDetails } from '../../actions/shopActions';
import Select from '../components/Select';
import Multiselect from 'multiselect-react-dropdown';
import { listProducts } from '../../actions/productActions';

const AddNewCouponscreen = ({ history, match }) => {
  const [percentage, setIsPercentage] = useState({ checked: false });
  const [selected, setSelected] = React.useState([]);
  const couponId = match.params.id;

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

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
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const populateShops = () => {
    if (user.user.typeofuser === 'A' || user.user.typeofuser === 'U') {
      let objects = [2];

      objects[0] = {
        key: shop.shop_name,
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

      objects.unshift({ key: 'Choose A Shop', value: '' });

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

  const onSelect = (data) => {
    console.log(data);
  };

  const onRemove = (data) => {
    console.log(data);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon) {
      if (coupon.ispercentage === true) {
        setIsPercentage({ checked: true });
      } else {
        setIsPercentage({ checked: false });
      }
    }
  }, [coupon]);

  useLayoutEffect(() => {
    if (user.user.typeofuser === 'U' || user.user.typeofuser === 'A') {
      dispatch(listShopDetails(user.user.shop_id));
      populateShops();
    }
    if (user.user.typeofuser === 'S') {
      dispatch(getAllShops());
      populateShops();
    }

    dispatch(listProducts(1));

    populateOptions();

    dispatch(listShopDetails());
    checkPermission(history, 'coupon.add');
    if (couponId) {
      if (checkPermissionOnSubmit('coupon.update')) {
        history.push('/error');
        return;
      }
    }

    dispatch(listCouponDetails(couponId));
  }, [dispatch, couponId]);

  const validate = Yup.object({
    code: Yup.string()
      .min(1, 'Name must be atleast one character')
      .required('Required'),
    value: Yup.number().required('required'),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createCoupon(dispatch, formdata));
    dispatch(getCoupons());
    history.goBack();
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
            code: coupon.code || '',
            description_en: coupon.description_en || '',
            description_ar: coupon.description_ar || '',
            value: coupon.value || '',
            expiry: coupon.expired_at || '',
            expire: '',
            shop_id: coupon.shop_id || '',
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
              formdata.append('id', couponId);
            }

            formdata.append('expired_at', values.expiry);

            formdata.append('code', values.code);
            formdata.append('description_en', values.description_en);
            formdata.append('description_ar', values.description_ar);
            formdata.append('value', values.value);
            formdata.append('ispercentage', values.ispercentage);

            if (user.user.typeofuser === 'S') {
              formdata.append('shop_id', values.shop_id);
            }

            if (user.user.typeofuser === 'A' || user.user.typeofuser === 'U') {
              formdata.append('shop_id', shop.id);
            }

            if (values.ispercentage === true) {
              formdata.append('ispercentage', 1);
            } else {
              formdata.append('ispercentage', 0);
            }

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <Form>
              <div className="row g-3">
                <div className="col-6">
                  <TextField label="Code" name="code" type="text" />
                </div>
                <div className="col-6">
                  <TextField label="Value" name="value" type="number" />
                </div>
                {/*<div className="col-6">
                  <TextField
                    label="Descritpion English"
                    name="description_en"
                    type="text"
                  />
          </div>*/}
              </div>
              {/*<div className="row g-3">
                <div className="col-6">
                  <TextField
                    label="Descritpion Arabic"
                    name="description_ar"
                    type="text"
                  />
                </div>
        </div>*/}
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
                      formik.setFieldValue('ispercentage', d);
                    }}
                  />

                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    Is percentage
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 my-4">
                  <p className="mb-1">Change Expiry Date</p>
                  <input
                    className="form-control"
                    label="Expiry date"
                    name="expire"
                    type="date"
                    onChange={(e) => {
                      formik.setFieldValue('expiry', e.target.value);
                      formik.setFieldValue('expire', e.target.value);
                    }}
                  />
                </div>

                <Multiselect
                  options={populateOptions()} // Options to display in the dropdown
                  // selectedValues={selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="label" // Property name to display in the dropdown options
                  style={{
                    searchBox: {
                      // To change search box element look
                      background: '#fff',
                      border: '1px solid rgba(174, 121, 179, 0.39)',
                      color: '#6e6e6e',
                    },
                  }}
                />

                <div className="col-4 my-4">
                  <TextField label="Expiry date" name="expiry" type="text" />
                </div>

                {user.user.typeofuser === 'S' ? (
                  <div className="col-5 my-4">
                    <div>
                      <div className>
                        <Select
                          control="select"
                          label="Shop Name"
                          name="shop_id"
                          options={populateShops()}
                        ></Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <button className="btn btn-secondary mt-3 my-2" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewCouponscreen;
