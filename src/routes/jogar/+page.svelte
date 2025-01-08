<script>
  import { onMount } from "svelte";

  let nave; // Referência à nave
  let posicaoX = 0; // Posição inicial da nave no eixo X
  let posicaoY = 0; // Posição inicial da nave no eixo Y

  const larguraCenario = 1000; // Largura do cenário
  const alturaCenario = 632; // Altura do cenário
  const larguraNave = 670; // Largura da nave
  const alturaNave = 100; // Altura estimada da nave

  const velocidade = 10; // Velocidade de movimento da nave

  // Lógica de movimentação
  const movimentarNave = (event) => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      // Mover para a esquerda
      posicaoX = Math.max(posicaoX - velocidade, 0);
    } else if (event.key === "ArrowRight" || event.key === "d") {
      // Mover para a direita
      posicaoX = Math.min(posicaoX + velocidade, larguraCenario - larguraNave);
    } else if (event.key === "ArrowUp" || event.key === "w") {
      // Mover para cima
      posicaoY = Math.max(posicaoY - velocidade, 0);
    } else if (event.key === "ArrowDown" || event.key === "s") {
      // Mover para baixo
      posicaoY = Math.min(posicaoY + velocidade, alturaCenario - alturaNave);
    }

    // Atualiza a posição da nave no estilo inline
    if (nave) {
      nave.style.left = `${posicaoX}px`;
      nave.style.top = `${posicaoY}px`;
    }
  };

  // Adiciona o evento de teclado ao montar o componente
  onMount(() => {
    window.addEventListener("keydown", movimentarNave);

    return () => {
      window.removeEventListener("keydown", movimentarNave);
    };
  });
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
    }
  
    @keyframes estrelas {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 0 100%;
      }
    }
  
   
  
    .nave {
      position: absolute;
      margin: 0;
      top: 77px;
      left: 0;
      width: 670px;
      z-index: 2;
    }
  
    .space {
      position: absolute;
      align-items: center;
      width: 370px;
      z-index: 3;
      top: 20%;
      z-index: 2;
    }
  
   
  </style>
  