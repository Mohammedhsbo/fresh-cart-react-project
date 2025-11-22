import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { usercontext } from '../../context/usercontext';

export default function Register() {
  let { setUserlogin } = React.useContext(usercontext);
  const navigate = useNavigate();

  // ✅ دالة التسجيل
  async function handleRegister(formvalues) {
    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        formvalues
      );

      if (data.message === 'success') {
        // ✅ تخزين التوكن فقط (مش الكائن كله)
        localStorage.setItem('userToken', data.token);
        setUserlogin(data.user);
        navigate('/login');
      }
    } catch (error) {
     console.error('Error during registration:', error.response?.data || error);
alert(error.response?.data?.message || 'Something went wrong.');

    }
  }

  // ✅ التحقق من القيم باستخدام Yup
  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be less than 20 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        'Password must start with uppercase letter and be 4–9 chars'
      )
      .required('Password is required'),

    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Re-enter your password'),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number')
      .required('Phone is required'),
  });

  // ✅ إعداد formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: validate,
    onSubmit: handleRegister,
  });

  // ✅ واجهة التسجيل
  return (
    <div className="container mt-5">
      <h1 className="mb-5 text-success fw-bold text-center">Register Now</h1>

      <Form className={`${styles.form} text-start`} onSubmit={formik.handleSubmit}>
        {/* Name */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger mt-1">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger mt-1">{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger mt-1">{formik.errors.password}</div>
          ) : null}
        </Form.Group>

        {/* Re-Password */}
        <Form.Group className="mb-3" controlId="formBasicRePassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-danger mt-1">{formik.errors.rePassword}</div>
          ) : null}
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger mt-1">{formik.errors.phone}</div>
          ) : null}
        </Form.Group>

        {/* Submit */}
        <Button variant="success" type="submit" className="mt-3 w-100">
          Register Now
        </Button>
      </Form>
    </div>
  );
}
