import {
  larguraCenario,
  tamanhoElemento,
  inimigos,
  gameOver
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

let numeroLinhas = 1; // 3 linhas de inimigos no começo
let numeroColunas = 1; // 4 inimigos por linha
let contador : number = 1;

export function novaOnda() {



  ondaatual++;
  console.log(novaOnda)
  
  let res = numeroLinhas + contador

  if(res <= 4){
    let novosInimigos = Array(res)
      .fill(null)
      .map((_, linha) => ({
        tipo: linha < 2 ? 2 : 3, // Tipo de inimigo (alterar conforme necessário)
        posicoes: Array(numeroColunas + contador)
          .fill(null)
          .map((_, coluna) => ({
            x: coluna * 70,
            y: linha * 70,
          })),
      break
      }));
      
      
      contador++
      //console.log(novosInimigos)
    
      inimigos.set(novosInimigos);
      
    

  
  }else{
    setTimeout(() => gameOver.set(true), 530);
  }

  // Calculando o novo número de inimigos baseado no número atual
  

}

 

