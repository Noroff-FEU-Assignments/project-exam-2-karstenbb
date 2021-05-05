import React from "react";
import { useState } from "react";
import { api_url } from "../utils/Constants";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import contactBackground from "../images/contactme.jpeg";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [, setPostError] = useState(null);
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
    validationSchema: yup.object({
      name: yup.string().min(3).required("Please enter your a name"),
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Please enter your email"),
      message: yup
        .string()
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
    <div className="form__wrapper">
      <form className="contact__form" onSubmit={handleSubmit}>
        <h1 className="contact__title">Contact us</h1>
        {success ? (
          <div className="contact__success">Successfully sendt a message</div>
        ) : null}
        <label className="contact__label" htmlFor="name">
          Name:
        </label>
        <input
          className="contact__input"
          placeholder="Name..."
          type="text"
          name="name"
          id="name"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name ? (
          <div className="contact__error">{errors.name}</div>
        ) : null}
        <label className="contact__label" htmlFor="email">
          Email:
        </label>
        <input
          placeholder="example@example.com"
          className="contact__input"
          type="text"
          name="email"
          id="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email ? (
          <div className="contact__error">{errors.email}</div>
        ) : null}
        <label className="contact__label" htmlFor="name">
          Message:
        </label>
        <textarea
          placeholder="Write your message here"
          className="contact__input textarea__input"
          type="text"
          name="message"
          id="message"
          onBlur={handleBlur}
          value={values.message}
          onChange={handleChange}
        />
        {touched.message && errors.message ? (
          <div className="contact__error">{errors.message}</div>
        ) : null}
        <button className="contact__btn" type="submit">
          {submitting ? "Sending ..." : "Send"}
        </button>
      </form>
      <img
        className="backgroundPic__contact"
        src={contactBackground}
        alt="Homebackground"
      />
    </div>
  );
};

export default ContactForm;
