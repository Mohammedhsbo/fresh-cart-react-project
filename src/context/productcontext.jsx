import apiClient from "../lib/api";
import { createContext } from "react";

export const productcontext=createContext();
export default function ProductContextProvider(props)
{
async function getProduct() {
  try {
    const response = await apiClient.get(
      `/products`
    );
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