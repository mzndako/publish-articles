import React from "react";
import { useHistory } from "react-router";
import { extractErrorText, showNotification } from "../../common/helpers";
import { performSignup } from "../../services/Auth.service";
import SignupView, { IFormValues } from "./Signup.view";

const Signup = () => {
  const history = useHistory();

  const registerUser = async (values: IFormValues) => {
    try {
      const fullName = `${values.first_name} ${values.last_name}`;
      await performSignup(fullName, values.email, values.password);

      showNotification("Account created successfully. Please login", "success");
      history.push("/");
    } catch (error) {
      showNotification(extractErrorText(error), "error");
    }
  };

  return <SignupView onSubmit={registerUser} />;
};

export default Signup;
