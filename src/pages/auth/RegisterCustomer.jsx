import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 1. DAFTAR KE SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // 👤 2. SIMPAN KE TABLE PROFILES (UNTUK ROLE)
   await supabase.from("profiles").insert([
  {
    id: data.user.id,
    email: form.email,
    full_name: form.nama,
    role: "user"
  }
]);
    alert("Registrasi berhasil, silakan login");

    navigate("/login-customer");
  };

  return (
    <div style={styles.container}>
      <h2>Daftar Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nama"
          placeholder="Nama Lengkap"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Daftar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
};

export default Register;