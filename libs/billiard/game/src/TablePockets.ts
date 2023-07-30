import Matter, { Bodies } from 'matter-js';

import { tablePocketColor } from './constants/colors.constants';
import { tableHeight, tableWidth } from './constants/table.constants';

export class TablePockets {
  private readonly pocketRadius = 24;
  private readonly pocketShift = 10;

  private readonly pocketOptions = {
    isSensor: true,
    isStatic: true,
    render: {
      fillStyle: tablePocketColor,
    },
  };

  create(): Matter.Body[] {
    const topCenterPocket = Bodies.circle(tableWidth / 2, this.pocketRadius + 2, this.pocketRadius, this.pocketOptions);
    const topLeftPocket = Bodies.circle(
      this.pocketRadius + this.pocketShift,
      this.pocketRadius + this.pocketShift,
      this.pocketRadius,
      this.pocketOptions
    );
    const topRightPocket = Bodies.circle(
      tableWidth - this.pocketRadius - this.pocketShift,
      this.pocketRadius + this.pocketShift,
      this.pocketRadius,
      this.pocketOptions
    );
    const bottomLeftPocket = Bodies.circle(
      this.pocketRadius + this.pocketShift,
      tableHeight - this.pocketRadius - this.pocketShift,
      this.pocketRadius,
      this.pocketOptions
    );
    const bottomCenterPocket = Bodies.circle(
      tableWidth / 2,
      tableHeight - this.pocketRadius - 2,
      this.pocketRadius,
      this.pocketOptions
    );
    const bottomRightPocket = Bodies.circle(
      tableWidth - this.pocketRadius - this.pocketShift,
      tableHeight - this.pocketRadius - this.pocketShift,
      this.pocketRadius,
      this.pocketOptions
    );

    return [topLeftPocket, topCenterPocket, topRightPocket, bottomLeftPocket, bottomCenterPocket, bottomRightPocket];
  }
}
