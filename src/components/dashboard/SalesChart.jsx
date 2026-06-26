import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function SalesChart({ purchases, members = [], totalMembers, totalCustomers }) {
  const groupedData = {};

  // Helper untuk mengubah tanggal string/ISO menjadi format Bulan-Tahun
  const formatToMonthYear = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Unknown";
      return date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
    } catch {
      return "Unknown";
    }
  };

  // 1. Ambil data dari riwayat transaksi regular customer_purchases (Dikelompokkan per Bulan)
  purchases.forEach((item) => {
    if (item.purchase_date) {
      const monthYear = formatToMonthYear(item.purchase_date);
      groupedData[monthYear] = (groupedData[monthYear] || 0) + Number(item.total || 0);
    }
  });

  // 2. Ambil data total_spending milik membership ke bagan (Dikelompokkan per Bulan)
  members.forEach((member) => {
    if (member.total_spending && Number(member.total_spending) > 0 && member.created_at) {
      const monthYear = formatToMonthYear(member.created_at);
      groupedData[monthYear] = (groupedData[monthYear] || 0) + Number(member.total_spending);
    }
  });

  // Urutkan label bulan secara kronologis berdasarkan waktu nyata
  const labels = Object.keys(groupedData).sort((a, b) => {
    const parseDate = (str) => {
      const months = { jan: 0, feb: 1, mar: 2, apr: 3, mei: 4, jun: 5, jul: 6, agu: 7, sep: 8, okt: 9, nov: 10, des: 11 };
      const parts = str.toLowerCase().split(" ");
      return new Date(parts[1], months[parts[0]] || 0);
    };
    return parseDate(a) - parseDate(b);
  });

  const values = labels.map(month => groupedData[month]);

  const totalSum = values.reduce((a, b) => a + b, 0);
  const avgSales = values.length > 0 ? totalSum / values.length : 0;
  const maxSales = values.length > 0 ? Math.max(...values) : 0;

  // ==========================================
  // ✅ LOGIKA BARU: PENDAPATAN MEMBER VS NON-MEMBER
  // ==========================================

  // Pendapatan dari Member (total_spending dari tabel memberships)
  const memberRevenue = members.reduce((sum, member) => {
    return sum + Number(member.total_spending || 0);
  }, 0);

  // Pendapatan dari Non-Member (purchases yang customer_id-nya TIDAK ada di members)
  const nonMemberRevenue = purchases.reduce((sum, purchase) => {
    // Cek apakah customer_id ini adalah member
    const isMember = members.some(m =>
      m.user_id === purchase.customer_id ||
      m.id === purchase.customer_id
    );

    // Jika BUKAN member, tambahkan ke pendapatan non-member
    if (!isMember) {
      return sum + Number(purchase.total || 0);
    }
    return sum;
  }, 0);

  // Total pendapatan gabungan
  const totalUserRevenue = memberRevenue + nonMemberRevenue;

  // ==========================================
  // CONFIG DATA: GRAFIK BATANG (BULANAN) - UPGRADED
  // ==========================================
  const barData = {
    labels,
    datasets: [
      {
        label: "Total Pendapatan",
        data: values,
        borderRadius: 12,
        borderSkipped: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(183, 110, 121, 0.9)");
          gradient.addColorStop(0.5, "rgba(212, 169, 116, 0.8)");
          gradient.addColorStop(1, "rgba(244, 212, 138, 0.7)");
          return gradient;
        },
        hoverBackgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(183, 110, 121, 1)");
          gradient.addColorStop(1, "rgba(212, 169, 116, 1)");
          return gradient;
        },
        barThickness: 40,
        border: {
          color: "rgba(255, 255, 255, 0.3)",
          width: 2,
        },
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#1F2937",
        bodyColor: "#4B5563",
        borderColor: "rgba(183, 110, 121, 0.2)",
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { family: "'Inter', sans-serif", size: 14, weight: "700" },
        bodyFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `Total Omzet: Rp ${context.raw.toLocaleString("id-ID")}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: "#6B7280",
          font: { family: "'Inter', sans-serif", size: 12, weight: "600" },
          padding: 8
        }
      },
      y: {
        grid: {
          color: "rgba(183, 110, 121, 0.08)",
          drawTicks: false,
          drawBorder: false,
        },
        border: { display: false },
        ticks: {
          color: "#6B7280",
          font: { family: "'Inter', sans-serif", size: 11, weight: "600" },
          padding: 8,
          callback: (value) => value >= 1000000 ? "Rp " + (value / 1000000) + " Jt" : value >= 1000 ? "Rp " + (value / 1000) + " Rb" : "Rp " + value
        }
      }
    }
  };

  // ==========================================
  // ✅ CONFIG DATA: DOUGHNUT CHART (PENDAPATAN MEMBER VS NON-MEMBER)
  // ==========================================
  const doughnutData = {
    labels: ["Pendapatan Member", "Pendapatan Non-Member"],
    datasets: [
      {
        data: [memberRevenue, nonMemberRevenue],
        backgroundColor: [
          "rgba(183, 110, 121, 0.9)",    // Rose Gold untuk Member
          "rgba(212, 169, 116, 0.85)"    // Gold untuk Non-Member
        ],
        hoverBackgroundColor: [
          "rgba(183, 110, 121, 1)",
          "rgba(212, 169, 116, 1)"
        ],
        borderWidth: 0,
        hoverOffset: 8,
        spacing: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 20,
          font: { family: "'Inter', sans-serif", size: 12, weight: "600" },
          color: "#374151",
          usePointStyle: true,
          pointStyle: "circle"
        }
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#1F2937",
        bodyColor: "#4B5563",
        borderColor: "rgba(183, 110, 121, 0.2)",
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { family: "'Inter', sans-serif", size: 14, weight: "700" },
        bodyFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
        callbacks: {
          label: function (context) {
            const percentage = totalUserRevenue > 0
              ? ((context.raw / totalUserRevenue) * 100).toFixed(1)
              : 0;
            return ` ${context.label}: Rp ${context.raw.toLocaleString("id-ID")} (${percentage}%)`;
          }
        }
      }
    },
    cutout: "75%",
  };

  return (
    <div style={styles.container}>
      {/* MINI STATS BAR - UPGRADED */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <div style={styles.statIconBox}>
            <span style={styles.statIcon}>📊</span>
          </div>
          <div>
            <span style={styles.statLabel}>Rata-rata / Bulan</span>
            <h4 style={styles.statValue}>
              Rp {avgSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
            </h4>
          </div>
        </div>

        <div style={styles.statDivider}></div>

        <div style={styles.statItem}>
          <div style={{ ...styles.statIconBox, background: "linear-gradient(135deg, #B76E79, #D4A574)" }}>
            <span style={styles.statIcon}>🏆</span>
          </div>
          <div>
            <span style={styles.statLabel}>Puncak Omzet</span>
            <h4 style={{ ...styles.statValue, color: "#B76E79" }}>
              Rp {maxSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
            </h4>
          </div>
        </div>

        <div style={styles.statDivider}></div>

        <div style={styles.statItem}>
          <div style={{ ...styles.statIconBox, background: "linear-gradient(135deg, #D4A574, #F4D48A)" }}>
            <span style={styles.statIcon}>📅</span>
          </div>
          <div>
            <span style={styles.statLabel}>Durasi Data</span>
            <h4 style={styles.statValue}>
              {values.length} Bulan
            </h4>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS VIEW - UPGRADED */}
      <div style={styles.chartGrid}>
        {/* Kiri: Grafik Batang Bulanan */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div style={styles.chartTitleBox}>
              <span style={styles.chartIcon}>📈</span>
              <div>
                <p style={styles.chartTitle}>Tren Pendapatan Bulanan</p>
                <p style={styles.chartSubtitle}>Analisis omzet per bulan</p>
              </div>
            </div>
          </div>
          <div style={styles.chartBody}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* ✅ Kanan: Doughnut - PENDAPATAN MEMBER VS NON-MEMBER */}
        <div style={styles.chartCardSecondary}>
          <div style={styles.chartHeader}>
            <div style={styles.chartTitleBox}>
              <span style={styles.chartIcon}>💰</span>
              <div>
                <p style={styles.chartTitle}>Pendapatan Member vs Non-Member</p>
                <p style={styles.chartSubtitle}>Kontribusi revenue berdasarkan tipe user</p>
              </div>
            </div>
          </div>

          {/* ✅ TOTAL REVENUE DIPINDAHKAN KE LUAR CHART */}
          

          <div style={styles.totalRevenueBox}>
            <span style={styles.totalRevenueLabel}>Total Revenue</span>
            <h3 style={styles.totalRevenueValue}>
              {totalUserRevenue >= 1000000000
                ? `Rp ${(totalUserRevenue / 1000000000).toFixed(1)} M`
                : totalUserRevenue >= 1000000
                  ? `Rp ${(totalUserRevenue / 1000000).toFixed(1)} Jt`
                  : `Rp ${totalUserRevenue.toLocaleString("id-ID")}`
              }
            </h3>
          </div>

          <div style={styles.doughnutWrapper}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg, #FAFAFA 0%, #FDF2F4 100%)",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(183, 110, 121, 0.08)",
    border: "1px solid rgba(183, 110, 121, 0.1)",
  },

  // STATS BAR
  statsBar: {
    display: "flex",
    gap: "40px",
    marginBottom: "40px",
    paddingBottom: "30px",
    borderBottom: "2px solid rgba(183, 110, 121, 0.1)",
    flexWrap: "wrap",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: "1",
    minWidth: "200px",
  },

  statIconBox: {
    width: "56px",
    height: "56px",
    background: "linear-gradient(135deg, #B76E79, #D49AA5)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(183, 110, 121, 0.25)",
    flexShrink: 0,
  },

  statIcon: {
    fontSize: "24px",
  },

  statLabel: {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
    display: "block",
  },

  statValue: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#1F2937",
    letterSpacing: "-0.5px",
  },

  statDivider: {
    width: "1px",
    background: "linear-gradient(to bottom, transparent, rgba(183, 110, 121, 0.3), transparent)",
    display: "none",
  },

  // CHART GRID
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
  },

  chartCard: {
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 20px rgba(183, 110, 121, 0.06)",
    border: "1px solid rgba(183, 110, 121, 0.08)",
  },

  chartCardSecondary: {
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 20px rgba(183, 110, 121, 0.06)",
    border: "1px solid rgba(183, 110, 121, 0.08)",
    display: "flex",
    flexDirection: "column",
  },

  chartHeader: {
    marginBottom: "24px",
  },

  chartTitleBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },

  chartIcon: {
    fontSize: "28px",
    marginTop: "2px",
  },

  chartTitle: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: "-0.3px",
  },

  chartSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },

  chartBody: {
    height: "300px",
    position: "relative",
  },

  doughnutWrapper: {
    position: "relative",
    height: "280px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // ✅ STYLE BARU: TOTAL REVENUE BOX (DI LUAR CHART)
  totalRevenueBox: {
    background: "linear-gradient(135deg, #FDF2F4, #F6E8EB)",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px solid rgba(183, 110, 121, 0.15)",
    boxShadow: "0 4px 12px rgba(183, 110, 121, 0.08)",
  },

  totalRevenueLabel: {
    display: "block",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
  },

  totalRevenueValue: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#1F2937",
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #B76E79, #D4A574)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
};

export default SalesChart;