"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

export function StatusChart({ data }: { data: StatusData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={45}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
