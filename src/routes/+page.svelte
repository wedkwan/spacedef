<script lang="ts">
  import { tocarMusica, paraMusica } from "../lib/func/audio.js";
  import { audioEnabled } from "../lib/stores/gstores.js";

  function toggleAudio() {
    audioEnabled.update((enabled) => {
      if (!enabled) {
        tocarMusica("/music/home.mp3"); // Caminho correto do áudio
      } else {
        paraMusica();
      }
      return !enabled;
    });
  }
</script>

<div class="cenario">
  <button class="toggle-music" on:click={toggleAudio}>
    {#if $audioEnabled}
      <img src="\images\somzinho.png" alt="som" class="som" />
    {:else}
      <img src="\images\som-off.png" alt="som" class="som" />
    {/if}
  </button>
  <img src="\images\jupt2.png" alt="jutp" class="jupt" />
  <img src="\images\space.png" alt="" class="space" />

  <img src="\images\planet.png" alt="jutp" class="planet" />

  <div class="it">
    <a href="/jogar" id="play">PLAY</a>
    <a href="/sobre" id="about">ABOUT</a>
  </div>
</div>
