"use client";

import SidebarLayout from "../components/SidebarLayout";
import {
  ClipboardCheck,
  FolderOpen,
  Settings,
  ReceiptText,
  FileBadge,
} from "lucide-react";

import { useAutoLogout } from "@/hooks/useAutoLogout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoLogout();

  const menu = [
    {
      label: "Verificación",
      icon: ClipboardCheck,
      path: "/admin/dashboard",
    },
    {
      label: "Recibos de pago",
      icon: ReceiptText,
      path: "/admin/recibos-pago",
    },
    {
      label: "Certificados",
      icon: FileBadge,
      path: "/admin/certificados",
    },
    {
      label: "Expedientes",
      icon: FolderOpen,
      path: "/admin/expedientes",
    },
    {
      label: "Configuración",
      icon: Settings,
      path: "/admin/configuracion",
    },
  ];

  return (
    <SidebarLayout
      titulo="Panel Admin"
      subtitulo="Gestión de afiliados"
      menu={menu}
    >
      {children}
    </SidebarLayout>
  );
}
