import Image from "next/image";

import { GlassCard } from "@/components/dashboard/ui";
import type { CurrencyBalance } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type CurrencyDisplayProps = {
  currencies: CurrencyBalance;
  className?: string;
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function CurrencyDisplay({ currencies, className }: CurrencyDisplayProps) {
  return (
    <GlassCard className={cn("flex flex-col gap-4 sm:flex-row sm:gap-8", className)}>
      <div className="flex items-center gap-3">
        <Image
          src="/assets/dashboard/icons/gold.svg"
          alt=""
          width={32}
          height={32}
          aria-hidden
        />
        <div>
          <p className="text-lg font-bold text-brand-gold">
            {formatNumber(currencies.gold)}
          </p>
          <p className="text-xs text-muted">Ouro do Jogo</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src="/assets/dashboard/icons/diamond.svg"
          alt=""
          width={32}
          height={32}
          aria-hidden
        />
        <div>
          <p className="text-lg font-bold text-brand-logo">
            {formatNumber(currencies.diamonds)}
          </p>
          <p className="text-xs text-muted">Diamantes</p>
        </div>
      </div>
    </GlassCard>
  );
}
