"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  ClipboardList, 
  FileText, 
  Package, 
  ShoppingCart, 
  Truck, 
  DollarSign, 
  UserSquare2, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Clientes", href: "/customers" },
  { icon: Car, label: "Veículos", href: "/vehicles" },
  { icon: ClipboardList, label: "Ordens de Serviço", href: "/service-orders" },
  { icon: FileText, label: "Orçamentos", href: "/quotes" },
  { icon: Package, label: "Estoque", href: "/stock" },
  { icon: Globe, label: "Comparador Web", href: "/compare" },
  { icon: ShoppingCart, label: "Compras", href: "/purchases" },
  { icon: Truck, label: "Fornecedores", href: "/suppliers" },
  { icon: DollarSign, label: "Financeiro", href: "/finance" },
  { icon: UserSquare2, label: "Funcionários", href: "/employees" },
  { icon: BarChart3, label: "Relatórios", href: "/reports" },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen glass fixed left-0 top-0 m-4 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          OficinaPro
        </h1>
        <p className="text-xs text-muted mt-1 uppercase tracking-wider font-semibold">SaaS Management</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item",
                isActive && "sidebar-item-active"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button className="sidebar-item w-full text-error hover:bg-error/10 hover:text-error">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
