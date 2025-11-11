'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { tr } from 'date-fns/locale';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?:
    | 'fadeUp'
    | 'fadeLeft'
    | 'fadeRight'
    | 'scale'
    | 'slideUp'
    | 'reveal'
    | 'flip'
    | 'glitch';
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Composant wrapper pour animer n'importe quelle section avec GSAP
 * Animations avancées et modernes
 */
export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'fadeUp':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 100,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: duration * 1.2,
              delay,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'fadeLeft':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: -150,
              rotationY: -15,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: duration * 1.3,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'fadeRight':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: 150,
              rotationY: 15,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: duration * 1.3,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'scale':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              scale: 0.5,
              rotationZ: -10,
            },
            {
              opacity: 1,
              scale: 1,
              rotationZ: 0,
              duration: duration * 1.4,
              delay,
              ease: 'elastic.out(1, 0.6)',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'slideUp':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 200,
              clipPath: 'inset(100% 0% 0% 0%)',
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: duration * 1.5,
              delay,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'reveal':
          // Animation de révélation avec masque
          const overlay = document.createElement('div');
          overlay.style.cssText = `
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, #f97316, #dc2626);
            z-index: 10;
          `;
          element.style.position = 'relative';
          element.appendChild(overlay);

          gsap
            .timeline({
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            })
            .fromTo(
              element,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.5,
                delay,
              }
            )
            .to(overlay, {
              x: '100%',
              duration: duration * 1.2,
              ease: 'power4.inOut',
              onComplete: () => overlay.remove(),
            });
          break;

        case 'flip':
          gsap.fromTo(
            element,
            {
              opacity: 0,
              rotationX: -90,
              transformPerspective: 1000,
              transformOrigin: 'center bottom',
            },
            {
              opacity: 1,
              rotationX: 0,
              duration: duration * 1.5,
              delay,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'glitch':
          // Effet glitch moderne
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          tl.fromTo(element, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.1, delay })
            .to(element, { x: 5, duration: 0.05 })
            .to(element, { x: -5, duration: 0.05 })
            .to(element, { x: 3, duration: 0.05 })
            .to(element, { x: 0, duration: 0.1 });
          break;
      }
    }, element);

    return () => ctx.revert();
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface AnimatedGridProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  variant?: 'default' | 'cascade' | 'wave' | 'zoom' | 'flip' | 'magnetic';
}

/**
 * Grille animée avec effets stagger avancés
 */
export function AnimatedGrid({
  children,
  stagger = 0.15,
  className = '',
  variant = 'default',
}: AnimatedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      switch (variant) {
        case 'cascade':
          // Effet cascade avec rotation 3D
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 100,
              rotationX: -45,
              transformPerspective: 1000,
              transformOrigin: 'center top',
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.2,
              stagger: {
                amount: stagger * items.length,
                from: 'start',
                ease: 'power2.out',
              },
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'wave':
          // Effet vague sinusoïdale
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: (i) => Math.sin(i * 0.5) * 50 + 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: {
                amount: stagger * items.length,
                from: 'center',
                ease: 'sine.inOut',
              },
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'zoom':
          // Effet zoom explosif depuis le centre
          gsap.fromTo(
            items,
            {
              opacity: 0,
              scale: 0,
              rotation: -180,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              stagger: {
                amount: stagger * items.length,
                from: 'center',
                grid: 'auto',
              },
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'flip':
          // Effet flip cards
          gsap.fromTo(
            items,
            {
              opacity: 0,
              rotationY: -180,
              transformPerspective: 1000,
              z: -200,
            },
            {
              opacity: 1,
              rotationY: 0,
              z: 0,
              duration: 1.2,
              stagger: {
                amount: stagger * items.length,
                from: 'random',
              },
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'magnetic':
          // Effet magnétique avec attraction
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          items.forEach((item, i) => {
            const angle = (i / items.length) * Math.PI * 2;
            const distance = 200;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            tl.fromTo(
              item,
              {
                opacity: 0,
                x,
                y,
                scale: 0.5,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.6)',
              },
              i * stagger
            );
          });
          break;

        default:
          // Animation par défaut améliorée
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
              rotationX: -20,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1,
              stagger: {
                amount: stagger * items.length,
                ease: 'power2.out',
              },
              ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
      }
    }, container);

    return () => ctx.revert();
  }, [stagger, children, variant]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Compteur animé pour statistiques
 */
export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [end, duration, prefix, suffix]);

  return <span ref={ref} className={className}></span>;
}

interface AnimatedTextProps {
  children: string;
  delay?: number;
  className?: string;
  variant?: 'default' | 'typewriter' | 'glitch' | 'gradient' | 'split';
}

/**
 * Texte animé avec effets spectaculaires
 */
export function AnimatedText({
  children,
  delay = 0,
  className = '',
  variant = 'default',
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const text = children;
      element.innerHTML = '';

      switch (variant) {
        case 'typewriter':
          // Effet machine à écrire
          element.textContent = '';
          const chars = text.split('');
          let currentText = '';

          gsap.to(
            {},
            {
              duration: text.length * 0.05,
              delay,
              onUpdate: function () {
                const progress = this.progress();
                const charIndex = Math.floor(progress * chars.length);
                currentText = chars.slice(0, charIndex).join('');
                element.textContent = currentText + (progress < 1 ? '|' : '');
              },
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
          break;

        case 'glitch':
          // Effet glitch cyberpunk
          element.style.position = 'relative';
          const glitchChars = text.split('').map((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.position = 'relative';
            return span;
          });

          glitchChars.forEach((char) => element.appendChild(char));

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          glitchChars.forEach((char, i) => {
            tl.fromTo(
              char,
              {
                opacity: 0,
                x: gsap.utils.random(-50, 50),
                y: gsap.utils.random(-20, 20),
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.1,
              },
              delay + i * 0.02
            ).to(
              char,
              {
                x: () => gsap.utils.random(-2, 2),
                duration: 0.05,
                repeat: 2,
                yoyo: true,
              },
              '<0.05'
            );
          });
          break;

        case 'gradient':
          // Effet gradient animé
          const gradientSpans = text.split('').map((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            return span;
          });

          gradientSpans.forEach((span) => element.appendChild(span));

          gsap.fromTo(
            gradientSpans,
            {
              opacity: 0,
              y: 50,
              scale: 0.5,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay,
              stagger: {
                amount: 0.6,
                from: 'start',
              },
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Animation continue de couleur
          gsap.to(gradientSpans, {
            backgroundImage: 'linear-gradient(90deg, #f97316, #dc2626, #f97316, #dc2626)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            webkitBackgroundClip: 'text',
            color: 'transparent',
            duration: 3,
            repeat: -1,
            ease: 'none',
            stagger: {
              amount: 1,
              from: 'start',
            },
          });
          break;

        case 'split':
          // Effet split avec rotation
          const words = text.split(' ');
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

            element.appendChild(wordSpan);

            gsap.fromTo(
              wordSpan.children,
              {
                opacity: 0,
                rotationY: -90,
                transformOrigin: 'center',
                transformPerspective: 1000,
              },
              {
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                delay: delay + wordIndex * 0.1,
                stagger: 0.03,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });
          break;

        default:
          // Animation par défaut améliorée
          const letters = text.split('').map((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            return span;
          });

          letters.forEach((letter) => element.appendChild(letter));

          gsap.fromTo(
            letters,
            {
              opacity: 0,
              y: 60,
              rotationX: -90,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              delay,
              stagger: 0.03,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
      }
    }, element);

    return () => ctx.revert();
  }, [children, delay, variant]);

  return <div ref={ref} className={className}></div>;
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

/**
 * Image avec effet parallax smooth
 */
export function ParallaxImage({ src, alt, speed = 0.3, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Bouton avec effet magnétique au survol
 */
export function MagneticButton({ children, className = '', strength = 0.5 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Révèle le contenu avec un effet de masque lors du scroll
 */
export function ScrollReveal({ children, className = '', threshold = 0.5 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  distance?: number;
}

/**
 * Élément flottant avec mouvement infini
 */
export function FloatingElement({
  children,
  className = '',
  speed = 3,
  distance = 20,
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: distance,
        duration: speed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(element, {
        x: distance / 2,
        duration: speed * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, element);

    return () => ctx.revert();
  }, [speed, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

/**
 * Révélation de texte avec split avancé
 */
export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  splitBy = 'chars',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      element.innerHTML = '';

      let elements: HTMLElement[] = [];

      if (splitBy === 'chars') {
        elements = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          element.appendChild(span);
          return span;
        });
      } else if (splitBy === 'words') {
        elements = text.split(' ').map((word) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.marginRight = '0.3em';
          element.appendChild(span);
          return span;
        });
      }

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          delay,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [text, delay, splitBy]);

  return <div ref={ref} className={className}></div>;
}

interface MorphingShapeProps {
  className?: string;
  color?: string;
  duration?: number;
}

/**
 * Forme morphing animée pour backgrounds
 */
export function MorphingShape({
  className = '',
  color = '#f97316',
  duration = 8,
}: MorphingShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        duration: duration / 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(element, {
        scale: 1.2,
        duration: duration / 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(element, {
        rotation: 360,
        duration: duration,
        repeat: -1,
        ease: 'none',
      });
    }, element);

    return () => ctx.revert();
  }, [duration]);

  return (
    <div
      ref={ref}
      className={`absolute ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        filter: 'blur(60px)',
        borderRadius: '50%',
      }}
    />
  );
}
