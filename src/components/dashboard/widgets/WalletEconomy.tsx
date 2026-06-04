import { Gem } from "lucide-react";
import type { CurrencyBalance } from "@/types/dashboard";

type WalletEconomyProps = {
  currencies: CurrencyBalance;
};

export function WalletEconomy({ currencies }: WalletEconomyProps) {
  const formatAdena = (amount: number) => {
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1).replace(".0", "")}M`;
    }
    return amount.toLocaleString("pt-BR");
  };

  return (
    <section className="border border-[#d4af37]/15 bg-[#111111]/90 rounded-xl p-5 shadow-lg">
      <h2 className="font-serif text-xs font-bold tracking-widest text-[#d4af37]/80 uppercase mb-4">
        Wallet & Economy
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Adena */}
        <div className="flex items-center gap-3.5 bg-black/40 border border-white/5 rounded-lg p-3.5 hover:border-[#d4af37]/30 transition-all duration-300">
          <div className="flex size-11 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)] select-none shrink-0">
            <span className="font-serif font-extrabold text-base">A</span>
          </div>
          <div className="min-w-0">
            <div className="font-serif text-lg font-bold text-white leading-none truncate">
              {formatAdena(currencies.gold)}
            </div>
            <div className="text-[10px] text-dashboard-muted font-bold tracking-wider uppercase mt-1">
              Adena
            </div>
          </div>
        </div>

        {/* Diamonds */}
        <div className="flex items-center gap-3.5 bg-black/40 border border-white/5 rounded-lg p-3.5 hover:border-dashboard-neon-blue/30 transition-all duration-300">
          <div className="flex size-11 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)] shrink-0">
            <Gem className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="font-serif text-lg font-bold text-white leading-none truncate">
              {currencies.diamonds.toLocaleString("pt-BR")}
            </div>
            <div className="text-[10px] text-dashboard-muted font-bold tracking-wider uppercase mt-1">
              Diamonds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
