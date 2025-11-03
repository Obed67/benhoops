# Basketball Africa League (BAL) - Application Web

Application Next.js moderne pour suivre la Basketball Africa League avec données en temps réel via l'API TheSportsDB.

## 🏗️ Architecture

### Structure du Projet

```
sport africain/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (proxies vers TheSportsDB)
│   │   └── teams/
│   │       ├── route.ts           # GET /api/teams
│   │       └── [id]/
│   │           ├── route.ts       # GET /api/teams/:id
│   │           ├── players/       # GET /api/teams/:id/players
│   │           └── matches/       # GET /api/teams/:id/matches
│   ├── teams/             # Pages équipes
│   │   ├── page.tsx       # Liste des équipes (ISR)
│   │   └── [id]/page.tsx  # Détails équipe (ISR)
│   ├── schedule/          # Calendrier des matchs
│   ├── standings/         # Classement
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── cards/            # MatchCard, TeamCard, PlayerCard
│   ├── navigation/       # Navbar, Footer
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── api/
│   │   ├── sportsdb.ts   # Client API TheSportsDB
│   │   ├── server.ts     # Helpers fetch côté serveur (ISR)
│   │   └── transformers.ts # Normalisation des données API
│   ├── types/
│   │   └── index.ts      # Définitions TypeScript
│   └── config/
│       └── api.ts        # Configuration API & cache
└── data/                 # Données statiques (fallback)
```

### Stratégie de Fetching

#### 1. **ISR (Incremental Static Regeneration)**

- **Pages statiques** générées au build avec revalidation périodique
- Utilisé pour: équipes, joueurs, profils
- Revalidation:
  - Teams: 24h (`REVALIDATE_TIME.teams`)
  - Players: 12h (`REVALIDATE_TIME.players`)
  - Matches: 1h (`REVALIDATE_TIME.matches`)

#### 2. **SSR (Server-Side Rendering)**

- Rendu côté serveur pour les données en temps réel
- Utilisé pour: scores live, classements
- Fetch avec `{ cache: 'no-store' }`

#### 3. **API Routes**

- Proxies vers TheSportsDB avec cache et headers optimisés
- Avantages:
  - Masque la clé API côté client
  - Gestion centralisée du cache
  - Rate limiting et error handling

### Gestion des Données

#### Flow de Données

```
TheSportsDB API
     ↓
lib/api/sportsdb.ts (Client HTTP + normalisation)
     ↓
app/api/*/route.ts (API Routes avec ISR)
     ↓
lib/api/server.ts (Helpers fetch pour pages)
     ↓
app/*/page.tsx (Pages Next.js avec ISR/SSR)
     ↓
components/* (Composants React)
```

#### Normalisation des Données

```typescript
// API TheSportsDB → Types internes
SportsDBTeam → Team (normalizeTeam)
SportsDBPlayer → Player (normalizePlayer)
SportsDBEvent → Match (normalizeMatch)
```

## 🔧 Configuration

### Variables d'Environnement

Créer `.env.local`:

```bash
# Clé API TheSportsDB
# Gratuit: '3' (limité à 10 req/min)
# Patreon: votre_clé (illimité)
NEXT_PUBLIC_SPORTSDB_API_KEY=3

# Base URL API
NEXT_PUBLIC_SPORTSDB_BASE_URL=https://www.thesportsdb.com/api/v1/json

# Base URL de l'app (pour fetch SSR)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Démarrage

```powershell
# Installer les dépendances
npm install

# Mode développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Vérifier les types
npm run typecheck
```

## 📊 API TheSportsDB - Endpoints Utilisés

| Endpoint                 | Description                    | Params                           |
| ------------------------ | ------------------------------ | -------------------------------- |
| `search_all_teams.php`   | Toutes les équipes d'une ligue | `l=Basketball%20Africa%20League` |
| `lookupteam.php`         | Détails d'une équipe           | `id={teamId}`                    |
| `lookup_all_players.php` | Joueurs d'une équipe           | `id={teamId}`                    |
| `eventslast.php`         | Derniers matchs d'une équipe   | `id={teamId}`                    |
| `eventsnextleague.php`   | Prochains matchs de la ligue   | `id={leagueId}`                  |

## 🎯 Fonctionnalités

### Actuelles

- ✅ Liste des équipes BAL avec logos réels
- ✅ Détails équipe (infos, stade, effectif)
- ✅ Joueurs par équipe
- ✅ Matchs récents et à venir
- ✅ ISR pour performance optimale
- ✅ Types TypeScript stricts
- ✅ Dark mode

### À Venir

- 🔲 Classement en temps réel calculé
- 🔲 Stats individuelles joueurs
- 🔲 Recherche équipes/joueurs
- 🔲 Favoris (localStorage)
- 🔲 Notifications matchs live

## 🛠️ Technologies

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **API**: TheSportsDB REST API
- **Deployment**: Vercel (recommandé)

## 📝 Notes Importantes

### Limitations API Gratuite

- **Rate limit**: 10 requêtes/minute
- **Solution**: ISR cache les réponses (24h pour teams)
- **Upgrade**: Patreon pour clé illimitée

### Gestion des Erreurs

- Fallback vers données statiques si API fail
- Error boundaries pour composants
- Logs serveur pour debugging

### Performance

- Images optimisées avec `next/image`
- Lazy loading composants lourds
- Cache agressif avec ISR
- Prefetch links automatique

## 🤝 Contribution

Structure à respecter:

1. Types dans `lib/types/`
2. Logique API dans `lib/api/`
3. Composants réutilisables dans `components/`
4. Pages dans `app/`

## 📄 License

MIT
