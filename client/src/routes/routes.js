import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import CheckTransactionPage from "../pages/checkTransactionPage/checkTransactionPage";
import Layout from "../components/layout/layout";
import CartPage from "../pages/cartPage/cartPage";
import ProductDetailPage from "../pages/productDetailPage/productDetailPage";
import NoPage from "../pages/notfoundPage/noPage";
import ProductsPage from "../pages/productsPage/productsPage";
import CartSection from "../pages/cartPage/pages/cartSection";
import UserInformationSection from "../pages/cartPage/pages/userInformationSection";
import PaymentMethodSection from "../pages/cartPage/pages/paymentMethodSection";
import VisaSection from "../pages/cartPage/pages/visaSection";
import CheckBillSection from "../pages/cartPage/pages/checkBillSection";
import FinishTransaction from "../pages/cartPage/pages/finishTransaction";
import LoginPage from "../pages/loginPage/loginPage";
import AdminPage from "../pages/adminPage/adminPage";
import UserPage from "../pages/userPage/userPage";

export default function MainRoute() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="check-transaction" element={<CheckTransactionPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="cart" element={<CartPage />} >
              <Route index element={<CartSection />} />
              <Route path="user-information-section" element={<UserInformationSection />} />
              <Route path="payment-method-section" element={<PaymentMethodSection />} />
              <Route path="check-bill-section" element={<CheckBillSection />} />
              <Route path="finish-transaction" element={<FinishTransaction />} />
            </Route>
            <Route path="visa-section" element={<VisaSection />} />
            <Route path="product-detail/:productId" element={<ProductDetailPage />} />
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }