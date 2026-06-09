import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

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


// =====================
// Auth Pages
// =====================
const Login = React.lazy(() => import('./pages/auth/Login'));

// =====================
// Admin Pages
// =====================
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));

const Customers = React.lazy(() => import('./pages/admin/Customers'));
const CustomerDetail = React.lazy(() => import('./pages/admin/CustomerDetail'));

const Orders = React.lazy(() => import('./pages/admin/Orders'));
const OrderDetail = React.lazy(() => import('./pages/guest/OrderDetail'));

const Users = React.lazy(() => import('./pages/admin/Users'));
const UserDetail = React.lazy(() => import('./pages/admin/UserDetail'));

const SalesReport = React.lazy(() => import('./pages/admin/SalesReport'));

const MembershipCRM = React.lazy(() => import('./pages/admin/MembershipCRM'));
const Feedback = React.lazy(() => import('./pages/admin/Feedback'));
const Analytics = React.lazy(() => import('./pages/admin/Analytics'));
const Campaign = React.lazy(() => import('./pages/admin/Campaign'));

const NotFound = React.lazy(() => import('./pages/NotFound'));

const DiscountClaim = React.lazy(() =>
  import('./pages/guest/DiscountClaim')
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

              <Route
                path="favorite-products"
                element={<FavoriteProducts />}
              />

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              <Route path="membership" element={<Membership />} />

              <Route
                path="return-product"
                element={<ReturnProduct />}
              />

              <Route
                path="payment-method"
                element={<PaymentMethod />}
              />

              <Route
                path="privacy-policy"
                element={<PrivacyPolicy />}
              />

              <Route path="/discount-claim" element={<DiscountClaim />} />
              <Route path="/membership-form" element={<MembershipForm />} />

            </Route>

            {/* ===================== */}
            {/* AUTH */}
            {/* ===================== */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* ===================== */}
            {/* ADMIN */}
            {/* ===================== */}
            <Route element={<AdminLayout />}>

              <Route
                path="/admin/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/admin/customers"
                element={<Customers />}
              />

              <Route
                path="/customers/:id"
                element={<CustomerDetail />}
              />

              <Route
                path="/admin/orders"
                element={<Orders />}
              />

              <Route
                path="/orders/:id"
                element={<OrderDetail />}
              />

              <Route
                path="/users"
                element={<Users />}
              />

              <Route
                path="/users/:abc"
                element={<UserDetail />}
              />

              <Route
                path="/sales-report"
                element={<SalesReport />}
              />

              <Route
                path="/admin/membership-crm"
                element={<MembershipCRM />}
              />

              <Route
                path="/admin/feedback"
                element={<Feedback />}
              />

              <Route
                path="/admin/analytics"
                element={<Analytics />}
              />

              <Route
                path="/admin/campaign"
                element={<Campaign />}
              />

            </Route>

            {/* ===================== */}
            {/* 404 */}
            {/* ===================== */}
            <Route path="*" element={<NotFound />} />

          </Routes>

          {/* WhatsApp Floating */}
          <a
            href="https://wa.me/62895373847425"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
            />
          </a>

        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;