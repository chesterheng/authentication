import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../../actions";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { errorMessage } = auth;
  return (
    <Form
      onSubmit={(values) => {
        dispatch(
          signup(values, () => {
            navigate("/feature");
          })
        );
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email">
            {({ input, meta }) => (
              <div>
                <label>Email</label>
                <input {...input} type="text" placeholder="Email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input {...input} type="password" placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div>{errorMessage}</div>
          <button type="submit" disabled={submitting || pristine}>
            Sign Up!
          </button>
        </form>
      )}
    />
  );
};

export default Signup;
