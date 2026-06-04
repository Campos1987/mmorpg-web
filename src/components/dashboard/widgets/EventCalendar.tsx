export function EventCalendar() {
  const events = [
    {
      day: "Today",
      time: "21:00",
      title: "Valakas Raid",
      active: true,
    },
    {
      day: "Sat",
      time: "18:00",
      title: "PvP Tournament",
      active: false,
    },
    {
      day: "Sun",
      time: "20:00",
      title: "Castle Siege",
      active: false,
    },
  ];

  return (
    <section className="border border-[#d4af37]/15 bg-[#111111]/90 rounded-xl p-5 shadow-lg">
      <h2 className="font-serif text-xs font-bold tracking-widest text-[#d4af37]/80 uppercase mb-4">
        Event Calendar
      </h2>
      <div className="relative flex justify-between items-start px-2 py-4 select-none">
        {/* Timeline connection bar */}
        <div className="absolute top-[37px] left-10 right-10 h-0.5 border-t border-dashed border-white/10 z-0" />
        <div className="absolute top-[37px] left-10 w-[50%] h-0.5 bg-gradient-to-r from-[#d4af37] to-[#d4af37]/30 z-0" />

        {events.map((ev, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center flex-1">
            {/* Day label */}
            <span
              className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                ev.active ? "text-[#d4af37]" : "text-dashboard-muted"
              }`}
            >
              {ev.day}
            </span>

            {/* Timeline Dot */}
            <div
              className={`size-4 rounded-full flex items-center justify-center ${
                ev.active
                  ? "bg-[#d4af37] ring-4 ring-[#d4af37]/30 shadow-[0_0_12px_#d4af37]"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              {ev.active && <div className="size-1.5 rounded-full bg-[#111111]" />}
            </div>

            {/* Time label */}
            <span className="text-[10px] text-dashboard-muted font-mono mt-3">
              {ev.time}
            </span>

            {/* Event Title */}
            <span
              className={`text-xs font-serif font-bold text-center mt-1.5 px-1 truncate w-full ${
                ev.active ? "text-[#d4af37] drop-shadow-[0_0_6px_rgba(212,175,55,0.2)]" : "text-white/85"
              }`}
            >
              {ev.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
