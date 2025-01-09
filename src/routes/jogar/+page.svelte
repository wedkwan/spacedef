<script lang="ts">
  import { onMount } from "svelte";
  let nave: number = 0; // Referência ao elemento da nave
  let posicaoX: number = 0; // Posição inicial da nave no eixo X
  let posicaoY: number = 0; // Posição inicial da nave no eixo Y
  let larguraCenario: number = 1000; // Largura do cenário
  let alturaCenario: number = 632; // Altura do cenário
  let larguraNave: number = 670; // Largura da nave
  let alturaNave: number = 100; // Altura estimada da nave
  const velocidade: number = 10; // Velocidade de movimento da nave
  // Lógica de movimentação
  const movimentarNave = (event: KeyboardEvent): void => {
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
  onMount((): (() => void) => {
    window.addEventListener("keydown", movimentarNave);
    return (): void => {
      window.removeEventListener("keydown", movimentarNave);
    };
  });
</script>
<<<<<<<<< Temporary merge branch 1

<style>
  .cenario {
    position: relative;
    width: 1000px;
    height: 632px;
    border: 2px solid black;
    overflow: hidden;
  }

  .nave {
    position: absolute;
    width: 670px;
    height: 100px;
    background-color: red;
  }
</style>

<!-- Evento de teclado no cenário -->
<div 
  class="cenario" 
  tabindex="0" 
  on:keydown={movimentarNave}
>
  <div
    class="nave"
    style="transform: translate({posicaoX}px, {posicaoY}px);"
  ></div>
</div>
=========
  
 <div class="tela">
    <img bind:this={nave} src="/src/static/nave.png" alt="" class="nav" style="left: 0;">
    
  </div>

  
>>>>>>>>> Temporary merge branch 2
