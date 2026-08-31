"use client";

import { Game, discountPercent } from "@/lib/supabase";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Imagem padrão genérica para substituir capas quebradas (404)
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80";

export default function GameCard({ game }: { game: Game & { image_url?: string; image?: string; cover?: string } }) {
  const pct = discountPercent(game);
  
  const rawUrl = game.cover_url || game.image_url || game.image || game.cover;
  const cleanUrl = rawUrl ? rawUrl.replace('https://wsrv.nl/?url=', '') : null;
  const imageUrl = cleanUrl ? `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}` : FALLBACK_IMAGE;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-bg-card transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
      <div className="relative h-48 w-full bg-bg-alt overflow-hidden">
        <img
          src={imageUrl}
          alt={game.name}
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => {
            // Se a imagem der 404/erro, troca imediatamente pela imagem de fallback
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

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
