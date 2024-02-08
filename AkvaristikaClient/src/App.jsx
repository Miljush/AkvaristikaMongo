import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import TestAdd from "./pages/TestAdd";
import SelectAdd from "./pages/SelectAdd";
import AddAkvarijum from "./pages/AddAkvarijum";
import LoginRegister from "./pages/LoginRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/allProducts" element={<AllProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/TestAdd" element={<TestAdd />} />
        <Route path="/SelectAdd" element={<SelectAdd />} />
        <Route path="/AddAquarium" element={<AddAkvarijum />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
      </Route>
    </Routes>
  );
}

export default App;
