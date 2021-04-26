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
        .required("Required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      setLoginError(null);
      console.log(values);

      try {
        const response = await axios.post(`${api_url}${AUTH_PATH}`, values);
        console.log(response.data);
        setAuth(response.data);
        if (response.status === 200) {
          history.push("/admin");
        }
      } catch (err) {
        console.log("Error", err);
        setLoginError(err.toString());
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login">Login</label>
      <input
        onBlur={handleBlur}
        value={values.identifier}
        onChange={handleChange}
        id="login"
        name="identifier"
        type="text"
      />
      {touched.identifier && errors.identifier ? (
        <div>{errors.identifier}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input
        onBlur={handleBlur}
        value={values.password}
        onChange={handleChange}
        id="password"
        name="password"
        type="password"
      />
      {touched.password && errors.password ? (
        <div>{errors.password}</div>
      ) : null}
      <button type="submit">{submitting ? "Logging in ..." : "Login"}</button>
    </form>
  );
};

export default LoginForm;
