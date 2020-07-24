import Axios from "axios";
import Cookies from "js-cookie";

const ApiInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};
const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    let token = Cookies.get("token");
    if (token) {
      console.table(token);
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return request;
};
const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
    console.log(error, "ERROR");
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    console.log("SUCCESS");
  }
  return response;
};
ApiInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    Promise.reject(error);
  }
);

ApiInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default ApiInstance;
