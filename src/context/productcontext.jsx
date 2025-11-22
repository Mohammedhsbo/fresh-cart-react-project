import axios from "axios";
import { createContext } from "react";

export const productcontext=createContext();
export default function CartContextProvider(props)
{
async function getProduct() {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
     console.log("Products fetched", response.data);
    return response.data;

  } catch (err) {
    console.error("Error fetching products", err);
    return null;
  }
}




return(
    <productcontext.Provider value={{getProduct}}>
        {props.children}</productcontext.Provider>
)
}