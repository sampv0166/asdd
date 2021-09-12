import {
  SETTINGS_CREATE_FAIL,
  SETTINGS_CREATE_REQUEST,
  SETTINGS_CREATE_SUCCESS,
  SETTINGS_FAIL,
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
} from "../constants/settingsConstants";

export const settingsListReducer = (state = { settings: [] }, action) => {
  switch (action.type) {
    case SETTINGS_REQUEST:
      return { loading: true, settings: [] };
    case SETTINGS_SUCCESS:
      return {
        loading: false,
        settings: action.payload,
      };
    case SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const settingsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SETTINGS_CREATE_REQUEST:
      return { loading: true };
    case SETTINGS_CREATE_SUCCESS:
      return { loading: false, success: true, settings: action.payload };
    case SETTINGS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
