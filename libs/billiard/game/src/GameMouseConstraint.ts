import Matter, { MouseConstraint } from 'matter-js';

export class GameMouseConstraint {
  static create(engine: Matter.Engine, mouse: Matter.Mouse): Matter.MouseConstraint {
    const options = {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    };

    return MouseConstraint.create(engine, options);
  }
}
