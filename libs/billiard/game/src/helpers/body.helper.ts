import Matter, { Composite } from 'matter-js';

export const getWorldBody = (world: Matter.World, id: string) => {
  return Composite.allBodies(world).find((ball) => ball.label === id);
};
