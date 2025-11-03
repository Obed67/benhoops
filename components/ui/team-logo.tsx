'use client';

import React, { useState } from 'react';

interface TeamLogoProps {
  src?: string;
  name: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function TeamLogo({
  src,
  name,
  size = 56,
  bgColor = '#e5e7eb',
  textColor = '#111827',
  className = '',
}: TeamLogoProps) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: bgColor,
    color: textColor,
    borderRadius: '50%',
    fontWeight: 700,
    fontSize: Math.floor(size / 2.5),
    overflow: 'hidden',
  };

  if (!src || errored) {
    return (
      <div className={className} style={style} aria-hidden>
        {initials}
      </div>
    );
  }

  return (
    // use native img here to get reliable onError behavior in a client component
    // This avoids next/image server-side complexities for external URLs
    <img
      className={className}
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      style={{ objectFit: 'contain', borderRadius: '50%' }}
      onError={() => setErrored(true)}
    />
  );
}
