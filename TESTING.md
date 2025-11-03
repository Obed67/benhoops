# Guide de Test - BAL Application

## ✅ Tests Effectués

### 1. Vérification TypeScript

```powershell
npm run typecheck
```

**Résultat**: ✅ Aucune erreur TypeScript

## 🧪 Tests à Effectuer

### 2. Démarrer en Mode Développement

```powershell
npm run dev
```

Ouvrir: http://localhost:3000

#### Pages à Tester:

- [ ] **Homepage** (`/`)
  - Vérifie les stats générales
  - Section "Résultats récents"
  - Section "Prochains matchs"
  - Section "Équipes en vedette"
- [ ] **Page Équipes** (`/teams`)

  - Vérifie le chargement des équipes BAL réelles
  - Logos doivent s'afficher
  - Cliquer sur une équipe

- [ ] **Page Détails Équipe** (`/teams/[id]`)

  - Infos équipe (nom, ville, pays, logo)
  - Statistiques (stade, capacité, fondation)
  - Effectif (joueurs de l'équipe)
  - Matchs récents

- [ ] **Page Calendrier** (`/schedule`)

  - Tabs: À venir, En direct, Terminés
  - Logos des équipes dans les matchs

- [ ] **Page Classement** (`/standings`)
  - Tableau avec logos
  - Trier par victoires

### 3. Tester les API Routes

#### Équipes

```powershell
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/teams" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

#### Équipe Spécifique (exemple ID)

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/teams/133604" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

#### Joueurs d'une Équipe

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/teams/133604/players" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

#### Matchs d'une Équipe

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/teams/133604/matches" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

### 4. Build Production

```powershell
npm run build
```

**Attendu**: Build réussi avec pages ISR générées

### 5. Démarrer Production

```powershell
npm start
```

Ouvrir: http://localhost:3000

## 🔍 Points de Validation

### Architecture

- [x] Types TypeScript définis dans `lib/types/`
- [x] Services API dans `lib/api/sportsdb.ts`
- [x] Transformateurs de données dans `lib/api/transformers.ts`
- [x] API Routes avec ISR configuré
- [x] Helpers fetch serveur dans `lib/api/server.ts`
- [x] Pages migrées pour utiliser fetch API

### Performance

- [ ] ISR activé (vérifier headers Cache-Control)
- [ ] Images optimisées avec next/image
- [ ] Temps de chargement < 3s (page équipes)

### Fonctionnalités

- [ ] Logos équipes s'affichent correctement
- [ ] Données réelles de TheSportsDB chargées
- [ ] Navigation fluide entre pages
- [ ] Dark mode fonctionne
- [ ] Responsive design (mobile/desktop)

## 🐛 Debugging

### Si l'API ne retourne pas de données:

1. **Vérifier la clé API**:

```powershell
# Afficher les variables d'environnement
Get-Content .env.local
```

Assurez-vous que `NEXT_PUBLIC_SPORTSDB_API_KEY=3`

2. **Tester l'API directement**:

```powershell
Invoke-WebRequest -Uri "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Basketball%20Africa%20League"
```

3. **Vérifier les logs serveur**:
   Regarder la console Next.js pour les erreurs

### Si les images ne s'affichent pas:

1. Vérifier `next.config.js`:

```javascript
images: {
  unoptimized: true;
}
```

2. Vérifier les URLs dans la console réseau (F12)

## 📊 Métriques de Succès

- ✅ TypeCheck: 0 erreur
- ⏱️ Build time: < 2 min
- 📦 Bundle size: < 500KB (JS initial)
- 🚀 Lighthouse Score:
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 90
  - SEO: > 95

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push vers GitHub
2. Importer projet sur Vercel
3. Ajouter variables d'environnement
4. Deploy

### Variables d'Environnement Vercel

```
NEXT_PUBLIC_SPORTSDB_API_KEY=votre_clé
NEXT_PUBLIC_SPORTSDB_BASE_URL=https://www.thesportsdb.com/api/v1/json
NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
```

## 📝 Notes

- La clé gratuite `3` est limitée à 10 req/min
- ISR cache les résultats pendant 24h pour les équipes
- Si besoin de plus de requêtes: Patreon TheSportsDB
