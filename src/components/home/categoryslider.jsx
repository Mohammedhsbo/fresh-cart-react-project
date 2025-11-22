import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
         let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
         return data;

    }
    console.log("category data"+data);
    



            var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    
  };
    //   const[categories, setCategories]=React.useState([]);
    // async function getcategories() {
    //     try {
    //          let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    //         //  console.log(data);
    //          setCategories(data.data);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }}
    //     useEffect(() => {
    //         getcategories();
    //     }, []); 
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
