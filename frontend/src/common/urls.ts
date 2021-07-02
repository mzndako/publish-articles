export const backendUrl = process.env.REACT_APP_BACKEND_URL;

const requestUrls = {
  refreshToken: "/v1/auth/refresh-token",
  login: "/v1/auth/login",
  register: "/v1/auth/register",
  article: "/v1/articles"
};

export default requestUrls;
