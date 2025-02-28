import {
  larguraCenario,
  tamanhoElemento,
  inimigos,
  gameOver,
} from "../stores/gstores.js";
import { writable } from "svelte/store";

// Verifica se há colisão com os limites do cenário
export function houveColisao(x: number): boolean {
  return x < 0 || x > larguraCenario - tamanhoElemento;
}

export const explosoes = writable<{ x: number; y: number }[]>([]);

export function adicionarExplosao(x: number, y: number) {
  explosoes.update((atual) => [...atual, { x, y }]);

  setTimeout(() => {
    explosoes.update((atual) => atual.slice(1));
  }, 800); //ms
}

let ondaatual = 1;
let numeroLinhas = 1;
let numeroColunas = 1;
let contador: number = 1;

const maxLinhas = 5;
const maxColunas = 5;

export function novaOnda() {
  console.log(novaOnda);

  const linhas = Math.min(numeroLinhas + contador, maxLinhas);
  const colunas = Math.min(numeroColunas + contador, maxColunas);

  let novosInimigos = Array(linhas)
    .fill(null)
    .map((_, linha) => ({
      tipo: linha < 2 ? 2 : 3,
      posicoes: Array(colunas)
        .fill(null)
        .map((_, coluna) => ({
          x: coluna * 70,
          y: linha * 70,
        })),
    }));

  contador++;
  inimigos.set(novosInimigos);

  if (novosInimigos.length === 0) {
    setTimeout(() => gameOver.set(true), 530);
  }
  ondaatual++;
}
