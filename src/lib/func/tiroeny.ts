import { jogo, inimigos, tirosInimigos, tamanhoElemento, alturaCenario, gameOver ,vida } from "$lib/stores/gstores.js"; 
import { tocarSom } from "./audio.js";
import { get } from "svelte/store";
import { adicionarExplosao } from "./funcutil.js";


export function dispararInimigos() {
  
  setInterval(() => {
    if (get(gameOver)) return;
    inimigos.update(inimigosAtuais => {
      const novosTiros: { x: number; y: number; ativo: boolean }[] = [];

      // Escolhe alguns inimigos aleatórios para atirar
      inimigosAtuais.forEach(inimigo => {
        if (Math.random() < 0.35) { // 10% de chance de atirar por ciclo
          const inimigoEscolhido = inimigo.posicoes[Math.floor(Math.random() * inimigo.posicoes.length)];

          if (inimigoEscolhido) {
            novosTiros.push({
              x: inimigoEscolhido.x + tamanhoElemento / 2 - 2,
              y: inimigoEscolhido.y + tamanhoElemento,
              ativo: true
            });
            tocarSom('/src/static/music/laser3.mp3'); // S
          }
        }
      });

      tirosInimigos.update(tiros => [...tiros, ...novosTiros]); // Adiciona novos tiros
      return inimigosAtuais;
    });
  }, 1000); // Dispara a cada 1 segundo
}

export function moverTirosInimigos() {
  
  setInterval(() => {
    tirosInimigos.update(tirosAtuais => {
      return tirosAtuais
        .map(tiro => ({
          ...tiro,
          y: tiro.y + 18, 
          ativo: tiro.y < alturaCenario // Remove os tiros que saem da tela
        }))
        .filter(tiro => tiro.ativo);
    });
  }, 50);
}


export function verificarColisoes() {
  setInterval(() => {
    tirosInimigos.update(tirosAtuais => {
      let naveX: number, naveY: number;
      // Obtém a posição atual da nave (utilize get() ou subscribe com imediatidade)
      jogo.subscribe(state => {
        naveX = state.nave.x;
        naveY = state.nave.y;
      })();

      // Filtra os tiros, removendo os que colidiram
      const novosTiros = tirosAtuais.filter(tiro => {
        const colidiu =
          tiro.x > naveX &&
          tiro.x < naveX + tamanhoElemento &&
          tiro.y > naveY &&
          tiro.y < naveY + tamanhoElemento;

        if (colidiu) {
          
          vida.update(v => v - 1);
          
          console.log(get(vida));
          if (get(vida) === 0) {
            jogo.update(state => ({
              ...state,
              nave: {
                ...state.nave,
                viva: false
              }
            }));
            adicionarExplosao (naveX , naveY)
            gameOver.set(true);
          }
          return false; 
        }
        return true; 
      });

      return novosTiros;
    });
  }, 100);
}
