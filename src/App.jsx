import React from "react";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/home/Home.jsx";
import Products from "./components/products/Products.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/categories/Categories.jsx";
import Brands from "./components/brands/Brands.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import Orders from "./components/orders/Orders.jsx";
import OrderDetails from "./components/orders/OrderDetails.jsx";
import NotFound from "./components/notfound/Notfound.jsx";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";



let queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 🏠 الصفحات المحمية
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "my-orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "my-orders/:id", element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },
      { path: "allorders", element: <Navigate to="/my-orders" replace /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "specificproduct/:id", element: <Specificproduct /> },
      { path: "specificbrand/:id", element: <Specificbrand /> },
      { path: "specificcategory/:id", element: <Specificcategory /> },

      // 🔓 الصفحات المفتوحة
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <Productcontextprovider>
              <CategoriesContextProvider>
                <BrandContextProvider>
                  <RouterProvider router={router} />
                  <Toaster />
                </BrandContextProvider>
              </CategoriesContextProvider>
            </Productcontextprovider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
