import axios, { AxiosRequestConfig } from "axios";
import requestUrls, { backendUrl } from "../common/urls";

const refreshTokenUrl = `${backendUrl}${requestUrls.refreshToken}`;

export const http = axios.create({
  baseURL: backendUrl,
  timeout: 5000,
});

http.interceptors.request.use((request: AxiosRequestConfig) => {
  request.headers = {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  }

  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === refreshTokenUrl
    ) {
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 401 &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized" &&
      originalRequest.url !== requestUrls.login
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      const email = localStorage.getItem("user_email");

      if (refreshToken) {
        return http
          .post(requestUrls.refreshToken, { refreshToken: refreshToken, email })
          .then((response) => {
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);

            http.defaults.headers["Authorization"] =
              "Bearer " + response.data.accessToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.accessToken;

            return http(originalRequest);
          })
          .catch((err) => {
            console.error(err);
            return err;
          });
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
