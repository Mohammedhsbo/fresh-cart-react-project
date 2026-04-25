import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import apiClient from '../../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/Cartcontext';
import { useQuery } from '@tanstack/react-query';

export default function Checkout() {
  const { getcartitem } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const navigate = useNavigate();

  const { data: cartData, isLoading } = useQuery({
    queryKey: ['cart-items'],
    queryFn: getcartitem,
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required').min(10, 'Minimum 10 characters required'),
      phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Must be a valid Egyptian number'),
      city: Yup.string().required('City is required'),
    }),
    onSubmit: async (values) => {
      if (!cartData?.data?._id) {
        toast.error('Cart is empty or not loaded');
        return;
      }
      const cartId = cartData.data._id;
      
      try {
        if (paymentMethod === 'online') {
            const { data } = await apiClient.post(`/orders/checkout-session/${cartId}?url=${window.location.origin}`, {
                shippingAddress: values
            });
            if (data.status === 'success') {
                window.location.href = data.session.url;
            }
        } else {
            const { data } = await apiClient.post(`/orders/${cartId}`, {
                shippingAddress: values
            });
            if (data.status === 'success') {
                toast.success('Order placed successfully!');
                navigate('/my-orders');
            }
        }
      } catch (err) {
         toast.error(err.response?.data?.message || 'Failed to complete checkout');
      }
    },
  });

  if (isLoading) return <h2 className="text-center mt-5">Loading cart...</h2>;
  if (!cartData?.data?.products?.length) return <h2 className="text-center mt-5 text-danger">Your cart is empty.</h2>;

  return (
    <div className="container my-5">
      <h1 className="text-success fw-bold text-center mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-8">
            <div className="border p-4 rounded bg-light">
               <h4 className="mb-4 text-start">Shipping Details</h4>
               <form onSubmit={formik.handleSubmit}>
                   <div className="mb-3 text-start">
                     <label className="form-label">City</label>
                     <input type="text" className="form-control" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                     {formik.touched.city && formik.errors.city && <div className="text-danger mt-1">{formik.errors.city}</div>}
                   </div>
                   <div className="mb-3 text-start">
                     <label className="form-label">Phone</label>
                     <input type="tel" className="form-control" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                     {formik.touched.phone && formik.errors.phone && <div className="text-danger mt-1">{formik.errors.phone}</div>}
                   </div>
                   <div className="mb-3 text-start">
                     <label className="form-label">Address Details</label>
                     <textarea className="form-control" name="details" rows="3" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                     {formik.touched.details && formik.errors.details && <div className="text-danger mt-1">{formik.errors.details}</div>}
                   </div>

                   <h4 className="mt-4 mb-3 text-start">Payment Method</h4>
                   <div className="d-flex gap-3 mb-4 text-start">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="paymentMethod" id="online" value="online" checked={paymentMethod === 'online'} onChange={(e) => setPaymentMethod(e.target.value)} />
                          <label className="form-check-label" htmlFor="online">Pay Online (Card)</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                          <label className="form-check-label" htmlFor="cash">Cash on Delivery</label>
                        </div>
                   </div>

                   <button type="submit" className="btn btn-success w-100 py-2 fs-5">
                       {paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
                   </button>
               </form>
            </div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
           <div className="border p-4 rounded">
              <h4 className="mb-4">Order Summary</h4>
              <ul className="list-group mb-3 text-start">
                 {cartData.data.products.map(item => (
                     <li key={item.product._id} className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">{item.product.title.slice(0, 15)}...</h6>
                          <small className="text-muted">Qty: {item.count}</small>
                        </div>
                        <span className="text-muted">{item.price * item.count} EGP</span>
                     </li>
                 ))}
                 <li className="list-group-item d-flex justify-content-between border-top mt-3 border-bottom-0 rounded-bottom">
                    <span className="fw-bold">Total (EGP)</span>
                    <strong className="text-success">{cartData.data.totalCartPrice} EGP</strong>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
