"use client";

import MenuList from "./_components/MenuList";
import HomeInfo from "./_components/HomeInfo";

export default function HomePage() {
  // 실제로는 API 호출 등을 통해 데이터를 가져와야 합니다.
  const mockData = {
    leftMoney: 150000,
    inProgressCount: 3,
    todayTotalSpend: 25000,
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <MenuList />
      <HomeInfo data={mockData} />
    </div>
  );
}
