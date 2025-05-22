import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A569BD", "#45B39D", "#E67E22"
];

const ReportByService = () => {
  // Dữ liệu giả nằm trong component luôn
  const data = [
    { name: "Giặt ủi", value: 0.5 },
    { name: "Ăn sáng", value: 1.0 },
    { name: "Đưa đón", value: 0.8 },
    { name: "Spa", value: 1.1 },
    { name: "Thuê xe", value: 0.9 },
  ];

  return (
    <div style={{ width: "100%", height: 400, marginTop: 40 }}>
      <h3 className="mb-4 text-center text-lg font-semibold">Tổng tiền theo dịch vụ</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            labelLine={false}
            startAngle={0}
            endAngle={360}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip formatter={(value) => `${value} triệu`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportByService;
