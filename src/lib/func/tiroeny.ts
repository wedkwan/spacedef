import {
  jogo,
  inimigos,
  tirosInimigos,
  tamanhoElemento,
  alturaCenario,
  gameOver,
  vida,
  ctiroinimigo,
  pause,
  tirosBoss,
  boss,
} from "$lib/stores/gstores.js";
import { paraMusica, tocarSom } from "./audio.js";
import { get, writable } from "svelte/store";
import { adicionarExplosao } from "./funcutil.js";
import {
  tirosInimigosBoss,
  inimigos_boss,
  definirGameOver,
} from "../stores/gstores.js";

export function dispararInimigos() {
  setInterval(() => {
    if (get(pause)) return;
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
            tocarSom("/src/static/music/laser3.mp3", 0.1); // S
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
            paraMusica();
            adicionarExplosao(naveX, naveY);
            setTimeout(() => gameOver.set(true), 530); //ms
            tocarSom("/src/static/music/Explosion.mp3", 1);
          }
          return false;
        }
        return true;
      });

      return novosTiros;
    });
  }, 100);
}

export function dispararBoss() {
  console.log("disparou");
  if (get(pause)) return;
  if (get(gameOver)) return;
  const bossAtual = get(boss);

  const novosTiros = [
    {
      x: bossAtual.x + 10, // Canhão esquerdo
      y: bossAtual.y + bossAtual.height,
      ativo: true,
    },
    {
      x: bossAtual.x + bossAtual.width - 10, // Canhão direito
      y: bossAtual.y + bossAtual.height,
      ativo: true,
    },
  ];

  tirosBoss.update((tiros) => [...tiros, ...novosTiros]); // Adiciona novos tiros
  tocarSom("/src/static/music/laser3.mp3", 0.1); // Som do tiro do boss
}

export function moverTirosBoss() {
  if (get(pause) || get(gameOver)) return;

  setInterval(() => {
    if (get(pause)) return;
    if (get(gameOver)) return;
    tirosBoss.update((tirosAtuais) => {
      return tirosAtuais
        .map((tiro) => ({
          ...tiro,
          y: tiro.y + 14,
          ativo: tiro.y < alturaCenario, // Remove os tiros que saem da tela
        }))
        .filter((tiro) => tiro.ativo);
    });

    verificarColisoesTirosBoss();
  }, 50);
}
function verificarColisoesTirosBoss() {
  tirosBoss.update((tirosAtuais) => {
    let naveX: number, naveY: number;
    // Obtém a posição atual da nave
    const state = get(jogo);
    naveX = state.nave.x;
    naveY = state.nave.y;

    // Filtra os tiros, removendo os que colidiram
    const novosTiros = tirosAtuais.filter((tiro) => {
      const colidiu =
        tiro.x > naveX &&
        tiro.x < naveX + tamanhoElemento &&
        tiro.y > naveY &&
        tiro.y < naveY + tamanhoElemento;

      if (colidiu) {
        vida.update((v) => v - 2);
        if (get(vida) <= 0) {
          jogo.update((state) => ({
            ...state,
            nave: {
              ...state.nave,
              viva: false,
            },
          }));
          paraMusica();
          adicionarExplosao(naveX, naveY);
          setTimeout(() => gameOver.set(true), 530); //ms
          tocarSom("/src/static/music/Explosion.mp3", 1);
          return false; // Remove o tiro que colidiu
        }
      }

      return !colidiu;
    });

    return novosTiros;
  });
}

export function moverTirosInimigosBoss() {
  setInterval(() => {
    tirosInimigosBoss.update((tiros) => {
      return tiros
        .map((tiro) => ({
          ...tiro,
          y: tiro.y + 3, // Velocidade do tiro
        }))
        .filter((tiro) => tiro.y < alturaCenario);
    });
  }, 50); // Intervalo de atualização dos tiros
}

export function verificarColisoesBoss() {
  setInterval(() => {
    if (get(pause) || get(gameOver)) return;

    const nave = get(jogo).nave;
    tirosInimigosBoss.update((tiros) => {
      return tiros.filter((tiro) => {
        const colidiu =
          tiro.x < nave.x + tamanhoElemento &&
          tiro.x + 5 > nave.x &&
          tiro.y < nave.y + tamanhoElemento &&
          tiro.y + 10 > nave.y;

        if (colidiu) {
          vida.update((v) => v - 1);

          if (get(vida) <= 0) {
            jogo.update((state) => ({
              ...state,
              nave: {
                ...state.nave,
                viva: false,
              },
            }));
            paraMusica();
            adicionarExplosao(nave.x, nave.y);
            setTimeout(() => gameOver.set(true), 530); //ms
            tocarSom("/src/static/music/Explosion.mp3", 1);
          }
        }

        return !colidiu;
      });
    });
  }, 50); // Intervalo de verificação de colisões
}

export function dispararInimigosBoss() {
  setInterval(() => {
    if (get(pause) || get(gameOver)) return;
    if ((get(boss).vida = false)) return; 
    
    inimigos_boss.update((inimigosAtuais) => {
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
            if (get(boss).vida = false) return 
            tocarSom("/src/static/music/laser3.mp3", 0.1); // Som do tiro
          }
        }
      });

      tirosInimigosBoss.update((tiros) => [...tiros, ...novosTiros]); // Adiciona novos tiros
      return inimigosAtuais;
    });
  }, 1700); // Dispara a cada 1.7 segundos
}
