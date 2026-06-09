import { useNavigate } from "react-router-dom";

const DiscountPromo = () => {
  const navigate = useNavigate();

  const promo = {
    title: "Promo Furniture Mingguan",
    discount: "Diskon Hingga 20%",
    minimumPurchase: "Rp 5.000.000",
    expired: "2 Hari Lagi",
    description:
      "Nikmati diskon spesial untuk pembelian furniture pilihan. Promo diperbarui setiap 2 hari sekali dengan syarat dan ketentuan yang berlaku.",
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.content}>
          <span style={styles.badge}>PROMO TERBATAS</span>

          <h2 style={styles.title}>
            {promo.discount}
          </h2>

          <p style={styles.description}>
            {promo.description}
          </p>

          <div style={styles.infoContainer}>
            <div style={styles.infoCard}>
              <h4>Minimal Belanja</h4>
              <p>{promo.minimumPurchase}</p>
            </div>

            <div style={styles.infoCard}>
              <h4>Berlaku</h4>
              <p>{promo.expired}</p>
            </div>
          </div>

          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.background = "#F1C84B";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#D4AF37";
              e.target.style.transform = "translateY(0)";
            }}
            onClick={() => navigate("/discount-claim")}
          >
            Klaim Diskon
          </button>

          <p style={styles.note}>
            * Klaim akan diverifikasi oleh admin berdasarkan riwayat transaksi pelanggan.
          </p>
        </div>

        <div style={styles.imageContainer}>
          <img
            src="/assets/images/sofa.png"
            alt="Promo Furniture"
            style={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "90px 0",
    background:
      "linear-gradient(135deg, #5C4033 0%, #8B6B4A 100%)",
  },

  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "50px",
    flexWrap: "wrap",
  },

  content: {
    flex: 1,
    color: "#FFFFFF",
  },

  badge: {
    background: "#D4AF37",
    color: "#5C4033",
    padding: "10px 20px",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "13px",
    display: "inline-block",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(212,175,55,0.4)",
  },

  title: {
    fontSize: "52px",
    marginBottom: "20px",
    fontWeight: "800",
    color: "#F8F5F0",
    lineHeight: "1.2",
  },

  description: {
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "30px",
    color: "#F5F5F5",
  },

  infoContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  infoCard: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(212,175,55,0.4)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "16px",
    minWidth: "180px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },

  button: {
    background: "#D4AF37",
    color: "#5C4033",
    border: "none",
    padding: "16px 34px",
    borderRadius: "50px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
    boxShadow: "0 8px 20px rgba(212,175,55,0.4)",
  },

  note: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#F5F5F5",
  },

  imageContainer: {
    flex: 1,
    textAlign: "center",
  },

  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "24px",
    border: "4px solid rgba(212,175,55,0.4)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
  },
};

export default DiscountPromo;