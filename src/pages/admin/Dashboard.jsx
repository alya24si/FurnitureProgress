import { useEffect, useState } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiActivity,
  FiTrendingUp,
  FiPackage,
  FiCheckCircle,
  FiClock
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

  // ===================== LOGIKA REVENUE UPDATE =====================
  const purchaseRevenue = purchases.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const membershipRevenue = members.reduce((sum, item) => sum + Number(item.total_spending || 0), 0);
  const totalRevenue = purchaseRevenue + membershipRevenue;

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

  // ✅ Helper untuk Membership Tier
  const membershipTiers = [
    { 
      label: "Gold", 
      emoji: "🥇", 
      value: totalGold, 
      color: "#FFD700",
      gradient: "linear-gradient(135deg, #FFD700, #FFA500)"
    },
    { 
      label: "Silver", 
      emoji: "🥈", 
      value: totalSilver, 
      color: "#C0C0C0",
      gradient: "linear-gradient(135deg, #C0C0C0, #A8A8A8)"
    },
    { 
      label: "Bronze", 
      emoji: "🥉", 
      value: totalBronze, 
      color: "#CD7F32",
      gradient: "linear-gradient(135deg, #CD7F32, #B87333)"
    }
  ];

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
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(228,165,184,0.18) 0%, rgba(0,0,0,0) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-120px", right: "-30px", width: "420px", height: "420px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(246,214,214,0.12) 0%, rgba(183,132,167,0.03) 100%)", filter: "blur(50px)", pointerEvents: "none" }} />

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
          <SalesChart 
            purchases={purchases} 
            members={members}
            totalMembers={totalMembers} 
            totalCustomers={totalCustomers} 
          />
        </div>
      </motion.div>

      {/* ✅ METRICS SPLIT VIEW - UPGRADED */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" }}>
        
        {/* MEMBERSHIP TIERS - UPGRADED DESIGN */}
        <motion.div 
          whileHover={{ y: -4 }}
          style={{ 
            background: "#ffffff", 
            padding: "35px", 
            borderRadius: "24px", 
            boxShadow: "0 10px 30px -5px rgba(183, 132, 167, 0.06)", 
            border: "1px solid rgba(183, 132, 167, 0.1)" 
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ 
                width: "48px", 
                height: "48px", 
                background: "linear-gradient(135deg, #FFD700, #FFA500)", 
                borderRadius: "14px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#fff",
                boxShadow: "0 6px 16px rgba(255, 215, 0, 0.3)"
              }}>
                <FiAward size={24} />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#1F2937", letterSpacing: "-0.3px" }}>
                  Membership Tier
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "#6B7280", fontWeight: "500" }}>
                  Distribusi member berdasarkan level
                </p>
              </div>
            </div>
            <div style={{ 
              background: "linear-gradient(135deg, #FDF2F4, #F6E8EB)", 
              padding: "10px 18px", 
              borderRadius: "12px", 
              textAlign: "center",
              border: "1px solid rgba(183, 110, 121, 0.15)"
            }}>
              <span style={{ display: "block", fontSize: "10px", fontWeight: "700", color: "#B76E79", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Total</span>
              <span style={{ display: "block", fontSize: "22px", fontWeight: "800", color: "#1F2937", lineHeight: 1 }}>{totalMembers}</span>
            </div>
          </div>

          {/* Tier List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {membershipTiers.map((tier, idx) => {
              const percentage = totalMembers > 0 ? (tier.value / totalMembers) * 100 : 0;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.01, boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "18px", 
                    borderRadius: "16px", 
                    background: "linear-gradient(135deg, #FAFAFA, #FFFFFF)", 
                    border: "1px solid rgba(183, 110, 121, 0.08)",
                    transition: "all 0.3s"
                  }}
                >
                  {/* Left: Icon + Info + Progress */}
                  <div style={{ display: "flex", gap: "14px", alignItems: "center", flex: 1 }}>
                    <div style={{ 
                      width: "44px", 
                      height: "44px", 
                      background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)`, 
                      borderRadius: "12px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      border: `2px solid ${tier.color}40`,
                      fontSize: "22px"
                    }}>
                      {tier.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: "700", color: "#1F2937" }}>
                        {tier.label}
                      </h4>
                      <div style={{ 
                        width: "160px", 
                        height: "6px", 
                        background: "rgba(183, 110, 121, 0.1)", 
                        borderRadius: "10px", 
                        overflow: "hidden" 
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ 
                            height: "100%", 
                            background: tier.gradient, 
                            borderRadius: "10px" 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Count + Percent */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: "#1F2937", lineHeight: 1 }}>
                      {tier.value}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: "600" }}>Users</span>
                    <span style={{ fontSize: "12px", color: "#B76E79", fontWeight: "700" }}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* FURNITURE METRICS - UPGRADED DESIGN */}
        <motion.div 
          whileHover={{ y: -4 }}
          style={{ 
            background: "#ffffff", 
            padding: "35px", 
            borderRadius: "24px", 
            boxShadow: "0 10px 30px -5px rgba(183, 132, 167, 0.06)", 
            border: "1px solid rgba(183, 132, 167, 0.1)" 
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "28px" }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              background: "linear-gradient(135deg, #B76E79, #D49AA5)", 
              borderRadius: "14px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#fff",
              boxShadow: "0 6px 16px rgba(183, 110, 121, 0.3)"
            }}>
              <FiPackage size={24} />
            </div>
            <div>
              <h2 style={{ margin: "0 0 4px 0", fontSize: "20px", fontWeight: "700", color: "#1F2937", letterSpacing: "-0.3px" }}>
                Custom Furniture Status
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#6B7280", fontWeight: "500" }}>
                Status pembayaran permintaan custom
              </p>
            </div>
          </div>

          {/* Total Requests Box */}
          <div style={{ 
            background: "linear-gradient(135deg, rgba(183, 110, 121, 0.08), rgba(212, 169, 116, 0.08))", 
            padding: "24px", 
            borderRadius: "16px", 
            display: "flex", 
            alignItems: "center", 
            gap: "16px", 
            marginBottom: "24px",
            border: "1px solid rgba(183, 110, 121, 0.15)"
          }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              background: "linear-gradient(135deg, #B76E79, #D4A574)", 
              borderRadius: "12px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#fff"
            }}>
              <FiTrendingUp size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>
                TOTAL PERMINTAAN
              </span>
              <h3 style={{ margin: 0, fontSize: "36px", fontWeight: "800", color: "#1F2937", lineHeight: 1 }}>
                {customFurniture.length}
              </h3>
            </div>
          </div>

          {/* Status Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            {/* Paid Status */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ 
                padding: "20px", 
                borderRadius: "16px", 
                background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)",
                border: "1px solid rgba(16, 185, 129, 0.15)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  background: "linear-gradient(135deg, #10B981, #34D399)", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff"
                }}>
                  <FiCheckCircle size={18} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#1F2937" }}>Lunas</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
                <h4 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#1F2937", lineHeight: 1 }}>
                  {paidFurniture}
                </h4>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#6B7280" }}>
                  {customFurniture.length > 0 ? ((paidFurniture / customFurniture.length) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div style={{ width: "100%", height: "6px", background: "rgba(0,0,0,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${customFurniture.length > 0 ? (paidFurniture / customFurniture.length) * 100 : 0}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ 
                    height: "100%", 
                    background: "linear-gradient(90deg, #10B981, #34D399)", 
                    borderRadius: "10px" 
                  }}
                />
              </div>
            </motion.div>

            {/* Unpaid Status */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ 
                padding: "20px", 
                borderRadius: "16px", 
                background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
                border: "1px solid rgba(245, 158, 11, 0.15)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  background: "linear-gradient(135deg, #F59E0B, #FBBF24)", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff"
                }}>
                  <FiClock size={18} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#1F2937" }}>Belum Lunas</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
                <h4 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#1F2937", lineHeight: 1 }}>
                  {unpaidFurniture}
                </h4>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#6B7280" }}>
                  {customFurniture.length > 0 ? ((unpaidFurniture / customFurniture.length) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div style={{ width: "100%", height: "6px", background: "rgba(0,0,0,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${customFurniture.length > 0 ? (unpaidFurniture / customFurniture.length) * 100 : 0}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ 
                    height: "100%", 
                    background: "linear-gradient(90deg, #F59E0B, #FBBF24)", 
                    borderRadius: "10px" 
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Alert Box */}
          {unpaidFurniture > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", 
                border: "1px solid rgba(245, 158, 11, 0.2)", 
                borderRadius: "14px", 
                padding: "16px", 
                display: "flex", 
                gap: "12px", 
                alignItems: "flex-start" 
              }}
            >
              <div style={{ fontSize: "24px", marginTop: "2px" }}>⚠️</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "700", color: "#92400E" }}>
                  Perlu Tindak Lanjut
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#B45309", lineHeight: 1.5 }}>
                  Ada {unpaidFurniture} permintaan yang belum lunas
                </p>
              </div>
            </motion.div>
          )}
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