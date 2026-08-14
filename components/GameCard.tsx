import Image from "next/image";
import { Game, discountPercent } from "@/lib/supabase";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function GameCard({ game }: { game: Game }) {
  const pct = discountPercent(game);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-bg-card transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-bg-alt to-bg overflow-hidden">
        {game.cover_url ? (
          <Image
            src={game.cover_url}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-line">
            {game.name.slice(0, 2).toUpperCase()}
          </div>
        )}

        {game.sold_out && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/80 backdrop-blur-[1px]">
            <span className="font-display text-sm font-bold tracking-wider text-text-muted">
              ESGOTADO
            </span>
          </div>
        )}

        {pct !== null && !game.sold_out && (
          <div className="absolute left-2 top-2 rounded-md bg-accent-hot px-2 py-1 font-mono text-xs font-bold text-bg">
            -{pct}%
          </div>
        )}

        {game.lowest_ever && (
          <div className="absolute right-2 top-2 rounded-md bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-bg">
            Menor histórico
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
            {game.store}
          </p>
          <h3 className="font-display text-lg font-semibold leading-tight text-text">
            {game.name}
          </h3>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="font-mono">
            {game.original_price && (
              <p className="text-xs text-text-muted line-through">
                R$ {formatPrice(Number(game.original_price))}
              </p>
            )}
            {game.current_price ? (
              <p className="text-lg font-bold text-accent">
                R$ {formatPrice(Number(game.current_price))}
              </p>
            ) : (
              <p className="text-sm text-text-muted">Ver preço</p>
            )}
          </div>

          <a
            href={game.affiliate_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="focus-ring shrink-0 rounded-lg bg-accent px-4 py-2 font-display text-sm font-bold text-bg transition hover:brightness-110"
          >
            Ver oferta
          </a>
        </div>
      </div>
    </div>
  );
}
