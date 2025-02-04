import { jogo,inimigos, tirosInimigos, tamanhoElemento, alturaCenario, gameOver } from "$lib/stores/gstores.js"; 
import { tocarSom } from "./audio.js";

export function dispararInimigos() {
  setInterval(() => {
    inimigos.update(inimigosAtuais => {
      const novosTiros: { x: number; y: number; ativo: boolean }[] = [];

      // Escolhe alguns inimigos aleatórios para atirar
      inimigosAtuais.forEach(inimigo => {
        if (Math.random() < 0.2) { // 10% de chance de atirar por ciclo
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
          y: tiro.y + 18, // Move o tiro para baixo
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
  
        jogo.subscribe(state => {
          naveX = state.nave.x;
          naveY = state.nave.y;
        })();
  
        tirosAtuais.forEach(tiro => {
          const colidiu = tiro.x > naveX && tiro.x < naveX + tamanhoElemento &&
                          tiro.y > naveY && tiro.y < naveY + tamanhoElemento;
  
          if (colidiu) {
            gameOver.set(true); // Define o estado de Game Over
          }
        });
  
        return tirosAtuais;
      });
    }, 100);
  }