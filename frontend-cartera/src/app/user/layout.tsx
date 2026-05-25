"use client";

import SidebarLayout from "../components/SidebarLayout";
import { LayoutDashboard, ReceiptText, Bell, User } from "lucide-react";

import { useAutoLogout } from "@/hooks/useAutoLogout";

export default function AsociadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoLogout();

  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/asociado/dashboard",
    },
  ];

  return (
    <SidebarLayout titulo="Panel Asociado" subtitulo="Mi cuenta" menu={menu}>
      {children}
    </SidebarLayout>
  );
}
