"use client";

import { useMemo, useState } from "react";
import { Game, discountPercent } from "@/lib/supabase";
import GameCard from "@/components/GameCard";

const STORES = ["Todas", "Instant Gaming", "Steam", "Epic Games", "GOG", "Hardware"] as const;
const PRICE_FILTERS = [
  { label: "Qualquer preço", test: () => true },
  { label: "Menor histórico", test: (g: Game) => g.lowest_ever },
  { label: "Até R$ 10", test: (g: Game) => (g.current_price ?? Infinity) <= 10 },
  { label: "Até R$ 20", test: (g: Game) => (g.current_price ?? Infinity) <= 20 },
  { label: "Até R$ 50", test: (g: Game) => (g.current_price ?? Infinity) <= 50 },
] as const;

export default function Catalog({ games }: { games: Game[] }) {
  const [store, setStore] = useState<(typeof STORES)[number]>("Todas");
  const [priceFilter, setPriceFilter] = useState<(typeof PRICE_FILTERS)[number]["label"]>(
    "Qualquer preço"
  );
  const [search, setSearch] = useState("");

  const activePriceTest =
    PRICE_FILTERS.find((p) => p.label === priceFilter)?.test ?? (() => true);

  const filtered = useMemo(() => {
    return games
      .filter((g) => store === "Todas" || g.store === store)
      .filter((g) => activePriceTest(g))
      .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
  }, [games, store, priceFilter, search]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar jogo..."
          className="focus-ring w-full max-w-md rounded-lg border border-line bg-bg-card px-4 py-2.5 text-text placeholder:text-text-muted"
        />

        <div className="flex flex-wrap gap-2">
          {STORES.map((s) => (
            <button
              key={s}
              onClick={() => setStore(s)}
              className={`focus-ring rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition ${
                store === s
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-bg-card text-text-muted hover:border-accent/40 hover:text-text"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {PRICE_FILTERS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPriceFilter(p.label)}
              className={`focus-ring rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition ${
                priceFilter === p.label
                  ? "border-accent-hot bg-accent-hot text-bg"
                  : "border-line bg-bg-card text-text-muted hover:border-accent-hot/40 hover:text-text"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl text-text-muted">
            Nenhum jogo encontrado com esses filtros.
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Tenta trocar a loja ou a faixa de preço ali em cima.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}
