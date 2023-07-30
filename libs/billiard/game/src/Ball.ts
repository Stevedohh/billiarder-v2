import Matter, { Bodies } from 'matter-js';

import { secondaryBallColor } from './constants/colors.constants';

export class Ball {
  x: number;
  y: number;
  r: number;
  id: string;
  color: string;

  constructor(x: number, y: number, r: number, id: string, color: string = secondaryBallColor) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    this.color = color;
  }

  create(): Matter.Body {
    const options = {
      label: this.id,
      restitution: 0.9,
      frictionAir: 0.025,
      frictionStatic: 0,
      friction: 0.6,
      render: {
        fillStyle: this.color,
      },
    };

    return Bodies.circle(this.x, this.y, this.r, options);
  }
}
