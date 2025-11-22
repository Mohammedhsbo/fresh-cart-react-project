import axios from 'axios';
import React, { createContext } from 'react';

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {

  async function getAllCategory() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories", {
        headers: { token: localStorage.getItem("userToken") },
      });
      console.log("Categories fetched", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching categories", err);
      throw err;
    }
  }

  async function getSpecificCategory(id) {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      });
      console.log("Category fetched", res.data.data);
      return res.data.data;
    } catch (err) {
      console.error("Error fetching category", err);
      throw err;
    }
  }

  return (
    <CategoriesContext.Provider value={{ getAllCategory, getSpecificCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}
