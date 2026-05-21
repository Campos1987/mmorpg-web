import Image from "next/image";

import { GlassCard } from "@/components/dashboard/ui";
import type { GameEvent } from "@/types/dashboard";

type EventCalendarWidgetProps = {
  event: GameEvent;
};

export function EventCalendarWidget({ event }: EventCalendarWidgetProps) {
  return (
    <GlassCard as="section">
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="/assets/dashboard/icons/calendar.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden
        />
        <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-dashboard-neon-blue md:text-base">
          Calendário de Eventos
        </h3>
      </div>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={event.bannerSrc}
          alt=""
          width={400}
          height={120}
          className="h-28 w-full object-cover opacity-40 md:h-32"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dashboard-bg-deep via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-serif text-lg font-bold text-white">{event.title}</p>
          <p className="text-sm text-dashboard-muted">
            {event.dateLabel} · {event.timeLabel}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
