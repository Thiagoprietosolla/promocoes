import { Game, discountPercent } from "@/lib/supabase";

// formatador criado uma vez só
const priceFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPrice(value: number) {
  return priceFormatter.format(value);
}

export default function Ticker({ games }: { games: Game[] }) {
  // calcula o desconto uma única vez por jogo (antes eram 3 cálculos por item)
  const withDiscount = games.flatMap((g) => {
    if (!g.original_price || !g.current_price) return [];
    const pct = discountPercent(g);
    return pct === null ? [] : [{ game: g, pct }];
  });

  if (withDiscount.length === 0) return null;

  // duplica a lista pra criar o loop infinito do marquee sem costura visível
  const items = [...withDiscount, ...withDiscount];
  const half = withDiscount.length;

  return (
    <div className="border-y border-line bg-bg-alt overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {items.map(({ game: g, pct }, i) => (
          <span
            key={`${g.id}-${i}`}
            // a segunda metade é só pro loop visual: leitores de tela ignoram
            aria-hidden={i >= half ? true : undefined}
            className="mx-5 inline-flex items-center gap-2 font-mono text-sm text-text-muted"
          >
            <span className="text-text">{g.name}</span>
            <span className="line-through opacity-60">
              R$ {formatPrice(Number(g.original_price))}
            </span>
            <span aria-hidden="true">→</span>
            <span className="text-accent font-semibold">
              R$ {formatPrice(Number(g.current_price))}
            </span>
            <span className="text-accent-hot font-semibold">-{pct}%</span>
            <span className="text-line px-1" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
