import React from 'react';

interface HeroPortraitProps {
  name: string;
}

// The og-image's node graph drawn around the portrait, which is its central node.
// Edges run to the centre and disappear behind the photo. On the light theme the
// cream nodes turn dark, so the graph keeps its three tones.
export const HeroPortrait: React.FC<HeroPortraitProps> = ({ name }) => (
  <div className="relative grid place-items-center w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none aspect-square">
    <div
      className="absolute -inset-[18%] bg-[radial-gradient(closest-side,rgba(245,158,11,0.22),transparent)] dark:bg-[radial-gradient(closest-side,rgba(217,119,6,0.2),transparent)]"
      aria-hidden="true"
    />
    <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
      <path
        d="M70 84 214 34 394 60 452 238 432 350 370 424 236 464 88 404 34 234 70 84M70 84 240 240 394 60M214 34 240 240 452 238M34 234 240 240 370 424M88 404 240 240M70 84 88 404M394 60 432 350"
        className="fill-none stroke-accent-700/40 dark:stroke-gold-500/50"
        strokeWidth="1.3"
      />
      <circle cx="394" cy="60" r="32" className="fill-none stroke-accent-700/40 dark:stroke-gold-500/40" />
      <g className="fill-accent-600">
        <circle cx="70" cy="84" r="20" />
        <circle cx="34" cy="234" r="9" />
        <circle cx="432" cy="350" r="7" />
      </g>
      <g className="fill-accent-400 dark:fill-gold-500">
        <circle cx="394" cy="60" r="21" />
        <circle cx="452" cy="238" r="11" />
        <circle cx="88" cy="404" r="14" />
      </g>
      <g className="fill-warm-800 dark:fill-cream-50">
        <circle cx="214" cy="34" r="9" />
        <circle cx="370" cy="424" r="18" />
        <circle cx="236" cy="464" r="8" />
      </g>
    </svg>
    <div className="hero-portrait relative w-[53.4%] aspect-square rounded-full overflow-hidden border-2 border-accent-500 dark:border-gold-500">
      <img
        src="/profile.webp"
        alt={name}
        width={640}
        height={688}
        fetchPriority="high"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);
