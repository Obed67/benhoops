'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { gsap } from 'gsap';

export function AnimatedHero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline principale
      const mainTl = gsap.timeline();

      // Animation du badge avec effet bounce
      mainTl.fromTo(
        badgeRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        }
      );

      // Animation du titre NBA (lettre par lettre avec effet 3D)
      const nbaText = titleRef.current?.querySelector('.nba-text') as HTMLElement;
      if (nbaText) {
        const originalText = nbaText.textContent || '';
        const letters = originalText.split('');
        nbaText.innerHTML = '';

        // Styles pour éviter le flou
        nbaText.style.willChange = 'auto';
        nbaText.style.backfaceVisibility = 'hidden';
        nbaText.style.perspective = '1000px';

        letters.forEach((letter) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.style.display = 'inline-block';
          span.style.backfaceVisibility = 'hidden';
          span.style.transform = 'translateZ(0)';
          nbaText.appendChild(span);
        });

        mainTl.fromTo(
          nbaText.children,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            scale: 0.5,
            transformPerspective: 1000,
            transformOrigin: 'center bottom',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            stagger: 0.12,
            duration: 1.2,
            ease: 'elastic.out(1, 0.6)',
            clearProps: 'transform',
            onComplete: function () {
              // Nettoyer les transforms après l'animation pour un texte net
              gsap.set(nbaText.children, { clearProps: 'all' });
            },
          },
          '-=0.5'
        );

        // Animation continue de pulsation sur NBA (plus subtile)
        gsap.to(nbaText, {
          textShadow: '0 0 15px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.3)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      } // Animation du sous-titre avec effet wave
      const statsText = titleRef.current?.querySelector('.stats-text');
      if (statsText) {
        const words = (statsText.textContent || '').split(' ');
        statsText.innerHTML = '';
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.marginRight = '0.3em';

          word.split('').forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.display = 'inline-block';
            wordSpan.appendChild(charSpan);
          });

          statsText.appendChild(wordSpan);

          mainTl.fromTo(
            wordSpan.children,
            {
              opacity: 0,
              y: (i) => Math.sin(i * 0.5) * 30 + 50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: 'back.out(2)',
            },
            `-=${0.6 - wordIndex * 0.1}`
          );
        });
      }

      // Animation de la ligne décorative avec effet liquid
      mainTl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          scaleX: 0,
          rotationY: -90,
        },
        {
          opacity: 1,
          scaleX: 1,
          rotationY: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.4)',
        },
        '-=0.8'
      );

      // Animation de la description avec effet glitch
      mainTl.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Animation des boutons avec effet magnétique
      const buttons = buttonsRef.current?.children || [];
      mainTl.fromTo(
        buttons,
        {
          opacity: 0,
          y: 50,
          scale: 0.5,
          rotation: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=0.8'
      );

      // Animation hover effect sur les boutons
      Array.from(buttons).forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            rotation: 2,
            duration: 0.3,
            ease: 'back.out(3)',
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Animation des bulles de fond avec trajectoires complexes
      gsap.to('.blob-1', {
        x: 'random(-100, 100)',
        y: 'random(-80, 80)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(5, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.blob-2', {
        x: 'random(-100, 100)',
        y: 'random(-80, 80)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(6, 9)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.blob-3', {
        scale: 'random(0.9, 1.15)',
        rotation: 'random(-30, 30)',
        duration: 'random(7, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Effet de particules flottantes
      const heroElement = heroRef.current;
      if (heroElement) {
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.cssText = `
            position: absolute;
            width: ${gsap.utils.random(4, 12)}px;
            height: ${gsap.utils.random(4, 12)}px;
            background: linear-gradient(135deg, #f97316, #dc2626);
            border-radius: 50%;
            left: ${gsap.utils.random(0, 100)}%;
            top: ${gsap.utils.random(0, 100)}%;
            opacity: ${gsap.utils.random(0.2, 0.6)};
            filter: blur(${gsap.utils.random(1, 3)}px);
          `;
          heroElement.appendChild(particle);

          gsap.to(particle, {
            y: `random(-200, 200)`,
            x: `random(-200, 200)`,
            duration: `random(10, 20)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-950"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute inset-0">
        <div className="blob-1 absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="blob-2 absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Badge animé */}
          <div ref={badgeRef} className="mb-8 flex justify-center">
            <div className="inline-flex items-center space-x-2 rounded-full bg-orange-500/10 px-4 py-2 border border-orange-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                SAISON 2024-2025 EN DIRECT
              </span>
            </div>
          </div>

          {/* Titre principal avec animations */}
          <div className="text-center mb-8 space-y-4">
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              <span className="nba-text inline-block bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 dark:from-orange-400 dark:via-red-500 dark:to-orange-500 bg-clip-text text-transparent">
                NBA
              </span>
              <br />
              <span className="stats-text inline-block text-5xl md:text-7xl mt-2">
                Stats & Live Scores
              </span>
            </h1>

            <div
              ref={subtitleRef}
              className="flex items-center justify-center space-x-3 text-orange-600 dark:text-orange-400/80"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500 dark:to-orange-400"></div>
              <span className="text-sm font-bold tracking-widest uppercase">
                Basketball Analytics
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500 dark:to-orange-400"></div>
            </div>
          </div>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mb-10 text-xl md:text-2xl text-center text-slate-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Suivez la <span className="font-bold text-orange-600 dark:text-orange-400">NBA</span> en
            direct
            <span className="inline-block mx-2 text-2xl">🏀</span>
            Statistiques, classements et résultats en temps réel
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link href="/schedule">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Voir le calendrier
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/teams">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-orange-500/50 text-slate-900 dark:text-white hover:bg-orange-500/10 hover:border-orange-500 dark:hover:border-orange-400 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Users className="mr-2 h-5 w-5" />
                Découvrir les équipes
              </Button>
            </Link>
          </div>

          {/* Stats animées */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-600 dark:text-orange-400 mb-2">
                30
              </div>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-semibold">
                Équipes NBA
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-600 dark:text-orange-400 mb-2">
                82
              </div>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-semibold">
                Matchs / Saison
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-600 dark:text-orange-400 mb-2">
                450+
              </div>
              <div className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-semibold">
                Joueurs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
