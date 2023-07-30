import { Engine, Render } from 'matter-js';

import { tableClothColor } from './constants/colors.constants';
import { tableHeight, tableWidth } from './constants/table.constants';

export class GameRender {
  static create(engine: Engine, canvasElement: HTMLCanvasElement) {
    const options = {
      width: tableWidth,
      height: tableHeight,
      wireframes: false,
      background: tableClothColor,
    };

    return Render.create({
      canvas: canvasElement,
      engine,
      options,
    });
  }
}
