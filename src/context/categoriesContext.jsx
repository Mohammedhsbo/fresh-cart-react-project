import apiClient from '../lib/api';
import React, { createContext } from 'react';

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {

  async function getAllCategory() {
    try {
      const res = await apiClient.get("/categories");
      return res.data;
    } catch (err) {
      console.error("Error fetching categories", err);
      throw err;
    }
  }

  async function getSpecificCategory(id) {
    try {
      const res = await apiClient.get(`/categories/${id}`);
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
