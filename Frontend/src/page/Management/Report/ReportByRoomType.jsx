import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A569BD", "#45B39D", "#E67E22"
];

const ReportByRoomType = () => {
  // Dữ liệu giả nằm trong component luôn
  const data = [
    { name: "Phòng đơn", value: 1.5 },
    { name: "Phòng đôi", value: 2.2 },
    { name: "Phòng VIP", value: 3.0 },
    { name: "Phòng gia đình", value: 1.8 },
    { name: "Phòng Deluxe", value: 2.5 },
    { name: "Phòng Suite", value: 2.0 },
    { name: "Phòng Standard", value: 1.2 },
  ];

  return (
    <div style={{ width: "100%", height: 400 , marginTop: 40 }}>
      <h3 className="mb-4 text-center text-lg font-semibold">Tổng tiền theo loại phòng</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
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

export default ReportByRoomType;
