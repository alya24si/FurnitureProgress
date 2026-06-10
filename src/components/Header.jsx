import { useState } from 'react';
import {
  FiUser,
  FiHeart,
  FiShoppingCart
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../Reusable/Header';
import Container from '../Reusable/Container';
import Cart from '../Reusable/Cart';

const HeaderSection = () => {
  const [showCart, setShowCart] = useState(false);

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
                  fontWeight: 600
                }}
              >
                Beranda
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                style={styles.navLink}
              >
                Produk
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                style={styles.navLink}
              >
                Tentang Kami
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                style={styles.navLink}
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

          {/* Keranjang */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowCart((prev) => !prev)}
              style={{
                ...styles.icon,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FiShoppingCart />
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
                  Belum ada produk di keranjang.
                </p>

                <Link
                  to="/products"
                  style={styles.cartLink}
                >
                  Mulai Belanja
                </Link>
              </Cart>
            )}
          </div>

          {/* Akun */}
          <Link
            to="/login"
            style={styles.icon}
          >
            <FiUser />
          </Link>

          {/* Login */}
          <Link
            to="/login"
            style={styles.loginBtn}
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register-pilih"
            style={styles.registerBtn}
          >
            Daftar
          </Link>
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
    gap: '40px',
    listStyle: 'none'
  },

  navLink: {
    color: 'var(--text-dark)',
    fontSize: '16px',
    textDecoration: 'none'
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
  }
};

export default HeaderSection;