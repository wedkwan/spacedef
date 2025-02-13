import { jogo,cooldownTempo,  tamanhoElemento, inimigos , score, tiros } from "$lib/stores/gstores.js";
import { adicionarExplosao, novaOnda ,} from "./funcutil.js";
import { tocarSom } from "./audio.js";

let ultimaVezQueTiro = 0;
export function disparar() {
  const agora = Date.now();
  
  if (agora - ultimaVezQueTiro > cooldownTempo) {
    
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
        let tiroAtivo = true; 

        for (let i = 0; i < inimigosRestantes.length; i++) {
          let inimigo = inimigosRestantes[i];

          for (let j = 0; j < inimigo.posicoes.length; j++) {
            let posicao = inimigo.posicoes[j];

            
            let colidiu = tiro.x < posicao.x + tamanhoElemento &&
                          tiro.x + 5 > posicao.x &&
                          tiro.y < posicao.y + tamanhoElemento &&
                          tiro.y + 10 > posicao.y;

            if (colidiu) {
              
              score.update(n => n + 10); 
              adicionarExplosao(posicao.x, posicao.y);
              tocarSom('/music/explosao.mp3'); 
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
        if (inimigosRestantes.length === 0) {
            setTimeout(() => novaOnda (), 2000 );
         }
      
        return inimigosRestantes;
    });

    return tirosAtualizados;
  });
}
setInterval(moverTiros, 20);//ms

