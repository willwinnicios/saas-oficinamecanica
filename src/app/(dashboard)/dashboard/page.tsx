"use client";

import { 
  ClipboardList, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Users
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";

const stats = [
  { label: "OS Abertas", value: "24", icon: ClipboardList, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%", trendUp: true },
  { label: "Finalizadas (Mês)", value: "148", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", trend: "+5%", trendUp: true },
  { label: "Faturamento", value: "R$ 42.500", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", trend: "+18%", trendUp: true },
  { label: "Baixo Estoque", value: "12", icon: AlertTriangle, color: "text-error", bg: "bg-error/10", trend: "3 críticas", trendUp: false },
];

const revenueData = [
  { name: "Jan", total: 32000 },
  { name: "Fev", total: 28000 },
  { name: "Mar", total: 35000 },
  { name: "Abr", total: 42000 },
  { name: "Mai", total: 38000 },
  { name: "Jun", total: 45000 },
];

const osStatusData = [
  { name: "Aberta", value: 40, color: "#3B82F6" },
  { name: "Em Execução", value: 30, color: "#F59E0B" },
  { name: "Finalizada", value: 20, color: "#10B981" },
  { name: "Cancelada", value: 10, color: "#EF4444" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold">Olá, Oficina Silva! 👋</h2>
        <p className="text-muted mt-1">Aqui está o resumo da sua operação hoje.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-6 group hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center text-xs font-medium ${stat.trendUp ? "text-success" : "text-error"}`}>
                {stat.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Faturamento Mensal</h3>
              <p className="text-sm text-muted">Evolução dos últimos 6 meses</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">Ver detalhes</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `R$ ${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2563EB" 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* OS Status Chart */}
        <div className="glass p-6">
          <h3 className="text-lg font-bold mb-1">Status das OS</h3>
          <p className="text-sm text-muted mb-6">Distribuição atual</p>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={osStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {osStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold">124</p>
              <p className="text-[10px] text-muted uppercase">Total</p>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {osStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent OS */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Ordens de Serviço Recentes</h3>
            <button className="text-sm text-primary hover:underline">Ver todas</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">OS #2024-{100 + i}</p>
                    <p className="text-xs text-muted">João Pereira - Toyota Corolla</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
                    Em Execução
                  </span>
                  <p className="text-xs text-muted mt-1">Hoje, 10:30</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Novos Clientes</h3>
            <button className="text-sm text-primary hover:underline">Ver todos</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cliente Exemplo {i}</p>
                    <p className="text-xs text-muted">(11) 98765-4321</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">2 Veículos</p>
                  <p className="text-xs text-muted mt-1">Cadastrado há 2 dias</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
