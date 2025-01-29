<script lang="ts">
  import { writable } from 'svelte/store';

  // Definindo o cenário e as variáveis
  let larguraCenario = 1000;
  let alturaCenario = 632;
  let tamanhoElemento = 60;
  let velocidadeNave = 13;
  let velocidadeInimigos = 20; // Velocidade de movimento dos inimigos
  let intervaloMovimento = 500; // Tempo entre cada movimento dos inimigos (ms)

  // Estado da nave
  let jogo = {
    nave: { 
      x: (larguraCenario - tamanhoElemento) / 2,
      y: alturaCenario - tamanhoElemento * 2
    }
  };

  // Criando a store para controlar os inimigos
  const inimigos = writable(
    Array(3).fill(null).map((_, linha) => ({
      tipo: linha < 2 ? 2 : 3,
      posicoes: Array(8).fill(null).map((_, coluna) => ({ x: coluna * 70, y: linha * 70 }))
    }))
  );

  let direcao = 1; // 1 para direita, -1 para esquerda

  // Função para verificar se há colisão com os limites do cenário
  function houveColisao(x: number): boolean {
    return x < 0 || x > larguraCenario - tamanhoElemento;
  }

  // Função para tratar o movimento da nave
  function onKeyDown(evento: KeyboardEvent): void {
    let novaPosicaoX = jogo.nave.x;

    if (evento.key === "a") {
      novaPosicaoX -= velocidadeNave;
    } else if (evento.key === "d") {
      novaPosicaoX += velocidadeNave;
    }

    // Verifica colisão com os limites e atualiza a posição da nave
    if (!houveColisao(novaPosicaoX)) {
      jogo.nave.x = novaPosicaoX;
    }
  }

  // Função que move os inimigos automaticamente
  function moverInimigos() {
    inimigos.update((inimigos) => {
      let precisaDescer = false;

      // Verifica se algum inimigo atingiu a borda
      inimigos.forEach(inimigo => {
        inimigo.posicoes.forEach(posicao => {
          let novaPosicaoX = posicao.x + velocidadeInimigos * direcao;
          if (novaPosicaoX < 0 || novaPosicaoX > larguraCenario - tamanhoElemento) {
            precisaDescer = true;
          }
        });
      });

      if (precisaDescer) {
        direcao *= -1; // Inverte a direção dos inimigos
        inimigos.forEach(inimigo => {
          inimigo.posicoes.forEach(posicao => {
            posicao.y += tamanhoElemento; // Desce uma linha
          });
        });
      } else {
        inimigos.forEach(inimigo => {
          inimigo.posicoes.forEach(posicao => {
            posicao.x += velocidadeInimigos * direcao; // Move os inimigos
          });
        });
      }

      return inimigos;
    });

    setTimeout(moverInimigos, intervaloMovimento); // Chama a função repetidamente
  }

  // Inicia o movimento dos inimigos
  moverInimigos();
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div class="tela">
  <!-- Nave -->
  <img
    src="/src/static/navep1.gif"
    alt="Nave"
    class="nave"
    style="left: {jogo.nave.x}px; top: {jogo.nave.y}px;"
  />

  <!-- Inimigos -->
  <div class="enemies">
    {#each $inimigos as inimigo}
      <div class="enelin">
        {#each inimigo.posicoes as posicao}
          <img
            src="/src/static/enemy{inimigo.tipo}.gif"
            alt="Inimigo"
            class="enemy"
            style="left: {posicao.x}px; top: {posicao.y}px;"
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .tela {
    width: 1000px;
    height: 632px;
    position: relative;
    overflow: hidden;
    background-color: black;
  }

  .nave {
    position: absolute;
    width: 65px;
    height: 65px;
  }

  .enemy {
    position: absolute;
    width: 65px;
    height: 65px;
  }

  .enelin {
    position: relative;
  }
</style>