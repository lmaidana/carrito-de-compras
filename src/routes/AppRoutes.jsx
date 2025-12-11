
import { Routes, Route } from "react-router-dom";
import HomeWithCart from "../components/layout/HomeWithCart";
import ProductDetail from "../components/product/ProductDetail";
import Services from "../components/pages/Services";
import Contact from "../components/pages/Contact";
import Login from "../components/auth/Login";
import Pay from "../components/cart/Pay";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import CreateProduct from "../components/product/CreateProduct";
import EditProduct from "../components/product/EditProduct";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeWithCart />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pagar" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
      <Route path="/productos/crear" element={<AdminRoute><CreateProduct /></AdminRoute>} />
      <Route path="/productos/editar/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
    </Routes>
  );
}