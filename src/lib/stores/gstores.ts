import { writable } from 'svelte/store';
export const larguraCenario = 1000;
export const alturaCenario = 632;
export const tamanhoElemento = 60;
export const velocidadeNave =  13;
export const velocidadeInimigos  = 25;
export const intervaloMovimento = 500;
export const tiros = writable<{ x: number; y: number; ativo: boolean }[]>([]);
export  const cooldownTempo = 500; 
export const score = writable(0);  

export const  jogo = writable( {
  nave: { 
    x: (larguraCenario - tamanhoElemento) / 2,
    y: alturaCenario - tamanhoElemento * 2
  }
})

export const inimigos = writable(
  Array(4).fill(null).map((_, linha) => ({
    tipo: linha < 2 ? 2 : 3,
    posicoes: Array(8).fill(null).map((_, coluna) => ({ x: coluna * 70, y: linha * 70 }))
  }))
);


export const tirosInimigos = writable<{ x: number; y: number; ativo: boolean }[]>([]);
export const gameOver = writable(false);