import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../../lib/api';
import { Link } from 'react-router-dom';

export default function Orders() {
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
        <h2 className="text-danger">Failed to load orders</h2>
        <p className="text-muted">Please try again later.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2 className="text-success fw-bold">No Orders Yet</h2>
        <p className="text-muted">Looks like you haven't placed any orders.</p>
        <Link to="/" className="btn btn-success mt-3 px-4 py-2">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-success fw-bold text-center mb-5">My Orders</h1>
      <div className="row g-4">
        {orders.map((order) => (
          <div key={order.id} className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center py-3">
                <div>
                  <h5 className="mb-1 fw-bold text-dark">Order #{order.id}</h5>
                  <small className="text-muted">Placed on {new Date(order.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="mt-2 mt-md-0 d-flex gap-2">
                  <span className={`badge ${order.isPaid ? 'bg-success' : 'bg-danger'} py-2 px-3 fs-6`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                  <span className={`badge ${order.isDelivered ? 'bg-success' : 'bg-warning text-dark'} py-2 px-3 fs-6`}>
                    {order.isDelivered ? 'Delivered' : 'Pending Delivery'}
                  </span>
                </div>
              </div>
              <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div className="mb-3 mb-md-0">
                  <p className="mb-1 fs-5">
                    <strong>Total Amount:</strong> <span className="text-success fw-bold">{order.totalOrderPrice} EGP</span>
                  </p>
                  <p className="mb-0 text-muted">
                    <strong>Payment Method:</strong> {order.paymentMethodType === 'card' ? 'Online Card' : 'Cash on Delivery'}
                  </p>
                </div>
                <div>
                  <Link to={`/my-orders/${order.id}`} className="btn btn-outline-success px-4 py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
