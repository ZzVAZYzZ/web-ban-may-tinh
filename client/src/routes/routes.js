import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import CheckTransactionPage from "../pages/checkTransactionPage/checkTransactionPage";
import Layout from "../components/layout/layout";
import CartPage from "../pages/cartPage/cartPage";
import ProductDetailPage from "../pages/productDetailPage/productDetailPage";
import NoPage from "../pages/notfoundPage/noPage";

export default function MainRoute() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="check-transaction" element={<CheckTransactionPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product-detail" element={<ProductDetailPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }