<script lang="ts">
  // Configuração do cenário e elementos.
  let larguraCenario = 1000; // Largura do cenário
  let alturaCenario = 632; // Altura do cenário
  let tamanhoElemento = 60; // Dimensão da nave e dos inimigos (largura e altura)
  let velocidade = 13; // Velocidade de movimento da nave

  // Estado inicial do jogo.
  let jogo = {
    nave: { 
      x: (larguraCenario - tamanhoElemento) / 2, // Posição inicial horizontal (centro do cenário)
      y: alturaCenario - tamanhoElemento * 2    // Posição inicial vertical (penúltima linha)
    },
    inimigos: Array(3).fill(null).map((_, linha) => ({
      tipo: linha < 2 ? 2 : 3, // Tipo de inimigo baseado na linha.
      posicoes: Array(8).fill(null).map((_, coluna) => ({ x: coluna * 70, y: linha * 70 })) // Ajustando espaçamento proporcional.
    }))
  };

  // Função para verificar se há colisão com os limites do cenário.
  function houveColisao(x: number): boolean {
    return x < 0 || x > larguraCenario - tamanhoElemento;
  }

  // Função para tratar o evento de pressionar teclas.
  function onKeyDown(evento: KeyboardEvent): void {
    let novaPosicaoX = jogo.nave.x;

    if (evento.key === "a") {
      novaPosicaoX -= velocidade; // Move para a esquerda
    } else if (evento.key === "d") {
      novaPosicaoX += velocidade; // Move para a direita
    }

    // Verifica colisão com os limites e atualiza posição
    if (!houveColisao(novaPosicaoX)) {
      jogo.nave.x = novaPosicaoX;
    }
  }
</script>

<!-- Vincula o evento diretamente ao componente -->
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
    {#each jogo.inimigos as inimigo}
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

