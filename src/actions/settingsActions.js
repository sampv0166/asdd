import axios from "axios";
import { BASE_URL } from "../constants/Globals";
import {
  SETTINGS_FAIL,
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
} from "../constants/settingsConstants";

export const getSettings = (formdata) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.success.token}`,
    },
  };

  try {
    dispatch({ type: SETTINGS_REQUEST });

    const { data } = await axios.post(
      `${BASE_URL}api/v2/admin/deliverycharges`,
      formdata,
      config
    );

    dispatch({
      type: SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SETTINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
