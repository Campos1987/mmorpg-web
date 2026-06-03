import type { CurrencyBalance, SubAccount } from "@/types/dashboard";
import { cn } from "@/lib/utils";

import { SubAccountDropdown } from "./SubAccountDropdown";
import { RightSettingAccount } from "./RightSettingAccount";

type AccountHeaderProps = {
  subAccounts: SubAccount[];
  selectedSubAccountId: string;
  onSubAccountChange: (id: string) => void;
  currencies: CurrencyBalance;
  className?: string;
};

export function AccountHeader(props: AccountHeaderProps) {
  const { subAccounts, selectedSubAccountId, onSubAccountChange, className } =
    props;
  return (
    <section
      className={cn(
        "container-content flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-6 mb-0",
        className,
      )}
      aria-label="Visão geral da conta"
    >
      <div className="flex flex-1 items-center gap-3 w-full">
        <SubAccountDropdown
          accounts={subAccounts}
          selectedId={selectedSubAccountId}
          onSelect={onSubAccountChange}
        />
        <RightSettingAccount />
      </div>
    </section>
  );
}
