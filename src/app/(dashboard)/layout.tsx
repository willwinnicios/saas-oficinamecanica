import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pl-72 pr-4 py-4">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="px-4 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
