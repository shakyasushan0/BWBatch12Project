import { BrowserRouter, Routes, Route } from "react-router";
import LayoutPage from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
