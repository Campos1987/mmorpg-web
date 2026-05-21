import type { CurrencyBalance, SubAccount } from "@/types/dashboard";
import { cn } from "@/lib/utils";

import { CurrencyDisplay } from "./CurrencyDisplay";
import { SubAccountDropdown } from "./SubAccountDropdown";

type AccountHeaderProps = {
  subAccounts: SubAccount[];
  selectedSubAccountId: string;
  onSubAccountChange: (id: string) => void;
  currencies: CurrencyBalance;
  className?: string;
};

export function AccountHeader({
  subAccounts,
  selectedSubAccountId,
  onSubAccountChange,
  currencies,
  className,
}: AccountHeaderProps) {
  return (
    <section
      className={cn(
        "container-content flex flex-col gap-4 py-6 md:flex-row md:items-stretch md:gap-6",
        className,
      )}
      aria-label="Visão geral da conta"
    >
      <SubAccountDropdown
        accounts={subAccounts}
        selectedId={selectedSubAccountId}
        onSelect={onSubAccountChange}
      />
      <CurrencyDisplay currencies={currencies} className="md:max-w-md md:shrink-0" />
    </section>
  );
}
