import React from "react";
import { useActivities } from "../context/ActivityProvider";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsView: React.FC = () => {
  const { activities } = useActivities();
  console.log("activities", activities);

  // Dữ liệu cho biểu đồ Pie: phân loại hoạt động
  const categoryData = ["study", "work", "relax", "other"].map((cat) => ({
    name: cat,
    value: activities.filter((a) => a.category === cat).length,
  }));

  // Dữ liệu cho biểu đồ Bar: chi phí theo hoạt động
  const costData = activities
    .filter((a) => typeof a.cost === "number" && a.cost > 0)
    .map((a) => ({
      name: a.name,
      cost: a.cost,
    }));

  return (
    <div style={{ padding: "24px", color: "#000" }}>
      <h2>Thống kê</h2>

      {/* Biểu đồ Pie: phân loại hoạt động */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Phân loại hoạt động</h3>
        {categoryData.every((d) => d.value === 0) ? (
          <p>Không có dữ liệu phân loại hoạt động</p>
        ) : (
          <PieChart width={400} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </div>

      {/* Biểu đồ Bar: chi phí theo hoạt động */}
      <div>
        <h3>Chi phí theo hoạt động</h3>
        {costData.length === 0 ? (
          <p>Không có dữ liệu chi phí</p>
        ) : (
          <BarChart width={600} height={300} data={costData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#8884d8" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default StatsView;
