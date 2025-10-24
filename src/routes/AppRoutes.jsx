import { Routes, Route } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import ProductDetail from "../components/product/ProductDetail";
import Footer from "../components/layout/Footer";
import Services from "../components/pages/Services";
import Contact from "../components/pages/Contact";
import Login from "../components/auth/Login";
import Pay from "../components/cart/Pay";
import Cart from "../components/cart/Cart";
import ProtectedRoute from "../components/auth/ProtectedRoute";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Cart /><ProductList /><Footer /></>} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pagar" element={<ProtectedRoute><Pay /></ProtectedRoute>} />
    </Routes>
  );
}