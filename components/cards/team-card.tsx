'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Team } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { gsap } from 'gsap';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        y: 0,
      },
      {
        y: -12,
        duration: 0.4,
        ease: 'power2.out',
      }
    );

    // Animation du logo avec rotation
    const logo = cardRef.current.querySelector('.team-logo');
    if (logo) {
      gsap.to(logo, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    }

    // Animation des infos avec slide up
    const content = cardRef.current.querySelector('.team-content');
    if (content) {
      gsap.to(content, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    // Retour du logo
    const logo = cardRef.current.querySelector('.team-logo');
    if (logo) {
      gsap.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Retour des infos
    const content = cardRef.current.querySelector('.team-content');
    if (content) {
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <Link href={`/teams/${team.id}`}>
      <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Card className="group overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-orange-500/20 duration-300">
          <CardHeader className="h-32 relative p-0">
            {/* Image de fond (fanart ou gradient) */}
            {team.fanart ? (
              <div className="absolute inset-0">
                <Image
                  src={team.fanart}
                  alt={`${team.name} background`}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay gradient pour lisibilité */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${team.primaryColor}dd 0%, ${team.secondaryColor}dd 100%)`,
                  }}
                />
              </div>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${team.primaryColor} 0%, ${team.secondaryColor} 100%)`,
                }}
              />
            )}

            {/* Logo de l'équipe */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="team-logo bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Image
                  src={team.logo}
                  alt={`${team.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="team-content p-4">
            <h3 className="text-lg font-bold mb-1">{team.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {team.city}, {team.country}
            </p>
            {team.championships > 0 && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Trophy className="h-3 w-3" />
                <span>
                  {team.championships} {team.championships === 1 ? 'titre' : 'titres'}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
