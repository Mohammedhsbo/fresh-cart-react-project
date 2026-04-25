import { useQuery } from '@tanstack/react-query';
import apiClient from '../../lib/api';
import React from 'react'
// import { useEffect } from 'react'
import Slider from "react-slick";


export default function Categoryslider() {
    let {data,isLoading,isError}=useQuery({
        queryKey:['categories'],
        queryFn:getcategories
    })

 {isError && console.log("error")}


    async function getcategories()
    {
         let {data} = await apiClient.get("/categories");
         return data;

    }
    



            var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    
  };
    // Removed dead code
  return (
    <div>  
        {isError && <h3 className='text-danger'>Something went wrong</h3>}
        {!isLoading ? <h3 className='text-success mb-4 fw-bold text-start'>shop Popular category</h3>:null}
         <Slider {...settings}>
            { 
                data?.data?.map((category)=>{
                    return <div key={category._id} className='text-center '>
                        <img src={category.image} alt={category.name} className='categoryimg '/>
                        <h6 className='text-muted'>{category.name}</h6>
                    </div>
                })
}
            
             </Slider>
    </div>
  )
}
