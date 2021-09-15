import {
  ANALYTICS_FAIL,
  ANALYTICS_REQUEST,
  ANALYTICS_SUCCESS,
} from "../constants/analyticsConstants";

export const analyticsReducer = (state = { analysis: [] }, action) => {
  switch (action.type) {
    case ANALYTICS_REQUEST:
      return { loading: true, analysis: [] };
    case ANALYTICS_SUCCESS:

      return {
        loading: false,
        analysis: action.payload,
      };

    case ANALYTICS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
