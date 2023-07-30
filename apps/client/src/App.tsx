import { onCleanup, onMount } from 'solid-js';

import { Velocity } from '@billiard/types';

import { ClientGame } from './ClientGame';

import styles from './App.module.scss';

function App() {
  onMount(() => {
    const canvasElement = document.querySelector('#canvas-wrapper') as HTMLCanvasElement;

    const game = new ClientGame(canvasElement);
    game.initialize();

    const hitSubscription = game.cueHit$.subscribe((velocity: Velocity) => {
      console.log(velocity, 'velocity');
    });

    onCleanup(() => {
      hitSubscription.unsubscribe();
      game.unsubscribe();
    });
  });

  return (
    <div class={styles.root}>
      <canvas id="canvas-wrapper"></canvas>
    </div>
  );
}

export default App;
