export function ChallengesPanel() {
  const challenges = [
    {
      title: "Raids",
      subtitle: "Incursions",
      progressText: "2 / 3",
      percentage: 66,
      icon: (
        <svg
          className="h-8 w-8 text-dashboard-neon-blue"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
        </svg>
      ),
    },
    {
      title: "PvP",
      subtitle: "PvP Daily",
      progressText: "1 / 5",
      percentage: 20,
      icon: (
        <svg
          className="h-8 w-8 text-dashboard-danger"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Adena",
      subtitle: "Collector",
      progressText: "42%",
      percentage: 42,
      icon: (
        <svg
          className="h-8 w-8 text-dashboard-gold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="glass-panel rounded-xl p-6 shadow-xl transition-dashboard hover:border-dashboard-neon-blue/30">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-dashboard-muted mb-4">
        Daily Challenges
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {challenges.map((ch, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between rounded-lg border border-border bg-brand-dark/40 p-4 text-center"
          >
            {/* Box do Ícone */}
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark/80 border border-border shadow-inner">
              {ch.icon}
            </div>

            {/* Títulos */}
            <div className="mb-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-dashboard-muted">
                {ch.title}
              </p>
              <p className="font-serif text-sm font-semibold text-foreground">
                {ch.subtitle}
              </p>
            </div>

            {/* Progresso */}
            <div className="w-full">
              <span className="mb-1 block text-[10px] font-bold text-dashboard-gold">
                {ch.progressText}
              </span>
              <div className="h-1.5 w-full rounded-full bg-brand-dark overflow-hidden border border-border">
                <div
                  className="h-full rounded-full bg-dashboard-gold transition-all duration-500 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  style={{ width: `${ch.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
