<script lang="ts">
  import { boss, tirosBoss } from "../stores/gstores.js";
  import { onMount, onDestroy } from "svelte";
  import {
    moverInimigosDireitaBoss,
    moverBoss,
    moverInimigosEsquerdaBoss,
  } from "$lib/func/moveny.js";
  import { moverTirosBoss } from "$lib/func/tiroeny.js";

  let intervaloMovimento: number | null = null;
  let intervaloTiros: number | null = null;

  onMount(() => {
    moverTirosBoss();
    moverBoss();
    moverInimigosDireitaBoss();
    moverInimigosEsquerdaBoss();
  });

  onDestroy(() => {
    if (intervaloMovimento) clearInterval(intervaloMovimento);
    if (intervaloTiros) clearInterval(intervaloTiros);
  });
</script>

{#if $boss}
  <img
    src="src\static\images\Boss.gif"
    alt=""
    class="boss"
    style="
    position: absolute ; 
      left: {$boss.x}px;
      top: {$boss.y}px;
      width: {$boss.width}px;
      height: {$boss.height}px;
    "
  />
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

<style>
  .boss {
    position: absolute;
    border: 1px solid rgb(245, 239, 239);
    z-index: 1;
  }

  .tiro-boss {
    position: absolute;
    width: 5px;
    height: 10px;
    background-color: yellow; /* Estilo dos tiros do boss */
  }
</style>
