import Link from "next/link";
import { Plus, Lock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { formControlClassName } from "@/lib/form-control-styles";
import { ROUTES } from "@/config/routes";

export function RightSettingAccount() {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href={ROUTES.DASHBOARD.CREATE_ACCOUNT}
        className={cn(formControlClassName,
          "focus-ring flex size-12 items-center justify-center rounded-full border bg-olive-900/30", "transition-all duration-200 text-olive-500 ",
          "border-lime-500/10 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 hover:text-brand-gold"
        )}
        title="Criar Conta de Jogo"
        aria-label="Criar nova conta de jogo"
      >
        <Plus className="size-5" />
      </Link>
      <Link
        href={ROUTES.DASHBOARD.SETTINGS}
        className={cn(
          "focus-ring flex size-12 items-center justify-center rounded-full border bg-olive-900/30", "transition-all duration-200 text-olive-500 ",
          "border-lime-500/10 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 hover:text-brand-gold"
        )}
        title="Alterar Senha"
        aria-label="Alterar senha da conta"
      >
        <Lock className="size-5" />
      </Link>
      <Link
        href={ROUTES.DASHBOARD.SETTINGS}
        className={cn(
          "focus-ring flex size-12 items-center justify-center rounded-full border bg-olive-900/30", "transition-all duration-200 text-olive-500 ",
          "border-lime-500/10 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 hover:text-brand-gold"
        )}
        title="Configurações"
        aria-label="Configurações do perfil"
      >
        <Settings className="size-5" />
      </Link>
    </div>
  );
}
