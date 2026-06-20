import { useNavigate } from "react-router-dom";
import { FiUser, FiShield, FiUsers } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Welcome Back
      </h1>

      <p style={styles.subtitle}>
        Silakan pilih jenis akun yang ingin digunakan
      </p>

      <div style={styles.cards}>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <FiUsers size={40} />
          </div>

          <h2>Guest</h2>

          <p>
            Masuk sebagai pengunjung untuk melihat katalog furniture
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/")}
          >
            Masuk Guest
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <FiShield size={40} />
          </div>

          <h2>Admin</h2>

          <p>
            Kelola customer, produk dan CRM furniture
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/login-admin")}
          >
            Login Admin
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <FiUser size={40} />
          </div>

          <h2>Member</h2>

          <p>
            Jelajahi produk furniture premium dan benefit membership
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/member/dashboard")}
          >
            Masuk Member
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "36px",
    color: "#5C3D2E",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#9B7B7B",
    marginBottom: "40px",
  },

  cards: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  card: {
    width: "300px",
    padding: "30px",
    borderRadius: "25px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(183,110,121,.15)",
    transition: ".3s",
  },

  iconBox: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "0 auto 20px",
    background: "#F8E8EA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#B76E79",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#B76E79",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;