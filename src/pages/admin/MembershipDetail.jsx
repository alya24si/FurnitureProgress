import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

function MembershipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMember();
  }, []);

  const getMember = async () => {
    const { data, error } = await supabase
      .from("memberships")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setMember(data);
    }

    setLoading(false);
  };

  const approveMember = async () => {
    await supabase
      .from("memberships")
      .update({
        status: "Aktif",
      })
      .eq("id", id);

    alert("Membership berhasil disetujui");

    getMember();
  };

  const rejectMember = async () => {
    await supabase
      .from("memberships")
      .update({
        status: "Ditolak",
      })
      .eq("id", id);

    alert("Membership ditolak");

    getMember();
  };

  const sendDiscount = () => {
    const discount =
      member.membership_type === "Gold"
        ? "20%"
        : member.membership_type === "Silver"
        ? "15%"
        : "10%";

    alert(
      `Voucher diskon ${discount} berhasil diberikan ke ${member.full_name}`
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div style={styles.notFound}>
        <h2>Member Tidak Ditemukan</h2>

        <button
          style={styles.backButton}
          onClick={() =>
            navigate("/admin/membership-crm")
          }
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button
        style={styles.backButton}
        onClick={() =>
          navigate("/admin/membership-crm")
        }
      >
        ← Kembali
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>
          Detail Membership
        </h1>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <strong>Kode Member</strong>
            <p>{member.member_code}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Nama</strong>
            <p>{member.full_name}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Email</strong>
            <p>{member.email}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>No HP</strong>
            <p>{member.phone}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Alamat</strong>
            <p>{member.address}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Jenis Kelamin</strong>
            <p>{member.gender}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Level Membership</strong>
            <p>{member.membership_type}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Status</strong>

            <span
              style={
                member.status === "Aktif"
                  ? styles.activeBadge
                  : styles.pendingBadge
              }
            >
              {member.status}
            </span>
          </div>

          <div style={styles.infoCard}>
            <strong>Tanggal Bergabung</strong>

            <p>
              {new Date(
                member.join_date
              ).toLocaleDateString("id-ID")}
            </p>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={styles.approve}
            onClick={approveMember}
          >
            Setujui Membership
          </button>

          <button
            style={styles.reject}
            onClick={rejectMember}
          >
            Tolak Membership
          </button>

          <button
            style={styles.discount}
            onClick={sendDiscount}
          >
            Berikan Diskon
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#F8F5F0",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "24px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,.08)",
  },

  title: {
    fontSize: "32px",
    color: "#5D4037",
    marginBottom: "30px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  },

  infoCard: {
    background: "#FAFAFA",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
  },

  backButton: {
    marginBottom: "20px",
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  buttonGroup: {
    marginTop: "35px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  approve: {
    background: "#16A34A",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  reject: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  discount: {
    background: "#D97706",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeBadge: {
    background: "#DCFCE7",
    color: "#166534",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
    marginTop: "8px",
  },

  pendingBadge: {
    background: "#FEF3C7",
    color: "#92400E",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
    marginTop: "8px",
  },

  notFound: {
    padding: "40px",
    textAlign: "center",
  },
};

export default MembershipDetail;