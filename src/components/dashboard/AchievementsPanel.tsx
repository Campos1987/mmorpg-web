export function AchievementsPanel() {
  const achievements = [
    {
      title: "Dragon Slayer",
      desc: "Defeated all Raid bosses",
      progress: "5/5",
      isComplete: true,
      icon: (
        <svg
          className="h-6 w-6 text-amber-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z"
          />
        </svg>
      ),
      bgClass: "from-amber-950/40 to-yellow-900/10 border-amber-500/25",
    },
    {
      title: "PvP Warlord",
      desc: "100 PvP Wins",
      progress: "100/100",
      isComplete: true,
      icon: (
        <svg
          className="h-6 w-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l.406.34c.502.42.737 1.096.588 1.742-.113.489-.44 1.16-.44 1.16M11.25 20.97v-.569c0-.334-.148-.65-.405-.864l-.406-.34c-.502-.42-.737-1.096-.588-1.742.113-.489.44-1.16.44-1.16m8.455-8.455h-.568c-.334 0-.65.148-.864.405l-.34.406c-.42.502-1.096.737-1.742.588-.489-.113-1.16-.44-1.16-.44m-12.02 3.03h.568c.334 0 .65-.148.864-.405l.34-.406c.42-.502 1.096-.737 1.742-.588.489.113 1.16.44 1.16.44M18.364 5.636l-.402.402c-.236.236-.355.564-.306.897l.076.513c.118.802-.245 1.614-.93 2.073l-.43.288M5.636 18.364l.402-.402c.236-.236.355-.564.306-.897l-.076-.513c-.118-.802.245-1.614.93-2.073l.43-.288M18.364 18.364l-.402-.402c-.236-.236-.564-.355-.897-.306l-.513.076c-.802.118-1.614-.245-2.073-.93l-.288-.43M5.636 5.636l.402.402c.236.236.564.355.897.306l.513-.076c.802-.118 1.614.245 2.073.93l.288.43M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          />
        </svg>
      ),
      bgClass: "from-red-950/40 to-rose-900/10 border-red-500/25",
    },
    {
      title: "Treasure Hunter",
      desc: "Accumulated 100M Adena",
      progress: "Accumulating...",
      isComplete: false,
      icon: (
        <svg
          className="h-6 w-6 text-dashboard-gold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
      bgClass: "from-amber-950/20 to-brand-dark border-border",
    },
    {
      title: "Skill Master",
      desc: "Level 85 Mastery",
      progress: "85/85 Skills",
      isComplete: true,
      icon: (
        <svg
          className="h-6 w-6 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499c.15-.461.821-.461.97 0l2.124 6.542a.5.5 0 00.476.35h6.877c.488 0 .69.63.292.937l-5.563 4.043a.5.5 0 00-.174.536l2.124 6.542c.15.461-.383.847-.788.558l-5.563-4.043a.5.5 0 00-.57-.008L5.918 21.9a.5.5 0 01-.788-.558l2.124-6.542a.5.5 0 00-.174-.536L1.517 10.328c-.397-.307-.195-.937.292-.937h6.876a.5.5 0 00.477-.35l2.123-6.543z"
          />
        </svg>
      ),
      bgClass: "from-yellow-950/30 to-amber-900/10 border-yellow-500/25",
    },
  ];

  return (
    <div className="glass-panel rounded-xl p-6 shadow-xl transition-dashboard hover:border-dashboard-neon-blue/30">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-dashboard-muted mb-4">
        Achievements
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 rounded-lg border bg-gradient-to-br p-3.5 ${ach.bgClass}`}
          >
            {/* Box do Ícone */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-dark/60 border border-border shadow-inner">
              {ach.icon}
            </div>

            {/* Conteúdo textual */}
            <div className="flex flex-col min-w-0">
              <span className="truncate font-serif text-sm font-semibold text-foreground">
                {ach.title}
              </span>
              <span className="truncate text-[10px] text-dashboard-muted">
                {ach.desc}
              </span>
              <span
                className={`mt-1 text-[10px] font-bold ${
                  ach.isComplete ? "text-dashboard-gold" : "text-dashboard-muted"
                }`}
              >
                {ach.progress}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
