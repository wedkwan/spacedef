import {
  larguraCenario,
  tamanhoElemento,
  inimigos,
  gameOver,
  boss,
} from "../stores/gstores.js";
import { writable } from "svelte/store";
import { dispararBoss } from "./tiroeny.js";
import {
  moverBoss,
  moverInimigos,
  moverInimigosDireita,
  moverInimigosEsquerda,
} from "./moveny.js";

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
let numeroLinhas = 5;
let numeroColunas = 3;
let contador: number = 1;

const maxLinhas = 2;
const maxColunas = 10;
let altera = 0;
let bossSpawnado = false;

export function novaOnda() {
  if (bossSpawnado) return; // Evita chamar novaOnda após o boss ser spawnado

  console.log("Nova onda iniciada");

  if (contador % 2 == 0) {
    altera = contador;
    console.log("Altera:", altera);
  }

  const linhas = Math.min(numeroLinhas + altera, maxLinhas);
  const colunas = Math.min(numeroColunas + contador, maxColunas);

  let novosInimigos = Array(linhas)
    .fill(null)
    .map((_, linha) => ({
      tipo: linha < 2 ? 2 : 3,
      lado: linha % 2 === 0 ? "esquerda" : "direita", // Alterna entre esquerda e direita
      posicoes: Array(colunas)
        .fill(null)
        .map((_, coluna) => ({
          x: linha % 2 === 0 ? coluna * 70 : larguraCenario - (coluna + 1) * 70,
          y: 50, // Mesma linha que o boss
        })),
    }));

  contador++;
  inimigos.set(novosInimigos);

  if (novosInimigos.length === 0) {
    setTimeout(() => gameOver.set(true), 530);
  }

  // Verifica se é a última onda
  if (ondaatual === maxLinhas) {
    console.log("Última onda, spawnando boss");
    spawnBoss();
    bossSpawnado = true; // Marca que o boss foi spawnado
  } else {
    moverInimigos(); // Certifique-se de que os inimigos se movem após cada nova onda
  }

  ondaatual++;
}

export function spawnBoss() {
  const bossData = {
    x: larguraCenario / 2 - 50, // Posição inicial do boss
    y: 50, // Posição inicial do boss
    width: 100, // Largura do boss
    height: 100, // Altura do boss
    lifi: 100, // Vida do boss
    // Adicione outras propriedades necessárias para o boss
  };

  boss.set(bossData);
  console.log("Boss criado:", bossData);

  // Cria inimigos à esquerda e à direita do boss, na mesma linha que o boss
  const linhaDoBoss = bossData.y;

  const inimigosEsquerda = Array(2)
    .fill(null)
    .map((_, linha) => ({
      tipo: 2,
      lado: "esquerda",
      posicoes: Array(4)
        .fill(null)
        .map((_, coluna) => ({
          x: coluna * 70,
          y: linhaDoBoss,
        })),
    }));

  const inimigosDireita = Array(2)
    .fill(null)
    .map((_, linha) => ({
      tipo: 2,
      lado: "direita",
      posicoes: Array(4)
        .fill(null)
        .map((_, coluna) => ({
          x: larguraCenario - (coluna + 1) * 70,
          y: linhaDoBoss,
        })),
    }));

  inimigos.set([...inimigosEsquerda, ...inimigosDireita]);
  console.log("Inimigos criados à esquerda e à direita do boss");

  // Lógica para fazer o boss atirar pelos lados
  setInterval(() => {
    dispararBoss();
  }, 1000); // Intervalo de tiro em milissegundos

  // Lógica para mover o boss
  moverBoss();
  console.log("moverBoss chamado");

  // Lógica para mover os inimigos criados quando o boss aparece
  moverInimigosEsquerda();
  moverInimigosDireita();
}
