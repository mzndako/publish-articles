import requestUrls from "../common/urls";
import { http } from "./connections";

const USER_EMAIL_STORAGE_KEY = 'user_email';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
const ACCESS_TOKEN_STORAGE_KEY = 'access_token';

const saveEmailAndTokenToLocalStorage = (
  email: string,
  refreshToken: string,
  accessToken: string
) => {
  localStorage.setItem(USER_EMAIL_STORAGE_KEY, email);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
};

export const performLogin = async (email: string, password: string) => {
  try {
    const response = await http.post(requestUrls.login, {
      email,
      password,
    });

    if (response?.status !== 200) {
      throw response;
    }
    const { refreshToken, accessToken } = response.data?.token || {};
    const { email: userEmail } = response.data?.user || {};

    saveEmailAndTokenToLocalStorage(userEmail, refreshToken, accessToken);

    return Promise.resolve();
  } catch (error) {
    throw error;
  }
};

export const performSignup = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await http.post(requestUrls.register, {
      name,
      email,
      password,
    });

    if (response?.status !== 201) {
      throw response;
    }

    Promise.resolve();
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)) {
    return true;
  }
  return false;
};

export const logout = () => {
  saveEmailAndTokenToLocalStorage("", "", "");
};
