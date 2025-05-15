"use client";

import { getHeaderConfig } from "@/constants/headers";
import { usePathname } from "next/navigation";
import BackWithTitleHeader from "./BackWithTitleHeader";
import TitleHeader from "./TitleHeader";

export default function DynamicHeader() {
  const pathname = usePathname();
  const headerConfig = getHeaderConfig(pathname);

  if (headerConfig.type === "none") return null;
  if (headerConfig.type === "BackWithTitleHeader") {
    return <BackWithTitleHeader title={headerConfig.title || ""} />;
  }
  return <TitleHeader title={headerConfig.title || ""} />;
}
