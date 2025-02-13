import { inimigos, alturaCenario, larguraCenario, tamanhoElemento, velocidadeInimigos, intervaloMovimento  , gameOver , jogo , definirGameOver} from '../stores/gstores.js';
import { get } from "svelte/store";

let direcao = 1;
let movimentoAtivo = false; // Evita múltiplas execuções

function verificarGameOver() {
  const nave = get(jogo).nave; 

  inimigos.subscribe(lista => {
    lista.forEach(inimigo => {
      inimigo.posicoes.forEach(posicao => {
        
        if (posicao.y >= alturaCenario - tamanhoElemento) {
          definirGameOver();
        }

         
        let colisao = posicao.x < nave.x + tamanhoElemento &&
                      posicao.x + tamanhoElemento > nave.x &&
                      posicao.y < nave.y + tamanhoElemento &&
                      posicao.y + tamanhoElemento > nave.y;

        if (colisao) {
          definirGameOver();
        }
      });
    });
  });
}

export function moverInimigos() {
  if (movimentoAtivo) return; 
  movimentoAtivo = true;

  function atualizarMovimento() {
    if (get(gameOver)) return; // Para tudo se for Game Over!

    inimigos.update((inimigosAtuais) => {
      let precisaDescer = false;

      inimigosAtuais.forEach(inimigo => {
        inimigo.posicoes.forEach(posicao => {
          let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
          if (novaPosicaoX < 0 || novaPosicaoX > larguraCenario - tamanhoElemento) {
            precisaDescer = true;
          }
        });
      });

      if (precisaDescer) {
        direcao *= -1;
        inimigosAtuais = inimigosAtuais.map(inimigo => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map(posicao => ({
            ...posicao,
            y: posicao.y + tamanhoElemento
          }))
        }));
      } else {
        inimigosAtuais = inimigosAtuais.map(inimigo => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map(posicao => ({
            ...posicao,
            x: posicao.x + velocidadeInimigos * direcao
          }))
        }));
      }

      return inimigosAtuais;
    });

    verificarGameOver(); 

    setTimeout(atualizarMovimento, intervaloMovimento);
  }

  atualizarMovimento();
}

