import React from "react";
import { Formik } from "formik";
import { Input, Button, Tag } from "antd";
import "./EditStudentForm.css";

const EditStudentForm = ({ initialValues, submitter }) => (
  <Formik
    initialValues={initialValues}
    validate={(values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "First Name required";
      }
      if (!values.lastName) {
        errors.lastName = "Last Name required";
      }

      if (!values.email) {
        errors.email = "Email Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.gender) {
        errors.gender = "Gender required";
      } else if (
        !["MALE", "FEMALE", "male", "female"].includes(values.gender)
      ) {
        errors.gender = "Gender must be (MALE,FEMALE,male,female)";
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      submitter(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      isSubmitting,
      submitForm,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      /* and other goodies */
    }) => (
      <form onSubmit={handleSubmit}>
        <Input
          className="Input"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          placeholder="First Name E g Anis "
        />
        {errors.firstName && touched.firstName && (
          <Tag className="tag">{errors.firstName}</Tag>
        )}
        <Input
          className="Input"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          placeholder="Last Name E g Medini "
        />
        {errors.lastName && touched.lastName && (
          <Tag className="tag">{errors.lastName}</Tag>
        )}
        <Input
          className="Input"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Email E g Test@gmail.com  "
        />
        {errors.email && touched.email && (
          <Tag className="tag">{errors.email}</Tag>
        )}
        <Input
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          placeholder="Gender E g MALE , FEMALE "
        />
        {errors.gender && touched.gender && (
          <Tag className="tag">{errors.gender}</Tag>
        )}
        <Button
          className="btn"
          onClick={submitForm}
          type="submit"
          disabled={isSubmitting | (touched && !isValid)}
        >
          Submit
        </Button>
      </form>
    )}
  </Formik>
);

export default EditStudentForm;
