import Matter, { Bodies } from 'matter-js';

import { tableOutsideBorderColor } from './constants/colors.constants';
import { tableHeight, tableWidth } from './constants/table.constants';

export class Table {
  private readonly tableCornerWidth = 60;
  private readonly tableOptions = {
    isStatic: true,
    render: {
      fillStyle: tableOutsideBorderColor,
    },
  };

  create(): Matter.Body[] {
    const rightWall = Bodies.rectangle(
      tableWidth,
      tableHeight / 2,
      this.tableCornerWidth,
      tableHeight,
      this.tableOptions
    );
    const bottomWall = Bodies.rectangle(tableHeight, tableHeight, tableWidth, this.tableCornerWidth, this.tableOptions);
    const topWall = Bodies.rectangle(tableHeight, 0, tableWidth, this.tableCornerWidth, this.tableOptions);
    const leftWall = Bodies.rectangle(0, tableHeight / 2, this.tableCornerWidth, tableHeight, this.tableOptions);

    return [rightWall, bottomWall, topWall, leftWall];
  }
}
