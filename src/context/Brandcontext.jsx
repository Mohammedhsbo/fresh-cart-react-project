import axios from 'axios';
import React, { createContext } from 'react'


export const BrandContext = createContext();

export default function BrandContextProvider(props) {

    async function brandsget()
    {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`,{
            headers: { token: localStorage.getItem('userToken') }
        })
        .then((res)=>
    {   console.log("Brands fetched",res.data);
        return res.data;
    }).catch((err)=>{
        console.error("Error fetching brands",err);
    });
}  

async function getspecificbrand(id) {
  try {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
      headers: { token: localStorage.getItem('userToken') },
    });

    console.log("Brand fetched", res.data.data);
    return res.data.data; // ✅ رجّع البيانات الفعلية فقط
  } catch (err) {
    console.error("Error fetching brand", err);
    throw err; // ⛔ مهم عشان React Query يعرف إن فيه Error
  }
}

  return (
    <div>
       <BrandContext.Provider value={{ brandsget, getspecificbrand }}>
  {props.children}
</BrandContext.Provider>

    </div>
  )
}
