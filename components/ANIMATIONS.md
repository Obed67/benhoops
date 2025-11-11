# 🎨 Guide des Animations GSAP Avancées

## Vue d'ensemble

Ce projet utilise **GSAP (GreenSock Animation Platform)** pour créer des animations fluides, performantes et spectaculaires. Toutes les animations sont optimisées avec `gsap.context()` pour un nettoyage automatique et aucune fuite mémoire.

---

## 📦 Composants d'Animation

### 1. **AnimatedSection**

Wrapper pour animer n'importe quelle section au scroll.

#### Variants disponibles :

- **`fadeUp`** - Apparition depuis le bas avec scale
- **`fadeLeft`** - Slide depuis la gauche avec rotation 3D
- **`fadeRight`** - Slide depuis la droite avec rotation 3D
- **`scale`** - Zoom avec effet elastic
- **`slideUp`** - Révélation avec clip-path
- **`reveal`** - Effet de rideau coloré
- **`flip`** - Rotation 3D sur l'axe X
- **`glitch`** - Effet glitch cyberpunk

```tsx
<AnimatedSection animation="reveal" delay={0.2} duration={1.5}>
  <YourContent />
</AnimatedSection>
```

---

### 2. **AnimatedGrid**

Grille avec animations stagger spectaculaires.

#### Variants disponibles :

- **`default`** - Animation classique améliorée
- **`cascade`** - Effet cascade avec rotation 3D
- **`wave`** - Mouvement sinusoïdal ondulatoire
- **`zoom`** - Explosion depuis le centre avec rotation
- **`flip`** - Cards qui flip en 3D
- **`magnetic`** - Attraction magnétique circulaire

```tsx
<AnimatedGrid variant="wave" stagger={0.12} className="grid gap-6 md:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</AnimatedGrid>
```

---

### 3. **AnimatedText**

Texte animé lettre par lettre avec effets spéciaux.

#### Variants disponibles :

- **`default`** - Rotation 3D lettre par lettre
- **`typewriter`** - Effet machine à écrire
- **`glitch`** - Effet glitch cyberpunk
- **`gradient`** - Gradient animé avec couleurs
- **`split`** - Mots qui apparaissent en 3D

```tsx
<AnimatedText variant="glitch" delay={0.3}>
  Votre texte impressionnant ici
</AnimatedText>
```

---

### 4. **MagneticButton**

Bouton avec effet d'attraction magnétique au survol.

```tsx
<MagneticButton strength={0.5} className="custom-classes">
  <Button>Click Me</Button>
</MagneticButton>
```

**Props :**

- `strength` : Intensité de l'effet (0-1)

---

### 5. **ScrollReveal**

Révèle le contenu avec un masque animé lors du scroll.

```tsx
<ScrollReveal threshold={0.5}>
  <YourContent />
</ScrollReveal>
```

---

### 6. **FloatingElement**

Élément flottant avec mouvement infini.

```tsx
<FloatingElement speed={3} distance={20}>
  <Icon />
</FloatingElement>
```

**Props :**

- `speed` : Durée d'un cycle (secondes)
- `distance` : Distance du mouvement (pixels)

---

### 7. **SplitTextReveal**

Révélation de texte avec split avancé.

```tsx
<SplitTextReveal text="Texte à animer" splitBy="chars" delay={0.2} />
```

**Options splitBy :**

- `chars` : Par caractère
- `words` : Par mot
- `lines` : Par ligne

---

### 8. **MorphingShape**

Forme qui change continuellement pour les backgrounds.

```tsx
<MorphingShape color="#f97316" duration={8} className="w-96 h-96" />
```

---

### 9. **ParallaxImage**

Image avec effet parallax smooth.

```tsx
<ParallaxImage src="/image.jpg" alt="Description" speed={0.3} />
```

**Props :**

- `speed` : Vitesse du parallax (0-1)

---

### 10. **AnimatedCounter**

Compteur animé pour les statistiques.

```tsx
<AnimatedCounter end={1000} duration={2} suffix="+" prefix="$" />
```

---

## 🎯 AnimatedHero - Composant Hero Spectaculaire

Le hero comprend :

- ✨ Texte NBA avec rotation 3D lettre par lettre
- 🌊 Effet wave sur le sous-titre
- 💫 Bulles flottantes animées avec trajectoires aléatoires
- ⚡ Particules flottantes générées dynamiquement
- 🧲 Boutons avec effet magnétique au hover
- 🎨 Effet de pulsation sur le gradient

```tsx
<AnimatedHero />
```

---

## 🚀 Bonnes Pratiques

### 1. **Utiliser gsap.context()**

Toutes les animations utilisent `gsap.context()` pour un cleanup automatique :

```tsx
const ctx = gsap.context(() => {
  // Vos animations ici
}, element);

return () => ctx.revert(); // Cleanup automatique
```

### 2. **ScrollTrigger optimisé**

```tsx
scrollTrigger: {
  trigger: element,
  start: 'top 85%',
  toggleActions: 'play none none none', // Joue une seule fois
}
```

### 3. **Performance**

- Toutes les animations utilisent `will-change` implicite via GSAP
- Pas de re-renders inutiles grâce aux refs
- Cleanup automatique des ScrollTriggers

---

## 🎨 Easings Recommandés

- **`power3.out`** - Smooth et naturel
- **`power4.out`** - Plus dramatique
- **`elastic.out(1, 0.6)`** - Effet bounce
- **`back.out(1.7)`** - Petit overshoot
- **`expo.out`** - Très rapide puis ralentit
- **`sine.inOut`** - Parfait pour les loops

---

## 💡 Exemples d'Utilisation

### Page complète avec animations variées

```tsx
<AnimatedHero />

<AnimatedSection animation="reveal">
  <AnimatedGrid variant="flip" stagger={0.1}>
    {items.map(item => (
      <MagneticButton key={item.id}>
        <Card {...item} />
      </MagneticButton>
    ))}
  </AnimatedGrid>
</AnimatedSection>

<AnimatedSection animation="scale">
  <SplitTextReveal text="Titre Impressionnant" splitBy="words" />
  <AnimatedCounter end={5000} suffix="+" />
</AnimatedSection>
```

---

## 🔧 Configuration

Les animations sont configurées dans :

- `components/animated-components.tsx` - Composants réutilisables
- `components/animated-hero.tsx` - Hero section
- `hooks/use-gsap-animation.ts` - Hooks personnalisés

---

## 📱 Responsive

Toutes les animations sont optimisées pour mobile avec :

- Réduction automatique des distances sur petits écrans
- Durées ajustées
- Pas d'animations 3D complexes sur mobile si nécessaire

---

## 🎭 Tips & Tricks

1. **Combiner les animations** - Utilisez plusieurs composants ensemble
2. **Varier les delays** - Créez des cascades naturelles
3. **Adapter les stagger** - Plus long pour beaucoup d'éléments
4. **Tester sur mobile** - Les animations 3D peuvent être lourdes
5. **Utiliser les variants** - Ils sont optimisés pour chaque cas d'usage

---

## 🚨 Troubleshooting

**Animations qui ne jouent pas ?**

- Vérifiez que l'élément est visible au scroll
- Ajustez le `start` du ScrollTrigger

**Performance lente ?**

- Réduisez le nombre de particules dans le hero
- Utilisez des variants plus simples sur mobile

**Memory leaks ?**

- Impossible ! Toutes les animations utilisent `ctx.revert()`

---

## 📚 Ressources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Easing Visualizer](https://greensock.com/ease-visualizer/)

---

**Créé avec ❤️ et GSAP 3.0**
