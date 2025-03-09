<script lang="ts">
  import { get } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import { tocarMusica, paraMusica } from "$lib/func/audio.js";
  import { audioEnabled } from "$lib/stores/gstores.js";

  onMount(() => {
    tocarMusica("/src/static/music/jogo.mp3");  // Música da home
    paraMusica;
  });
  onDestroy(() => {
    paraMusica(); // Para a música ao sair da página
  });
  function toggleAudio() {
    // Se o áudio está ativado,
    //  desabilita-o; caso contrário, ativa-o.
     $audioEnabled ? audioEnabled.set(false) : audioEnabled.set(true);
   // Caso você queira tocar ou parar a música
    if ($audioEnabled) {
      tocarMusica("/src/static/music/jogo.mp3"); // Coloque o caminho correto do seu arquivo de música
    } else {
      paraMusica();
    }
  }
</script>

<div class="cenario">
  <button class="toggle-music" on:click={toggleAudio}>
    {#if get(audioEnabled)}
      <h2>lucia</h2>
    {:else}
      <h1>vera</h1>
    {/if}
  </button>
  <img src="/src/static/images/jupt2.png" alt="jutp" class="jupt" />
  <img src="/src/static/images/space.png" alt="" class="space" />

  <img src="/src/static/images/planet.png" alt="jutp" class="planet" />

  <div class="it">
    <a href="/jogar" id="play">PLAY</a>
    <a href="/sobre" id="about">ABOUT</a>
  </div>
</div>
