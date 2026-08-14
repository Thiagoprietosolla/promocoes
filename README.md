# Radar de Promoções — Catálogo de Jogos

Site de catálogo de promoções de jogos (Instant Gaming, Steam, Epic, GOG) com filtros,
badges de menor histórico e ticker de preços — construído em Next.js + Supabase.

Resolve o problema do site antigo (GitHub Pages): antes as capas vinham ao vivo da API
da RAWG a cada visita, o que estourava a cota gratuita e expunha sua chave publicamente
no código. Agora as capas ficam salvas direto no banco (Supabase), sem depender de
nenhuma API externa no ar.

---

## Passo 1 — Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (ou entre na que já usa
   nos seus bots n8n).
2. Clique em **New Project**. Dê um nome (ex: `radar-promocoes`), escolha uma senha forte
   pro banco e a região `South America (São Paulo)`.
3. Espere uns 2 minutos até o projeto ficar pronto.

## Passo 2 — Criar a tabela de jogos

1. No menu lateral, vá em **SQL Editor** → **New query**.
2. Abra o arquivo `supabase/schema.sql` deste projeto, copie tudo e cole no editor.
3. Clique em **Run**. Isso cria a tabela `games` já com as regras de segurança certas
   (o site só consegue *ler* jogos ativos, nunca escrever — só você, logado no painel,
   consegue editar).

## Passo 3 — Importar seus 71 jogos atuais

1. Ainda no **SQL Editor**, abra uma nova query.
2. Copie o conteúdo de `supabase/seed.sql` e rode.
3. Isso insere todos os jogos que já estavam no seu site do GitHub, com nome, loja e
   link de afiliado. **Os preços e capas ficam em branco** — você preenche aos poucos
   direto na tabela (próximo passo), começando pelos jogos que estão em promoção agora.

## Passo 4 — Editar um jogo (rotina do dia a dia)

1. Menu lateral → **Table Editor** → tabela `games`.
2. Clique numa linha pra editar. Os campos são:
   - `cover_url`: link da imagem de capa (veja abaixo como pegar)
   - `original_price` / `current_price`: preço de/por, em número (ex: `59.90`)
   - `lowest_ever`: marque `true` quando for menor preço histórico
   - `sold_out`: marque `true` se a key esgotar
   - `active`: `false` esconde o jogo do site sem apagar
3. Pra adicionar um jogo novo, clique em **Insert row** e preencha `name`, `slug`
   (sem espaços, ex: `elden-ring-2`), `store` e `affiliate_url` no mínimo.

**Pra pegar a capa:** clique com o botão direito na imagem do jogo na Instant Gaming (ou
Steam) → "Copiar endereço da imagem" → cole em `cover_url`. Não precisa mais de RAWG.

## Passo 5 — Conectar o site ao Supabase

1. No Supabase: **Project Settings** → **API**.
2. Copie a **Project URL** e a chave **anon public**.
3. Neste projeto, duplique o arquivo `.env.local.example`, renomeie a cópia pra
   `.env.local`, e cole os dois valores:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
   ```

## Passo 6 — Rodar local pra conferir (opcional)

Precisa ter [Node.js](https://nodejs.org) instalado.

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Passo 7 — Publicar na Vercel

1. Crie um repositório novo no seu GitHub (ex: `radar-promocoes`) e suba esta pasta:
   ```bash
   git init
   git add .
   git commit -m "primeiro commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/radar-promocoes.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe esse
   repositório do GitHub.
3. Na tela de configuração, abra **Environment Variables** e adicione as mesmas duas
   chaves do `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em **Deploy**. Em ~1 minuto o site está no ar com um link `.vercel.app`.
5. (Opcional) Em **Project Settings → Domains**, você pode ligar um domínio próprio
   depois.

Toda vez que você editar um jogo direto no Supabase, a mudança aparece no site em até
60 segundos — não precisa fazer novo deploy. Só precisa mexer no GitHub/Vercel de novo
se você quiser mudar o design ou o código.

---

## Estrutura do projeto

```
app/            páginas (Next.js App Router)
components/     Hero, Ticker, Catalog (filtros), GameCard, Footer
lib/supabase.ts conexão com o banco + tipos
supabase/       schema.sql (estrutura da tabela) e seed.sql (seus 71 jogos atuais)
```
