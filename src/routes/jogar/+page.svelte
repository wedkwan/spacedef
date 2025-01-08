<script lang="ts">
  let posicaoX: number = 0; // Posição inicial da nave no eixo X
  let posicaoY: number = 0; // Posição inicial da nave no eixo Y

  const larguraCenario: number = 1000; // Largura do cenário
  const alturaCenario: number = 632; // Altura do cenário
  const larguraNave: number = 670; // Largura da nave
  const alturaNave: number = 100; // Altura estimada da nave

  const velocidade: number = 10; // Velocidade de movimento da nave

  // Lógica de movimentação
  const movimentarNave = (event: KeyboardEvent): void => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      posicaoX = Math.max(posicaoX - velocidade, 0);
    } else if (event.key === "ArrowRight" || event.key === "d") {
      posicaoX = Math.min(posicaoX + velocidade, larguraCenario - larguraNave);
    } else if (event.key === "ArrowUp" || event.key === "w") {
      posicaoY = Math.max(posicaoY - velocidade, 0);
    } else if (event.key === "ArrowDown" || event.key === "s") {
      posicaoY = Math.min(posicaoY + velocidade, alturaCenario - alturaNave);
    }
  };
</script>

  
 <div class="tela">
    <img bind:this={nave} src="/src/static/nave.png" alt="" class="nav" style="left: 0;">
    
</div>

