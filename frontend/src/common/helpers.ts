import { notification } from "antd";

export const extractErrorText = (response: any): string => {
  return (
    response?.response?.message ||
    response?.response?.data?.message ||
    response?.data?.message ||
    response?.message ||
    "Unknown error occurred. Please try again"
  );
};

export const showNotification = (message: string, type: 'warn' | 'error' | 'success' | 'info') => {
  notification[type]({
    message: message
  });
};