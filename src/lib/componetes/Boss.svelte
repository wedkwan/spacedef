<script lang="ts">
  import { boss } from "../stores/gstores.js";
  import { onMount } from "svelte";

  let bossData: any;

  const unsubscribe = boss.subscribe((data) => {
    bossData = data;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<style>
  .boss {
    position: absolute;
    background-color: red; /* Estilo inicial do boss */
    border: 2px solid black;
    z-index: 1;
  }
</style>

{#if $bossData}
  <div
    class="boss"
    style="
      left: {$bossData.x}px;
      top: {$bossData.y}px;
      width: {$bossData.width}px;
      height: {$bossData.height}px;
    "
  ></div>
{/if}