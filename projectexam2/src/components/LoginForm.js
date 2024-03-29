import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { api_url, AUTH_PATH } from "../utils/Constants";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginForm = () => {
  const [, setAuth] = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  // The form validationSchema
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .max(40, "Login must be shorter than 20 characters")
        .required("Please write in your username"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required("Please write in your password"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      setLoginError(null);

      // The post request and login
      try {
        const response = await axios.post(`${api_url}${AUTH_PATH}`, values);

        setAuth(response.data);
        if (response.status === 200) {
          history.push("/addplace");
        }
      } catch (error) {
        console.log("Error", error);
        setLoginError(error.toString());
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="login__formwrapper">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Login</h1>
        <div className="login__error">
          {loginError ? "Please enter correct login details" : null}
        </div>
        <label className="login__label" htmlFor="login">
          Username
        </label>
        <input
          placeholder="Username"
          className="login__input"
          onBlur={handleBlur}
          value={values.identifier}
          onChange={handleChange}
          id="login"
          name="identifier"
          type="text"
        />
        {touched.identifier && errors.identifier ? (
          <div className="login__error">{errors.identifier}</div>
        ) : null}
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Password"
          className="login__input"
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
        />
        {touched.password && errors.password ? (
          <div className="login__error">{errors.password}</div>
        ) : null}
        <button className="login__btn" type="submit">
          {submitting ? "Logging in ..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
