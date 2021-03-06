import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { loading: true, category: [] };
    case CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CATEGORY_FAIL:
      return { loading: false, categoryError: action.payload };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { categoryDetails: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true, categoryDetails: [] };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        categoryDetails: action.payload,
      };
    case CATEGORY_DETAILS_FAIL:
      if (action.payload === 'Category is not found') {
        return {
          loading: false,
          error: '',
        };
      } else {
        return {
          loading: false,
          error: action.payload,
        };
      }

    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
