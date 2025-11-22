import axios from 'axios';
import React, { createContext } from 'react'
import toast from 'react-hot-toast';

// إنشاء الـ Context
export const CartContext = createContext();


export default function CartContextProvider(props) { 
    
   
     async function getcartitem() {
  try {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token: localStorage.getItem('userToken') }
    });
    console.log("Cart items fetched", response.data);
    return response.data; // <-- لازم ترجع الـ data هنا
  } catch (error) {
    console.error("Error fetching cart items", error);
    throw error; // مهم لو عايز React Query تتعامل مع الـ error
  }
}
   
  async function deletefromcart(id)
  {
         return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{
        token:localStorage.getItem('userToken')
  }})
  .then((res)=>
{   console.log("Product removed from cart",res.data);
    if(res.data.status==="success")
    {toast.success("Product removed from cart successfully");}
}).catch((err)=>{
    console.error("Error removing product from cart",err);
    toast.error("Failed to remove product from cart");
});
  }

async function updatecart(id,count)
  {
         return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{
    headers:{
        token:localStorage.getItem('userToken')
  }})
  .then((res)=>
{   console.log("Product upadte from cart",res.data);
    if(res.data.status==="success")
    {toast.success("Product updated successfully");}
}).catch((err)=>{
    console.error("Error updating product in cart",err);
    toast.error("Failed updating  product in cart");
});
  }

    async function addToCart(id) {
        // منطق إضافة المنتج إلى السلة
       return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
          productId:id
},{
    headers:{
        token:localStorage.getItem('userToken')

    }
}).then((response)=>{
    if(response.data.status==="success")
    {toast.success("Product added to cart successfully");}
    else{
        toast.error("Failed to add product to cart");
    }
    console.log("Product added to cart",response.data);
}).catch((error)=>{
    console.error("Error adding product to cart",error);
});
    }
  return (
    <CartContext.Provider value={{addToCart,getcartitem,deletefromcart,updatecart}}>
      {props.children}
    </CartContext.Provider>
  );
};
  
