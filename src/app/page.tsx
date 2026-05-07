import Link from "next/link";

export default function RootPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">OficinaPro</h1>
      <p className="text-slate-400 mb-8">Sistema de Gestão Inteligente para sua Oficina</p>
      <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold transition-colors">
        Acessar Sistema
      </Link>
    </div>
  );
}

