import { useContext, useState } from "react";
import { api_url } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const AddPlace = () => {
  const http = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      description: "",
      title: "",
      price: "",
      picture: "",
      recommended: false,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Please add a description"),
      title: Yup.string().required("Please enter a title"),
      price: Yup.number().required("Please enter a price"),
      picture: Yup.string().required("Please enter a picture url"),
      recommended: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      setPostError(null);
      console.log(values);

      try {
        const response = await http.post(`${api_url}/hotels`, values);
        console.log(response.data);
        setSuccess(true);
      } catch (err) {
        console.log("Error", err);
        setPostError(err.toString());
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        {success ? <div>Succssfully added new place</div> : null}
        <label htmlFor="title">Title</label>
        <input
          onBlur={handleBlur}
          value={values.title}
          onChange={handleChange}
          id="title"
          name="title"
          type="text"
        />
        {touched.title && errors.title ? <div>{errors.title}</div> : null}
        <label htmlFor="description">Description</label>
        <input
          onBlur={handleBlur}
          value={values.description}
          onChange={handleChange}
          id="description"
          name="description"
          type="text"
        />
        {touched.description && errors.description ? (
          <div>{errors.description}</div>
        ) : null}
        <label htmlFor="price">Price</label>
        <input
          onBlur={handleBlur}
          value={values.price}
          onChange={handleChange}
          id="price"
          name="price"
          type="number"
        />
        {touched.price && errors.price ? <div>{errors.price}</div> : null}
        <label htmlFor="picture">Picture url</label>
        <input
          onBlur={handleBlur}
          value={values.picture}
          onChange={handleChange}
          id="picture"
          name="picture"
          type="text"
        />
        {touched.picture && errors.picture ? <div>{errors.picture}</div> : null}
        <label htmlFor="recommended">Recommended</label>
        <input
          onBlur={handleBlur}
          value={values.recommended}
          onChange={handleChange}
          id="recommended"
          name="recommended"
          type="checkbox"
        />
        <button type="submit">{submitting ? "Adding ..." : "Add"}</button>
      </form>
    </>
  );
};
export default AddPlace;
