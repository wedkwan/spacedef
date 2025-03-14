<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    tirosInimigosBoss,
    gameOver,
    inimigos_boss,
    boss,
  } from "../stores/gstores.js";
  import {
    moverInimigosEsquerdaBoss,
    moverInimigosDireitaBoss,
  } from "../func/moveny.js";
  import {
    dispararInimigosBoss,
    moverTirosInimigosBoss,
    verificarColisoesBoss,
  } from "../func/tiroeny.js";
  import { explosoes } from "../func/funcutil.js";
  import { get } from "svelte/store";

  let intervaloMovimento: number | null = null;
  let intervaloTiros: number | null = null;

  onMount(() => {
    moverInimigosEsquerdaBoss();
    moverInimigosDireitaBoss();
    dispararInimigosBoss();
    moverTirosInimigosBoss();
    verificarColisoesBoss();
  });

  onDestroy(() => {
    if (intervaloMovimento) clearInterval(intervaloMovimento);
    if (intervaloTiros) clearInterval(intervaloTiros);
  });
</script>

{#if $boss.lifi > 0}
  <div class="enemies">
    {#each $inimigos_boss as inimigo}
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

  <!-- Renderiza os tiros dos inimigos do boss -->
  {#each $tirosInimigosBoss as tiro}
    <div class="tiro-inimigo" style="left: {tiro.x}px; top: {tiro.y}px;"></div>
  {/each}

  {#each $explosoes as explosao}
    <img
      src="src/static/images/kabum.gif"
      alt="Explosão"
      class="explosao"
      style="left: {explosao.x}px; top: {explosao.y}px;"
    />
  {/each}
{/if}

<!-- <style>
  .enemy {
    position: absolute;
    width: 50px; /* Ajuste conforme necessário */
    height: 50px; /* Ajuste conforme necessário */
    border: 2px solid black;
  }

  .tiro-inimigo {
    position: absolute;
    width: 5px;
    height: 10px;
    background-color: yellow; /* Ajuste conforme necessário */
  }

  .explosao {
    position: absolute;
    width: 50px; /* Ajuste conforme necessário */
    height: 50px; /* Ajuste conforme necessário */
  }
</style> -->
