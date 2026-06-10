import { useState } from "react";

function ProductCRM() {
  const [products, setProducts] = useState([
    {
      id: "PRD001",
      name: "Sofa Scandinavian",
      price: 3500000,
      stock: 10,
    },
    {
      id: "PRD002",
      name: "Meja Makan Jati",
      price: 4500000,
      stock: 5,
    },
    {
      id: "PRD003",
      name: "Lemari Minimalis",
      price: 2800000,
      stock: 8,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const addProduct = () => {
    if (!form.name || !form.price || !form.stock) return;

    const newProduct = {
      id: `PRD${String(products.length + 1).padStart(3, "0")}`,
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    setProducts([...products, newProduct]);
    setForm({ name: "", price: "", stock: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // ===================== STYLES =====================
  const styles = {
    container: {
      padding: "30px",
      background: "#F8F5F2",
      minHeight: "100vh",
    },

    header: {
      marginBottom: "25px",
    },

    title: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#5D4037",
      marginBottom: "6px",
    },

    subtitle: {
      color: "#6B7280",
      fontSize: "14px",
    },

    formCard: {
      background: "#fff",
      padding: "20px",
      borderRadius: "18px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      marginBottom: "25px",
    },

    formGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr auto",
      gap: "12px",
    },

    input: {
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
    },

    button: {
      background: "#8B5E3C",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "12px 16px",
      cursor: "pointer",
      fontWeight: "600",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "20px",
    },

    card: {
      background: "#fff",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      transition: "0.3s",
    },

    name: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#3E2723",
      marginBottom: "8px",
    },

    price: {
      color: "#8B5E3C",
      fontWeight: "700",
      marginBottom: "10px",
    },

    stockGood: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: "#DCFCE7",
      color: "#166534",
      marginBottom: "10px",
    },

    stockLow: {
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: "#FEE2E2",
      color: "#B91C1C",
      marginBottom: "10px",
    },

    deleteBtn: {
      width: "100%",
      marginTop: "10px",
      background: "#DC2626",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Kelola Produk Furniture</h1>
        <p style={styles.subtitle}>
          Tambah, hapus, dan kelola produk furniture
        </p>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Nama Produk"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Harga"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Stok"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <button style={styles.button} onClick={addProduct}>
            Tambah
          </button>
        </div>
      </div>

      {/* GRID PRODUCT */}
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <div style={styles.name}>{p.name}</div>

            <div style={styles.price}>
              Rp {p.price.toLocaleString("id-ID")}
            </div>

            <div
              style={
                p.stock > 5
                  ? styles.stockGood
                  : styles.stockLow
              }
            >
              Stok: {p.stock}
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteProduct(p.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCRM;