import { useNavigate } from "react-router-dom";

function MembershipPromo() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>
        Keuntungan Menjadi Member
      </h2>

      <p style={styles.subtitle}>
        Nikmati berbagai keuntungan eksklusif setiap kali
        berbelanja di FurnitureKu.
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🥇 Gold</h3>
          <p>Diskon 15%</p>
          <p>Voucher Bulanan</p>
          <p>Prioritas Promo</p>
        </div>

        <div style={styles.card}>
          <h3>🥈 Silver</h3>
          <p>Diskon 10%</p>
          <p>Voucher Event</p>
          <p>Promo Khusus</p>
        </div>

        <div style={styles.card}>
          <h3>🥉 Bronze</h3>
          <p>Diskon 5%</p>
          <p>Promo Member</p>
          <p>Hadiah Loyalitas</p>
        </div>
      </div>

      <button
        style={styles.button}
        onClick={() =>
          navigate("/membership")
        }
      >
        Daftar Membership Sekarang
      </button>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    background: "#FFF8F0",
    textAlign: "center",
  },

  title: {
    fontSize: "40px",
    color: "#5D4037",
  },

  subtitle: {
    marginTop: "10px",
    color: "#666",
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "40px",
    marginBottom: "40px",
  },

  card: {
    width: "250px",
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  button: {
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    padding: "15px 35px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default MembershipPromo;