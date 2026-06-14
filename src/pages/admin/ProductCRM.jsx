import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function ProductCRM() {
  // ===================== STATE =====================
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // ===================== READ =====================
  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("GET ERROR:", error);
      return;
    }

    setProducts(data || []);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ===================== CREATE =====================
  const addProduct = async () => {
    if (!form.name || !form.price || !form.stock) return;

    setLoading(true);

    const { error } = await supabase.from("products").insert([
      {
        product_name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      },
    ]);

    setLoading(false);

    if (error) {
      console.log("INSERT ERROR:", error);
      return;
    }

    getProducts();
    setForm({ name: "", price: "", stock: "" });
  };

  // ===================== DELETE =====================
  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("DELETE ERROR:", error);
      return;
    }

    getProducts();
  };

  // ===================== EDIT (ambil data ke form) =====================
  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.product_name,
      price: p.price,
      stock: p.stock,
    });
  };

  // ===================== UPDATE =====================
  const updateProduct = async () => {
    if (!form.name || !form.price || !form.stock) return;

    const { error } = await supabase
      .from("products")
      .update({
        product_name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      })
      .eq("id", editId);

    if (error) {
      console.log("UPDATE ERROR:", error);
      return;
    }

    setEditId(null);
    setForm({ name: "", price: "", stock: "" });
    getProducts();
  };

  // ===================== CANCEL EDIT =====================
  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", price: "", stock: "" });
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

    editBtn: {
  width: "100%",
  marginTop: "10px",
  background: "#D8B46A", // soft gold
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
},
  };

  // ===================== UI =====================
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Kelola Produk Furniture</h1>
      
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

          <button
            style={styles.button}
            onClick={editId ? updateProduct : addProduct}
            disabled={loading}
          >
            {editId ? "Update" : loading ? "Loading..." : "Tambah"}
          </button>
        </div>

        {editId && (
          <button onClick={cancelEdit} style={{ marginTop: "10px" }}>
            Batal Edit
          </button>
        )}
      </div>

      {/* GRID PRODUCT */}
      <div style={styles.grid}>
        {products.length === 0 ? (
          <p>Tidak ada produk</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.name}>{p.product_name}</div>

              <div style={styles.price}>
                Rp {Number(p.price).toLocaleString("id-ID")}
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
                style={styles.editBtn}
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(p.id)}
              >
                Hapus
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductCRM;