
import { inimigos ,alturaCenario , velocidadeInimigos , larguraCenario ,tamanhoElemento,intervaloMovimento } from '../stores/gstores.js'

let direcao = 1
let intervaloId: number | null = null; 


export function moverInimigos() {
  if (intervaloId !== null) return; // Se já estiver rodando, não cria outro intervalo

  intervaloId = setInterval(() => {
    inimigos.update(inimigosAtuais => {
      let precisaDescer = false;

      // Verifica se algum inimigo atingiu a borda
      inimigosAtuais.forEach(inimigo => {
        inimigo.posicoes.forEach(posicao => {
          let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
          if (novaPosicaoX < 0 || novaPosicaoX > larguraCenario - tamanhoElemento) {
            precisaDescer = true;
          }
        });
      });

      if (precisaDescer) {
        direcao *= -1; // Inverte a direção
        return inimigosAtuais.map(inimigo => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map(posicao => ({
            ...posicao,
            y: posicao.y + tamanhoElemento // Desce uma linha
          }))
        }));
      } else {
        return inimigosAtuais.map(inimigo => ({
          ...inimigo,
          posicoes: inimigo.posicoes.map(posicao => ({
            ...posicao,
            x: posicao.x + velocidadeInimigos * direcao // Move na horizontal
          }))
        }));
      }
    });
  }, intervaloMovimento);
}

