"use client";

import { useMemo, useState } from "react";
import { Game, Product } from "@/lib/supabase";
import GameCard from "@/components/GameCard";
import ProductCard from "@/components/ProductCard";

const STORES = [
  "Todas",
  "Instant Gaming",
  "Steam",
  "Epic Games",
  "GOG",
  "Hardware",
] as const;

const PRODUCT_STORES = [
  "Mercado Livre",
  "Amazon",
  "Shopee",
] as const;

export default function Catalog({
  games,
  products,
}: {
  games: Game[];
  products: Product[];
}) {
  const [store, setStore] =
    useState<(typeof STORES)[number]>("Todas");

  const [productStore, setProductStore] =
    useState<(typeof PRODUCT_STORES)[number] | null>(null);

  const [search, setSearch] = useState("");

  const filteredGames = useMemo(() => {
    if (productStore) return [];

    return games
      .filter((g) => store === "Todas" || g.store === store)
      .filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [games, store, search, productStore]);

  const filteredProducts = useMemo(() => {
    if (!productStore) return [];

    return products
      .filter((p) => p.loja === productStore)
      .filter((p) =>
        p.nome.toLowerCase().includes(search.toLowerCase())
      );
  }, [products, productStore, search]);

  function selectGameStore(selectedStore: (typeof STORES)[number]) {
    setStore(selectedStore);
    setProductStore(null);
    setSearch("");
  }

  function selectProductStore(
    selectedStore: (typeof PRODUCT_STORES)[number]
  ) {
    setProductStore(selectedStore);
    setSearch("");
  }

  const showingProducts = productStore !== null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4">

        {/* Busca */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            showingProducts
              ? "Buscar produto..."
              : "Buscar jogo..."
          }
          className="focus-ring w-full max-w-md rounded-lg border border-line bg-bg-card px-4 py-2.5 text-text placeholder:text-text-muted"
        />

        {/* FILTROS DE JOGOS */}
        <div className="flex flex-wrap gap-2">
          {STORES.map((s) => (
            <button
              key={s}
              onClick={() => selectGameStore(s)}
              className={`focus-ring rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition ${
                !productStore && store === s
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-bg-card text-text-muted hover:border-accent/40 hover:text-text"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* FILTROS DE PRODUTOS */}
        <div className="flex flex-wrap gap-2">
          {PRODUCT_STORES.map((s) => (
            <button
              key={s}
              onClick={() => selectProductStore(s)}
              className={`focus-ring rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition ${
                productStore === s
                  ? "border-accent-hot bg-accent-hot text-bg"
                  : "border-line bg-bg-card text-text-muted hover:border-accent-hot/40 hover:text-text"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUTOS */}
      {showingProducts ? (
        filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <p className="font-display text-xl text-text-muted">
              Nenhum produto encontrado.
            </p>

            <p className="mt-1 text-sm text-text-muted">
              Ainda não existem produtos cadastrados nesta loja.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )
      ) : (
        /* JOGOS */
        filteredGames.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <p className="font-display text-xl text-text-muted">
              Nenhum jogo encontrado.
            </p>

            <p className="mt-1 text-sm text-text-muted">
              Tenta trocar a loja ou pesquisar outro jogo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        )
      )}
    </section>
  );
}
