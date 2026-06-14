import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const Feedback = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await supabase
      .from("feedback_returns")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("feedback")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feedback_returns" },
        () => {
          fetchData(); // FIX: wajib pakai callback
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ================= FIX UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("feedback_returns")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    // FIX: langsung refresh data biar UI berubah
    fetchData();
  };

  return (
    <div style={styles.page}>
      {/* SUNTIKAN ANIMASI KEYFRAMES GLOBAL AGAR SANGAT WOW */}
      <style>{`
        @keyframes wowFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(183, 110, 121, 0)); }
          50% { filter: drop-shadow(0 0 8px rgba(183, 110, 121, 0.3)); }
        }

        .wow-card {
          animation: wowFadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Membuat efek hover yang sangat mulus & canggih lewat CSS Class */
        .wow-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 20px 35px rgba(183, 110, 121, 0.12), 0 4px 12px rgba(0, 0, 0, 0.02) !important;
          border-color: #D4A5A5 !important;
        }

        .wow-btn-approve:hover {
          background-color: #A35C67 !important;
          box-shadow: 0 6px 20px rgba(183, 110, 121, 0.35) !important;
          transform: translateY(-2px);
        }
        .wow-btn-approve:active {
          transform: translateY(1px) scale(0.97);
        }

        .wow-btn-reject:hover {
          background-color: #FFEBEE !important;
          border-color: #EF5350 !important;
          transform: translateY(-2px);
        }
        .wow-btn-reject:active {
          transform: translateY(1px) scale(0.97);
        }
      `}</style>

      <h1 style={styles.title}>Feedback & Return Requests</h1>
      <p style={styles.subtitle}>Kelola pengajuan customer dengan cepat</p>

      <div style={styles.grid}>
        {data.map((item, index) => (
          <div 
            key={item.id} 
            className="wow-card"
            // Trik rahasia: Memberikan delay waktu tampil yang berbeda tiap kartu agar muncul bergantian
            style={{ 
              ...styles.card, 
              animationDelay: `${index * 0.1}s` 
            }}
          >
            <div style={styles.top}>
              <h3 style={styles.cardName}>{item.name}</h3>
              <span style={badge[item.status] || badge.pending}>
                {item.status || "pending"}
              </span>
            </div>

            <p style={styles.orderText}>
              <span style={styles.orderLabel}>Order:</span> #{item.order_id}
            </p>
            <p style={styles.reasonText}>{item.reason}</p>

            {item.image_url && (
              <img src={item.image_url} style={styles.img} alt="Evidence" />
            )}

            <div style={styles.actions}>
              <button
                onClick={() => updateStatus(item.id, "approved")}
                className="wow-btn-approve"
                style={styles.approve}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(item.id, "rejected")}
                className="wow-btn-reject"
                style={styles.reject}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================= LUXURY MINIMALIST ROSE GOLD STYLES ================= */
const styles = {
  page: {
    padding: "60px 30px",
    background: "radial-gradient(circle at 50% 0%, #FFFDFD 0%, #FCFBFB 100%)", // Gradasi latar belakang halus
    minHeight: "100vh",
    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    overflowX: "hidden",
  },

  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#4A3538", 
    letterSpacing: "-0.7px",
    margin: "0 0 8px 0",
    animation: "titleGlow 4s ease-in-out infinite", // Animasi pendaran judul yang bernapas santai
  },

  subtitle: {
    color: "#8A7A7C", 
    fontSize: "15px",
    margin: "0 0 44px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
    gap: "28px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    background: "#ffffff",
    padding: "26px",
    borderRadius: "20px",
    boxShadow: "0 4px 24px rgba(183, 110, 121, 0.03), 0 1px 3px rgba(0, 0, 0, 0.01)",
    border: "1px solid #F6EFF0", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // Transisi super mulus menggunakan kurva kustom premium
    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), boxShadow 0.5s ease, border-color 0.5s ease",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },

  cardName: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#2C1E20",
    letterSpacing: "-0.2px",
  },

  orderText: {
    margin: "0 0 12px 0",
    fontSize: "13px",
    color: "#5C4D50",
  },

  orderLabel: {
    fontWeight: "600",
    color: "#A69597",
  },

  reasonText: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#5C4D50",
    lineHeight: "1.6",
  },

  img: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    marginTop: "4px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid #F4EDEE",
    transition: "transform 0.4s ease",
  },

  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "auto", 
  },

  approve: {
    flex: 1,
    padding: "14px",
    background: "#B76E79", 
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "0.2px",
    boxShadow: "0 3px 10px rgba(183, 110, 121, 0.15)",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  reject: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    background: "transparent",
    color: "#C62828", 
    border: "1px solid #FFCDD2", 
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

const badge = {
  pending: {
    background: "#FFF3E0",
    color: "#E65100",
    padding: "5px 14px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  approved: {
    background: "#E8F5E9",
    color: "#2E7D32",
    padding: "5px 14px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  rejected: {
    background: "#FFEBEE",
    color: "#C62828",
    padding: "5px 14px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

export default Feedback;