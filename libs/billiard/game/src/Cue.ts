import Matter, { Bodies, Body, Events, Vector } from 'matter-js';
import { Observable, Subject } from 'rxjs';

import { Velocity } from '@billiard/types';

import { cueColor } from './constants/colors.constants';
import { cueId } from './constants/cue.constants';

type EventCallback = (evt: Matter.IMouseEvent<Matter.MouseConstraint>) => void;

export class Cue {
  private readonly _cueWidth = 300;
  private readonly _cueHeight = 10;

  private _ball: Matter.Body;
  private _mouseConstraint: Matter.MouseConstraint;
  private _hitSubject: Subject<Velocity> = new Subject<Velocity>();

  body: Matter.Body = null;

  isCueRotate: boolean;
  lastMousePosition: Matter.IMousePoint;
  velocityForBall: Velocity;
  maxCueTranslateRadius: number;
  onTake: EventCallback;
  onMouseMove: EventCallback;
  onMouseUp: EventCallback;
  onMouseDown: EventCallback;

  get hit$(): Observable<Velocity> {
    return this._hitSubject.asObservable();
  }

  constructor(ball: Matter.Body, mouseConstraint: Matter.MouseConstraint) {
    this._ball = ball;
    this._mouseConstraint = mouseConstraint;

    this.isCueRotate = true;
    this.lastMousePosition = null;
    this.velocityForBall = null;
    this.maxCueTranslateRadius = 100;
  }

  createEvents(): void {
    this.onMouseMove = this._rotate.bind(this);
    this.onMouseUp = this._grow.bind(this);
    this.onMouseDown = this._take.bind(this);

    Events.on(this._mouseConstraint, 'mousemove', this.onMouseMove);
    Events.on(this._mouseConstraint, 'mouseup', this.onMouseUp);
    Events.on(this._mouseConstraint, 'mousedown', this.onMouseDown);
  }

  removeEvents(): void {
    Events.off(this._mouseConstraint, 'mousemove', this.onMouseMove);
    Events.off(this._mouseConstraint, 'mouseup', this.onMouseUp);
    Events.off(this._mouseConstraint, 'mousedown', this.onMouseDown);
  }

  create(): void {
    const options = {
      collisionFilter: {
        mask: 0,
      },
      label: cueId,
      render: {
        fillStyle: cueColor,
      },
    };

    this.body = Bodies.rectangle(
      this._ball.position.x + 180,
      this._ball.position.y,
      this._cueWidth,
      this._cueHeight,
      options
    );
  }

  private _translate(evt: Matter.IMouseEvent<Matter.MouseConstraint>): void {
    const mousePosition = evt.source.mouse.position;
    const cueAngle = this.body.angle;
    const ballPosition = this._ball.position;

    if (!this.lastMousePosition) {
      this.lastMousePosition = { ...mousePosition };
    }

    const subMouseAndLastMouse = Vector.sub(mousePosition, this.lastMousePosition);
    const lengthMouse = Vector.magnitude(subMouseAndLastMouse);
    const cueDirection = {
      x: Math.cos(cueAngle),
      y: Math.sin(cueAngle),
    };
    const dotMouseAndCue = Vector.dot(Vector.normalise(subMouseAndLastMouse), cueDirection);
    const vector = Vector.mult(cueDirection, lengthMouse * dotMouseAndCue);

    const cuePosition = {
      x: this.body.position.x + vector.x,
      y: this.body.position.y + vector.y,
    };

    const deltaBallAndCue = Vector.sub(ballPosition, cuePosition);
    const magnitudeBallAndCue = Vector.magnitude(deltaBallAndCue);

    const normalisedDeltaBallAndCue = Vector.normalise(deltaBallAndCue);
    const dotDeltaBallAndCue = Vector.dot(normalisedDeltaBallAndCue, cueDirection) * -1;

    const powerToKick = magnitudeBallAndCue / 2;

    this.velocityForBall = Vector.mult(cueDirection, powerToKick * -1);

    if (magnitudeBallAndCue >= this.maxCueTranslateRadius) {
      this.lastMousePosition = { ...mousePosition };

      return;
    }

    if (dotDeltaBallAndCue <= 0) {
      this.lastMousePosition = { ...mousePosition };

      return;
    }

    Body.translate(this.body, vector);
    this.lastMousePosition = { ...mousePosition };
  }

  private _rotate(evt: Matter.IMouseEvent<Matter.MouseConstraint>): void {
    if (this.isCueRotate) {
      const mousePosition = evt.source.mouse.position;
      const subVector = Vector.sub(mousePosition, this._ball.position);
      const length = Vector.magnitude(subVector);
      const cosAlpha = -subVector.x / length;
      let alpha = Math.acos(cosAlpha);

      if (length === 0) {
        return;
      }

      if (subVector.y > 0) {
        alpha *= -1;
      }

      Body.setCentre(this.body, this._ball.position);
      Body.setAngle(this.body, alpha);
    }
  }

  private _take(): void {
    this.isCueRotate = false;
    this.onTake = this._translate.bind(this);

    Events.on(this._mouseConstraint, 'mousemove', this.onTake);
  }

  private _grow(): void {
    this.isCueRotate = true;
    this.lastMousePosition = null;
    this._hitSubject.next(this.velocityForBall);

    Events.off(this._mouseConstraint, 'mousemove', this.onTake);
  }
}
