import * as actionTypes from "../actionTypes";
import { SERVICE_NAMES } from "../../_components/config/constants";
import { keyBy } from "lodash";

export const getRandomUsers = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.START_RANDOM_GITHUB_USERS,
    promise: api
      .get(SERVICE_NAMES.GITHUB_SERVICE, `/users`)
      .then(res =>
        setTimeout(() => {
          dispatch(successGetUsers(res));
        }, 500)
      )
      .catch(res => dispatch(failedGetUsers(res)))
  });
};

const successGetUsers = response => ({
  type: actionTypes.SUCCESS_RANDOM_GITHUB_USERS,
  payload: keyBy(response, "node_id")
});

const failedGetUsers = response => ({
  type: actionTypes.FAILURE_RANDOM_GITHUB_USERS,
  payload: response
});

export const getMyProfileInfo = name => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.START_MY_USER_PROFILE,
    promise: api
      .get(SERVICE_NAMES.GITHUB_SERVICE, `/users/${name}`)
      .then(res => dispatch(successMyUserProfile(res)))
      .catch(res => dispatch(failedMyUserProfile(res)))
  });
};

const successMyUserProfile = response => ({
  type: actionTypes.SUCCESS_MY_USER_PROFILE,
  payload: response
});

const failedMyUserProfile = response => ({
  type: actionTypes.FAILURE_MY_USER_PROFILE,
  payload: response
});

export const resetReducer = () => ({
  type: actionTypes.RESET_REDUCER
});
