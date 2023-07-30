import Matter from 'matter-js';

import { Ball } from './Ball';
import { primaryBallColor } from './constants/colors.constants';
import { generateSecondaryBallId, getPrimaryBallId } from './helpers/ball.helper';

export class TableBalls {
  private readonly ballRadius = 18;

  private readonly primaryBallX = 1200;
  private readonly primaryBallY = 400;

  private readonly xShift = 31;
  private readonly yShift = 36;
  private readonly xStart = 200;
  private readonly xEnd = 340;
  private yStart = 320;
  private yEnd = 480;

  create(): Matter.Body[] {
    const balls = [];

    for (let x = this.xStart; x <= this.xEnd; x += this.xShift) {
      for (let y = this.yStart; y <= this.yEnd; y += this.yShift) {
        const id = generateSecondaryBallId(x, y);

        balls.push(new Ball(x, y, this.ballRadius, id).create());
      }
      this.yStart += this.ballRadius;
      this.yEnd -= this.ballRadius;
    }

    const primaryBallId = getPrimaryBallId();
    const primaryBall = new Ball(
      this.primaryBallX,
      this.primaryBallY,
      this.ballRadius,
      primaryBallId,
      primaryBallColor
    ).create();
    balls.push(primaryBall);

    return balls;
  }
}
