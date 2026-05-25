"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Character } from "@/types/dashboard";
import { cn } from "@/lib/utils";

import { CharacterCard } from "./CharacterCard";

type CharacterCarouselProps = {
  characters: Character[];
  activeCharacterId: string | null;
  onCharacterSelect: (characterId: string) => void;
  className?: string;
};

export function CharacterCarousel({
  characters,
  activeCharacterId,
  onCharacterSelect,
  className,
}: CharacterCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const scrollByDirection = useCallback((direction: -1 | 1) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("article")?.clientWidth ?? 280;
    container.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || characters.length === 0) return;

    const handleScroll = () => {
      const cardWidth = container.querySelector("article")?.clientWidth ?? 280;
      const gap = 16;
      const index = Math.round(container.scrollLeft / (cardWidth + gap));
      setActiveDotIndex(Math.min(index, characters.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [characters.length]);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("article")?.clientWidth ?? 280;
    container.scrollTo({ left: index * (cardWidth + 16), behavior: "smooth" });
  }, []);

  const controlButtonClass = cn(
    "focus-ring inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg",
    "border border-yellow-600/40 bg-black/40 backdrop-blur-md transition-dashboard",
    "hover:border-yellow-500",
  );

  if (characters.length === 0) {
    return (
      <section className={cn("container-content py-4", className)} aria-label="Meus personagens">
        <p className="rounded-xl border border-yellow-600/40 bg-black/40 p-6 text-center text-sm text-muted backdrop-blur-md">
          Nenhum personagem nesta sub-conta.
        </p>
      </section>
    );
  }

  return (
    <section
      className={cn("container-content py-4", className)}
      aria-label="Meus personagens"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-fluid-h2 text-foreground">Meus Personagens</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByDirection(-1)}
            className={controlButtonClass}
            aria-label="Personagem anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection(1)}
            className={controlButtonClass}
            aria-label="Próximo personagem"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4 scrollbar-none",
          "snap-x snap-mandatory scroll-smooth",
          "lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none xl:grid-cols-4",
        )}
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isActive={character.id === activeCharacterId}
            onSelect={onCharacterSelect}
          />
        ))}
      </div>

      <div
        className="mt-2 flex justify-center gap-2 lg:hidden"
        role="tablist"
        aria-label="Indicadores do carrossel"
      >
        {characters.map((character, index) => (
          <button
            key={character.id}
            type="button"
            role="tab"
            aria-selected={index === activeDotIndex}
            aria-label={`Ir para ${character.name}`}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "focus-ring size-3 rounded-full transition-dashboard",
              index === activeDotIndex
                ? "bg-brand-gold"
                : "bg-muted/40 hover:bg-yellow-500/60",
            )}
          />
        ))}
      </div>
    </section>
  );
}
