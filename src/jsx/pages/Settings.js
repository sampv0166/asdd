import { Form, Formik } from "formik";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, postSettings } from "../../actions/settingsActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TextField from "../components/TextField";

const Settings = ({ history }) => {
  const listSettings = useSelector((state) => state.listSettings);
  const { loading, error, settings } = listSettings;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let formdata = new FormData();
    formdata.append("action", "get");
    dispatch(getSettings(formdata, dispatch));
  
  }, [dispatch]);


  const handleSubmit = (formdata) => {
    dispatch(postSettings(formdata, dispatch));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            uae_delivery: (settings && settings.uae_delivery) || "",
            ksa_delivery: (settings && settings.ksa_delivery) || "",
            oman_delivery: (settings && settings.oman_delivery) || "",
          }}
          onSubmit={(values) => {
            let formdata = new FormData();

            formdata.append("uae_delivery", values.uae_delivery);
            formdata.append("ksa_delivery", values.ksa_delivery);
            formdata.append("oman_delivery", values.oman_delivery);
            formdata.append("action", "update");

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div className="row">
              <div className="col-md-12">
                <Form>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <TextField
                        label="UAE DELIVERY CHARGE"
                        name="uae_delivery"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <TextField
                        label="KSA DELIVERY CHARGE"
                        name="ksa_delivery"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <TextField
                        label="OMAN DELIVERY CHARGE"
                        name="oman_delivery"
                        type="number"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-secondary my-5 w-25"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};
export default Settings;
