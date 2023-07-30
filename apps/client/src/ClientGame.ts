import Matter, { Composite, Mouse, Render, Runner, World } from 'matter-js';
import { Observable, of, Subject, takeUntil } from 'rxjs';

import { Cue, GameEngine, GameMouseConstraint, GameRender, getPrimaryBallId, getWorldBody } from '@billiard/game';
import { Velocity } from '@billiard/types';

export class ClientGame {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _destroyedSubject = new Subject();

  private _engine: Matter.Engine;
  private _render: Matter.Render;

  cueHit$: Observable<Velocity> = of(null);

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  initialize() {
    this._engine = GameEngine.create();
    this._render = GameRender.create(this._engine, this._canvas);

    this._createCue();

    Render.run(this._render);
    Runner.run(Runner.create(), this._engine);
  }

  unsubscribe(): void {
    this._destroyedSubject.next(null);
    this._destroyedSubject.complete();
  }

  private _createCue(): void {
    const mouse = Mouse.create(this._render.canvas);
    const mouseConstraint = GameMouseConstraint.create(this._engine, mouse);
    const primaryBall = getWorldBody(this._engine.world, getPrimaryBallId());
    const cue = new Cue(primaryBall, mouseConstraint);

    this.cueHit$ = cue.hit$;

    cue.create();
    cue.createEvents();

    cue.hit$.pipe(takeUntil(this._destroyedSubject)).subscribe(() => {
      World.remove(this._engine.world, cue.body);
      cue.removeEvents();
    });

    Composite.add(this._engine.world, [cue.body]);
  }
}
