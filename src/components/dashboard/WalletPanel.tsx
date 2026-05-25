export function WalletPanel() {
  return (
    <div className="glass-panel rounded-xl p-6 shadow-xl transition-dashboard hover:border-dashboard-neon-blue/30">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-dashboard-muted mb-4">
        Wallet & Economy
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Adena (Gold Coins) */}
        <div className="flex items-center gap-4 rounded-lg bg-brand-dark/40 border border-border p-4">
          {/* Ícone de Moeda de Ouro */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
            <span className="font-serif text-base font-bold text-amber-950 select-none">A</span>
            <div className="absolute inset-0.5 rounded-full border border-amber-200/40" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-dashboard-gold">
              12.4M
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-dashboard-muted">
              Adena
            </span>
          </div>
        </div>

        {/* Diamonds */}
        <div className="flex items-center gap-4 rounded-lg bg-brand-dark/40 border border-border p-4">
          {/* Ícone de Diamante */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-300 via-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
            <svg
              className="h-6 w-6 text-sky-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            <div className="absolute inset-0.5 rounded-md border border-sky-200/30" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-sky-200">
              3,420
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-dashboard-muted">
              Diamonds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
