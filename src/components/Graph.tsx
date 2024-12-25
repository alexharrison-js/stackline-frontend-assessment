import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
}

interface GraphProps {
  salesData: SalesData[];
}

const Graph: React.FC<GraphProps> = ({ salesData }) => {
  const formatMonthYear = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: "short", year: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date).toUpperCase();
  };

  const data = {
    labels: salesData.map((item) => formatMonthYear(item.weekEnding)),
    datasets: [
      {
        label: "Retail Sales",
        data: salesData.map((item) => item.retailSales),
        borderColor: "rgb(76,170,246)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Wholesale Sales",
        data: salesData.map((item) => item.wholesaleSales),
        borderColor: "rgb(171,179,201)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Typing as any here due to extensive struggles with this particular component working with typescript
  // In a non POC assessment situation I would investigate this further and type it properly
  const options: any = {
    responsive: true,
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
      },
    },
    plugins: {
      legend: {
        position: "top" as "top",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
