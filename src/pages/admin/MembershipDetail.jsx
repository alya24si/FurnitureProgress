import { useNavigate, useParams } from "react-router-dom";

function MembershipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const members = [
    {
      id: "MBR001",
      name: "Alya Deka",
      email: "alya@gmail.com",
      phone: "08123456789",
      address: "Pekanbaru",
      level: "Gold",
      status: "Aktif",
      joinDate: "10 Juni 2026",
    },

    {
      id: "MBR002",
      name: "Rehan",
      email: "rehan@gmail.com",
      phone: "08234567890",
      address: "Jakarta",
      level: "Silver",
      status: "Menunggu",
      joinDate: "12 Juni 2026",
    },
  ];

  const member = members.find(
    (item) => item.id === id
  );

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
            <strong>Nama</strong>
            <p>{member.name}</p>
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
            <strong>Level Membership</strong>
            <p>{member.level}</p>
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
            <p>{member.joinDate}</p>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.approve}>
            Setujui Membership
          </button>

          <button style={styles.reject}>
            Tolak Membership
          </button>

          <button style={styles.discount}>
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
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
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