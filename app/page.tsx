import { supabase, Game, Product } from "@/lib/supabase";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";

export const revalidate = 60; // atualiza a lista a cada 60s sem precisar rebuildar o site

const GAME_COLUMNS =
  "id,name,slug,store,cover_url,affiliate_url,original_price,current_price,lowest_ever,sold_out,active,created_at";

async function getGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from("games")
    .select(GAME_COLUMNS)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Game[];
}

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Product[];
}

export default async function Home() {
  // as duas consultas são independentes: rodam em paralelo
  const [games, products] = await Promise.all([getGames(), getProducts()]);

  return (
    <main>
      <Ticker games={games} />
      <Hero count={games.length} />
      <Catalog games={games} products={products} />
      <Footer />
    </main>
  );
}
