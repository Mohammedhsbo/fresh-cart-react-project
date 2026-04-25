import apiClient from '../../lib/api';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Relatedproduct from './Relatedproduct';
import Slider from "react-slick";
import { CartContext } from '../../context/Cartcontext';
import toast from 'react-hot-toast';

export default function Specificproduct() {
    
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let {addToCart}=useContext(CartContext);

  async function getproductdetails() {
    try {
      const { data } = await apiClient.get(`/products/${id}`);
      setProduct(data.data);
    } catch (err) {
      toast.error("Failed loading product details");
    }
  }

  useEffect(() => {
      const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
    getproductdetails();
  }, [id]);

  return (
    <>
      <div className="container py-5">
        {!product ? (
          <h3 className="text-center text-muted">Loading product details...</h3>
        ) : (
          <>
            <h1 className="text-success fw-bold text-center mb-5">
              {product.title}
            </h1>

            <div className="row align-items-center justify-content-center">
              <div className="col-md-4">
                  <Slider {...settings}>
                   {product?.images.map((url, index)=>{
                    return   <img
                  key={index}
                  src={url}
                  className="w-100 rounded "
                  alt={product.title}
                />
                   })}
                 </Slider>
              
              </div>

              <div className="col-md-6 text-start ms-4">
                <h2 className="text-success mb-3">{product?.category?.name}</h2>
                <h4>{product.title}</h4>
                <p className="my-3 fs-5 text-muted w-75">{product.description}</p>
                  <div className="d-flex align-items-center justify-content-between mt-4 w-75">
                    <h4 className="fw-bold text-success">{product.price} EGP</h4>
                <h5>
                  {product.ratingsAverage}
                  <i className="fa-solid fa-star text-warning ms-1"></i>
                </h5>
                  </div>
                  <button className='mt-4 btn btn-success w-75' onClick={() => addToCart(product._id)}>
  Add to cart
</button>
 
              </div>
            </div>
          </>
        )}


      </div> 
      <Relatedproduct categoryName={product?.category?.name} CurrentId={id}/>
    </>
  );
}
