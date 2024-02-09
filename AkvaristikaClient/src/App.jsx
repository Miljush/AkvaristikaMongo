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
import ItemPage from "./pages/ItemPage";
import { AppProvider } from "./context/AppContext";
import { UserContextProvider } from "./context/UserContext";
import AddFish from "./pages/AddFish";
import AddPlant from "./pages/AddPlant";
import AddEquipment from "./pages/AddEquipment";
import Orders from "./pages/Orders";
function App() {
  return (
    <UserContextProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/allProducts" element={<AllProductsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/TestAdd" element={<TestAdd />} />
            <Route path="/SelectAdd" element={<SelectAdd />} />
            <Route path="/AddAquarium" element={<AddAkvarijum />} />
            <Route path="/AddFish" element={<AddFish />} />
            <Route path="/AddPlant" element={<AddPlant />} />
            <Route path="/Orders" element={<Orders/>}/>
            <Route path="/AddEquipment" element={<AddEquipment />} />
            <Route path="/LoginRegister" element={<LoginRegister />} />
            <Route path="/item/:id" element={<ItemPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </UserContextProvider>
  );
}

export default App;
