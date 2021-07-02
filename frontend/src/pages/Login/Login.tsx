import React from "react";
import { useHistory } from "react-router";
import { extractErrorText, showNotification } from "../../common/helpers";
import { performLogin } from "../../services/Auth.service";
import LoginView, { IFormValues } from "./Login.view";

const Login = () => {
  const history = useHistory();

  const loginUser = async (value: IFormValues) => {
    try {
      await performLogin(value.email, value.password);
      history.push("/articles");
    } catch (error) {
      showNotification(extractErrorText(error), "error");
    }
  };

  return <LoginView onSubmit={loginUser} />;
};

export default Login;
