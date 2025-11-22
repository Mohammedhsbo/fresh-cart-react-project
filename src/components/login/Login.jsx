import React from 'react'
import Form from 'react-bootstrap/Form'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { usercontext } from '../../context/usercontext'



export default function Login() {
   let{ setUserlogin} = React.useContext(usercontext)
  const navigate = useNavigate();

 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must start with uppercase letter and be 4–9 chars')
      .required('Password is required'),
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
   onSubmit: async (values) => {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    );

    if (data.token) {
      localStorage.setItem("userToken", data.token);
      setUserlogin(data.token);
      navigate("/");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Invalid email or password. Please try again.");
  }
}
  });

  return (
    <div className="container ">
        <h1 className="mb-5 text-success fw-bold text-center">Login Now</h1>
      <Form onSubmit={formik.handleSubmit} className="text-start">

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger mt-1">{formik.errors.email}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger mt-1">{formik.errors.password}</div>
          )}
        </Form.Group>

        <button type="submit" className="btn btn-success w-100 mt-3">
          Login
        </button>
        <p className='mt-3'>didn't have an account? <span><NavLink className={`text-decoration-none text-success fw-bold`} to="/register">Register now</NavLink></span></p>
      </Form>
    </div>
  );
}
