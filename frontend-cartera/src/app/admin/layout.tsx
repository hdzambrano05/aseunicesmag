"use client";

import SidebarLayout from "../components/SidebarLayout";
import {
  ClipboardCheck,
  FolderOpen,
  Settings,
  ReceiptText,
  Bell,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      label: "Notificaciones",
      icon: Bell,
      path: "/admin/notificaciones",
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