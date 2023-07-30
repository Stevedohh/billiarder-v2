import Matter, { Bodies, Body } from 'matter-js';

import { tableInsideBorderColor } from './constants/colors.constants';
import { tableHeight, tableWidth } from './constants/table.constants';

export class TableBorders {
  private readonly borderOptions = {
    isStatic: true,
    render: {
      fillStyle: tableInsideBorderColor,
    },
  };

  create(): Matter.Body[] {
    const topLeftBorder = Bodies.trapezoid(tableWidth / 4 + 17, 39, 660, 22, -0.09, this.borderOptions);
    const topRightBorder = Bodies.trapezoid(tableWidth - 416, 39, 660, 22, -0.09, this.borderOptions);

    const leftBorder = Bodies.trapezoid(44, tableHeight / 2, 683, 29, 0.06, this.borderOptions);
    Body.rotate(leftBorder, Math.PI / 2);
    const rightBorder = Bodies.trapezoid(tableWidth - 44, tableHeight / 2, 683, 29, 0.06, this.borderOptions);
    Body.rotate(rightBorder, -Math.PI / 2);

    const bottomRightBorder = Bodies.trapezoid(tableWidth - 416, tableHeight - 39, 720, 22, 0.09, this.borderOptions);
    const bottomLeftBorder = Bodies.trapezoid(tableWidth / 4 + 17, tableHeight - 39, 720, 22, 0.09, this.borderOptions);

    return [topLeftBorder, topRightBorder, leftBorder, rightBorder, bottomRightBorder, bottomLeftBorder];
  }
}
