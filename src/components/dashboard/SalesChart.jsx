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

// Registrasi ArcElement khusus untuk merender chart melingkar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function SalesChart({ purchases, totalMembers, totalCustomers }) {
  const groupedData = {};

  purchases.forEach((item) => {
    const date = new Date(item.purchase_date).toLocaleDateString("id-ID");
    groupedData[date] = (groupedData[date] || 0) + Number(item.total);
  });

  const labels = Object.keys(groupedData);
  const values = Object.values(groupedData);

  const totalSum = values.reduce((a, b) => a + b, 0);
  const avgSales = values.length > 0 ? totalSum / values.length : 0;
  const maxSales = values.length > 0 ? Math.max(...values) : 0;

  // ==========================================
  // CONFIG DATA: GRAFIK BATANG (PENDAPATAN)
  // ==========================================
  const barData = {
    labels,
    datasets: [
      {
        label: "Total Penjualan",
        data: values,
        borderRadius: 8,
        borderSkipped: false,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(183, 132, 167, 0.8)";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "#B784A7");
          gradient.addColorStop(1, "#E4A5B8");
          return gradient;
        },
        hoverBackgroundColor: "#3A2436",
        barThickness: 24,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8A7485", font: { family: "'Inter', sans-serif", size: 11 } } },
      y: {
        grid: { color: "rgba(183, 132, 167, 0.06)", drawTicks: false },
        border: { dash: [5, 5] },
        ticks: {
          color: "#8A7485",
          font: { family: "'Inter', sans-serif", size: 11 },
          callback: (value) => value >= 1000000 ? "Rp " + (value / 1000000) + "M" : value >= 1000 ? "Rp " + (value / 1000) + "K" : "Rp " + value
        }
      }
    }
  };

  // ==========================================
  // CONFIG DATA: PIE / DOUGHNUT CHART (USER RATIO)
  // ==========================================
  const doughnutData = {
    labels: ["Registered Members", "Active Customers"],
    datasets: [
      {
        data: [totalMembers, totalCustomers],
        backgroundColor: ["#B784A7", "#3A2436"], // Kombinasi palet warna tema rose gold & deep plum
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
    cutout: "70%", // Efek lingkaran cincin modern
  };

  return (
    <div>
      {/* MINI STATS BAR */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "35px", borderBottom: "1px solid rgba(183, 132, 167, 0.1)", paddingBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Rata-rata Harian</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#3A2436" }}>
            Rp {avgSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </h4>
        </div>
        <div style={{ borderLeft: "1px solid rgba(183, 132, 167, 0.2)", paddingLeft: "30px" }}>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Penjualan Tertinggi</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#B784A7" }}>
            Rp {maxSales.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </h4>
        </div>
        <div style={{ borderLeft: "1px solid rgba(183, 132, 167, 0.2)", paddingLeft: "30px" }}>
          <span style={{ fontSize: "12px", color: "#8A7485", fontWeight: "600", textTransform: "uppercase" }}>Total Terpeta</span>
          <h4 style={{ margin: "5px 0 0 0", fontSize: "18px", fontWeight: "700", color: "#3A2436" }}>
            {values.length} Hari Aktif
          </h4>
        </div>
      </div>

      {/* TWO COLUMNS VIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px", minHeight: "300px" }}>
        {/* Kiri: Grafik Batang Arus Kas */}
        <div style={{ position: "relative" }}>
          <p style={{ margin: "0 0 15px 0", fontSize: "13px", fontWeight: "700", color: "#8A7485", textTransform: "uppercase", letterSpacing: "0.5px" }}>📈 Tren Pendapatan Harian</p>
          <div style={{ height: "270px", position: "relative" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Kanan: Pie/Doughnut Perbandingan User */}
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