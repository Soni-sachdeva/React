import axios from "axios";
import * as _ from "lodash";
import { serviceDefinitions } from "./serviceDefinations";

const axiosInstances = {};

const initServices = () => {
  if (Object.keys(axiosInstances).length === 0) {
    _.forEach(serviceDefinitions, (serviceUrl, serviceName) => {
      axiosInstances[serviceName] = axios.create({
        baseURL: serviceUrl,
        validateStatus: status => status >= 200 && status < 300
      });
    });
  }
};

const handleError = error => {
  console.log(error.response);
  return Promise.reject(error.response.data);
};

const fireRequest = async (service, method, fullUrl, data) => {
  let headers = {};
  const options = {
    method,
    data: (method === "POST" && data) || (method === "PUT" && data),
    mode: "web",
    headers: headers,
    params: _.get(data, "params", undefined)
  };
  try {
    if (typeof axiosInstances[service] === "function") {
      axiosInstances[service].interceptors.response.use(null, handleError);
    }
    const res = axiosInstances[service](fullUrl, options);
    let response = {};
    let fullResponse = await res;
    if (fullResponse.response) {
      fullResponse = fullResponse.response;
    }
    response = _.get(fullResponse, "data", {}) || {};
    response.statusCode = fullResponse.status;
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

initServices();

export default {
  get(service, url, data) {
    return fireRequest(service, "GET", url, data);
  },

  post(service, url, data) {
    return fireRequest(service, "POST", url, data);
  },

  put(service, url, data) {
    return fireRequest(service, "PUT", url, data);
  },

  delete(service, url, data) {
    return fireRequest(service, "DELETE", url, data);
  },

  patch(service, url, data) {
    return fireRequest(service, "PATCH", url, data);
  },

  axios() {
    return axiosInstances;
  }
};
