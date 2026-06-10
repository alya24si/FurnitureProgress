import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiAward,
} from "react-icons/fi";

import SalesChart from "../../components/dashboard/SalesChart";

function Dashboard() {
  // ===================== DATA MEMBERS (WAJIB ADA) =====================
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

  // GOLD (44)
  ...Array.from({ length: 44 }, (_, i) => ({
    id: `MBR${String(i + 3).padStart(3, "0")}`,
    name: `Gold Member ${i + 1}`,
    type: "Gold",
    email: `gold${i + 1}@gmail.com`,
    status: "Aktif",
  })),

  // SILVER (34)
  ...Array.from({ length: 34 }, (_, i) => ({
    id: `MBR${String(i + 47).padStart(3, "0")}`,
    name: `Silver Member ${i + 1}`,
    type: "Silver",
    email: `silver${i + 1}@gmail.com`,
    status: i % 5 === 0 ? "Menunggu" : "Aktif",
  })),

  // BRONZE (20)
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `MBR${String(i + 81).padStart(3, "0")}`,
    name: `Bronze Member ${i + 1}`,
    type: "Bronze",
    email: `bronze${i + 1}@gmail.com`,
    status: i % 4 === 0 ? "Menunggu" : "Aktif",
  })),
];

  // ===================== STATISTIK MEMBERS =====================
  const totalGold = members.filter(
    (m) => m.type === "Gold"
  ).length;

  const totalSilver = members.filter(
    (m) => m.type === "Silver"
  ).length;

  const totalBronze = members.filter(
    (m) => m.type === "Bronze"
  ).length;

  const totalMember = members.length;

  // ===================== PRODUCTS =====================
  const products = [
    {
      id: 1,
      name: "Sofa Scandinavian",
      sales: 120,
      image:
        "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    },
    {
      id: 2,
      name: "Meja Makan Jati",
      sales: 95,
      image:
        "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
    },
    {
      id: 3,
      name: "Lemari Minimalis",
      sales: 80,
      image:
        "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
    },
  ];

  // ===================== STYLES =====================
  const styles = {
    container: {
      padding: "30px",
      background: "#F8F5F2",
      minHeight: "100vh",
    },

    banner: {
      background:
        "linear-gradient(135deg,#B76E79,#D9A5A5)",
      color: "#fff",
      padding: "35px",
      borderRadius: "25px",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    },

    statCard: {
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    },

    chartGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "20px",
      marginBottom: "30px",
    },

    chartCard: {
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    },

    targetCard: {
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    },

    bottomGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "30px",
    },

    section: {
      background: "#fff",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    },

    productCard: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
    },

    productImage: {
      width: "70px",
      height: "70px",
      objectFit: "cover",
      borderRadius: "12px",
    },

    memberCard: {
      display: "flex",
      justifyContent: "space-between",
      background: "#FFF1F2",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* ================= BANNER ================= */}
      <div style={styles.banner}>
        <div>
          <h1>Selamat Datang Admin 👋</h1>
          <p>Pantau bisnis furniture & membership</p>
        </div>

        <div>
          <h2>Rp 340 Juta</h2>
          <p>Bulan Ini</p>
        </div>
      </div>

      {/* ================= STATISTIK ================= */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <FiDollarSign size={35} color="#B76E79" />
          <h2>Rp 340 Juta</h2>
          <p>Total Revenue</p>
        </div>

        <div style={styles.statCard}>
          <FiShoppingBag size={35} color="#B76E79" />
          <h2>1.250</h2>
          <p>Total Orders</p>
        </div>

        <div style={styles.statCard}>
          <FiUsers size={35} color="#B76E79" />
          <h2>850</h2>
          <p>Total Customer</p>
        </div>

        <div style={styles.statCard}>
          <FiAward size={35} color="#B76E79" />
          <h2>{totalMember}</h2>
          <p>Total Member</p>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div style={styles.chartGrid}>
        <div style={styles.chartCard}>
          <h2>Grafik Penjualan Furniture</h2>
          <SalesChart />
        </div>

        <div style={styles.targetCard}>
          <h3>Target Bulan Ini</h3>
          <h1>78%</h1>

          <div style={{ background: "#eee", height: "12px", borderRadius: "20px" }}>
            <div
              style={{
                width: "78%",
                height: "100%",
                background: "#B76E79",
                borderRadius: "20px",
              }}
            />
          </div>

          <p>Rp 340 Juta dari Rp 450 Juta</p>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div style={styles.bottomGrid}>
        <div style={styles.section}>
          <h2>Top Furniture</h2>

          {products.map((item) => (
            <div key={item.id} style={styles.productCard}>
              <img
                src={item.image}
                style={styles.productImage}
                alt=""
              />
              <div>
                <h4>{item.name}</h4>
                <p>{item.sales} Terjual</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.section}>
          <h2>Membership</h2>

          <div style={styles.memberCard}>
            <span>Gold Member</span>
            <strong>{totalGold}</strong>
          </div>

          <div style={styles.memberCard}>
            <span>Silver Member</span>
            <strong>{totalSilver}</strong>
          </div>

          <div style={styles.memberCard}>
            <span>Bronze Member</span>
            <strong>{totalBronze}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;