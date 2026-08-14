import { Game, discountPercent } from "@/lib/supabase";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Ticker({ games }: { games: Game[] }) {
  const withDiscount = games.filter(
    (g) => g.original_price && g.current_price && discountPercent(g) !== null
  );

  if (withDiscount.length === 0) return null;

  // duplica a lista pra criar o loop infinito do marquee sem costura visível
  const items = [...withDiscount, ...withDiscount];

  return (
    <div className="border-y border-line bg-bg-alt overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {items.map((g, i) => (
          <span
            key={`${g.id}-${i}`}
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
            <span className="text-accent-hot font-semibold">
              -{discountPercent(g)}%
            </span>
            <span className="text-line px-1" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
