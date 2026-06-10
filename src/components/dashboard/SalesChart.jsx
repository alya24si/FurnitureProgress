import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
    ],

    datasets: [
      {
        label: "Penjualan Furniture",

        data: [
          12000000,
          18000000,
          22000000,
          25000000,
          32000000,
          38000000,
        ],

        borderColor: "#B76E79",

        backgroundColor:
          "rgba(183,110,121,0.2)",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
      }}
    >
      <h3>
        Grafik Penjualan Furniture
      </h3>

      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default SalesChart;