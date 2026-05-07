"use client";

import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="glass p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          OficinaPro
        </h1>
        <p className="text-muted mt-2">Bem-vindo de volta! Faça login na sua conta.</p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full bg-slate-900/50 border border-border rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted">Senha</label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-border rounded-md py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6"
        >
          <LogIn size={20} />
          Entrar no Sistema
        </button>
      </form>

      <div className="text-center pt-4 border-t border-border/50">
        <p className="text-sm text-muted">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Cadastrar oficina
          </Link>
        </p>
      </div>
      
      <div className="flex items-center gap-2 justify-center text-[10px] text-muted/50 uppercase tracking-widest mt-8">
        <span>Privacidade</span>
        <span>•</span>
        <span>Termos</span>
        <span>•</span>
        <span>Suporte</span>
      </div>
    </div>
  );
}
