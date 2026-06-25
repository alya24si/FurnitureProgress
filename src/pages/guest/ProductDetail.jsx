import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../Reusable/Container";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Dummy data produk berdasarkan productId
  const products = {
    "prod-001": {
      id: "prod-001",
      name: "Sofa Premium Scandinavian",
      price: 5500000,
      category: "Ruang Tamu",
      image: "/assets/images/sofa.png",
      description:
        "Sofa premium dengan desain Scandinavian modern yang elegan. Dilengkapi dengan bahan kain berkualitas tinggi dan rangka kayu solid untuk ketahanan maksimal.",
    },
    "prod-002": {
      id: "prod-002",
      name: "Meja Makan Kayu Jati",
      price: 3200000,
      category: "Ruang Makan",
      image: "/assets/images/meja-makan.png",
      description:
        "Meja makan terbuat dari kayu jati pilihan dengan finishing natural. Cocok untuk ruang makan keluarga dengan kapasitas 6 orang.",
    },
    "prod-003": {
      id: "prod-003",
      name: "Lemari Minimalis 3 Pintu",
      price: 4700000,
      category: "Kamar Tidur",
      image: "/assets/images/lemari.png",
      description:
        "Lemari pakaian 3 pintu dengan desain minimalis modern. Dilengkapi dengan cermin dan laci penyimpanan yang luas.",
    },
    "prod-004": {
      id: "prod-004",
      name: "Kasur King Size Premium",
      price: 8750000,
      category: "Kamar Tidur",
      image: "/assets/images/kasur.png",
      description:
        "Kasur king size premium dengan teknologi spring bed terkini. Memberikan kenyamanan tidur optimal untuk Anda dan pasangan.",
    },
    "prod-005": {
      id: "prod-005",
      name: "Rak Buku Dinding",
      price: 900000,
      category: "Ruang Kerja",
      image: "/assets/images/rak.png",
      description:
        "Rak buku dinding minimalis dengan desain modern. Cocok untuk mempercantik ruang kerja atau ruang tamu Anda.",
    },
    "prod-006": {
      id: "prod-006",
      name: "Lampu Gantung Kristal",
      price: 2400000,
      category: "Ruang Tamu",
      image: "/assets/images/lampu.png",
      description:
        "Lampu gantung kristal mewah yang memberikan kesan elegan pada ruangan Anda. Dilengkapi dengan LED hemat energi.",
    },
  };

  const product = products[id] || products["prod-001"];

  // Cek apakah ada parameter action=buy-again
  useEffect(() => {
    if (searchParams.get("action") === "buy-again") {
      // Scroll ke tombol beli atau tampilkan notifikasi
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const handleBuyNow = () => {
    navigate(`/checkout?productId=${id}&qty=1&name=${encodeURIComponent(product.name)}&price=${product.price}`);
  };

  const handleAddToCart = () => {
    alert(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleBack = () => {
    // Jika datang dari "buy-again", kembali ke member orders
    if (searchParams.get("action") === "buy-again") {
      navigate("/member/orders");
    } else {
      // Jika dari produk biasa, kembali ke daftar produk
      navigate("/products");
    }
  };

  return (
    <div style={styles.wrapper}>
      <Container>
        {/* Tombol Kembali */}
        <button style={styles.backButton} onClick={handleBack}>
          ← Kembali
        </button>

        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <span style={styles.breadcrumbLink} onClick={() => navigate("/")}>
            Beranda
          </span>
          <span style={styles.breadcrumbSep}>/</span>
          <span style={styles.breadcrumbLink} onClick={() => navigate("/products")}>
            Produk
          </span>
          <span style={styles.breadcrumbSep}>/</span>
          <span style={styles.breadcrumbCurrent}>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div style={styles.productCard}>
          <div style={styles.imageBox}>
            <div style={styles.imagePlaceholder}>🛋️</div>
          </div>

          <div style={styles.infoBox}>
            <span style={styles.category}>{product.category}</span>
            <h1 style={styles.title}>{product.name}</h1>
            <h2 style={styles.price}>Rp {product.price.toLocaleString()}</h2>
            <p style={styles.description}>{product.description}</p>

            <div style={styles.features}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span>Garansi Resmi 1 Tahun</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span>Gratis Ongkir</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span>Pengiriman Cepat</span>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button style={styles.btnBuy} onClick={handleBuyNow}>
                Beli Sekarang
              </button>
              <button style={styles.btnCart} onClick={handleAddToCart}>
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#F9FAFB",
    padding: "40px 0",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // ✅ STYLE BARU: TOMBOL KEMBALI
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#4B5563",
    cursor: "pointer",
    marginBottom: "16px",
    transition: "all 0.2s",
  },
  
  breadcrumb: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginBottom: "24px",
  },
  breadcrumbLink: {
    color: "#6B7280",
    cursor: "pointer",
  },
  breadcrumbSep: {
    margin: "0 8px",
  },
  breadcrumbCurrent: {
    color: "#B76E79",
    fontWeight: "600",
  },
  productCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  imageBox: {
    background: "#FDF2F4",
    borderRadius: "16px",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    fontSize: "120px",
  },
  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  category: {
    color: "#B76E79",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: 1.3,
  },
  price: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "700",
    color: "#B76E79",
  },
  description: {
    margin: 0,
    fontSize: "15px",
    color: "#6B7280",
    lineHeight: 1.7,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    background: "#F9FAFB",
    borderRadius: "12px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#374151",
  },
  featureIcon: {
    color: "#10B981",
    fontWeight: "700",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  btnBuy: {
    flex: 1,
    padding: "16px 28px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnCart: {
    flex: 1,
    padding: "16px 28px",
    background: "#fff",
    color: "#B76E79",
    border: "2px solid #B76E79",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ProductDetail;