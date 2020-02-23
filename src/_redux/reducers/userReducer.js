import * as actionTypes from "../actionTypes";
import _ from "lodash";

const initialState = {
  users: {},
  myInfo: {
    avatar_url: "http://placekitten.com/g/200/300",
    title: "Please find yourself"
  },
  loaders: {
    getUsers: false,
    getMyProfileInfo: false
  },
  errors: {
    getUsers: false,
    getMyProfileInfo: false
  }
};

const userReducer = (state = initialState, action = "") => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.START_RANDOM_GITHUB_USERS:
      return {
        ...state,
        loaders: { ...state.loaders, getUsers: true }
      };
    case actionTypes.SUCCESS_RANDOM_GITHUB_USERS:
      return {
        ...state,
        loaders: { ...state.loaders, getUsers: false },
        users: payload
      };
    case actionTypes.FAILURE_RANDOM_GITHUB_USERS:
      return {
        ...state,
        loaders: { ...state.loaders, getUsers: false },
        errors: { ...state.errors, getUsers: payload }
      };
    case actionTypes.START_MY_USER_PROFILE:
      return {
        ...state,
        loaders: { ...state.loaders, getMyProfileInfo: true }
      };
    case actionTypes.SUCCESS_MY_USER_PROFILE:
      return {
        ...state,
        loaders: { ...state.loaders, getMyProfileInfo: false },
        myInfo: { ...payload, title: "Helloooo!!! 😍" }
      };
    case actionTypes.FAILURE_MY_USER_PROFILE:
      return {
        ...state,
        loaders: { ...state.loaders, getMyProfileInfo: false },
        errors: { ...state.errors, getMyProfileInfo: payload }
      };
    case actionTypes.RESET_REDUCER:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
