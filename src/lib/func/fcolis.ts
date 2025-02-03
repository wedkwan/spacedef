import { larguraCenario, tamanhoElemento , } from '../stores/gstores.js';


// Verifica se há colisão com os limites do cenário
export function houveColisao(x: number): boolean {
  return x < 0 || x > larguraCenario - tamanhoElemento; 

}
import { writable } from 'svelte/store';

export const explosoes = writable<{ x: number; y: number }[]>([]);

export function adicionarExplosao(x: number, y: number) {
  explosoes.update(atual => [...atual, { x, y }]);

  setTimeout(() => {
    explosoes.update(atual => atual.slice(1)); // Remove a explosão após 500ms
  }, 500);
}
