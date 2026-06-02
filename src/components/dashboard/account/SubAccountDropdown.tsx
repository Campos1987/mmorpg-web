"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { SubAccount } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import {
  formControlClassName,
  formControlDefaultClassName,
} from "@/lib/form-control-styles";

type SubAccountDropdownProps = {
  accounts: SubAccount[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

function formatAccountLabel(account: SubAccount): string {
  if (!account.characters || account.characters.length === 0) {
    return `${account.nickname} ( Sem personagens )`;
  }
  const charsStr = account.characters
    .map((c) => `${c.name} - lvl ${c.level}`)
    .join(" || ");
  return `${account.nickname} ( ${charsStr} )`;
}

export function SubAccountDropdown({
  accounts,
  selectedId,
  onSelect,
  className,
}: SubAccountDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const selected =
    accounts.find((a) => a.id === selectedId) ?? accounts[0] ?? null;

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      setIsOpen(false);
    },
    [onSelect],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  if (!selected) {
    return (
      <p className="text-sm text-dashboard-muted" role="status">
        Nenhuma sub-conta disponível
      </p>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative min-w-0 flex-1", className)}>
      <button
        type="button"
        id={`${listboxId}-trigger`}
        className={cn(
          formControlClassName,
          formControlDefaultClassName,
          "flex items-center justify-between gap-2 text-left transition-colors",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="truncate font-medium text-foreground">
          {formatAccountLabel(selected)}
        </span>
        <span
          className={cn(
            "shrink-0 text-brand-gold transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden
        >
          ▼
        </span>
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={`${listboxId}-trigger`}
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-auto",
            "bg-[#111111]/95 backdrop-blur-sm",
            "border border-[#d4af37]/20",
            "rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.8)] py-1",
          )}
        >
          {accounts.map((account) => {
            const isSelected = account.id === selectedId;
            return (
              <li key={account.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "focus-ring flex w-full items-center px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-amber-100/80 transition-colors",
                    "hover:bg-[#d4af37]/10 hover:text-brand-gold",
                    isSelected && "bg-[#d4af37]/20 text-brand-gold font-semibold",
                  )}
                  onClick={() => handleSelect(account.id)}
                >
                  {formatAccountLabel(account)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
