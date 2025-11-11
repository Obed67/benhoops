'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook personnalisé pour les animations GSAP avec gestion correcte du contexte
 */

// Animation de fade in depuis le bas
export function useFadeInUp(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Animation de fade in depuis la gauche
export function useFadeInLeft(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Animation de fade in depuis la droite
export function useFadeInRight(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Animation de scale (zoom in)
export function useScaleIn(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Animation stagger pour listes d'éléments
export function useStaggerAnimation(
  stagger = 0.1,
  animationType: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' = 'fadeUp'
): RefObject<HTMLElement> {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      let fromVars: gsap.TweenVars = {};
      let toVars: gsap.TweenVars = {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
      };

      switch (animationType) {
        case 'fadeUp':
          fromVars = { opacity: 0, y: 40 };
          toVars.y = 0;
          break;
        case 'fadeLeft':
          fromVars = { opacity: 0, x: -40 };
          toVars.x = 0;
          break;
        case 'fadeRight':
          fromVars = { opacity: 0, x: 40 };
          toVars.x = 0;
          break;
        case 'scale':
          fromVars = { opacity: 0, scale: 0.9 };
          toVars.scale = 1;
          break;
      }

      gsap.fromTo(children, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [stagger, animationType]);

  return containerRef;
}

// Animation de parallax pour images
export function useParallax(speed = 0.5): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

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
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

// Animation de rotation continue
export function useRotate(duration = 10): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        rotation: 360,
        duration,
        repeat: -1,
        ease: 'none',
      });
    }, element);

    return () => ctx.revert();
  }, [duration]);

  return ref;
}

// Animation de texte split (lettre par lettre)
export function useTextReveal(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const text = element.textContent || '';
      element.textContent = '';

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
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Animation de compteur (pour statistiques)
export function useCountUp(endValue: number, duration = 2, delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration,
        delay,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toString();
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [endValue, duration, delay]);

  return ref;
}

// Animation de ligne progressive (pour souligner du texte)
export function useLineAnimation(delay = 0): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          scaleX: 0,
          transformOrigin: 'left',
        },
        {
          scaleX: 1,
          duration: 1.2,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}
