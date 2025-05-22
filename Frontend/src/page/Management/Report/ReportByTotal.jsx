import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Tháng 1", revenue: 12 },
  { month: "Tháng 2", revenue: 18 },
  { month: "Tháng 3", revenue: 15 },
  { month: "Tháng 4", revenue: 20 },
  { month: "Tháng 5", revenue: 22 },
];

// Màu gradient cho cột
const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.revenue));
  const dataMin = Math.min(...data.map((i) => i.revenue));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const ReportByTotal = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Báo cáo doanh thu từ tháng 1 đến tháng 5 năm nay (triệu đồng)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          barCategoryGap="20%"
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#374151", fontWeight: "600" }}
            axisLine={{ stroke: "#9CA3AF" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#374151", fontWeight: "600" }}
            axisLine={{ stroke: "#9CA3AF" }}
            tickLine={false}
            label={{
              value: "Triệu đồng",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fill: "#6B7280",
              fontWeight: "600",
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }}
            itemStyle={{ color: "#FBBF24", fontWeight: "700" }}
            formatter={(value) => `${value} triệu`}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontWeight: "700", color: "#374151" }}
          />
          <Bar
            dataKey="revenue"
            fill="url(#colorRevenue)"
            name="Doanh thu"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportByTotal;
