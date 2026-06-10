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
  });

  // ===================== FETCH DATA =====================
  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: true });

    if (error) return alert(error.message);

    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
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
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (c) => {
    setForm(c);
    setIsEdit(true);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // ===================== CREATE =====================
  const handleCreate = async () => {
    const { error } = await supabase.from("customers").insert([
      {
        name: form.name,
        email: form.email,
        totalPurchase: Number(form.totalPurchase),
        lastOrder: form.lastOrder,
      },
    ]);

    if (error) return alert(error.message);

    fetchCustomers();
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
    if (!window.confirm("Yakin hapus data?")) return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) return alert(error.message);

    fetchCustomers();
  };

  // ===================== FILTER =====================
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ===================== STYLE (PUNYAMU TETAP) =====================
  const styles = {
    container: {
      padding: "30px",
      background: "#F8F5F2",
      minHeight: "100vh",
    },
    header: { marginBottom: "20px" },
    title: { fontSize: "32px", fontWeight: "700", color: "#5D4037" },
    subtitle: { color: "#6B7280", fontSize: "14px" },
    searchBox: { marginBottom: "20px" },
    input: {
      width: "100%",
      maxWidth: "400px",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
      background: "#fff",
    },
    tableCard: {
      background: "#fff",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      background: "#5D4037",
      color: "#fff",
      padding: "14px",
    },
    td: {
      padding: "14px",
      borderBottom: "1px solid #eee",
    },

    btnAdd: {
      marginTop: "10px",
      padding: "10px 15px",
      background: "#B76E79",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    },

    btn: {
      marginRight: "5px",
      padding: "6px 10px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
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
    modalActions: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
    },

    btnCancel: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      background: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },

    btnSave: {
      flex: 1,
      padding: "10px",
      border: "none",
      background: "#B76E79",
      color: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },

    modal: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "400px",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Customer CRM</h1>
        <p style={styles.subtitle}>Data customer dari Supabase</p>

        <button style={styles.btnAdd} onClick={openAdd}>
          + Tambah Customer
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Cari customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Last Order</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>
                  Rp {(c.totalPurchase || 0).toLocaleString("id-ID")}
                </td>
                <td style={styles.td}>{c.lastOrder}</td>
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

      {/* ===================== MODAL ===================== */}
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

            <div style={styles.modalActions}>
              <button style={styles.btnCancel} onClick={closeModal}>
                Cancel
              </button>

              {!isEdit ? (
                <button style={styles.btnSave} onClick={handleCreate}>
                  Save
                </button>
              ) : (
                <button style={styles.btnSave} onClick={handleUpdate}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerCRM;