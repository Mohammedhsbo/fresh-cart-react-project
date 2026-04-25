
import  React from 'react';
//  import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

 import Userecent from '../../Hooks/userecent.jsx';
import { CartContext } from '../../context/Cartcontext.jsx';

export default function Recentproducts() {
     let{addToCart}=React.useContext(CartContext);
     
        var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
      autoplay: true,
    autoplaySpeed: 1500,
  };
  let {data,isLoading}=Userecent();

  return (
    <div className='row w-100 my-5'>
      { isLoading && <div className="spinner ">
  <div className="bounce1"></div>
  <div className="bounce2"></div>
  <div className="bounce3"></div>
</div>}
       {data?.data?.length>0 ? <h1 className='text-success mb-4 fw-bold '> products</h1>:null}
           {data?.data?.map((product) => (
        <div key={product._id} className='col-md-3 mb-4'>
          <div className='product  m-2 border h-100  px-3 w-100'>
            <Link className='text-decoration-none text-black ' to={`/specificproduct/${product._id}`}>
              <Slider {...settings} >
                   {product?.images.map((url, index)=>{
                    return   <img
                  key={index}
                  src={url}
                  className="w-100 rounded "
                  alt={product.title}
                />
                   })}
                 </Slider>
            
            <h6 className='text-success mt-5'>{product.category.name}</h6>
            <h2>{product.title.slice(0, 20)}</h2>
            <p>{product.description.slice(0, 60)}</p>
           
            <div className='d-flex justify-content-between align-items-center '>
            <h6>{product.price} EGP</h6>
            <h6>{product.ratingsAverage}<i className="fa-solid fa-star text-warning mx-1 mt-2" ></i></h6></div>
            </Link>
            <button className='btn btn-success w-100 my-3' onClick={()=>{addToCart(product.id)}} >  Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
   
     
  );
}
