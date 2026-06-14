import { useState } from "react";
import { supabase } from "../../services/supabase";

const ReturnProduct = () => {
  const [form, setForm] = useState({
    name: "",
    orderId: "",
    date: "",
    reason: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("feedback_returns").insert([
      {
        name: form.name,
        order_id: form.orderId,
        date_received: form.date,
        reason: form.reason,
        status: "pending",
      },
    ]);

    alert("Pengajuan berhasil dikirim!");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>📦</div>
          <h1 style={styles.title}>Return Request</h1>
          <p style={styles.subtitle}>
            Ajukan pengembalian barang dengan mudah & cepat
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Nama Customer" onChange={handleChange} style={styles.input} />
          <input name="orderId" placeholder="Order ID" onChange={handleChange} style={styles.input} />
          <input type="date" name="date" onChange={handleChange} style={styles.input} />

          <textarea
            name="reason"
            placeholder="Alasan pengembalian..."
            onChange={handleChange}
            style={styles.textarea}
          />

          <input type="file" name="file" onChange={handleChange} style={styles.file} />

          <button type="submit" style={styles.button}>
            Kirim Pengajuan
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #F8F5F2, #F3E8FF)",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 650,
    background: "#fff",
    borderRadius: 25,
    padding: 40,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  header: {
    textAlign: "center",
    marginBottom: 30,
  },

  icon: {
    fontSize: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#B76E79",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  input: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #eee",
    outline: "none",
  },

  textarea: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #eee",
    minHeight: 120,
  },

  file: {
    padding: 10,
  },

  button: {
    marginTop: 10,
    padding: 14,
    border: "none",
    borderRadius: 12,
    background: "#B76E79",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ReturnProduct;