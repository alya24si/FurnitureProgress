import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

function GuestCheckout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "transfer",
    notes: "",
  });

  useEffect(() => {
    // Load cart items
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    if (items.length === 0) {
      alert("Keranjang belanja kosong!");
      navigate("/cart");
      return;
    }

    setCartItems(items);
    setLoading(false);

    // Pre-fill jika user sudah login
    const customer = localStorage.getItem("customer");
    if (customer) {
      const data = JSON.parse(customer);
      setFormData((prev) => ({
        ...prev,
        name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
      }));
    }
  }, [navigate]);

  // Hitung total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * 15000 * item.quantity,
    0
  );
  const shipping = 0; // Gratis ongkir
  const total = subtotal + shipping;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit pesanan
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Mohon lengkapi data pengiriman!");
      return;
    }

    // Generate nomor invoice
    const invoice = `INV-G-${Date.now().toString().slice(-8)}`;
    setOrderNumber(invoice);

    // Simpan data pesanan ke localStorage (untuk riwayat guest)
    const orderData = {
      invoice,
      items: cartItems,
      customer: formData,
      subtotal,
      shipping,
      total,
      status: "Diproses",
      date: new Date().toLocaleString("id-ID"),
      isGuest: true,
    };

    const guestOrders = JSON.parse(localStorage.getItem("guestOrders") || "[]");
    guestOrders.push(orderData);
    localStorage.setItem("guestOrders", JSON.stringify(guestOrders));

    // Kosongkan cart
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItems");

    // Tampilkan halaman sukses
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Memuat data checkout...</p>
      </div>
    );
  }

  // STEP 2: Halaman Sukses
  if (step === 2) {
    return (
      <div style={styles.container}>
        <div style={styles.successBox}>
          <div style={styles.successIcon}>
            <FiCheckCircle />
          </div>
          <h1 style={styles.successTitle}>Pesanan Berhasil Dibuat! 🎉</h1>
          <p style={styles.successSubtitle}>
            Terima kasih telah berbelanja di FurnitureKu
          </p>

          <div style={styles.orderInfo}>
            <div style={styles.orderInfoRow}>
              <span>Nomor Invoice</span>
              <strong style={styles.invoiceCode}>{orderNumber}</strong>
            </div>
            <div style={styles.orderInfoRow}>
              <span>Total Pembayaran</span>
              <strong style={styles.totalAmount}>
                Rp {total.toLocaleString("id-ID")}
              </strong>
            </div>
            <div style={styles.orderInfoRow}>
              <span>Status</span>
              <strong style={styles.statusBadge}>Menunggu Pembayaran</strong>
            </div>
          </div>

          <div style={styles.paymentInfo}>
            <h3 style={styles.paymentTitle}>📋 Instruksi Pembayaran</h3>
            <p style={styles.paymentMethod}>
              Metode: <strong>
                {formData.payment === "transfer" && "Transfer Bank"}
                {formData.payment === "ewallet" && "E-Wallet"}
                {formData.payment === "credit" && "Kartu Kredit"}
                {formData.payment === "cod" && "COD (Bayar di Tempat)"}
              </strong>
            </p>
            {formData.payment === "transfer" && (
              <div style={styles.bankInfo}>
                <p>Transfer ke:</p>
                <p><strong>BCA: 1234567890</strong> (a.n FurnitureKu)</p>
                <p><strong>Mandiri: 0987654321</strong> (a.n FurnitureKu)</p>
                <p style={styles.note}>
                  * Mohon transfer dalam 1x24 jam sebelum pesanan dibatalkan otomatis
                </p>
              </div>
            )}
          </div>

          <div style={styles.successActions}>
            <Link to="/" style={styles.primaryBtn}>
              Kembali ke Beranda
            </Link>
            <Link to="/products" style={styles.secondaryBtn}>
              Lanjut Belanja
            </Link>
            <Link to="/login-customer" style={styles.memberBtn}>
              ⭐ Daftar Jadi Member & Dapatkan Reward
            </Link>
          </div>

          <p style={styles.noteBottom}>
            📧 Detail pesanan telah dikirim ke email <strong>{formData.email || "Anda"}</strong>
          </p>
        </div>
      </div>
    );
  }

  // STEP 1: Form Checkout
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          <FiArrowLeft /> Kembali
        </button>
        <h1 style={styles.pageTitle}>Checkout Pesanan</h1>
        <p style={styles.pageSubtitle}>
          Lengkapi data di bawah untuk menyelesaikan pesanan Anda
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          {/* Form Kiri */}
          <div style={styles.leftColumn}>
            {/* Data Pengiriman */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>📦 Informasi Pengiriman</h2>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Nomor Telepon *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Alamat Lengkap *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  rows="3"
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Kota</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Nama kota"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Kode Pos</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="12345"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Catatan (Opsional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Contoh: Tolong hubungi sebelum pengiriman"
                  rows="2"
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>💳 Metode Pembayaran</h2>

              <div style={styles.paymentOptions}>
                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={formData.payment === "transfer"}
                    onChange={handleChange}
                  />
                  <div style={styles.paymentContent}>
                    <span style={styles.paymentIcon}>🏦</span>
                    <div>
                      <strong>Transfer Bank</strong>
                      <p>BCA, Mandiri, BRI, BNI</p>
                    </div>
                  </div>
                </label>

                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="ewallet"
                    checked={formData.payment === "ewallet"}
                    onChange={handleChange}
                  />
                  <div style={styles.paymentContent}>
                    <span style={styles.paymentIcon}>📱</span>
                    <div>
                      <strong>E-Wallet</strong>
                      <p>GoPay, OVO, Dana, ShopeePay</p>
                    </div>
                  </div>
                </label>

                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={formData.payment === "credit"}
                    onChange={handleChange}
                  />
                  <div style={styles.paymentContent}>
                    <span style={styles.paymentIcon}>💳</span>
                    <div>
                      <strong>Kartu Kredit/Debit</strong>
                      <p>Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                </label>

                <label style={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment === "cod"}
                    onChange={handleChange}
                  />
                  <div style={styles.paymentContent}>
                    <span style={styles.paymentIcon}>💵</span>
                    <div>
                      <strong>COD (Bayar di Tempat)</strong>
                      <p>Bayar saat barang diterima</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Ringkasan Kanan */}
          <div style={styles.rightColumn}>
            <div style={styles.summaryCard}>
              <h2 style={styles.cardTitle}>🛒 Ringkasan Pesanan</h2>

              <div style={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.summaryItem}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={styles.summaryImage}
                    />
                    <div style={styles.summaryItemInfo}>
                      <p style={styles.summaryItemName}>{item.title}</p>
                      <p style={styles.summaryItemQty}>
                        {item.quantity} x Rp {(item.price * 15000).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.divider}></div>

              <div style={styles.summaryRow}>
                <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} item)</span>
                <strong>Rp {subtotal.toLocaleString("id-ID")}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Ongkos Kirim</span>
                <strong style={styles.freeText}>GRATIS</strong>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span>Total Pembayaran</span>
                <strong style={styles.totalAmount}>
                  Rp {total.toLocaleString("id-ID")}
                </strong>
              </div>

              <button type="submit" style={styles.submitButton}>
                🔒 Bayar Sekarang
              </button>

              <p style={styles.secureNote}>
                🔐 Transaksi Anda aman & terenkripsi
              </p>
            </div>
          </div>
        </div>
      </form>
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
    maxWidth: "1200px",
    margin: "0 auto 30px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px",
  },
  pageSubtitle: {
    fontSize: "15px",
    color: "#6B7280",
    margin: 0,
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "16px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #E5E7EB",
    borderTopColor: "#B76E79",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "30px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    position: "sticky",
    top: "20px",
    height: "fit-content",
  },
  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  summaryCard: {
    background: "#fff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #F3F4F6",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    border: "2px solid #E5E7EB",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  paymentContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },
  paymentIcon: {
    fontSize: "24px",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
    maxHeight: "300px",
    overflowY: "auto",
  },
  summaryItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  summaryImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemName: {
    margin: "0 0 4px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  },
  summaryItemQty: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
  },
  divider: {
    height: "1px",
    background: "#F3F4F6",
    margin: "16px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#4B5563",
  },
  freeText: {
    color: "#10B981",
    fontWeight: "700",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "700",
  },
  totalAmount: {
    color: "#B76E79",
    fontSize: "22px",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "12px",
  },
  secureNote: {
    textAlign: "center",
    fontSize: "12px",
    color: "#6B7280",
    margin: 0,
  },

  // SUCCESS PAGE
  successBox: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "#fff",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  successIcon: {
    fontSize: "80px",
    color: "#10B981",
    marginBottom: "20px",
  },
  successTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 10px",
  },
  successSubtitle: {
    fontSize: "16px",
    color: "#6B7280",
    margin: "0 0 30px",
  },
  orderInfo: {
    background: "#F9FAFB",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "24px",
    textAlign: "left",
  },
  orderInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #E5E7EB",
    fontSize: "14px",
  },
  invoiceCode: {
    fontFamily: "monospace",
    color: "#B76E79",
    fontSize: "15px",
  },
  statusBadge: {
    background: "#FEF3C7",
    color: "#92400E",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  paymentInfo: {
    background: "#FDF2F4",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "24px",
    textAlign: "left",
  },
  paymentTitle: {
    margin: "0 0 12px",
    fontSize: "16px",
    color: "#111827",
  },
  paymentMethod: {
    margin: "0 0 12px",
    fontSize: "14px",
    color: "#4B5563",
  },
  bankInfo: {
    background: "#fff",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#4B5563",
    lineHeight: 1.8,
  },
  note: {
    margin: "10px 0 0",
    fontSize: "12px",
    color: "#DC2626",
    fontStyle: "italic",
  },
  successActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  primaryBtn: {
    padding: "14px",
    background: "#B76E79",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
  },
  secondaryBtn: {
    padding: "14px",
    background: "#fff",
    color: "#B76E79",
    border: "2px solid #B76E79",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
  },
  memberBtn: {
    padding: "14px",
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 4px 12px rgba(255,165,0,0.3)",
  },
  noteBottom: {
    fontSize: "13px",
    color: "#6B7280",
    margin: 0,
  },
};

// Animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default GuestCheckout;