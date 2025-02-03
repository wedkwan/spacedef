import { jogo,cooldownTempo,  tamanhoElemento, inimigos , score, tiros } from "$lib/stores/gstores.js";
import { adicionarExplosao } from "./fcolis.js";
import { tocarSom } from "./audio.js";

let ultimaVezQueTiro = 0;

export function disparar() {
  const agora = Date.now();

  if (agora - ultimaVezQueTiro > cooldownTempo) {
    // Precisamos pegar a posição atual da nave usando subscribe
    jogo.subscribe(state => {
      tiros.update(tirosAtuais => [
        ...tirosAtuais,
        {
          x: state.nave.x + (tamanhoElemento / 2) - 5, // Centraliza o tiro
          y: state.nave.y,
          ativo: true
        }
      ]);
    })();
     
    tocarSom('/src/static/music/laser.mp3'); 
    ultimaVezQueTiro = agora;
  }
}



// import { tocarSom } from "$lib/func/audio.js";


export function moverTiros() {
  tiros.update(tirosAtuais => {
    let tirosAtualizados = tirosAtuais
      .map(tiro => ({
        ...tiro,
        y: tiro.y - 10, // Move o tiro para cima
        ativo: tiro.y > 0 // Verifica se o tiro ainda está visível
      }));

    inimigos.update(inimigosAtuais => {
      let inimigosRestantes = [...inimigosAtuais];

      tirosAtualizados = tirosAtualizados.filter(tiro => {
        let tiroAtivo = true; // Assume que o tiro ainda não atingiu ninguém

        for (let i = 0; i < inimigosRestantes.length; i++) {
          let inimigo = inimigosRestantes[i];

          for (let j = 0; j < inimigo.posicoes.length; j++) {
            let posicao = inimigo.posicoes[j];

            // Verifica colisão
            let colidiu = tiro.x < posicao.x + tamanhoElemento &&
                          tiro.x + 5 > posicao.x &&
                          tiro.y < posicao.y + tamanhoElemento &&
                          tiro.y + 10 > posicao.y;

            if (colidiu) {
              // Se colidiu, remove o inimigo atingido e para o tiro
              score.update(n => n + 10); 
              adicionarExplosao(posicao.x, posicao.y);
              tocarSom('/music/explosao.mp3'); // Som da explosão

              
              // tocarSom('/sounds/explosao.mp3'); // Som de explosão 💥
              inimigo.posicoes.splice(j, 1);

              // Se a linha do inimigo ficou vazia, removemos ela
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

      return inimigosRestantes;
    });

    return tirosAtualizados;
  });
}
setInterval(moverTiros, 50);

