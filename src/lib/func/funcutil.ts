import {
  larguraCenario,
  tamanhoElemento,
  inimigos,
  gameOver,
  // Adicione uma nova store para o boss
  boss,
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
let numeroLinhas = 2;
let numeroColunas = 3;
let contador: number = 1;

const maxLinhas = 1;
const maxColunas = 10;
let altera = 0;

export function novaOnda() {
  console.log(novaOnda);

  if (contador % 2 == 0) {
    altera = contador;
    console.log(altera);
  }

  const linhas = Math.min(numeroLinhas + altera, maxLinhas);
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

  // Verifica se é a última onda
  if (ondaatual === maxLinhas) {
    spawnBoss();
  }

  ondaatual++;
}

// Função para criar o boss
function spawnBoss() {
  const bossData = {
    x: larguraCenario / 2 - 50, // Posição inicial do boss
    y: 50, // Posição inicial do boss
    width: 100, // Largura do boss
    height: 100, // Altura do boss
    // Adicione outras propriedades necessárias para o boss
  };

  boss.set(bossData);

  // Lógica para fazer o boss atirar pelos lados
  setInterval(() => {
    // Adicione a lógica de tiro aqui
    console.log("Boss está atirando!");
  }, 1000); // Intervalo de tiro em milissegundos
}
