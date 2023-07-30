import { Composite, Engine as MatterEngine } from 'matter-js';

import { Table } from './Table';
import { TableBalls } from './TableBalls';
import { TableBorders } from './TableBorders';
import { TablePockets } from './TablePockets';

export class GameEngine {
  static create(): MatterEngine {
    const options = {
      gravity: {
        scale: 0,
        y: 0,
      },
    };

    const table = new Table();
    const tableBalls = new TableBalls();
    const tableBorders = new TableBorders();
    const tablePockets = new TablePockets();

    const engine = MatterEngine.create(options);

    Composite.add(engine.world, table.create());
    Composite.add(engine.world, tableBalls.create());
    Composite.add(engine.world, tableBorders.create());
    Composite.add(engine.world, tablePockets.create());

    return engine;
  }
}
