"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SpendingChartProps {
  shopping: number;
  food: number;
  culture: number;
  etc: number;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

export default function SpendingChart({
  shopping,
  food,
  culture,
  etc,
}: SpendingChartProps) {
  const data = [
    { name: "쇼핑", value: shopping },
    { name: "식비", value: food },
    { name: "문화생활", value: culture },
    { name: "기타", value: etc },
  ];

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">카테고리별 지출</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full sm:w-auto space-y-3 py-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
              </div>
              <div className="text-sm text-gray-500">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
