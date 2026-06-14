import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function MembershipCRM() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  // ===================== VOUCHER STATE (TETAP ADA) =====================
  const [voucherType, setVoucherType] = useState("Gold");
  const [voucherCode, setVoucherCode] = useState("");

  const [newMember, setNewMember] = useState({
    member_code: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Laki-laki",
    membership_type: "Gold",
    total_spending: 0, // <-- Properti terkontrol untuk state form
  });

  // ===================== GET =====================
  const getMembers = async () => {
    const { data, error } = await supabase
      .from("memberships")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("GET ERROR:", error.message);
      return;
    }

    setMembers(data || []);
  };

  useEffect(() => {
    getMembers();

    const channel = supabase
      .channel("membership-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "memberships",
        },
        () => {
          getMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ===================== RESET =====================
  const resetForm = () => {
    setNewMember({
      member_code: "",
      full_name: "",
      email: "",
      phone: "",
      address: "",
      gender: "Laki-laki",
      membership_type: "Gold",
      total_spending: 0,
    });
  };

  // ===================== CREATE =====================
  const addMember = async () => {
    if (!newMember.member_code || !newMember.full_name || !newMember.email) {
      alert("Lengkapi data!");
      return;
    }

    const { error } = await supabase.from("memberships").insert([
      {
        ...newMember,
        status: "Aktif",
      },
    ]);

    if (error) {
      alert("Gagal tambah: " + error.message);
      return;
    }

    resetForm();
    setShowForm(false);
    getMembers();
  };

  // ===================== DELETE (FIX) =====================
  const deleteMember = async (id) => {
    const ok = window.confirm("Yakin hapus member?");
    if (!ok) return;

    const { error } = await supabase
      .from("memberships")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal hapus: " + error.message);
      return;
    }

    getMembers();
  };

  // ===================== EDIT =====================
  const handleEdit = (member) => {
    setEditId(member.id);
    setShowForm(true);

    setNewMember({
      member_code: member.member_code,
      full_name: member.full_name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      gender: member.gender,
      membership_type: member.membership_type,
      total_spending: member.total_spending || 0, // <-- Memuat nilai spending lama ke form
    });
  };

  // ===================== UPDATE =====================
  const updateMember = async () => {
    const { error } = await supabase
      .from("memberships")
      .update({
        ...newMember, // <-- Secara otomatis ikut mengirim total_spending yang telah diubah di form
      })
      .eq("id", editId);

    if (error) {
      alert("Gagal update: " + error.message);
      return;
    }

    setEditId(null);
    setShowForm(false);
    resetForm();
    getMembers();
  };

  // ===================== VOUCHER (TIDAK DIHAPUS) =====================
  const sendVoucher = async () => {
    if (!voucherCode) {
      alert("Masukkan kode voucher");
      return;
    }

    const receivers = members.filter(
      (item) => item.membership_type === voucherType
    );

    alert(
      `Voucher ${voucherCode} dikirim ke ${receivers.length} member ${voucherType}`
    );
  };

  // ===================== FILTER =====================
  const filteredMembers = members.filter(
    (m) =>
      m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Kelola Membership</h1>

        <input
          placeholder="Cari nama atau email..."
          style={{ ...styles.input, width: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          style={styles.addBtn}
          onClick={() => {
            if (showForm) resetForm();
            setShowForm(!showForm);
            setEditId(null);
          }}
        >
          {showForm && editId ? "Batal Edit" : "+ Tambah Member"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={styles.formCard}>
          <h3>{editId ? "Edit Member" : "Tambah Member"}</h3>

          <input
            placeholder="Kode"
            style={styles.input}
            value={newMember.member_code}
            onChange={(e) =>
              setNewMember({ ...newMember, member_code: e.target.value })
            }
          />

          <input
            placeholder="Nama"
            style={styles.input}
            value={newMember.full_name}
            onChange={(e) =>
              setNewMember({ ...newMember, full_name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            style={styles.input}
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            style={styles.input}
            value={newMember.phone}
            onChange={(e) =>
              setNewMember({ ...newMember, phone: e.target.value })
            }
          />

          <input
            placeholder="Alamat"
            style={styles.input}
            value={newMember.address}
            onChange={(e) =>
              setNewMember({ ...newMember, address: e.target.value })
            }
          />

          {/* INPUT BARU: TOTAL BELANJA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", color: "#5D4037", fontWeight: "600" }}>Total Belanja (Rp)</label>
            <input
              type="number"
              placeholder="Total Belanja"
              style={styles.input}
              value={newMember.total_spending}
              onChange={(e) =>
                setNewMember({ ...newMember, total_spending: Number(e.target.value) || 0 })
              }
            />
          </div>

          <select
            style={styles.input}
            value={newMember.gender}
            onChange={(e) =>
              setNewMember({ ...newMember, gender: e.target.value })
            }
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <select
            style={styles.input}
            value={newMember.membership_type}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                membership_type: e.target.value,
              })
            }
          >
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>

          <button
            style={styles.saveBtn}
            onClick={editId ? updateMember : addMember}
          >
            {editId ? "Update Data" : "Simpan"}
          </button>
        </div>
      )}

      {/* ===================== VOUCHER ===================== */}
      <div style={styles.voucherCard}>
        <h3>Kirim Voucher</h3>

        <div style={styles.voucherRow}>
          <select
            style={styles.input}
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
          >
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>

          <input
            placeholder="Kode Voucher"
            style={styles.input}
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />

          <button style={styles.voucherBtn} onClick={sendVoucher}>
            Kirim Voucher
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Kode</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Total Belanja</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m.id}>
                <td style={styles.td}>{m.member_code}</td>
                <td style={styles.td}>{m.full_name}</td>
                <td style={styles.td}>{m.email}</td>
                <td style={styles.td}>{m.gender}</td>
                <td style={styles.td}>{m.membership_type}</td>
                
                <td style={{ ...styles.td, fontWeight: "600", color: "#16A34A" }}>
                  Rp {(m.total_spending || 0).toLocaleString("id-ID")}
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.manageBtn}
                    onClick={() =>
                      navigate(`/admin/membership-crm/${m.id}`)
                    }
                  >
                    Kelola
                  </button>

                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(m)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteMember(m.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===================== STYLES =====================
const styles = {
  container: { padding: 30, background: "#F8F5F0" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { color: "#5D4037", margin: 0 },

  addBtn: {
    background: "#16A34A",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  formCard: {
    background: "#fff",
    padding: 20,
    marginTop: 20,
    display: "grid",
    gap: 10,
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },

  voucherCard: {
    background: "#fff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },

  voucherRow: {
    display: "flex",
    gap: 10,
  },

  input: {
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 10,
  },

  saveBtn: {
    background: "#16A34A",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  voucherBtn: {
    background: "#2563EB",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },

  tableCard: { background: "#fff", marginTop: 20, borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },

  table: { width: "100%", borderCollapse: "collapse" },

  th: { background: "#5D4037", color: "#fff", padding: 15, textAlign: "left" },

  td: { padding: 15, borderBottom: "1px solid #eee" },

  manageBtn: {
    background: "#8B5E3C",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    border: "none",
    marginRight: 6,
    cursor: "pointer",
  },

  editBtn: {
    background: "#D8B46A",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    border: "none",
    marginRight: 6,
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#DC2626",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
};

export default MembershipCRM;