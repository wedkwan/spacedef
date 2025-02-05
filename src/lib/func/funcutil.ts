import { larguraCenario, tamanhoElemento ,inimigos} from '../stores/gstores.js';
import { writable } from 'svelte/store';

// Verifica se há colisão com os limites do cenário
export function houveColisao(x: number): boolean {
  return x < 0 || x > larguraCenario - tamanhoElemento; 

}


export const explosoes = writable<{ x: number; y: number }[]>([]);

export function adicionarExplosao(x: number, y: number) {
  explosoes.update(atual => [...atual, { x, y }]);

  setTimeout(() => {
    explosoes.update(atual => atual.slice(1)); 
  }, 800); //ms
}
  // Função par erar nova onda de inimigos
  let ondaatual = 1 
export function novaOnda() {
  // A quantidade de inimigos vai dobrar a cada nova onda
  ondaatual++
  let numeroLinhas = 4;  // 3 linhas de inimigos no começo
  let numeroColunas = 9 ;// 4 inimigos por linha

  // Calculando o novo número de inimigos baseado no número atual
  let novosInimigos = Array(numeroLinhas ).fill(null).map((_, linha) => ({
    tipo: linha < 2 ? 2 : 3,  // Tipo de inimigo (alterar conforme necessário)
    posicoes: Array(numeroColunas + 1 ).fill(null).map((_, coluna) => ({
      x: coluna * 70,  // Espaço entre os inimigos horizontalmente
      y: linha * 70,   // Espaço entre os inimigos verticalmente
    }))
  }));

  inimigos.set(novosInimigos); // Atualiza o estado dos inimigos com a nova onda
}








