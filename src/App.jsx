import React from "react";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/home/Home.jsx";
import Products from "./components/products/Products.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/categories/Categories.jsx";
import Brands from "./components/brands/Brands.jsx";
import NotFound from "./components/notfound/Notfound.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./context/usercontext.jsx";
import "./App.css";
import ProtectedRoute from "./components/protecredroute/ProtectedRoute.jsx";
import Specificproduct from "./components/products/specificproduct.jsx";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CartContextProvider from "./context/Cartcontext.jsx";
import BrandContextProvider from "./context/Brandcontext.jsx"
import {  Toaster } from 'react-hot-toast';
import Specificbrand from "./components/brands/specificbrand.jsx";
import CategoriesContextProvider from "./context/categoriesContext.jsx";
import Specificcategory from "./components/categories/Specificcategory.jsx";
import Productcontextprovider from "./context/productcontext.jsx";



let queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 🏠 الصفحات المحمية
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "specificproduct/:id", element: <ProtectedRoute><Specificproduct /></ProtectedRoute> },
      { path: "specificbrand/:id", element: <ProtectedRoute><Specificbrand /></ProtectedRoute> },
      { path: "specificcategory/:id", element: <ProtectedRoute><Specificcategory /></ProtectedRoute> },

      // 🔓 الصفحات المفتوحة
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <Productcontextprovider>
       <CategoriesContextProvider >

        <BrandContextProvider>
    <CartContextProvider>
     <QueryClientProvider client={queryClient}>
       <UserContextProvider >
      <RouterProvider router={router} />
       <Toaster />
    </UserContextProvider>
    </QueryClientProvider>
   </CartContextProvider></BrandContextProvider>
    </CategoriesContextProvider>
   
    </Productcontextprovider>
   
  );
}
