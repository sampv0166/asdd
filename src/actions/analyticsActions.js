import axios from "axios";
import {
  ANALYTICS_FAIL,
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
} from "../constants/analyticsConstants";
import { BASE_URL } from "../constants/Globals";

export const getAnalytics = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.success.token}`,
    },
  };

  try {
    dispatch({ type: ANALYTICS_REQUEST });
    const { data } = await axios.get(
      `${BASE_URL}api/v2/admin/analytics`,
      config
    );


    dispatch({
      type: ANALYTICS_SUCCESS,
      payload: data,
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
