import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function RegisterAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nama: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 SIGN UP
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data?.user;

    // 🧠 INSERT PROFILE (tetap jalan walaupun user null)
    const { error: insertError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user?.id || crypto.randomUUID(),
          email: form.email,
          nama: form.nama,
          role: "admin",
        },
      ]);

    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }

    alert("Register admin berhasil 🎉");

    setLoading(false);

    // 👉 selalu pindah halaman
    navigate("/login-admin");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register Admin</h2>
        <p style={styles.subtitle}>Buat akun admin sistem</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="nama"
            placeholder="Nama Lengkap"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 karakter)"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Register Admin"}
          </button>

          <p
            style={styles.link}
            onClick={() => navigate("/login-admin")}
          >
            Sudah punya akun? Login
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
  },
  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "5px",
    color: "#5C3D2E",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "13px",
    color: "#888",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#B76E79",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "12px",
    cursor: "pointer",
    color: "#6E39CB",
  },
};

export default RegisterAdmin;