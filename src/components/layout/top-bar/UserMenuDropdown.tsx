"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/logout-action";

interface UserMenuDropdownProps {
  firstName: string;
}

/**
 * Menu dropdown exibido quando o usuário está logado.
 *
 * Arquitetura do DOM:
 * <div.wrapper>          ← position:relative, overflow:visible (posiciona o dropdown)
 *   <button.bt-user-menu-btn>  ← visual idêntico ao LOGIN (overflow:hidden para o ::after)
 *   <ul.dropdown>        ← irmão do button → não é cortado pelo overflow do button
 * </div>
 */
export function UserMenuDropdown({ firstName }: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleClose}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          handleClose();
        }
      }}
    >
      {/*
       * O botão usa .bt-user-menu-btn (overflow:hidden + clip-path)
       * para ter o visual idêntico ao botão de LOGIN.
       * Como o <ul> é irmão (não filho) do button, ele NÃO é afetado
       * pelo overflow:hidden do button.
       */}
      <button
        type="button"
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Menu de conta"
        className="bt-top-bar-button h-16"
      >
        <span className="text-sm">{firstName}</span>
        <span
          className={cn(
            "ml-1.5 text-[10px] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {/* Dropdown — irmão do button, posicionado pelo wrapper pai */}
      <ul
        className={cn(
          "absolute right-0 z-50 min-w-48 top-[calc(100%-4px)]",
          "bg-[#111111]/95 backdrop-blur-sm",
          "border border-[#d4af37]/20",
          "rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.8)] py-1",
          "pointer-events-none invisible translate-y-1 opacity-0",
          "transition-all duration-200 ease-out",
          isOpen && "pointer-events-auto visible translate-y-0 opacity-100",
        )}
        role="menu"
        aria-label="Opções da conta"
      >
        <li role="none">
          <Link
            href={ROUTES.DASHBOARD.ROOT}
            onClick={handleClose}
            className={cn(
              "focus-ring flex w-full items-center px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-amber-100/80 transition-colors",
              "hover:bg-[#d4af37]/10 hover:text-brand-gold",
            )}
            role="menuitem"
          >
            Painel de Controle
          </Link>
        </li>
        <li role="none">
          <Link
            href={ROUTES.DASHBOARD.SETTINGS}
            onClick={handleClose}
            className={cn(
              "focus-ring flex w-full items-center px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-amber-100/80 transition-colors",
              "hover:bg-[#d4af37]/10 hover:text-brand-gold",
            )}
            role="menuitem"
          >
            Configuração
          </Link>
        </li>
        <li role="none" className="border-t border-[#d4af37]/10 mt-1 pt-1">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className={cn(
              "focus-ring flex w-full items-center px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-red-400 transition-colors text-left",
              "hover:bg-[#d4af37]/10 hover:text-brand-gold cursor-pointer",
            )}
            role="menuitem"
          >
            {isPending ? "Saindo..." : "Sair"}
          </button>
        </li>
      </ul>
    </div>
  );
}
