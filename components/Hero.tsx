const SOCIALS = [
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb6xxjsICVffXGJwAR1c" },
  { label: "Telegram", href: "https://t.me/+Trk5lmGt7_3JTnGC" },
  { label: "YouTube", href: "https://www.youtube.com/@eusouocap" },
];

export default function Hero({ count }: { count: number }) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-sweep" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Radar ativo • {count} promoções monitoradas
        </p>
        <h1 className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl">
          Achamos o menor preço.
          <br />
          <span className="text-accent">Você só compra.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted sm:text-base">
          Preços de jogos de PC comparados todos os dias em Instant Gaming, Steam, Epic
          Games e GOG — com destaque pra quando o preço bate mínimo histórico.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg border border-line bg-bg-card px-4 py-2 font-mono text-xs font-medium text-text-muted transition hover:border-accent/50 hover:text-text"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
