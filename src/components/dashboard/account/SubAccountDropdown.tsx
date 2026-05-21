"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { SubAccount } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type SubAccountDropdownProps = {
  accounts: SubAccount[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

function formatAccountLabel(account: SubAccount): string {
  return `${account.nickname} (${account.className} Nível ${account.level})`;
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
          "focus-ring glass-panel flex w-full min-h-12 items-center justify-between gap-2",
          "rounded-xl px-4 py-3 text-left text-sm transition-dashboard",
          "hover:border-dashboard-neon-blue/40",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="truncate font-medium text-white">
          {formatAccountLabel(selected)}
        </span>
        <span
          className={cn(
            "shrink-0 text-dashboard-neon-blue transition-dashboard",
            isOpen && "rotate-180",
          )}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={`${listboxId}-trigger`}
          className={cn(
            "absolute left-0 right-0 z-20 mt-2 max-h-60 overflow-auto",
            "glass-panel rounded-xl py-1 shadow-lg",
          )}
        >
          {accounts.map((account) => {
            const isSelected = account.id === selectedId;
            return (
              <li key={account.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "focus-ring w-full px-4 py-3 text-left text-sm transition-dashboard",
                    "hover:bg-dashboard-neon-blue/10",
                    isSelected && "bg-dashboard-neon-purple/15 text-dashboard-neon-blue",
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
