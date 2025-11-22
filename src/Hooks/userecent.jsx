import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query';

export default function Userecent() {
    
  async function getrecent(){
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    // setProducts(data.data);
    return data;
  }
  let response=useQuery({
    queryKey: ['recent-products'],
    queryFn: getrecent,
    staleTime:5000,
    retry:4,
    
    // retryDelay:200,
}
)
console.log("recdata"+response);
return response
  
  // {isLoading &&  <h2>Loading...</h2>}
 
}
