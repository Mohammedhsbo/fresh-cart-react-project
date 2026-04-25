import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../../lib/api';
import { useParams, Link } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();

  // We reuse the query since React Query will serve it from cache if recently fetched!
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['my-orders'],
    queryFn: getUserOrders,
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <i className="fas fa-spinner fa-spin fa-3x text-success"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2 className="text-danger">Failed to load order details</h2>
        <Link to="/my-orders" className="btn btn-success mt-3">Back to Orders</Link>
      </div>
    );
  }

  const order = orders?.find((o) => o.id.toString() === id);

  if (!order) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2 className="text-muted">Order not found</h2>
        <Link to="/my-orders" className="btn btn-success mt-3">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="container my-5 text-start">
      <Link to="/my-orders" className="text-success text-decoration-none mb-4 d-inline-block">
        <i className="fa-solid fa-arrow-left me-2"></i> Back to Orders
      </Link>
      
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3 border-bottom">
              <h4 className="mb-0 fw-bold">Items in Order</h4>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {order.cartItems.map((item) => (
                  <li key={item._id} className="list-group-item p-4 d-flex align-items-center">
                    <img 
                      src={item.product.imageCover} 
                      alt={item.product.title} 
                      className="rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div className="ms-4 flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.product.title}</h6>
                      <p className="text-muted mb-0">Qty: {item.count} &times; {item.price} EGP</p>
                    </div>
                    <div className="fw-bold text-success fs-5">
                      {item.count * item.price} EGP
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Date Placed</span>
                <span className="fw-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Payment Method</span>
                <span className="fw-medium">{order.paymentMethodType === 'card' ? 'Online Card' : 'Cash'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Payment Status</span>
                <span className={`fw-bold ${order.isPaid ? 'text-success' : 'text-danger'}`}>
                  {order.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted">Delivery Status</span>
                <span className={`fw-bold ${order.isDelivered ? 'text-success' : 'text-warning'}`}>
                  {order.isDelivered ? 'Delivered' : 'Pending'}
                </span>
              </div>
              <div className="d-flex justify-content-between border-top pt-3">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5 text-success">{order.totalOrderPrice} EGP</span>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Shipping Details</h5>
              <p className="mb-1"><strong>City:</strong> {order.shippingAddress?.city}</p>
              <p className="mb-1"><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
              <p className="mb-0"><strong>Address:</strong> {order.shippingAddress?.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
