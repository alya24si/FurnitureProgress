import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

import ProductCRM from "./pages/admin/ProductCRM";

// =====================
// Guest Pages
// =====================
const Home = React.lazy(() => import('./pages/guest/Home'));
const Produk = React.lazy(() => import('./pages/guest/Produk'));
const ProductDetail = React.lazy(() => import('./pages/guest/ProductDetail'));
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

// ✅ TAMBAHAN FIX
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
            </Route>

            {/* ===================== */}
            {/* AUTH */}
            {/* ===================== */}
            <Route element={<AuthLayout />}>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/login-customer" element={<LoginCustomer />} />

              {/* 🔥 FIX TAMBAHAN INI */}
              <Route path="/register-pilih" element={<RegisterPilih />} />
              <Route path="/register-admin" element={<RegisterAdmin />} />

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