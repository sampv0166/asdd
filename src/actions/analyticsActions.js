import axios from "axios";
import {
  ANALYTICS_FAIL,
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
} from "../constants/analyticsConstants";
import { BASE_URL } from "../constants/Globals";

export const getAnalytics = (shopId) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.success.token}`,
    },
  };

  let d;

  try {
    if (shopId) {
      dispatch({ type: ANALYTICS_REQUEST });
      const { data } = await axios.get(
        `${BASE_URL}api/v2/admin/analytics?shop_id=${shopId}`,
        config
      );
      d = data;
    } else {
      dispatch({ type: ANALYTICS_REQUEST });
      const { data } = await axios.get(
        `${BASE_URL}api/v2/admin/analytics`,
        config
      );
      d = data;
    }

    dispatch({
      type: ANALYTICS_SUCCESS,
      payload: d,
    });
  } catch (error) {
    dispatch({
      type: ANALYTICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
