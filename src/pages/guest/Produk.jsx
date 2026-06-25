import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

function Produk() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // ✅ State untuk jumlah cart

  // Data produk furniture lokal
  const furnitureData = [
    {
      id: 1,
      title: "Sofa Premium Scandinavian",
      description: "Sofa premium dengan desain Scandinavian modern yang elegan. Dilengkapi dengan bahan kain berkualitas tinggi dan rangka kayu solid untuk ketahanan maksimal.",
      price: 367,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop",
      category: "Ruang Tamu"
    },
    {
      id: 2,
      title: "Meja Makan Kayu Jati",
      description: "Meja makan terbuat dari kayu jati pilihan dengan finishing natural. Cocok untuk ruang makan keluarga dengan kapasitas 6 orang.",
      price: 213,
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=400&fit=crop",
      category: "Ruang Makan"
    },
    {
      id: 3,
      title: "Lemari Minimalis 3 Pintu",
      description: "Lemari pakaian 3 pintu dengan desain minimalis modern. Dilengkapi dengan cermin dan laci penyimpanan yang luas.",
      price: 313,
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=500&h=400&fit=crop",
      category: "Kamar Tidur"
    },
    {
      id: 4,
      title: "Kasur King Size Premium",
      description: "Kasur king size premium dengan teknologi spring bed terkini. Memberikan kenyamanan tidur optimal untuk Anda dan pasangan.",
      price: 583,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop",
      category: "Kamar Tidur"
    },
    {
      id: 5,
      title: "Rak Buku Dinding",
      description: "Rak buku dinding minimalis dengan desain modern. Cocok untuk mempercantik ruang kerja atau ruang tamu Anda.",
      price: 60,
      image: "https://images.unsplash.com/photo-1594620302200-9a762248a42c?w=500&h=400&fit=crop",
      category: "Ruang Kerja"
    },
    {
      id: 6,
      title: "Lampu Gantung Kristal",
      description: "Lampu gantung kristal mewah yang memberikan kesan elegan pada ruangan Anda. Dilengkapi dengan LED hemat energi.",
      price: 160,
      image: "https://images.unsplash.com/photo-1543531375-6280058bb169?w=500&h=400&fit=crop",
      category: "Ruang Tamu"
    },
    {
      id: 7,
      title: "Kursi Kerja Ergonomis",
      description: "Kursi kerja dengan desain ergonomis untuk kenyamanan maksimal saat bekerja. Dilengkapi dengan sandaran kepala dan lengan yang dapat disesuaikan.",
      price: 267,
      image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&h=400&fit=crop",
      category: "Ruang Kerja"
    },
    {
      id: 8,
      title: "Meja Kopi Modern",
      description: "Meja kopi dengan desain modern dan minimalis. Terbuat dari kayu solid dengan finishing yang halus dan elegan.",
      price: 133,
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&h=400&fit=crop",
      category: "Ruang Tamu"
    },
    {
      id: 9,
      title: "Tempat Tidur Minimalis",
      description: "Tempat tidur minimalis dengan desain modern dan simple. Terbuat dari kayu berkualitas dengan finishing yang rapi.",
      price: 400,
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=400&fit=crop",
      category: "Kamar Tidur"
    },
    {
      id: 10,
      title: "Lemari Dapur Modern",
      description: "Lemari dapur modern dengan desain yang fungsional dan elegan. Dilengkapi dengan laci dan rak penyimpanan yang luas.",
      price: 467,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop",
      category: "Dapur"
    },
    {
      id: 11,
      title: "Sofa Bed Modern",
      description: "Sofa bed yang dapat diubah menjadi tempat tidur. Cocok untuk ruangan terbatas atau ruang tamu yang multifungsi.",
      price: 300,
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=400&fit=crop",
      category: "Ruang Tamu"
    },
    {
      id: 12,
      title: "Meja Rias Minimalis",
      description: "Meja rias minimalis dengan cermin dan laci penyimpanan. Dilengkapi dengan lampu LED untuk kenyamanan saat berdandan.",
      price: 233,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=400&fit=crop",
      category: "Kamar Tidur"
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(furnitureData);
      setLoading(false);
    }, 500);

    // ✅ Load cart count dari localStorage
    updateCartCount();
  }, []);

  // ✅ Fungsi untuk update jumlah cart
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ FUNGSI BARU: Tambah ke Keranjang (untuk Guest & Member)
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Cek apakah produk sudah ada di cart
    const existingIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Jika sudah ada, tambah quantity
      existingCart[existingIndex].quantity += 1;
    } else {
      // Jika belum ada, tambah produk baru
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    updateCartCount();
    
    alert(`✓ ${product.title} ditambahkan ke keranjang!`);
  };

    // ✅ FUNGSI BARU: Beli Sekarang (Semua user ke guest-checkout)
  const handleBuyNow = (product) => {
    // 1. Tambahkan produk ke cart
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    updateCartCount();

    // 2. ✅ SEMUA USER (Guest & Member) → ke guest-checkout
    navigate("/guest-checkout");
  };

  // ✅ FUNGSI BARU: Lihat Keranjang
  const handleViewCart = () => {
    const customer = localStorage.getItem("customer");
    
    if (!customer) {
      localStorage.setItem("redirectAfterLogin", "/cart");
      alert("Silahkan login terlebih dahulu untuk melihat keranjang!");
      navigate("/login-customer");
      return;
    }
    
    navigate("/cart");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Katalog Produk</h1>
        <p style={styles.pageSubtitle}>Temukan furniture terbaik untuk rumah impian Anda</p>
      </div>

      {/* ✅ Tombol Keranjang di Atas */}
      <div style={styles.cartButtonContainer}>
        <button style={styles.cartButton} onClick={handleViewCart}>
          <FiShoppingCart />
          Keranjang
          {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <FiSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Cari furniture atau kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}></div>
          <p>Memuat produk...</p>
        </div>
      )}

      {/* PRODUK */}
      {!loading && (
        <>
          <div style={styles.resultInfo}>
            Menampilkan {filteredProducts.length} produk
          </div>
          
          <div style={styles.grid}>
            {filteredProducts.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop";
                    }}
                  />
                  <div style={styles.categoryBadge}>{item.category}</div>
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.productTitle}>{item.title}</h3>
                  <p style={styles.desc}>{item.description}</p>
                  <h2 style={styles.price}>
                    Rp {(item.price * 15000).toLocaleString("id-ID")}
                  </h2>

                  <div style={styles.buttonGroup}>
                    <Link
                      to={`/products/${item.id}`}
                      state={{ product: item }}
                      style={styles.detailButton}
                    >
                      Detail
                    </Link>
                    <button
                      style={styles.cartButtonSmall}
                      onClick={() => handleAddToCart(item)}
                    >
                      <FiShoppingCart />
                    </button>
                    <button
                      style={styles.buyButton}
                      onClick={() => handleBuyNow(item)}
                    >
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={styles.emptyState}>
              <p style={styles.emptyIcon}>🔍</p>
              <h3>Produk Tidak Ditemukan</h3>
              <p>Coba gunakan kata kunci pencarian yang lain</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "40px 20px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
  },

  pageTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 10px",
  },

  pageSubtitle: {
    fontSize: "16px",
    color: "#6B7280",
    margin: 0,
  },

  // ✅ STYLE BARU: Tombol Keranjang di Atas
  cartButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },

  cartButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.2s",
  },

  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#EF4444",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    width: "90%",
    maxWidth: "600px",
    margin: "0 auto 40px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "2px solid #E5E7EB",
    padding: "16px 20px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
  },

  searchIcon: {
    fontSize: "20px",
    color: "#9CA3AF",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "15px",
    color: "#111827",
  },

  resultInfo: {
    width: "90%",
    margin: "0 auto 20px",
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },

  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "16px",
  },

  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #E5E7EB",
    borderTopColor: "#B76E79",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  grid: {
    width: "90%",
    margin: "0 auto 80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
    gap: "30px",
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },

  imageContainer: {
    position: "relative",
    height: "280px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },

  categoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(183, 110, 121, 0.95)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  cardBody: {
    padding: "24px",
  },

  productTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 12px",
    lineHeight: 1.4,
  },

  desc: {
    color: "#6B7280",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: "0 0 16px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  price: {
    color: "#B76E79",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 20px",
  },

  buttonGroup: {
    display: "flex",
    gap: "8px",
  },

  detailButton: {
    flex: 1,
    textAlign: "center",
    textDecoration: "none",
    background: "#F6E8EB",
    color: "#B76E79",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.2s",
  },

  // ✅ STYLE BARU: Tombol Cart Kecil
  cartButtonSmall: {
    width: "44px",
    border: "2px solid #B76E79",
    background: "#fff",
    color: "#B76E79",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    transition: "all 0.2s",
  },

  buyButton: {
    flex: 1,
    border: "none",
    background: "#B76E79",
    color: "#fff",
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.2s",
  },

  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#6B7280",
  },

  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
  },
};

// Add animation keyframes
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Produk;