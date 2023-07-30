import Matter from 'matter-js';

import { BallTypes } from '../constants/balls.constants';

export function getBallById(balls: Matter.Body[], id: string): Matter.Body {
  return balls.find((ball: Matter.Body) => ball.label === id);
}

export function generateSecondaryBallId(x: number, y: number): string {
  return `ball:${BallTypes.Secondary}:${x}-${y}`;
}

export function getPrimaryBallId(): string {
  return `ball:${BallTypes.Primary}`;
}
