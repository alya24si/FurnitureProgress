import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function CustomerCRM() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // ===================== MODAL STATE =====================
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    totalPurchase: "",
    lastOrder: "",
    product_name: "",
    price: "",
  });

  // ===================== PURCHASE DATA =====================
  const [purchases, setPurchases] = useState([]);

  // ===================== FETCH CUSTOMER =====================
  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: true });

    if (error) return alert(error.message);
    setCustomers(data);
  };

  // ===================== FETCH PURCHASE =====================
  const fetchPurchases = async () => {
    const { data, error } = await supabase
      .from("customer_purchases")
      .select("*");

    if (error) return alert(error.message);
    setPurchases(data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchPurchases();
  }, []);

  // ===================== HANDLE INPUT =====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===================== OPEN MODAL =====================
  const openAdd = () => {
    setForm({
      id: "",
      name: "",
      email: "",
      totalPurchase: "",
      lastOrder: "",
      product_name: "",
      price: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setForm({ ...c, product_name: "", price: "" });
    setIsEdit(true);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // ===================== CREATE =====================
  const handleCreate = async () => {
    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          name: form.name,
          email: form.email,
          totalPurchase: Number(form.totalPurchase),
          lastOrder: form.lastOrder,
        },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    // ===================== INSERT TRANSACTION =====================
    if (form.product_name && form.price) {
      const { error: purchaseError } = await supabase
        .from("customer_purchases")
        .insert([
          {
            customer_id: data.id,
            product_name: form.product_name,
            price: Number(form.price),
            quantity: 1,
            total: Number(form.price),
            purchase_date: new Date(),
          },
        ]);

      if (purchaseError) return alert(purchaseError.message);
    }

    fetchCustomers();
    fetchPurchases();
    closeModal();
  };

  // ===================== UPDATE =====================
  const handleUpdate = async () => {
    const { error } = await supabase
      .from("customers")
      .update({
        name: form.name,
        email: form.email,
        totalPurchase: Number(form.totalPurchase),
        lastOrder: form.lastOrder,
      })
      .eq("id", form.id);

    if (error) return alert(error.message);

    fetchCustomers();
    closeModal();
  };

  // ===================== DELETE =====================
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) return alert(error.message);

    fetchCustomers();
    fetchPurchases();
  };

  // ===================== FILTER =====================
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ===================== MASK ID =====================
  const maskId = (id) => {
    const str = String(id);
    if (str.length <= 4) return `#${str}`;
    return `#${str.slice(0, 3)}***${str.slice(-2)}`;
  };

  // ===================== STYLE (TETAP) =====================
  const styles = {
    container: {
      padding: "30px",
      background: "#F8F5F2",
      minHeight: "100vh",
    },
    header: { marginBottom: "20px" },
    title: { fontSize: "32px", fontWeight: "700", color: "#5D4037" },
    searchBox: { marginBottom: "20px" },
    input: {
      width: "100%",
      maxWidth: "400px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      background: "#fff",
    },
    tableCard: {
      background: "#fff",
      borderRadius: "18px",
      overflow: "hidden",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { background: "#5D4037", color: "#fff", padding: "14px" },
    td: { padding: "14px", borderBottom: "1px solid #eee" },
    btnAdd: {
      marginTop: "10px",
      padding: "10px 15px",
      background: "#B76E79",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
    },
    btn: {
      marginRight: "5px",
      padding: "6px 10px",
      border: "none",
      borderRadius: "6px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "400px",
    },
    modalActions: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    },
    btnCancel: {
      flex: 1,
      padding: "10px",
      background: "#fff",
      border: "1px solid #ccc",
    },
    btnSave: {
      flex: 1,
      padding: "10px",
      background: "#B76E79",
      color: "#fff",
      border: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Customer CRM</h1>
        <button style={styles.btnAdd} onClick={openAdd}>
          + Tambah Customer
        </button>
      </div>

      <input
        style={styles.input}
        placeholder="Cari customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Last Order</th>
              <th style={styles.th}>Barang Dibeli</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{maskId(c.id)}</td>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>
                  Rp {(c.totalPurchase || 0).toLocaleString("id-ID")}
                </td>
                <td style={styles.td}>{c.lastOrder}</td>

                <td style={styles.td}>
                  {purchases
                    .filter((p) => p.customer_id === c.id)
                    .map((p) => p.product_name)
                    .join(", ") || "-"}
                </td>

                <td style={styles.td}>
                  <button
                    style={{ ...styles.btn, background: "#FFD54F" }}
                    onClick={() => openEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.btn, background: "#EF5350", color: "#fff" }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{isEdit ? "Edit Customer" : "Tambah Customer"}</h2>

            <input
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="totalPurchase"
              placeholder="Total Purchase"
              value={form.totalPurchase}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="lastOrder"
              type="date"
              value={form.lastOrder}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="product_name"
              placeholder="Barang"
              value={form.product_name}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="price"
              placeholder="Harga"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={styles.modalActions}>
              <button style={styles.btnCancel} onClick={closeModal}>
                Cancel
              </button>
              <button style={styles.btnSave} onClick={handleCreate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCRM;