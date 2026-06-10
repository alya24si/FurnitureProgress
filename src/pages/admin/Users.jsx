import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const styles = {
    container: {
      padding: "30px",
      background: "#FFF8F7",
      minHeight: "100vh",
    },

    title: {
      color: "#B76E79",
      fontSize: "30px",
      fontWeight: "700",
      marginBottom: "20px",
    },

    card: {
      background: "#FFFFFF",
      borderRadius: "20px",
      padding: "25px",
      boxShadow: "0 4px 15px rgba(183,110,121,0.15)",
      marginBottom: "25px",
    },

    formRow: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center",
    },

    input: {
      flex: 1,
      minWidth: "250px",
      padding: "12px 15px",
      borderRadius: "10px",
      border: "1px solid #E8C4C4",
      outline: "none",
      fontSize: "14px",
    },

    addButton: {
      background: "#B76E79",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "12px 20px",
      cursor: "pointer",
      fontWeight: "600",
    },

    cancelButton: {
      background: "#6C757D",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "12px 20px",
      cursor: "pointer",
      fontWeight: "600",
    },

    tableCard: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(183,110,121,0.15)",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    th: {
      background: "#B76E79",
      color: "#fff",
      padding: "15px",
      textAlign: "left",
      fontWeight: "600",
    },

    td: {
      padding: "15px",
      borderBottom: "1px solid #F3D9DD",
    },

    actionGroup: {
      display: "flex",
      gap: "8px",
    },

    editButton: {
      background: "#B76E79",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      cursor: "pointer",
    },

    deleteButton: {
      background: "#DC3545",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      cursor: "pointer",
    },

    empty: {
      textAlign: "center",
      padding: "25px",
      color: "#999",
    },

    totalUser: {
      color: "#B76E79",
      marginBottom: "15px",
      fontWeight: "600",
      fontSize: "16px",
    },
  };

  const getUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) {
      alert("Nama dan Email wajib diisi");
      return;
    }

    const { error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setEmail("");
    getUsers();
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const updateUser = async () => {
    if (!name || !email) {
      alert("Nama dan Email wajib diisi");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({
        name,
        email,
      })
      .eq("id", editId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditId(null);
    setName("");
    setEmail("");

    getUsers();
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setEmail("");
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (!error) {
      getUsers();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        👤 User Management
      </h1>

      <div style={styles.card}>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          {editId ? (
            <>
              <button
                style={styles.addButton}
                onClick={updateUser}
              >
                Simpan
              </button>

              <button
                style={styles.cancelButton}
                onClick={cancelEdit}
              >
                Batal
              </button>
            </>
          ) : (
            <button
              style={styles.addButton}
              onClick={addUser}
            >
              + Tambah User
            </button>
          )}
        </div>
      </div>

      <div style={styles.totalUser}>
        Total User : {users.length}
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    {user.name}
                  </td>

                  <td style={styles.td}>
                    {user.email}
                  </td>

                  <td style={styles.td}>
                    <div
                      style={
                        styles.actionGroup
                      }
                    >
                      <button
                        style={
                          styles.editButton
                        }
                        onClick={() =>
                          handleEdit(user)
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={
                          styles.deleteButton
                        }
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={styles.empty}
                >
                  Belum ada data user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}