<script lang="ts">
  import { onMount } from "svelte"; // Importa o ciclo de vida `onMount` do Svelte.

  // Referência ao elemento da nave, que será manipulada diretamente.
  let nave: HTMLElement | null = null;

  // Posição inicial da nave no cenário.
  let posicaoX: number = 0; // Posição no eixo X
  let posicaoY: number = 0; // Posição no eixo Y

  // Dimensões do cenário onde a nave pode se mover.
  let larguraCenario: number = 1000; // Largura do cenário
  let alturaCenario: number = 632; // Altura do cenário

  // Dimensões da nave.
  let larguraNave: number = 100; // Largura da nave
  let alturaNave: number = 100; // Altura da nave

  // Velocidade da movimentação da nave (em pixels por movimento).
  const velocidade: number = 13;

  // Função que controla a movimentação da nave com base na tecla pressionada.
  const movimentarNave = (event: KeyboardEvent): void => {
    if (event.key === "ArrowLeft" || event.key === "a") {
      // Move a nave para a esquerda, sem sair do limite esquerdo do cenário.
      posicaoX = Math.max(posicaoX - velocidade, 0);
    } else if (event.key === "ArrowRight" || event.key === "d") {
      // Move a nave para a direita, sem sair do limite direito do cenário.
      posicaoX = Math.min(posicaoX + velocidade, larguraCenario - larguraNave);
    } else if (event.key === "ArrowUp" || event.key === "w") {
      // Move a nave para cima, sem sair do limite superior do cenário.
      posicaoY = Math.max(posicaoY - velocidade, 0);
    } else if (event.key === "ArrowDown" || event.key === "s") {
      // Move a nave para baixo, sem sair do limite inferior do cenário.
      posicaoY = Math.min(posicaoY + velocidade, alturaCenario - alturaNave);
    }
    // Atualiza a posição da nave no estilo `transform` do CSS.
    if (nave) {
      nave.style.transform = `translate(${posicaoX}px, ${posicaoY}px)`;
    }
  };

  // Referência ao elemento do cenário principal que captura os eventos de teclado.
  let tela: HTMLElement | null = null;

  // Adiciona o evento de teclado ao componente quando ele é montado.
  onMount(() => {
    // Função intermediária para lidar com o evento de tecla pressionada.
    const handleKeydown = (event: KeyboardEvent) => movimentarNave(event);

    // Adiciona o evento de `keydown` no elemento da tela (focado).
    tela?.addEventListener("keydown", handleKeydown);

    // Remove o evento de teclado ao desmontar o componente.
    return () => {
      tela?.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div bind:this={tela} class="tela" tabindex="0">
  <img bind:this={nave} src="/src/static/navep1.gif" alt="Nave" class="nav" style="transform: translate(0, 0);">
  <div class="enemies">
    
    <div class="enelin">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">  
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class=" enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy2.gif" alt="Inimigo" class="enemy">

    </div>
    
    <div class="enelin">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
    </div>
    <div class="enelin">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
      <img src="/src/static/enemy3.gif" alt="Inimigo" class="enemy">
    </div>
  </div>
</div>
 