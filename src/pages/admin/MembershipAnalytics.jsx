function MembershipAnalytics() {
  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Membership Analytics
      </h1>

      <p style={styles.subtitle}>
        Statistik dan performa program membership FurnitureKu.
      </p>

      {/* Statistik Utama */}
      <div style={styles.cardGrid}>

        <div style={styles.card}>
          <h2>120</h2>
          <p>Total Member</p>
        </div>

        <div style={styles.card}>
          <h2>95</h2>
          <p>Member Aktif</p>
        </div>

        <div style={styles.card}>
          <h2>25</h2>
          <p>Pending Approval</p>
        </div>

        <div style={styles.card}>
          <h2>78</h2>
          <p>Diskon Diberikan</p>
        </div>

      </div>

      {/* Distribusi Membership */}
      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Distribusi Membership
        </h2>

        <div style={styles.levelGrid}>

          <div style={styles.levelCard}>
            <h3>Bronze</h3>
            <p>50 Member</p>
          </div>

          <div style={styles.levelCard}>
            <h3>Silver</h3>
            <p>40 Member</p>
          </div>

          <div style={styles.levelCard}>
            <h3>Gold</h3>
            <p>30 Member</p>
          </div>

        </div>

      </div>

      {/* Ringkasan CRM */}
      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Ringkasan CRM
        </h2>

        <div style={styles.summaryCard}>

          <p>
            • Member Gold merupakan pelanggan dengan
            kontribusi transaksi tertinggi.
          </p>

          <p>
            • Sebagian besar pendaftaran baru masih
            berada pada level Bronze.
          </p>

          <p>
            • Program diskon membership meningkatkan
            loyalitas pelanggan.
          </p>

          <p>
            • Tingkat persetujuan membership mencapai
            79%.
          </p>

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

  title: {
    fontSize: "32px",
    color: "#5D4037",
    marginBottom: "10px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  section: {
    marginTop: "30px",
  },

  sectionTitle: {
    marginBottom: "20px",
    color: "#5D4037",
  },

  levelGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  levelCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
  },

  summaryCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    lineHeight: "2",
  },
};

export default MembershipAnalytics;