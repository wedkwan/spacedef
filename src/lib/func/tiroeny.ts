import {
  jogo,
  inimigos,
  tirosInimigos,
  tamanhoElemento,
  alturaCenario,
  gameOver,
  vida,
  ctiroinimigo ,
  pause
} from "../stores/gstores.js";
import { paraMusica, tocarSom } from "./audio.js";
import { get , writable } from "svelte/store";
import { adicionarExplosao } from "./funcutil.js";

export function dispararInimigos() {
  setInterval(() => {
    if (get(pause)) return ; 
    if (get(gameOver)) return;
    inimigos.update((inimigosAtuais) => {
      
      const novosTiros: { x: number; y: number; ativo: boolean }[] = [];
       
      // Escolhe alguns inimigos aleatórios para atirar
      inimigosAtuais.forEach((inimigo) => {
        if (Math.random() < get(ctiroinimigo)) {
          // 10% de chance de atirar por ciclo
          const inimigoEscolhido =
            inimigo.posicoes[
              Math.floor(Math.random() * inimigo.posicoes.length)
            ];

          if (inimigoEscolhido) {
            novosTiros.push({
              x: inimigoEscolhido.x + tamanhoElemento / 2 - 2,
              y: inimigoEscolhido.y + tamanhoElemento,
              ativo: true,
            });
             if (get(pause)) return; 
            tocarSom("/src/static/music/laser3.mp3" , 0.1); // S
          }
        }
      });

      tirosInimigos.update((tiros) => [...tiros, ...novosTiros]); // Adiciona novos tiros
      return inimigosAtuais;
    });
  }, 1700); // Dispara a cada 1 segundo
}

export function moverTirosInimigos() {
  setInterval(() => {
     if (get(pause)) return;
     if (get(gameOver)) return;
    tirosInimigos.update((tirosAtuais) => {
      return tirosAtuais
        .map((tiro) => ({
          ...tiro,
          y: tiro.y + 14,
          ativo: tiro.y < alturaCenario, // Remove os tiros que saem da tela
        }))
        .filter((tiro) => tiro.ativo);
    });
  }, 50);
}

export function verificarColisoes() {
  setInterval(() => {
    tirosInimigos.update((tirosAtuais) => {
      let naveX: number, naveY: number;
      // Obtém a posição atual da nave (utilize get() ou subscribe com imediatidade)
      jogo.subscribe((state) => {
        naveX = state.nave.x;
        naveY = state.nave.y;
      })();

      // Filtra os tiros, removendo os que colidiram
      const novosTiros = tirosAtuais.filter((tiro) => {
        const colidiu =
          tiro.x > naveX &&
          tiro.x < naveX + tamanhoElemento &&
          tiro.y > naveY &&
          tiro.y < naveY + tamanhoElemento;

        if (colidiu) {
          vida.update((v) => v - 1);

          console.log(get(vida));
          if (get(vida) === 0) {
            jogo.update((state) => ({
              ...state,
              nave: {
                ...state.nave,
                viva: false,
              },
            }));
            paraMusica()
            adicionarExplosao(naveX, naveY);
            setTimeout(() => gameOver.set(true), 530); //ms
            tocarSom("/src/static/music/Explosion.mp3" , 1 ); 

          }
          return false;
        }
        return true;
      });

      return novosTiros;
    });
  }, 100);
}
