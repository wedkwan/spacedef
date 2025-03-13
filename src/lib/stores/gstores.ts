import { moverInimigos } from "$lib/func/moveny.js";
import { writable  , get} from "svelte/store";

//estado do jogo
export const score = writable(0);
export const larguraCenario = 1411;  //1000
export const alturaCenario = 880;    //632
export const tamanhoElemento = 80;
export const audioEnabled = writable(true);

//game-over
export const gameOver = writable(false);
export function definirGameOver() {
  gameOver.set(true);
}
// Pause
export const pause = writable(false)

    
export function DefinirPause() {
  if (get(pause) === false) {
    pause.set(true);
  }else{
    pause.set(false)
    moverInimigos()
  }
}

    
   


//nave
export const vida = writable(3);
export const velocidadeNave = 22;
export const jogo = writable({
  nave: {
    x: (larguraCenario - tamanhoElemento) / 2,
    y: alturaCenario - tamanhoElemento * 2,
    viva: true,
  },
});

// criar inimigos
export const velocidadeInimigos = 20;

export const intervaloMovimento = 450;


export const inimigos = writable(
  Array(2)
    .fill(null)
    .map((_, linha) => ({
      tipo: linha < 2 ? 2 : 3,
      posicoes: Array(3)
        .fill(null)
        .map((_, coluna) => ({ x: coluna * 70, y: linha * 70 })),
    }))
);

// tiros
export const cooldownTempo = 650;
export const tirosInimigos = writable<
  { x: number; y: number; ativo: boolean }[]
>([]);
export const ctiroinimigo = writable(0.25);




export const tiros = writable<{ x: number; y: number; ativo: boolean }[]>([]);
