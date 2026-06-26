import { useState, useEffect } from 'react';
import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiLogOut
} from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Reusable/Header';
import Container from '../Reusable/Container';
import Cart from '../Reusable/Cart';
import { supabase } from '../services/supabase';

const HeaderSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  const handleLogout = async () => {
    if (!confirm("Yakin ingin logout?")) return;

    try {
      await supabase.auth.signOut();
      
      localStorage.removeItem("customer");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("selectedProduct");
      localStorage.removeItem("redirectAfterLogin");

      setCustomer(null);
      setCartCount(0);

      alert("Logout berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Header style={styles.header}>
      <Container style={styles.container}>

        {/* Logo */}
        <div style={styles.logo}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#6E39CB',
              fontWeight: '700'
            }}
          >
            <h2>FurnitureKu</h2>
          </Link>
        </div>

        {/* Menu */}
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li>
              <Link
                to="/"
                style={{
                  ...styles.navLink,
                  fontWeight: isActive('/') ? 700 : 400,
                  color: isActive('/') ? '#6E39CB' : 'var(--text-dark)',
                }}
              >
                Beranda
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                style={{
                  ...styles.navLink,
                  fontWeight: isActive('/products') ? 700 : 400,
                  color: isActive('/products') ? '#6E39CB' : 'var(--text-dark)',
                }}
              >
                Produk
              </Link>
            </li>

            {/* ✅ PERBAIKAN: SELALU ke /custom-furniture */}
            <li>
              <Link
                to="/custom-furniture"
                style={{
                  ...styles.navLink,
                  fontWeight: isActive('/custom-furniture') ? 700 : 400,
                  color: isActive('/custom-furniture') ? '#6E39CB' : 'var(--text-dark)',
                }}
              >
                Custom Furniture
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                style={{
                  ...styles.navLink,
                  fontWeight: isActive('/about') ? 700 : 400,
                  color: isActive('/about') ? '#6E39CB' : 'var(--text-dark)',
                }}
              >
                Tentang Kami
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                style={{
                  ...styles.navLink,
                  fontWeight: isActive('/contact') ? 700 : 400,
                  color: isActive('/contact') ? '#6E39CB' : 'var(--text-dark)',
                }}
              >
                Kontak
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icon Menu */}
        <div style={styles.icons}>

          {/* Favorit */}
          <Link
            to="/favorite-products"
            style={styles.icon}
          >
            <FiHeart />
          </Link>

          {/* Keranjang dengan Badge */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowCart((prev) => !prev)}
              style={{
                ...styles.icon,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span style={styles.cartBadge}>{cartCount}</span>
              )}
            </button>

            {showCart && (
              <Cart style={styles.cartPanel}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: 700
                  }}
                >
                  Keranjang Belanja
                </h4>

                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'var(--text-light)'
                  }}
                >
                  {cartCount > 0 
                    ? `${cartCount} produk di keranjang` 
                    : 'Belum ada produk di keranjang.'}
                </p>

                <Link
                  to="/cart"
                  style={styles.cartLink}
                >
                  {cartCount > 0 ? 'Lihat Keranjang' : 'Mulai Belanja'}
                </Link>
              </Cart>
            )}
          </div>

          {/* KONDISIONAL: Jika sudah login atau belum */}
          {customer ? (
            <>
              <Link
                to="/member/dashboard"
                style={styles.profileBtn}
              >
                <FiUser />
                <span style={styles.profileName}>
                  {customer.full_name || customer.email}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={styles.icon}
              >
                <FiUser />
              </Link>

              <Link
                to="/login"
                style={styles.loginBtn}
              >
                Login
              </Link>

              <Link
                to="/register-pilih"
                style={styles.registerBtn}
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </Container>
    </Header>
  );
};

const styles = {
  header: {
    padding: '24px 0',
    backgroundColor: 'var(--bg-color)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontWeight: 'bold',
    fontSize: '24px'
  },

  nav: {
    display: 'flex'
  },

  navList: {
    display: 'flex',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  navLink: {
    color: 'var(--text-dark)',
    fontSize: '15px',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },

  icon: {
    color: 'var(--text-dark)',
    fontSize: '20px',
    cursor: 'pointer',
    textDecoration: 'none'
  },

  loginBtn: {
    textDecoration: 'none',
    color: '#6E39CB',
    fontWeight: '600'
  },

  registerBtn: {
    textDecoration: 'none',
    background: '#6E39CB',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '600'
  },

  cartPanel: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    minWidth: '240px',
    background: 'var(--bg-card)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    zIndex: 1100,
    padding: '16px'
  },

  cartLink: {
    display: 'inline-block',
    marginTop: '10px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#6E39CB',
    textDecoration: 'none'
  },

  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#EF4444',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '700',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: '#FDF2F4',
    color: '#B76E79',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },

  profileName: {
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#fff',
    color: '#DC2626',
    border: '2px solid #DC2626',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

export default HeaderSection;