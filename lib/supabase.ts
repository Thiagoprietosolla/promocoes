import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Game = {
  id: string;
  name: string;
  slug: string;
  store: "Instant Gaming" | "Steam" | "Epic Games" | "GOG" | "Hardware";
  cover_url: string | null;
  affiliate_url: string;
  original_price: number | null;
  current_price: number | null;
  lowest_ever: boolean;
  sold_out: boolean;
  active: boolean;
  created_at: string;
};

export function discountPercent(game: Game): number | null {
  if (!game.original_price || !game.current_price) return null;
  if (game.original_price <= 0) return null;
  const pct = 100 - (game.current_price / game.original_price) * 100;
  return Math.round(pct);
}
