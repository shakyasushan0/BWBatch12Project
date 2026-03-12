import { BrowserRouter, Routes, Route } from "react-router";
import LayoutPage from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import ProductPage from "./pages/ProductPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import { ToastContainer } from "react-toastify";
import PlaceOrderPage from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import PrivatePage from "./pages/PrivatePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";
import OrderListPage from "./pages/admin/OrderListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="" element={<PrivatePage />}>
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="placeorder" element={<PlaceOrderPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="order/:id" element={<OrderPage />} />
          </Route>
          <Route path="admin" element={<AdminPage />}>
            <Route path="orders" element={<OrderListPage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="product/:id/edit" element={<ProductEditPage />} />
          </Route>
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
