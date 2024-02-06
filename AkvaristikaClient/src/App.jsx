import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import TestAdd from "./pages/TestAdd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/allProducts" element={<AllProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/TestAdd" element={<TestAdd />} />
      </Route>
    </Routes>
  );
}

export default App;
