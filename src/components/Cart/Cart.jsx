import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/Cartcontext';
import { useQuery } from '@tanstack/react-query';

export default function Cart() {
  const [cartitems, setcartitems] = useState([]);
  const { getcartitem,deletefromcart,updatecart } = useContext(CartContext);

  const { isLoading, isError, data,refetch } = useQuery({
    queryKey: ['cart-items'],
    queryFn: getcartitem,
    
  });
  async function refetchdeleted(id) {
  await deletefromcart(id);
  refetch(); // إعادة تحميل البيانات من السيرفر بعد الحذف
}
async function updatecarthere(id,count) {
  await updatecart(id,count);
  refetch(); // إعادة تحميل البيانات من السيرفر بعد التحديث
}
  useEffect(() => {
    if (data) {
      setcartitems(data);
      console.log("The cart:", data);
    }
  }, [data]);

  if (isError) console.log("Error fetching cart items");

  return (
    <div>
      {isLoading ? (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      ) : (
        <div className="table-responsive shadow rounded" style={{width:"1300px"}}>
  <table className="table table-hover align-middle text-nowrap">
    <thead className="table-light">
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Product</th>
        <th scope="col">Qty</th>
        <th scope="col">Price</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {cartitems?.data?.products?.length === 0 && (
        <tr>
          <td colSpan="5" className="text-center fw-bold py-5">
            Your cart is empty
          </td>
        </tr>
      )}

      {cartitems?.data?.products?.map((item) => {
        const product = item.product;
        return (
          <tr key={product._id}>
            <td>
              <img
                src={product.imageCover}
                className="img-fluid rounded"
                style={{ maxWidth: 100 }}
                alt={product.title}
              />
            </td>
            <td className="fw-bold">{product.title}</td>
            <td>
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  type="button"
                  onClick={() => {
                    updatecarthere(product._id, item.count - 1);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control form-control-sm text-center"
                  value={item.count}
                  style={{ width: 60 }}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  type="button"
                  onClick={() => {
                    updatecarthere(product._id, item.count + 1);
                  }}
                >
                  +
                </button>
              </div>
            </td>
            <td className="fw-bold">{item.price} EGP</td>
            <td>
              <button
                onClick={() => {
                  refetchdeleted(product._id);
                }}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
}
