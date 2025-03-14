<script lang="ts">
  import { boss, tirosBoss } from "../stores/gstores.js";
  import { onMount, onDestroy } from "svelte";
  import {moverInimigosDireita ,  moverBoss , moverInimigosEsquerda } from "$lib/func/moveny.js";
  import { moverTirosBoss } from "$lib/func/tiroeny.js";

  let intervaloMovimento: number | null = null;
  let intervaloTiros: number | null = null;

  onMount(() => {
    moverTirosBoss();
    moverBoss();
    moverInimigosDireita()
    moverInimigosEsquerda()
  });

  onDestroy(() => {
    if (intervaloMovimento) clearInterval(intervaloMovimento);
    if (intervaloTiros) clearInterval(intervaloTiros);
  });
</script>

<style>
  .boss {
    position: absolute;
    background-image: url(/src/static/images/Boss.gif)
      ;
      background-size: cover;/* Estilo inicial do boss */
    border: 2px solid black;
    z-index: 1;
  }

  .tiro-boss {
    position: absolute;
    width: 5px;
    height: 10px;
    background-color: yellow; /* Estilo dos tiros do boss */
  }
</style>

{#if $boss}
  <div
    class="boss"
    style="
      left: {$boss.x}px;
      top: {$boss.y}px;
      width: {$boss.width}px;
      height: {$boss.height}px;
    "
  ></div>
{/if}

{#each $tirosBoss as tiro}
  <div
    class="tiro-boss"
    style="
      left: {tiro.x}px;
      top: {tiro.y}px;
    "
  ></div>
{/each}
