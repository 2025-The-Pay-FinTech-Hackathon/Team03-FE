"use client";

import MenuList from "./_components/MenuList";
import HomeInfo from "./_components/HomeInfo";

export default function HomePage() {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <MenuList />
      <HomeInfo />
    </div>
  );
}
