import apiClient from '../lib/api';
import React, { createContext } from 'react'


export const BrandContext = createContext();

export default function BrandContextProvider(props) {

    async function brandsget()
    {
        return await apiClient.get(`/brands`)
        .then((res)=>
    {   return res.data;
    }).catch((err)=>{
        console.error("Error fetching brands",err);
    });
}  

async function getspecificbrand(id) {
  try {
    const res = await apiClient.get(`/brands/${id}`);

    return res.data.data; // ✅ رجّع البيانات الفعلية فقط
  } catch (err) {
    console.error("Error fetching brand", err);
    throw err; // ⛔ مهم عشان React Query يعرف إن فيه Error
  }
}

  return (
    <>
       <BrandContext.Provider value={{ brandsget, getspecificbrand }}>
  {props.children}
</BrandContext.Provider>

    </>
  )
}
