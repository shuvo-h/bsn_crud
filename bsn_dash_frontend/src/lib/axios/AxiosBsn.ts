
import { config } from "@/config/config";
import { API_ACCESS_TOKEN_KEY } from "@/constant/authConst";
import { TResponseError, TResponseSuccess } from "@/interface";
import { getFromLocalStorage, removeFromLocalStorage } from "@/utils/localstorage";
import axios, { AxiosResponse } from "axios";

const AxiosBsn = axios.create()
AxiosBsn.defaults.headers.post["Content-Type"] = "application/json"
AxiosBsn.defaults.headers["Accept"] = "application/json";
AxiosBsn.defaults.timeout = 60*1000; // 1min
AxiosBsn.defaults.baseURL = config.BACKEND_BASE_URL;


// Add a request interceptor
AxiosBsn.interceptors.request.use(function (config) {
    const api_access_token = getFromLocalStorage(API_ACCESS_TOKEN_KEY);

    if (api_access_token) {
        config.headers.api_access_token = api_access_token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


// Add a response interceptor
// @ts-ignore
AxiosBsn.interceptors.response.use(function (response) {
    const responseObject:TResponseSuccess<any> = {
      success: response?.data?.success,
        data: response?.data?.data,
        meta: response?.data?.meta,
        message: response?.data?.message,
        errorMessages: response?.data?.errorMessages,
    }
    return responseObject as any;
    // return response;
}, async function (error) {
    const config = error.config;

    // const responseObject:TResponseError = {
    //     statusCode: error?.response?.data?.statusCode||500,
    //     message: error?.response?.data?.message||"Unknown error occured ",
    //     errorMessages: error?.response?.data?.errorMessages||[],
    // }

    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
    //   const response = await getNewAccessToken();
    //   const accessToken = response?.data?.accessToken;
    //   config.headers['Authorization'] = accessToken;
    //   setToLocalStorage(AUTH_KEY, accessToken);
    //   setAccessToken(accessToken);
      return AxiosBsn(config);
   }else if(error?.response?.status === 401 && config.sent){
     // remove/ delete the token
     removeFromLocalStorage(API_ACCESS_TOKEN_KEY)
      window.location.href = "/login"
   } else {
      const responseObject: TResponseError = {
         statusCode: error?.response?.status || 500,
         message: error?.response?.data?.message || 'Something went wrong!!!',
         errorMessages: error?.response?.data?.errorMessages,
      };
      // return Promise.reject(error);
      return responseObject;
   }

    // return Promise.reject(error);
    // return responseObject
  });


export { AxiosBsn  };
