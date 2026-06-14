import { useEffect, useState } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiActivity,
  FiTrendingUp
} from "react-icons/fi";
import { motion } from "framer-motion";
import SalesChart from "../../components/dashboard/SalesChart";
import { supabase } from "../../services/supabase";

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [customFurniture, setCustomFurniture] = useState([]);

  const getDashboardData = async () => {
    const { data: memberData } = await supabase
      .from("memberships")
      .select("*");

    const { data: purchaseData } = await supabase
      .from("customer_purchases")
      .select("*");

    const { data: furnitureData } = await supabase
      .from("custom_furniture")
      .select("*");

    setMembers(memberData || []);
    setPurchases(purchaseData || []);
    setCustomFurniture(furnitureData || []);
  };

  useEffect(() => {
    getDashboardData();

    const memberChannel = supabase
      .channel("member-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "memberships" }, () => getDashboardData())
      .subscribe();

    const purchaseChannel = supabase
      .channel("purchase-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "customer_purchases" }, () => getDashboardData())
      .subscribe();

    const furnitureChannel = supabase
      .channel("furniture-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "custom_furniture" }, () => getDashboardData())
      .subscribe();

    return () => {
      supabase.removeChannel(memberChannel);
      supabase.removeChannel(purchaseChannel);
      supabase.removeChannel(furnitureChannel);
    };
  }, []);

  const totalRevenue = purchases.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const totalOrders = purchases.length;
  const totalCustomers = new Set(purchases.map((item) => item.customer_id)).size;
  const totalMembers = members.length;

  const totalGold = members.filter((m) => m.membership_type === "Gold").length;
  const totalSilver = members.filter((m) => m.membership_type === "Silver").length;
  const totalBronze = members.filter((m) => m.membership_type === "Bronze").length;

  const paidFurniture = customFurniture.filter((item) => item.is_paid === true).length;
  const unpaidFurniture = customFurniture.filter((item) => item.is_paid === false).length;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        padding: "40px",
        background: "linear-gradient(180deg, #FBF8F6 0%, #F3EAE6 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* BANNER REAL-DEEP GLASSMORPHISM PREMIUM */}
      <motion.div
        whileHover={{ translateY: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        style={{
          background: "linear-gradient(135deg, #2D1B29 0%, #4D3245 100%)",
          borderRadius: "32px",
          padding: "45px 50px",
          marginBottom: "40px",
          boxShadow: "0 30px 70px -15px rgba(58, 36, 54, 0.35)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Layer Efek Cahaya Ambient 3D */}
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(228,165,184,0.18) 0%, rgba(0,0,0,0) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-120px", right: "-30px", width: "420px", height: "420px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(246,214,214,0.12) 0%, rgba(183,132,167,0.03) 100%)", filter: "blur(50px)", pointerEvents: "none" }} />

        {/* Konten Sisi Kiri */}
        <div style={{ zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 255, 255, 0.07)", padding: "8px 16px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "20px", backdropFilter: "blur(10px)" }}>
            <FiActivity style={{ color: "#E4A5B8" }} />
            <span style={{ color: "#F6D6D6", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>Sistem Transaksi Aktif</span>
          </div>
          <h1 style={{ fontSize: "38px", fontWeight: "800", color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.5px" }}>
            Selamat Datang, Admin <span style={{ color: "#E4A5B8" }}>👋</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#D4C5D0", fontWeight: "400", maxWidth: "520px", lineHeight: "1.6", margin: 0 }}>
            Pantau pergerakan omzet, pelacakan status pembuatan kustom furnitur, serta analisis data keanggotaan secara real-time.
          </p>
        </div>

        {/* Konten Sisi Kanan (Floating Glass Card Pendapatan) */}
        <div style={{ zIndex: 2, background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "30px 40px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", textAlign: "right" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#E4A5B8", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <FiTrendingUp /> Akumulasi Profit
          </span>
          <h2 style={{ marginTop: "8px", fontSize: "36px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.5px", margin: 0 }}>
            Rp {totalRevenue.toLocaleString("id-ID")}
          </h2>
        </div>
      </motion.div>

      {/* CARDS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px", marginBottom: "40px" }}>
        <Card icon={<FiDollarSign />} title="Revenue" value={`Rp ${totalRevenue.toLocaleString("id-ID")}`} />
        <Card icon={<FiShoppingBag />} title="Orders" value={totalOrders} />
        <Card icon={<FiUsers />} title="Customers" value={totalCustomers} />
        <Card icon={<FiAward />} title="Members" value={totalMembers} />
      </div>

      {/* CHART SECTION */}
      <motion.div
        variants={containerVariants}
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "35px",
          marginBottom: "40px",
          boxShadow: "0 10px 30px -5px rgba(183, 132, 167, 0.06)",
          border: "1px solid rgba(183, 132, 167, 0.1)"
        }}
      >
        <h2 style={{ fontSize: "21px", fontWeight: "700", color: "#3A2436", marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span>📊</span> Metrik Arus Kas & Analisis Proporsi Pengguna
        </h2>

        <div style={{ width: "100%" }}>
          {/* MENGALIRKAN PROPS JUMLAH USER KE DALAM CHART */}
          <SalesChart 
            purchases={purchases} 
            totalMembers={totalMembers} 
            totalCustomers={totalCustomers} 
          />
        </div>
      </motion.div>

      {/* METRICS SPLIT VIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" }}>
        {/* MEMBERSHIP TIERS */}
        <motion.div whileHover={{ y: -4 }} style={{ background: "#ffffff", padding: "35px", borderRadius: "24px", boxShadow: "0 10px 30px -5px rgba(183, 132, 167, 0.06)", border: "1px solid rgba(183, 132, 167, 0.1)" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#3A2436", marginBottom: "25px" }}>🎖️ Membership Tier</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {[
              { label: "🥇 Gold", value: totalGold, color: "#FFF4E3", textColor: "#C28C38" },
              { label: "🥈 Silver", value: totalSilver, color: "#F1F2F6", textColor: "#5A6578" },
              { label: "🥉 Bronze", value: totalBronze, color: "#FDF0EA", textColor: "#C86D46" }
            ].map((tier, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: "16px", background: "#FCFAF9", border: "1px solid rgba(183, 132, 167, 0.06)" }}>
                <span style={{ fontWeight: "600", color: "#4A3546" }}>{tier.label}</span>
                <span style={{ background: tier.color, color: tier.textColor, padding: "6px 16px", borderRadius: "20px", fontWeight: "700", fontSize: "14px" }}>{tier.value} Users</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FURNITURE METRICS */}
        <motion.div whileHover={{ y: -4 }} style={{ background: "#ffffff", padding: "35px", borderRadius: "24px", boxShadow: "0 10px 30px -5px rgba(183, 132, 167, 0.06)", border: "1px solid rgba(183, 132, 167, 0.1)" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#3A2436", marginBottom: "25px" }}>🛋️ Custom Furniture Status</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", borderRadius: "16px", background: "#F6ECF0", border: "1px solid rgba(183, 132, 167, 0.15)" }}>
              <div>
                <p style={{ margin: 0, fontSize: "14px", color: "#B784A7", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Permintaan</p>
                <h3 style={{ margin: "5px 0 0 0", fontSize: "28px", fontWeight: "800", color: "#3A2436" }}>{customFurniture.length}</h3>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div style={{ padding: "18px", borderRadius: "16px", background: "#EBF9F3", border: "1px solid rgba(16,185,129,0.1)" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#059669", fontWeight: "600" }}>✅ Lunas</p>
                <h4 style={{ margin: "5px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#064E3B" }}>{paidFurniture}</h4>
              </div>
              <div style={{ padding: "18px", borderRadius: "16px", background: "#FFF2F2", border: "1px solid rgba(239,68,68,0.1)" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#DC2626", fontWeight: "600" }}>⏳ Belum Lunas</p>
                <h4 style={{ margin: "5px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#7F1D1D" }}>{unpaidFurniture}</h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Card({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02, boxShadow: "0 30px 60px -15px rgba(183, 132, 167, 0.25)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "30px",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 10px 25px -5px rgba(183, 132, 167, 0.04)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg, #E4A5B8, #F6D6D6)", opacity: 0.25, filter: "blur(12px)" }} />
      <div style={{ fontSize: "26px", width: "54px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px", background: "linear-gradient(135deg, #FDF5F7 0%, #F5ECE9 100%)", color: "#B784A7", marginBottom: "20px" }}>
        {icon}
      </div>
      <h4 style={{ color: "#8A7485", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px" }}>{title}</h4>
      <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#3A2436", letterSpacing: "-0.5px" }}>{value}</h2>
    </motion.div>
  );
}

export default Dashboard;