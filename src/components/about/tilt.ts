import type { MouseEvent } from 'react';

export function handleTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px) scale(1.02)`;
}

export function handleTiltLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
}
