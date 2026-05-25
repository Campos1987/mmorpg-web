export function CalendarPanel() {
  const events = [
    {
      day: "Today",
      time: "21:00",
      title: "Valakas Raid",
      isActive: true,
      glowColor: "rgba(251,191,36,0.6)", // gold glow
    },
    {
      day: "Sat",
      time: "18:00",
      title: "PvP Tournament",
      isActive: false,
      glowColor: "transparent",
    },
    {
      day: "Sun",
      time: "20:00",
      title: "Castle Siege",
      isActive: false,
      glowColor: "transparent",
    },
  ];

  return (
    <div className="glass-panel flex flex-col justify-between rounded-xl p-6 shadow-xl transition-dashboard hover:border-dashboard-neon-blue/30 lg:h-[220px]">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-dashboard-muted mb-6">
        Event Calendar
      </h3>

      <div className="relative flex items-stretch justify-between px-4">
        {/* Linha de Fundo do Cronograma */}
        <div className="absolute top-[41px] left-10 right-10 h-0.5 border-t-2 border-dashed border-border" />
        {/* Linha Ativa Dourada do Cronograma */}
        <div className="absolute top-[41px] left-10 w-[20%] h-0.5 bg-gradient-to-r from-dashboard-gold to-border" />

        {events.map((evt, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center flex-1 text-center">
            {/* Rótulo do Dia */}
            <span
              className={`text-sm font-semibold tracking-wider transition-colors duration-300 ${
                evt.isActive ? "text-dashboard-gold" : "text-dashboard-muted"
              }`}
            >
              {evt.day}
            </span>

            {/* Nó/Círculo da Timeline */}
            <div className="my-2.5 flex h-7 w-7 items-center justify-center">
              {evt.isActive ? (
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-dashboard-gold/30" />
                  <div className="h-4 w-4 rounded-full border-2 border-dashboard-gold bg-brand-dark shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full border-2 border-border bg-brand-dark transition-all duration-300 hover:border-dashboard-neon-blue/40" />
              )}
            </div>

            {/* Detalhes do Evento */}
            <div className="flex flex-col mt-1">
              <span className="text-[10px] font-bold text-dashboard-muted">
                {evt.time}
              </span>
              <span
                className={`font-serif text-xs font-semibold tracking-wide transition-colors mt-1 ${
                  evt.isActive ? "text-dashboard-gold font-bold" : "text-foreground/90"
                }`}
              >
                {evt.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
