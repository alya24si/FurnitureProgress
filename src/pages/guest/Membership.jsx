import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Program Membership FurnitureKu</h1>

        <p>
          Dapatkan diskon eksklusif dan berbagai keuntungan menarik.
        </p>
      </div>

      <div style={styles.promo}>
        🎉 Promo Belanja Furniture

        <ul>
          <li>Belanja Rp1.000.000 → Diskon 5%</li>
          <li>Belanja Rp3.000.000 → Diskon 10%</li>
          <li>Belanja Rp5.000.000 → Diskon 15%</li>
          <li>Belanja Rp10.000.000 → Diskon 20%</li>
        </ul>
      </div>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>Bronze</h2>
          <h3>Rp 50.000/Tahun</h3>

          <ul>
            <li>Diskon Tambahan 2%</li>
            <li>Poin Belanja</li>
            <li>Promo Member</li>
          </ul>

          <button
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar
          </button>
        </div>

        <div style={styles.card}>
          <h2>Silver</h2>
          <h3>Rp 100.000/Tahun</h3>

          <ul>
            <li>Diskon Tambahan 5%</li>
            <li>Poin Double</li>
            <li>Prioritas Layanan</li>
          </ul>

          <button
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar
          </button>
        </div>

        <div style={styles.gold}>
          <h2>Gold</h2>
          <h3>Rp 200.000/Tahun</h3>

          <ul>
            <li>Diskon Tambahan 10%</li>
            <li>Gratis Ongkir</li>
            <li>Promo Eksklusif</li>
            <li>Support Prioritas</li>
          </ul>

          <button
            onClick={() =>
              navigate("/membership-form")
            }
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "80px 10%",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },
  promo: {
    background: "#6E39CB",
    color: "#fff",
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "40px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,.1)",
  },
  gold: {
    background: "#FFD700",
    padding: "30px",
    borderRadius: "12px",
  },
};

export default Membership;