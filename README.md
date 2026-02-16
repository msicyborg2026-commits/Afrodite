# Centro Estetico Manager

Base moderna per un gestionale di **Centro Estetico** costruita con:
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Postgres)
- Prisma ORM

## 1) Avvio rapido

```bash
npm install
cp .env.example .env
# compila le variabili Supabase/Postgres
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev
```

Apri `http://localhost:3000`.

## 2) Configurazione Supabase Auth

Nel progetto Supabase:
1. Vai in **Authentication > Providers > Email** e abilita Email/Password.
2. Crea un utente admin (es. `admin@centroestetico.it`) da **Authentication > Users**.
3. Inserisci in `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3) Configurazione database Prisma su Supabase Postgres

1. Recupera stringa Postgres da Supabase (**Project Settings > Database**).
2. Imposta in `.env`:
   - `DATABASE_URL`
   - `DIRECT_URL`
3. Applica schema e seed:

```bash
npm run prisma:push
npm run prisma:seed
```

## 4) Struttura modulo iniziale

- **Auth**: login/logout Supabase, route protette con `middleware.ts`.
- **Layout dashboard**:
  - Sidebar: Agenda, Clienti, Servizi, Cassa, Report, Impostazioni
  - Topbar con utente loggato + logout
- **Prisma models**:
  - `Profile`
  - `Client`
  - `Service`
  - `StaffMember`
  - `Appointment`

## 5) Seed demo

Il seed crea:
- Profilo admin + staff member demo
- 2 clienti demo
- 2 servizi demo
- 1 appuntamento demo collegato

File seed: `prisma/seed.ts`.

## 6) Note operative

- Lo schema Prisma usa `Profile.id` come UUID compatibile con Supabase Auth User ID.
- Per una produzione completa, consigliato aggiungere Row Level Security e policy SQL su Supabase.
- Il progetto è pronto per estendere CRUD e agenda avanzata (drag&drop, filtri, reportistica).
