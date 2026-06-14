import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Program Membership FurnitureKu
        </h1>

        <p style={styles.subtitle}>
          Nikmati berbagai keuntungan eksklusif, voucher khusus,
          diskon tambahan, dan promo menarik untuk setiap member.
        </p>
      </div>

      {/* PROMO */}
      <div style={styles.promo}>
        <h2 style={{ marginBottom: "15px" }}>
          🎉 Promo Belanja Furniture
        </h2>

        <ul style={styles.promoList}>
          <li>Belanja Rp1.000.000 → Diskon 5%</li>
          <li>Belanja Rp3.000.000 → Diskon 10%</li>
          <li>Belanja Rp5.000.000 → Diskon 15%</li>
          <li>Belanja Rp10.000.000 → Diskon 20%</li>
        </ul>
      </div>

      {/* MEMBERSHIP CARD */}
      <div style={styles.cards}>
        {/* BRONZE */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🥉 Bronze</h2>

          <h3 style={styles.price}>
            Rp 50.000/Tahun
          </h3>

          <ul style={styles.benefitList}>
            <li>Diskon Tambahan 2%</li>
            <li>Poin Belanja</li>
            <li>Promo Member</li>
          </ul>

          <button
            style={styles.buttonMember}
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar Sekarang
          </button>
        </div>

        {/* SILVER */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🥈 Silver</h2>

          <h3 style={styles.price}>
            Rp 100.000/Tahun
          </h3>

          <ul style={styles.benefitList}>
            <li>Diskon Tambahan 5%</li>
            <li>Poin Double</li>
            <li>Prioritas Layanan</li>
          </ul>

          <button
            style={styles.buttonMember}
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar Sekarang
          </button>
        </div>

        {/* GOLD */}
        <div style={styles.gold}>
          <div style={styles.badge}>
            PALING POPULER
          </div>

          <h2 style={styles.goldTitle}>👑 Gold</h2>

          <h3 style={styles.goldPrice}>
            Rp 200.000/Tahun
          </h3>

          <ul style={styles.goldBenefit}>
            <li>Diskon Tambahan 10%</li>
            <li>Gratis Ongkir</li>
            <li>Promo Eksklusif</li>
            <li>Support Prioritas</li>
          </ul>

          <button
            style={styles.goldButton}
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 10%",
    background: "#F8F5F2",
    minHeight: "100vh",
  },

  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },

  title: {
    fontSize: "42px",
    color: "#5D4037",
    marginBottom: "15px",
  },

  subtitle: {
    color: "#666",
    fontSize: "17px",
    maxWidth: "700px",
    margin: "auto",
    lineHeight: "1.8",
  },

  promo: {
    background:
      "linear-gradient(135deg,#B76E79,#D8A7B1)",
    color: "#fff",
    padding: "35px",
    borderRadius: "20px",
    marginBottom: "50px",
    boxShadow:
      "0 10px 25px rgba(183,110,121,.25)",
  },

  promoList: {
    lineHeight: "2",
    marginTop: "10px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "30px",
    alignItems: "stretch",
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,.08)",
    border: "1px solid #F3E5E7",
    display: "flex",
    flexDirection: "column",
  },

  cardTitle: {
    color: "#5D4037",
    marginBottom: "15px",
  },

  price: {
    color: "#B76E79",
    marginBottom: "20px",
  },

  benefitList: {
    lineHeight: "2",
    flex: 1,
  },

  buttonMember: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#B76E79",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow:
      "0 4px 12px rgba(183,110,121,.3)",
  },

  gold: {
    background:
      "linear-gradient(135deg,#B76E79,#D8A7B1)",
    color: "#fff",
    padding: "35px",
    borderRadius: "20px",
    position: "relative",
    boxShadow:
      "0 15px 30px rgba(183,110,121,.3)",
    display: "flex",
    flexDirection: "column",
    transform: "scale(1.03)",
  },

  badge: {
    position: "absolute",
    top: "-12px",
    right: "20px",
    background: "#fff",
    color: "#B76E79",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },

  goldTitle: {
    marginBottom: "15px",
  },

  goldPrice: {
    marginBottom: "20px",
  },

  goldBenefit: {
    lineHeight: "2",
    flex: 1,
  },

  goldButton: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#fff",
    color: "#B76E79",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default Membership;