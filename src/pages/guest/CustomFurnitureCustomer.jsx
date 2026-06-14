import { useState } from "react";
import { supabase } from "../../services/supabase";

const CustomFurnitureCustomer = () => {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    furniture_type: "",
    material: "",
    color: "",
    size: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("custom_furniture").insert([
      {
        ...form,
        status: "pending",
      },
    ]);

    if (error) return alert(error.message);

    alert("Custom request berhasil dikirim!");
    setForm({
      customer_name: "",
      customer_email: "",
      furniture_type: "",
      material: "",
      color: "",
      size: "",
      notes: "",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Custom Furniture Designer</h1>
        <p style={styles.subtitle}>
          Buat furniture sesuai keinginan kamu ✨
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="customer_name" placeholder="Nama" onChange={handleChange} value={form.customer_name} style={styles.input} />
          <input name="customer_email" placeholder="Email" onChange={handleChange} value={form.customer_email} style={styles.input} />

          <input name="furniture_type" placeholder="Jenis Furniture (Sofa / Meja / Lemari)" onChange={handleChange} value={form.furniture_type} style={styles.input} />
          <input name="material" placeholder="Material (Kayu Jati / MDF)" onChange={handleChange} value={form.material} style={styles.input} />
          <input name="color" placeholder="Warna" onChange={handleChange} value={form.color} style={styles.input} />
          <input name="size" placeholder="Ukuran" onChange={handleChange} value={form.size} style={styles.input} />

          <textarea name="notes" placeholder="Catatan tambahan..." onChange={handleChange} value={form.notes} style={styles.textarea} />

          <button style={styles.button}>Kirim Custom Request</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#F8E1E7,#F3F0FF)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  card: {
    width: "100%",
    maxWidth: 700,
    background: "#fff",
    borderRadius: 20,
    padding: 30,
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#B76E79" },
  subtitle: { color: "#777", marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
  },
  textarea: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    minHeight: 100,
  },
  button: {
    marginTop: 10,
    padding: 14,
    background: "#B76E79",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CustomFurnitureCustomer;