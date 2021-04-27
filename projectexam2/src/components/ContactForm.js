import React from "react";
import { useState } from "react";
import { api_url } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [postError, setPostError] = useState(null);
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("Please enter your a name"),
      email: Yup.string().required("Please enter your email"),
      message: Yup.string()
        .min(10, "The message must be at least 10 characters long")
        .required("Please enter a message"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      setPostError(null);
      console.log(values);

      try {
        const response = await axios.post(`${api_url}/contacts`, values);
        console.log(response.data);
        setSuccess(true);
      } catch (error) {
        console.log("Error", error);
        setPostError(error.toString());
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        {success ? <div>Successfully sendt a message</div> : null}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name ? <div>{errors.name}</div> : null}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}
        <label htmlFor="name">Message:</label>
        <textarea
          type="text"
          name="message"
          id="message"
          onBlur={handleBlur}
          value={values.message}
          onChange={handleChange}
        />
        {touched.message && errors.message ? <div>{errors.message}</div> : null}
        <button type="submit">{submitting ? "Sending ..." : "Send"}</button>
      </form>
    </>
  );
};

export default ContactForm;
