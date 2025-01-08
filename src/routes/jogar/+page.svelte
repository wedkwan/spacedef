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
  
  <div class="cenario">
    <img bind:this={nave} src="/src/static/nave4.gif" alt="" class="nave" style="left: 0;">
  </div>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
  
    * {
      margin: 0;
      padding: 0;
    }
  
    .cenario {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1000px;
      height: 632px;
      border: 1px solid red;
      margin: 40px auto;
      position: relative;
      overflow: hidden;
      background-image: url(/src/static/fundo.gif);
      background-color: black;
      background-repeat: repeat-y;
      background-size: 100% auto;
      animation: estrelas 8s linear infinite;
    } z-index: 2;
    }
  
    .space {

  
  