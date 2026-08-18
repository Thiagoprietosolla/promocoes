"use client";

import { Product } from "@/lib/supabase";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-bg-card transition hover:border-accent/40">
      <div className="aspect-[4/3] overflow-hidden bg-bg">
        {product.imagem ? (
          <img
            src={product.imagem}
            alt={product.nome}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-text-muted">
            Sem imagem
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 font-mono text-xs text-accent">
          {product.loja}
        </p>

        <h3 className="line-clamp-2 min-h-[3rem] font-display text-lg text-text">
          {product.nome}
        </h3>

        {product.descricao && (
          <p className="mt-2 line-clamp-2 text-sm text-text-muted">
            {product.descricao}
          </p>
        )}

        <a
          href={product.link_afiliado}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-4 block rounded-lg bg-accent px-4 py-2.5 text-center font-mono text-xs font-semibold text-bg transition hover:opacity-90"
        >
          VER PRODUTO
        </a>
      </div>
    </article>
  );
}
