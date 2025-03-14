import { get } from "svelte/store";
import {
  inimigos,
  larguraCenario,
  tamanhoElemento,
  intervaloMovimento,
  gameOver,
  definirGameOver,
  boss,
  jogo,
  pause,
  velocidadeInimigos,
  alturaCenario,
} from "../stores/gstores.js";

let direcao = 1;
let movimentoAtivo = false; // Evita múltiplas execuções

function verificarGameOver() {
  const nave = get(jogo).nave;
  if (get(pause)) return;
  if (get(gameOver)) return;

  type Inimigo = {
    tipo: number;
    posicoes: { x: number; y: number }[];
    lado?: string; // Adiciona a propriedade 'lado' opcionalmente
  };

  inimigos.subscribe((lista: Inimigo[]) => {
    lista.forEach((inimigo) => {
      inimigo.posicoes.forEach((posicao) => {
        if (posicao.y >= alturaCenario - tamanhoElemento) {
          definirGameOver();
        }

        let colisao =
          posicao.x < nave.x + tamanhoElemento &&
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
    if (get(pause)) {
      movimentoAtivo = false; // Permite que moverInimigos() seja chamada após o pause
      return;
    }

    if (get(gameOver)) return;

    inimigos.update((inimigosAtuais) => {
      let precisaDescer = false;

      inimigosAtuais.forEach((inimigo) => {
        inimigo.posicoes.forEach((posicao) => {
          let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
          if (
            novaPosicaoX < 0 ||
            novaPosicaoX > larguraCenario - tamanhoElemento
          ) {
            precisaDescer = true;
          }
        });
      });

      if (precisaDescer) {
        direcao *= -1;
        inimigosAtuais = inimigosAtuais.map((inimigo) => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map((posicao) => ({
            ...posicao,
            y: posicao.y + tamanhoElemento,
          })),
        }));
      } else {
        inimigosAtuais = inimigosAtuais.map((inimigo) => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map((posicao) => ({
            ...posicao,
            x: posicao.x + velocidadeInimigos * direcao,
          })),
        }));
      }

      return inimigosAtuais;
    });

    verificarGameOver();

    setTimeout(atualizarMovimento, intervaloMovimento);
  }

  atualizarMovimento();
}

export function moverBoss() {
  let direcao = 1; // 1 para direita, -1 para esquerda

  function atualizarMovimento() {
    if (get(pause) || get(gameOver)) return;

    boss.update((bossAtual) => {
      let novaPosicaoX = bossAtual.x + 5 * direcao; // Ajuste a velocidade conforme necessário
      if (novaPosicaoX < 0 || novaPosicaoX > larguraCenario - bossAtual.width) {
        direcao *= -1; // Inverte a direção ao atingir as bordas
      } else {
        bossAtual.x = novaPosicaoX;
      }

      return bossAtual;
    });

    setTimeout(atualizarMovimento, intervaloMovimento);
  }

  atualizarMovimento();
}

export function moverInimigosEsquerda() {
  let direcao = 1; // 1 para direita, -1 para esquerda
  let linhasDescidas = 0;
  const maxLinhasDescidas = 4;

  function atualizarMovimento() {
    if (get(pause) || get(gameOver)) return;

    inimigos.update((inimigosAtuais) => {
      let precisaDescer = false;

      inimigosAtuais.forEach((inimigo) => {
        if (inimigo.lado === "esquerda") {
          inimigo.posicoes.forEach((posicao) => {
            let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
            if (
              novaPosicaoX < 0 ||
              novaPosicaoX > larguraCenario / 2 - tamanhoElemento
            ) {
              precisaDescer = true;
              console.log("Inimigo à esquerda atingiu a borda do cenário");
            }

            // Verifica colisão com o boss
            const bossAtual = get(boss);
            if (
              bossAtual.lifi > 0 && // Verifica se o boss está ativo
              novaPosicaoX < bossAtual.x + bossAtual.width &&
              novaPosicaoX + tamanhoElemento > bossAtual.x &&
              posicao.y < bossAtual.y + bossAtual.height &&
              posicao.y + tamanhoElemento > bossAtual.y
            ) {
              precisaDescer = true;
              console.log("Inimigo à esquerda colidiu com o boss");
            }

            // Verifica colisão com o player
            const nave = get(jogo).nave;
            if (
              posicao.y >= alturaCenario - tamanhoElemento ||
              (posicao.x < nave.x + tamanhoElemento &&
                posicao.x + tamanhoElemento > nave.x &&
                posicao.y < nave.y + tamanhoElemento &&
                posicao.y + tamanhoElemento > nave.y)
            ) {
              definirGameOver();
            }
          });
        }
      });

      if (precisaDescer && linhasDescidas < maxLinhasDescidas) {
        direcao *= -1;
        linhasDescidas++;
        inimigosAtuais = inimigosAtuais.map((inimigo) => {
          if (inimigo.lado === "esquerda") {
            return {
              ...inimigo,
              posicoes: inimigo.posicoes.map((posicao) => ({
                ...posicao,
                y: posicao.y + tamanhoElemento,
              })),
            };
          }
          return inimigo;
        });
        console.log("Inimigos à esquerda descendo uma linha");
      } else {
        inimigosAtuais = inimigosAtuais.map((inimigo) => {
          if (inimigo.lado === "esquerda") {
            return {
              ...inimigo,
              posicoes: inimigo.posicoes.map((posicao) => ({
                ...posicao,
                x: posicao.x + velocidadeInimigos * direcao,
              })),
            };
          }
          return inimigo;
        });
      }

      return inimigosAtuais;
    });

    setTimeout(atualizarMovimento, intervaloMovimento);
  }

  atualizarMovimento();
}

export function moverInimigosDireita() {
  let direcao = -1; // -1 para esquerda, 1 para direita
  let linhasDescidas = 0;
  const maxLinhasDescidas = 4;

  function atualizarMovimento() {
    if (get(pause) || get(gameOver)) return;

    inimigos.update((inimigosAtuais) => {
      let precisaDescer = false;

      inimigosAtuais.forEach((inimigo) => {
        if (inimigo.lado === "direita") {
          inimigo.posicoes.forEach((posicao) => {
            let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
            if (
              novaPosicaoX < larguraCenario / 2 ||
              novaPosicaoX > larguraCenario - tamanhoElemento
            ) {
              precisaDescer = true;
              console.log("Inimigo à direita atingiu a borda do cenário");
            }

            // Verifica colisão com o boss
            const bossAtual = get(boss);
            if (
              bossAtual.lifi > 0 && // Verifica se o boss está ativo
              novaPosicaoX < bossAtual.x + bossAtual.width &&
              novaPosicaoX + tamanhoElemento > bossAtual.x &&
              posicao.y < bossAtual.y + bossAtual.height &&
              posicao.y + tamanhoElemento > bossAtual.y
            ) {
              precisaDescer = true;
              console.log("Inimigo à direita colidiu com o boss");
            }

            // Verifica colisão com o player
            const nave = get(jogo).nave;
            if (
              posicao.y >= alturaCenario - tamanhoElemento ||
              (posicao.x < nave.x + tamanhoElemento &&
                posicao.x + tamanhoElemento > nave.x &&
                posicao.y < nave.y + tamanhoElemento &&
                posicao.y + tamanhoElemento > nave.y)
            ) {
              definirGameOver();
            }
          });
        }
      });

      if (precisaDescer && linhasDescidas < maxLinhasDescidas) {
        direcao *= -1;
        linhasDescidas++;
        inimigosAtuais = inimigosAtuais.map((inimigo) => {
          if (inimigo.lado === "direita") {
            return {
              ...inimigo,
              posicoes: inimigo.posicoes.map((posicao) => ({
                ...posicao,
                y: posicao.y + tamanhoElemento,
              })),
            };
          }
          return inimigo;
        });
        console.log("Inimigos à direita descendo uma linha");
      } else {
        inimigosAtuais = inimigosAtuais.map((inimigo) => {
          if (inimigo.lado === "direita") {
            return {
              ...inimigo,
              posicoes: inimigo.posicoes.map((posicao) => ({
                ...posicao,
                x: posicao.x + velocidadeInimigos * direcao,
              })),
            };
          }
          return inimigo;
        });
      }

      return inimigosAtuais;
    });

    setTimeout(atualizarMovimento, intervaloMovimento);
  }

  atualizarMovimento();
}
