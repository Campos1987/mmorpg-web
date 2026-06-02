import { SERVER_INFO } from "@/config/server-info";

export default function Home() {
  return (
    <div className="container-content w-full max-w-7xl flex flex-1 flex-col py-12">
      <h1 className="font-serif text-fluid-h1 text-foreground">
        {SERVER_INFO.serverName}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Role a página para validar o cabeçalho fixo e a navegação responsiva da
        Top Bar.
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {Array.from({ length: 12 }, (_, index) => (
          <section
            key={index}
            className="rounded-md border border-border bg-brand-card p-8"
          >
            <h2 className="font-serif text-fluid-h2 text-foreground">
              Seção {index + 1}
            </h2>
            <p className="mt-2 text-muted">
              Conteúdo de exemplo para teste de scroll com Top Bar sticky.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
