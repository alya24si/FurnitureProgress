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

  // Helper untuk mengubah tanggal string/ISO menjadi format Bulan-Tahun (Contoh: "Jan 2026")
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
  // CONFIG DATA: GRAFIK BATANG (BULANAN)
  // ==========================================
  const barData = {
    labels,
    datasets: [
      {
        label: "Total Pendapatan",
        data: values,
        borderRadius: 8,
        borderSkipped: false,
        backgroundColor: "rgba(183, 132, 167, 0.85)",
        hoverBackgroundColor: "#3A2436",
        barThickness: 35, // Batang dibuat tebal dan kokoh agar enak dilihat
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: "#3A2436",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return ` Total Omzet: Rp ${context.raw.toLocaleString("id-ID")}`;
          }
        }
      }
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { color: "#8A7485", font: { family: "'Inter', sans-serif", size: 12, weight: "600" } } 
      },
      y: {
        grid: { color: "rgba(183, 132, 167, 0.06)", drawTicks: false },
        border: { dash: [5, 5] },
        ticks: {
          color: "#8A7485",
          font: { family: "'Inter', sans-serif", size: 11 },
          callback: (value) => value >= 1000000 ? "Rp " + (value / 1000000) + " Jt" : value >= 1000 ? "Rp " + (value / 1000) + " Rb" : "Rp " + value
        }
      }
    }
  };

  // ==========================================
  // CONFIG DATA: DOUGHNUT CHART (USER RATIO)
  // ==========================================
  const doughnutData = {
    labels: ["Registered Members", "Active Customers"],
    datasets: [
      {
        data: [totalMembers, totalCustomers],
        backgroundColor: ["#B784A7", "#3A2436"],
        borderWidth: 3,
        borderColor: "#ffffff",
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
          font: { family: "'Inter', sans-serif", size: 12, weight: "600" },
          color: "#4A3546"
        }
      },
      tooltip: {
        backgroundColor: "#3A2436",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return ` ${context.label}: ${context.raw} Orang`;
          }
        }
      }
    },
    cutout: "70%",
  };

  return (
    <div>
      {/* MINI STATS BAR */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "35px", borderBottom: "1px solid rgba(183, 132, 167, 0.1)", paddingBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Rata-rata / Bulan</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#3A2436" }}>
            Rp {avgSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </h4>
        </div>
        <div style={{ borderLeft: "1px solid rgba(183, 132, 167, 0.2)", paddingLeft: "30px" }}>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Puncak Omzet</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#B784A7" }}>
            Rp {maxSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </h4>
        </div>
        <div style={{ borderLeft: "1px solid rgba(183, 132, 167, 0.2)", paddingLeft: "30px" }}>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Durasi Data</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#3A2436" }}>
            {values.length} Bulan Terpantau
          </h4>
        </div>
      </div>

      {/* TWO COLUMNS VIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px", minHeight: "300px" }}>
        {/* Kiri: Grafik Batang Bulanan */}
        <div style={{ position: "relative" }}>
          <p style={{ margin: "0 0 15px 0", fontSize: "13px", fontWeight: "700", color: "#8A7485", textTransform: "uppercase", letterSpacing: "0.5px" }}>📈 Tren Pendapatan Bulanan</p>
          <div style={{ height: "270px", position: "relative" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Kanan: Doughnut */}
        <div style={{ position: "relative", borderLeft: "1px solid rgba(183, 132, 167, 0.15)", paddingLeft: "35px" }}>
          <p style={{ margin: "0 0 15px 0", fontSize: "13px", fontWeight: "700", color: "#8A7485", textTransform: "uppercase", letterSpacing: "0.5px" }}>👥 Rasio Pengguna</p>
          <div style={{ height: "240px", position: "relative" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesChart;