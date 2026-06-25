import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import MemberLayout from './layouts/MemberLayout';

import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

import ProductCRM from "./pages/admin/ProductCRM";
// import Checkout from "./pages/member/Checkout"; // ❌ HAPUS INI (akan pakai lazy loading)
// import ProductDetail from "./pages/guest/ProductDetail"; // ❌ HAPUS INI (sudah ada di bawah)

// =====================
// Guest Pages
// =====================
const Home = React.lazy(() => import('./pages/guest/Home'));
const Produk = React.lazy(() => import('./pages/guest/Produk'));
const ProductDetail = React.lazy(() => import('./pages/guest/ProductDetail')); // ✅ INI YANG DIPAKAI
const FavoriteProducts = React.lazy(() => import('./pages/guest/FavoriteProducts'));

const About = React.lazy(() => import('./pages/guest/About'));
const Contact = React.lazy(() => import('./pages/guest/Contact'));

const Membership = React.lazy(() => import('./pages/guest/Membership'));
const PaymentMethod = React.lazy(() => import('./pages/guest/PaymentMethod'));
const ReturnProduct = React.lazy(() => import('./pages/guest/ReturnProduct'));
const PrivacyPolicy = React.lazy(() => import('./pages/guest/PrivacyPolicy'));

const MembershipForm = React.lazy(() =>
  import("./pages/guest/MembershipForm")
);

const FavoriteProductDetail = React.lazy(() =>
  import('./pages/guest/FavoriteProductDetail')
);

const DiscountClaim = React.lazy(() =>
  import('./pages/guest/DiscountClaim')
);

// =====================
// Auth Pages
// =====================
const Login = React.lazy(() =>
  import('./pages/auth/Login')
);

const Register = React.lazy(() =>
  import('./pages/auth/RegisterCustomer')
);

const LoginAdmin = React.lazy(() =>
  import('./pages/admin/LoginAdmin')
);

const LoginCustomer = React.lazy(() =>
  import('./pages/guest/LoginCustomer')
);

const RegisterPilih = React.lazy(() =>
  import("./pages/auth/RegisterPilih")
);

const RegisterAdmin = React.lazy(() =>
  import("./pages/auth/RegisterAdmin")
);

// =====================
// Admin Pages
// =====================
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));

const Customers = React.lazy(() =>
  import('./pages/admin/CustomerCRM')
);

const CustomerDetail = React.lazy(() =>
  import('./pages/admin/CustomerDetail')
);

const OrderDetail = React.lazy(() =>
  import('./pages/guest/OrderDetail')
);

const Users = React.lazy(() =>
  import('./pages/admin/Users')
);

const UserDetail = React.lazy(() =>
  import('./pages/admin/UserDetail')
);

const SalesReport = React.lazy(() =>
  import('./pages/admin/SalesReport')
);

const MembershipCRM = React.lazy(() =>
  import('./pages/admin/MembershipCRM')
);

const Feedback = React.lazy(() =>
  import('./pages/admin/Feedback')
);

const Analytics = React.lazy(() =>
  import('./pages/admin/MembershipAnalytics')
);

const Campaign = React.lazy(() =>
  import('./pages/admin/Campaign')
);

const MembershipDetail = React.lazy(() =>
  import('./pages/admin/MembershipDetail')
);

const MembershipDiscount = React.lazy(() =>
  import('./pages/admin/MembershipDiscount')
);

const NotFound = React.lazy(() =>
  import('./pages/NotFound')
);

const CustomFurnitureCustomer = React.lazy(() =>
  import('./pages/guest/CustomFurnitureCustomer')
);

const CustomFurnitureAdmin = React.lazy(() =>
  import('./pages/admin/CustomFurnitureAdmin')
);

// =====================
// Member Pages
// =====================
const MemberDashboard = React.lazy(() =>
  import("./pages/member/MemberDashboard")
);

const MemberOrders = React.lazy(() =>
  import("./pages/member/MemberOrders")
);

const MemberRewards = React.lazy(() =>
  import("./pages/member/MemberRewards")
);

const MemberVoucher = React.lazy(() =>
  import("./pages/member/MemberVoucher")
);

const MemberHistory = React.lazy(() =>
  import("./pages/member/MemberHistory")
);

const MemberProfile = React.lazy(() =>
  import("./pages/member/MemberProfile")
);

// ✅ TAMBAHKAN INI:
const Checkout = React.lazy(() =>
  import("./pages/member/Checkout")
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>

          <Routes>

            {/* ===================== */}
            {/* GUEST */}
            {/* ===================== */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Produk />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="favorite-products" element={<FavoriteProducts />} />
              <Route path="favorite-products/:id" element={<FavoriteProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="membership" element={<Membership />} />
              <Route path="return-product" element={<ReturnProduct />} />
              <Route path="payment-method" element={<PaymentMethod />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="discount-claim" element={<DiscountClaim />} />
              <Route path="membership-form" element={<MembershipForm />} />
              <Route path="custom-furniture" element={<CustomFurnitureCustomer />} />
            </Route>

            {/* ===================== */}
            {/* AUTH */}
            {/* ===================== */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/login-customer" element={<LoginCustomer />} />
              <Route path="/register-pilih" element={<RegisterPilih />} />
              <Route path="/register-admin" element={<RegisterAdmin />} />
            </Route>

            {/* ===================== */}
            {/* MEMBER */}
            {/* ===================== */}
            <Route element={<MemberLayout />}>
              <Route path="/member/dashboard" element={<MemberDashboard />} />
              <Route path="/member/orders" element={<MemberOrders />} />
              <Route path="/member/rewards" element={<MemberRewards />} />
              <Route path="/member/vouchers" element={<MemberVoucher />} />
              <Route path="/member/history" element={<MemberHistory />} />
              <Route path="/member/profile" element={<MemberProfile />} />
              
              {/* ✅ TAMBAHKAN ROUTE INI: */}
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* ===================== */}
            {/* ADMIN */}
            {/* ===================== */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/:id" element={<UserDetail />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/admin/membership-crm" element={<MembershipCRM />} />
              <Route path="/admin/membership-crm/:id" element={<MembershipDetail />} />
              <Route path="/admin/membership-discount" element={<MembershipDiscount />} />
              <Route path="/admin/product-crm" element={<ProductCRM />} />
              <Route path="/admin/feedback" element={<Feedback />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/campaign" element={<Campaign />} />
              <Route path="/admin/custom-furniture" element={<CustomFurnitureAdmin />} />
            </Route>

            {/* ===================== */}
            {/* 404 */}
            {/* ===================== */}
            <Route path="*" element={<NotFound />} />

          </Routes>

        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;