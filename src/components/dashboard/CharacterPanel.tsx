import Image from "next/image";

export function CharacterPanel() {
  return (
    <div className="glass-panel flex flex-col overflow-hidden rounded-xl shadow-2xl transition-dashboard hover:border-dashboard-neon-blue/30">
      {/* Retrato do Guerreiro */}
      <div className="relative aspect-square w-full md:aspect-[4/3] lg:aspect-square">
        <Image
          src="/images/dashboard-warrior.png"
          alt="NightCrawler Warrior"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
          className="object-cover object-center"
        />
        {/* Degradê escuro sobre a imagem para integrar o texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/95 via-transparent to-transparent" />
      </div>

      {/* Status e Estatísticas */}
      <div className="flex flex-col p-6">
        <div className="mb-6">
          <h2 className="font-serif text-3xl font-bold tracking-wider text-dashboard-gold">
            NightCrawler
          </h2>
          <p className="text-sm font-semibold tracking-wide text-dashboard-muted">
            Warrior Level 85
          </p>
        </div>

        {/* Barras de Status */}
        <div className="space-y-4">
          {/* HP */}
          <div>
            <div className="mb-1.5 flex justify-between text-xs font-semibold">
              <span className="text-dashboard-danger">HP</span>
              <span className="text-foreground">8420 / 9200 (91%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-brand-dark overflow-hidden border border-dashboard-danger/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-800 to-dashboard-danger transition-all duration-500"
                style={{ width: "91%" }}
              />
            </div>
          </div>

          {/* MP */}
          <div>
            <div className="mb-1.5 flex justify-between text-xs font-semibold">
              <span className="text-dashboard-neon-blue">MP</span>
              <span className="text-foreground">1200 / 2100 (57%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-brand-dark overflow-hidden border border-dashboard-neon-blue/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-800 to-dashboard-neon-blue transition-all duration-500"
                style={{ width: "57%" }}
              />
            </div>
          </div>

          {/* XP */}
          <div>
            <div className="mb-1.5 flex justify-between text-xs font-semibold">
              <span className="text-dashboard-success">XP</span>
              <span className="text-foreground">67%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-brand-dark overflow-hidden border border-dashboard-success/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-800 to-dashboard-success transition-all duration-500"
                style={{ width: "67%" }}
              />
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="my-5 border-t border-border" />

        {/* Informações adicionais */}
        <div className="flex justify-between text-xs font-medium text-dashboard-muted">
          <div>
            Quests: <span className="text-foreground font-semibold">3 / 5</span>
          </div>
          <div>
            Equip: <span className="text-dashboard-gold font-semibold">Dynasty Set +6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
