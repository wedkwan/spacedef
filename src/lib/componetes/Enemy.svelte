<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { inimigos, tirosInimigos, gameOver } from '../stores/gstores.js';
  import { moverInimigos } from "../func/moveny.js";
  import { dispararInimigos, moverTirosInimigos, verificarColisoes } from "../func/tiroeny.js";
  import { explosoes } from '../func/fcolis.js';

  let intervaloMovimento: number | null = null;
  let intervaloTiros: number | null = null;

  onMount(() => {
    moverInimigos();
    dispararInimigos();
    moverTirosInimigos();
    verificarColisoes();
  });

  onDestroy(() => {
    if (intervaloMovimento) clearInterval(intervaloMovimento);
    if (intervaloTiros) clearInterval(intervaloTiros);
  });
</script>

<div class="enemies">
  {#each $inimigos as inimigo}
    <div class="enelin">
      {#each inimigo.posicoes as posicao}
        <img
          src="src/static/images/enemy{inimigo.tipo}.gif"
          alt="Inimigo"
          class="enemy"
          style="left: {posicao.x}px; top: {posicao.y}px;"
        />
      {/each}
    </div>
  {/each}
</div>

<!-- Renderiza os tiros dos inimigos -->
{#each $tirosInimigos as tiro}
  <div class="tiro-inimigo" style="left: {tiro.x}px; top: {tiro.y}px;"></div>
{/each}



{#each $explosoes as explosao}
  <img
    src="/images/explosao.gif"
    alt="Explosão"
    class="explosao"
    style="left: {explosao.x}px; top: {explosao.y}px;"
  />
{/each}

<style>
  .explosao {
    position: absolute;
    width: 60px;
    height: 60px;
    pointer-events: none;
  }
</style>


