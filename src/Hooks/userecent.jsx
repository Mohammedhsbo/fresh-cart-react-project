import apiClient from '../lib/api';
import React from 'react'
import { useQuery } from '@tanstack/react-query';

export default function Userecent() {
    
  async function getrecent(){
    let {data}= await apiClient.get("/products");
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
return response
  
  // {isLoading &&  <h2>Loading...</h2>}
 
}
