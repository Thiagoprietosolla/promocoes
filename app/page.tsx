import { supabase, Game } from "@/lib/supabase";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";

export const revalidate = 60; // atualiza a lista a cada 60s sem precisar rebuildar o site

async function getGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data as Game[];
}

export default async function Home() {
  const games = await getGames();

  return (
    <main>
      <Ticker games={games} />
      <Hero count={games.length} />
      <Catalog games={games} />
      <Footer />
    </main>
  );
}
