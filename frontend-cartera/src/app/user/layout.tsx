"use client";

import SidebarLayout from "../components/SidebarLayout";
import { LayoutDashboard, ReceiptText, Bell, User } from "lucide-react";

export default function AsociadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/asociado/dashboard",
    },
    {
      label: "Mis recibos",
      icon: ReceiptText,
      path: "/asociado/recibos",
    },
    {
      label: "Notificaciones",
      icon: Bell,
      path: "/asociado/notificaciones",
    },
    {
      label: "Mi perfil",
      icon: User,
      path: "/asociado/perfil",
    },
  ];

  return (
    <SidebarLayout titulo="Panel Asociado" subtitulo="Mi cuenta" menu={menu}>
      {children}
    </SidebarLayout>
  );
}
