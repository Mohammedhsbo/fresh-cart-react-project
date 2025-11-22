import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom'; // ✅ لازم تستورده لأنك بتستخدم <Link>
 
export default function Relatedproduct({categoryName, currentId}) {
  const [products, setProducts] = React.useState([]);
    let { id} = useParams();   

  async function getrelatedproducts() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products `);
      console.log(data.data);
      const filterded=data.data.filter((p)=> p.category.name===categoryName && p._id!==currentId);
      setProducts(filterded);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
  // Scroll to top when component mounts or updates
    if (categoryName) {
      getrelatedproducts();
    }
  }, [categoryName,currentId]);

  return (
    <div className="container my-5">
      {products.length > 0 && <h1 className="text-success mb-4 fw-bold">Related products</h1>}

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-3 mb-4">
            <div className="product border rounded-3 shadow-sm h-100 p-3">
            <Link to={`/specificproduct/${product._id}`} className="text-decoration-none text-black">

                <img
                  src={product.imageCover}
                  className="w-100 rounded mb-3"
                  alt={product.title}
                />
                <h6 className="text-success">{product.category.name}</h6>
                <h5>{product.title.slice(0, 25)}</h5>
                <p className="text-muted small">{product.description.slice(0, 60)}...</p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="text-success fw-bold">{product.price} EGP</h6>
                  <button className="btn btn-outline-success btn-sm">Add to cart</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
