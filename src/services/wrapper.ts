import axios from "axios";

const baseUrl = "https://pose-estimation-backend-production.up.railway.app";

const requestWrapper = async function (options: any) {
  const requestHeaders = options.customHeaders || {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${options.token}`,
  };

  const tokenParam = {
    Authorization: `Bearer ${options.token}`,
  };

  const client = axios.create({
    baseURL: baseUrl,
    headers: { ...requestHeaders, ...tokenParam },
  });
  // eslint-disable-next-line func-names
  const onSuccess = function (response: any) {
    return response.data;
  };

  // eslint-disable-next-line func-names
  const onError = function (error: any) {
    if (error.response) {
      console.log("Error Message:", error);
    }

    return error.response;
  };

  return client(options).then(onSuccess).catch(onError);
};

export default requestWrapper;

// eslint-disable-next-line func-names
export const authRequest = async function (options: any) {
  const requestHeaders = options.customHeaders || {
    "Content-type": "application/json",
    Accept: "application/json",
  };

  const client = axios.create({
    baseURL: baseUrl,
    headers: { ...requestHeaders },
  });
  // eslint-disable-next-line func-names
  const onSuccess = function (response: any) {
    return response.data;
  };

  // eslint-disable-next-line func-names
  const onError = function (error: any) {
    if (error.response) {
      console.log("Error Message:", error);
    }

    return error.response;
  };

  return client(options).then(onSuccess).catch(onError);
};
