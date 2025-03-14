import {
  jogo,
  cooldownTempo,
  tamanhoElemento,
  inimigos,
  score,
  tiros,
  ctiroinimigo,
  boss,
  inimigos_boss,
  gameOver,
} from "$lib/stores/gstores.js";
import { adicionarExplosao, novaOnda } from "./funcutil.js";
import { tocarSom } from "./audio.js";
import { get } from "svelte/store";

let novaOndaTimeout: any = null;
let ultimaVezQueTiro = 0;

export function disparar() {
  const agora = Date.now();

  if (agora - ultimaVezQueTiro > cooldownTempo) {
    jogo.subscribe((state) => {
      tiros.update((tirosAtuais) => [
        ...tirosAtuais,
        {
          x: state.nave.x + tamanhoElemento / 2 - 5, // Centraliza o tiro
          y: state.nave.y,
          ativo: true,
        },
      ]);
    })();

    tocarSom("/src/static/music/laser.mp3", 0.12);

    ultimaVezQueTiro = agora;
  }
}

export function moverTiros() {
  tiros.update((tirosAtuais) => {
    let tirosAtualizados = tirosAtuais.map((tiro) => ({
      ...tiro,
      y: tiro.y - 10, // Move o tiro para cima
      ativo: tiro.y > 0, // Verifica se o tiro ainda está visível
    }));

    inimigos.update((inimigosAtuais) => {
      let inimigosRestantes = [...inimigosAtuais];

      tirosAtualizados = tirosAtualizados.filter((tiro) => {
        let tiroAtivo = true;

        // Verifica colisão com inimigos
        for (let i = 0; i < inimigosRestantes.length; i++) {
          let inimigo = inimigosRestantes[i];

          for (let j = 0; j < inimigo.posicoes.length; j++) {
            let posicao = inimigo.posicoes[j];

            let colidiu =
              tiro.x < posicao.x + tamanhoElemento &&
              tiro.x + 5 > posicao.x &&
              tiro.y < posicao.y + tamanhoElemento &&
              tiro.y + 10 > posicao.y;

            if (colidiu) {
              score.update((n) => n + 10);
              adicionarExplosao(posicao.x, posicao.y);

              inimigo.posicoes.splice(j, 1);

              if (inimigo.posicoes.length === 0) {
                inimigosRestantes.splice(i, 1);
              }

              tiroAtivo = false; // Tiro para imediatamente
              break;
            }
          }

          if (!tiroAtivo) break; // Para de checar se o tiro atingiu alguém
        }

        return tiroAtivo; // Se for falso, o tiro será removido
      });

      if (inimigosRestantes.length === 0 && !novaOndaTimeout) {
        ctiroinimigo.update((n) => n * 1.1);

        novaOndaTimeout = setTimeout(() => {
          novaOnda();
          novaOndaTimeout = null;
        }, 3000); // 3 segundos
      }

      return inimigosRestantes;
    });

    // Verifica colisão com inimigos do boss
    inimigos_boss.update((inimigosBossAtuais) => {
      let inimigosBossRestantes = [...inimigosBossAtuais];

      tirosAtualizados = tirosAtualizados.filter((tiro) => {
        let tiroAtivo = true;

        for (let i = 0; i < inimigosBossRestantes.length; i++) {
          let inimigo = inimigosBossRestantes[i];

          for (let j = 0; j < inimigo.posicoes.length; j++) {
            let posicao = inimigo.posicoes[j];

            let colidiu =
              tiro.x < posicao.x + tamanhoElemento &&
              tiro.x + 5 > posicao.x &&
              tiro.y < posicao.y + tamanhoElemento &&
              tiro.y + 10 > posicao.y;

            if (colidiu) {
              score.update((n) => n + 10);
              adicionarExplosao(posicao.x, posicao.y);

              inimigo.posicoes.splice(j, 1);

              if (inimigo.posicoes.length === 0) {
                inimigosBossRestantes.splice(i, 1);
              }

              tiroAtivo = false; // Tiro para imediatamente
              break;
            }
          }

          if (!tiroAtivo) break; // Para de checar se o tiro atingiu alguém
        }

        return tiroAtivo; // Se for falso, o tiro será removido
      });

      return inimigosBossRestantes;
    });

    // Verifica colisão com o boss
    const bossAtual = get(boss);
    if (bossAtual.lifi > 0) {
      tirosAtualizados = tirosAtualizados.filter((tiro) => {
        let colidiuComBoss =
          tiro.x < bossAtual.x + bossAtual.width &&
          tiro.x + 5 > bossAtual.x &&
          tiro.y < bossAtual.y + bossAtual.height &&
          tiro.y + 10 > bossAtual.y;

        if (colidiuComBoss) {
          score.update((n) => n + 50); // Atualiza a pontuação
          adicionarExplosao(tiro.x, tiro.y);
          console.log("Tiro colidiu com o boss");

          boss.update((b) => ({
            ...b,
            lifi: b.lifi - 10, // Reduz a vida do boss
          }));

          if (bossAtual.lifi <= 0) {
            boss.update((state) => ({
              ...state,
              vida: false, // Define o boss como morto
            }));
            console.log("Boss derrotado!");
          }

          return false; // Remove o tiro que colidiu com o boss
        }

        return true; // Mantém o tiro se não colidiu com o boss
      });
    }

    return tirosAtualizados;
  });
}

setInterval(moverTiros, 20); //ms
