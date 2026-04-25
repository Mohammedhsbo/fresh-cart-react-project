import apiClient from '../lib/api';
import React, { createContext } from 'react'
import toast from 'react-hot-toast';

// إنشاء الـ Context
export const CartContext = createContext();


export default function CartContextProvider(props) { 
    
   
     async function getcartitem() {
  try {
    const response = await apiClient.get(`/cart`);
    return response.data; // <-- لازم ترجع الـ data هنا
  } catch (error) {
    console.error("Error fetching cart items", error);
    throw error; // مهم لو عايز React Query تتعامل مع الـ error
  }
}
   
  async function deletefromcart(id)
  {
         return await apiClient.delete(`/cart/${id}`)
  .then((res)=>
{   if(res.data.status==="success")
    {toast.success("Product removed from cart successfully");}
}).catch((err)=>{
    console.error("Error removing product from cart",err);
    toast.error("Failed to remove product from cart");
});
  }

async function updatecart(id,count)
  {
         return await apiClient.put(`/cart/${id}`,{count:count})
  .then((res)=>
{   if(res.data.status==="success")
    {toast.success("Product updated successfully");}
}).catch((err)=>{
    console.error("Error updating product in cart",err);
    toast.error("Failed updating  product in cart");
});
  }

    async function addToCart(id) {
        if (!localStorage.getItem('userToken')) {
            toast.error("Please login to add items to cart");
            return;
        }
        // منطق إضافة المنتج إلى السلة
       return await apiClient.post(`/cart`,{
          productId:id
}).then((response)=>{
    if(response.data.status==="success")
    {toast.success("Product added to cart successfully");}
    else{
        toast.error("Failed to add product to cart");
    }
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
  
