import { useNavigate } from "react-router-dom";

function MembershipCRM() {
  const navigate = useNavigate();

  const members = [
  {
    id: "MBR001",
    name: "Alya Deka",
    type: "Gold",
    email: "alya@gmail.com",
    status: "Aktif",
  },
  {
    id: "MBR002",
    name: "Rehan",
    type: "Silver",
    email: "rehan@gmail.com",
    status: "Menunggu",
  },

  // GOLD MEMBER (45)
  ...Array.from({ length: 44 }, (_, i) => ({
    id: `MBR${String(i + 3).padStart(3, "0")}`,
    name: `Gold Member ${i + 1}`,
    type: "Gold",
    email: `gold${i + 1}@gmail.com`,
    status: "Aktif",
  })),

  // SILVER MEMBER (35)
  ...Array.from({ length: 34 }, (_, i) => ({
    id: `MBR${String(i + 47).padStart(3, "0")}`,
    name: `Silver Member ${i + 1}`,
    type: "Silver",
    email: `silver${i + 1}@gmail.com`,
    status: i % 5 === 0 ? "Menunggu" : "Aktif",
  })),

  // BRONZE MEMBER (20)
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `MBR${String(i + 81).padStart(3, "0")}`,
    name: `Bronze Member ${i + 1}`,
    type: "Bronze",
    email: `bronze${i + 1}@gmail.com`,
    status: i % 4 === 0 ? "Menunggu" : "Aktif",
  })),
];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Kelola Membership</h1>

        <p style={styles.subtitle}>
          Kelola data member, persetujuan membership, dan pemberian
          diskon pelanggan FurnitureKu.
        </p>
      </div>

      {/* Statistik */}
      {/* <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>120</h2>
          <p style={styles.statLabel}>Total Member</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>95</h2>
          <p style={styles.statLabel}>Member Aktif</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>25</h2>
          <p style={styles.statLabel}>Pending</p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>30</h2>
          <p style={styles.statLabel}>Gold Member</p>
        </div>
      </div> */}

      {/* Search */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Cari member berdasarkan nama atau email..."
          style={styles.searchInput}
        />
      </div>

      {/* Tabel */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nama</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td style={styles.td}>{member.id}</td>

                <td style={styles.td}>
                  <strong>{member.name}</strong>
                </td>

                <td style={styles.td}>{member.email}</td>

                <td style={styles.td}>
                  <span style={styles.levelBadge}>
                    {member.type}
                  </span>
                </td>

                <td style={styles.td}>
                  <span
                    style={
                      member.status === "Aktif"
                        ? styles.activeBadge
                        : styles.pendingBadge
                    }
                  >
                    {member.status}
                  </span>
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.manageBtn}
                    onClick={() =>
                      navigate(
                        `/admin/membership-crm/${member.id}`
                      )
                    }
                  >
                    Kelola
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

const styles = {
  container: {
    padding: "30px",
    background: "#F8F5F0",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "30px",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#5D4037",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: "15px",
    maxWidth: "700px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },

  statNumber: {
    fontSize: "32px",
    color: "#8B5E3C",
    margin: 0,
    fontWeight: "700",
  },

  statLabel: {
    marginTop: "10px",
    color: "#6B7280",
    fontSize: "14px",
  },

  searchWrapper: {
    marginBottom: "25px",
  },

  searchInput: {
    width: "100%",
    maxWidth: "400px",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    outline: "none",
    fontSize: "14px",
    background: "#fff",
  },

  tableCard: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#5D4037",
    color: "#fff",
    padding: "18px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
  },

  td: {
    padding: "18px",
    borderBottom: "1px solid #F3F4F6",
    fontSize: "14px",
  },

  levelBadge: {
    background: "#FEF3C7",
    color: "#92400E",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  activeBadge: {
    background: "#DCFCE7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  pendingBadge: {
    background: "#FEE2E2",
    color: "#B91C1C",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  manageBtn: {
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default MembershipCRM;