import { writable } from 'svelte/store';

//estado do jogo
export const score = writable(0); 
export const larguraCenario = 1500;
export const alturaCenario = 900;
export const tamanhoElemento = 60;

 

//game-over 
export const gameOver = writable(false);
export function definirGameOver() {
  gameOver.set(true);
}
 
//nave 
export const velocidadeNave =  16;
export const  jogo = writable( {
  nave: { 
    x: (larguraCenario - tamanhoElemento) / 2,
    y: alturaCenario - tamanhoElemento * 2
  }
})

// criar inimigos
export const velocidadeInimigos  = 25;
export const intervaloMovimento = 450 ;

export const inimigos = writable(
  Array(2).fill(null).map((_, linha) => ({
    tipo: linha < 2 ? 2 : 3,
    posicoes: Array(4).fill(null).map((_, coluna) => ({ x: coluna * 70, y: linha * 70 }))
  }))
);

// tiros 
export  const cooldownTempo = 500;
export const tirosInimigos = writable<{ x: number; y: number; ativo: boolean }[]>([]);
export const tiros = writable<{ x: number; y: number; ativo: boolean }[]>([]);

