import { larguraCenario, tamanhoElemento , } from '../stores/gstores.js';


// Verifica se há colisão com os limites do cenário
export function houveColisao(x: number): boolean {
  return x < 0 || x > larguraCenario - tamanhoElemento; 

}
