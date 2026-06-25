import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "../../Reusable/Container";

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil data dari URL
  const productId = searchParams.get("productId");
  const qty = parseInt(searchParams.get("qty")) || 1;
  const productName = searchParams.get("name") || "Produk";
  const productPrice = parseInt(searchParams.get("price")) || 0;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "transfer",
  });

  const subtotal = productPrice * qty;
  const shipping = 0; // Gratis ongkir
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Mohon lengkapi semua data pengiriman!");
      return;
    }

    // Proses transaksi (dummy)
    alert(
      `Transaksi Berhasil!\n\n` +
        `Produk: ${productName}\n` +
        `Qty: ${qty}\n` +
        `Total: Rp ${total.toLocaleString()}\n` +
        `Metode Pembayaran: ${formData.payment}\n\n` +
        `Terima kasih telah berbelanja di FurnitureKu!`
    );

    // Kembali ke halaman pesanan
    navigate("/member/orders");
  };

  return (
    <div style={styles.wrapper}>
      <Container>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.breadcrumb}>
            <span
              style={styles.breadcrumbLink}
              onClick={() => navigate(-1)}
            >
              ← Kembali
            </span>
            <span style={styles.breadcrumbSep}>/</span>
            <span style={styles.breadcrumbCurrent}>Checkout</span>
          </div>
          <h1 style={styles.pageTitle}>Checkout Transaksi</h1>
          <p style={styles.pageSubtitle}>
            Lengkapi data di bawah untuk menyelesaikan pesanan Anda
          </p>
        </div>

        <div style={styles.grid}>
          {/* Form Pengiriman */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📦 Informasi Pengiriman</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={styles.input}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Nomor Telepon</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  style={styles.input}
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Alamat Pengiriman</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  style={styles.textarea}
                  placeholder="Masukkan alamat lengkap (jalan, nomor rumah, kota, kode pos)"
                  rows="4"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Metode Pembayaran</label>
                <select
                  value={formData.payment}
                  onChange={(e) =>
                    setFormData({ ...formData, payment: e.target.value })
                  }
                  style={styles.input}
                >
                  <option value="transfer">Transfer Bank (BCA/Mandiri/BRI)</option>
                  <option value="ewallet">E-Wallet (GoPay/OVO/Dana)</option>
                  <option value="credit">Kartu Kredit/Debit</option>
                  <option value="cod">COD (Bayar di Tempat)</option>
                </select>
              </div>

              <button type="submit" style={styles.btnSubmit}>
                💳 Bayar Sekarang - Rp {total.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Ringkasan Pesanan */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🛒 Ringkasan Pesanan</h2>

            <div style={styles.productSummary}>
              <div style={styles.productIcon}>🛋️</div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{productName}</h3>
                <p style={styles.productQty}>Qty: {qty}</p>
                <p style={styles.productPrice}>
                  Rp {productPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.totalSection}>
              <div style={styles.totalRow}>
                <span>Subtotal ({qty} item)</span>
                <strong>Rp {subtotal.toLocaleString()}</strong>
              </div>
              <div style={styles.totalRow}>
                <span>Ongkos Kirim</span>
                <strong style={styles.freeShipping}>GRATIS</strong>
              </div>
              <div style={styles.totalRow}>
                <span>Diskon Member</span>
                <strong>- Rp 0</strong>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.grandTotalRow}>
              <span style={styles.grandTotalLabel}>Total Pembayaran</span>
              <strong style={styles.grandTotalValue}>
                Rp {total.toLocaleString()}
              </strong>
            </div>

            <div style={styles.trustBox}>
              <p style={styles.trustItem}>✓ Transaksi Aman & Terenkripsi</p>
              <p style={styles.trustItem}>✓ Garansi Uang Kembali</p>
              <p style={styles.trustItem}>✓ Pengiriman Asuransi</p>
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
  header: {
    marginBottom: "30px",
  },
  breadcrumb: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginBottom: "8px",
  },
  breadcrumbLink: {
    color: "#B76E79",
    cursor: "pointer",
    fontWeight: "600",
  },
  breadcrumbSep: {
    margin: "0 8px",
  },
  breadcrumbCurrent: {
    color: "#6B7280",
  },
  pageTitle: {
    margin: "0 0 6px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
  },
  pageSubtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#6B7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },
  cardTitle: {
    margin: "0 0 24px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    paddingBottom: "16px",
    borderBottom: "1px solid #F3F4F6",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
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
  btnSubmit: {
    width: "100%",
    padding: "16px",
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s",
  },
  productSummary: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: "#FDF2F4",
    borderRadius: "12px",
  },
  productIcon: {
    width: "70px",
    height: "70px",
    background: "#fff",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    flexShrink: 0,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },
  productQty: {
    margin: "0 0 4px",
    fontSize: "13px",
    color: "#6B7280",
  },
  productPrice: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#B76E79",
  },
  divider: {
    height: "1px",
    background: "#F3F4F6",
    margin: "20px 0",
  },
  totalSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#4B5563",
  },
  freeShipping: {
    color: "#10B981",
    fontWeight: "700",
  },
  grandTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    background: "#FDF2F4",
    borderRadius: "10px",
  },
  grandTotalLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  grandTotalValue: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#B76E79",
  },
  trustBox: {
    marginTop: "20px",
    padding: "16px",
    background: "#F9FAFB",
    borderRadius: "10px",
  },
  trustItem: {
    margin: "0 0 6px",
    fontSize: "12px",
    color: "#059669",
    fontWeight: "600",
  },
};

export default Checkout;