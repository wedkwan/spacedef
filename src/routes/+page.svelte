<script lang="ts">
   import { get } from 'svelte/store';
    import { onMount , onDestroy} from 'svelte';
    import { tocarMusica, paraMusica } from '$lib/func/audio.js';
    import { audioEnabled } from '$lib/stores/gstores.js';

onMount(() => {
  tocarMusica('/src/static/music/home.mp3'); // Música da home
  paraMusica 
});
   onDestroy(() => {
    paraMusica(); // Para a música ao sair da página
  });
  function toggleAudio() {
    // Se o áudio está ativado, desabilita-o; caso contrário, ativa-o.
    if (get(audioEnabled)) {
      // Desativa o áudio e para a música, se estiver tocando
      audioEnabled.set(false);
      paraMusica();
    } else {
      audioEnabled.set(true);
      tocarMusica('/src/static/music/jogo.mp3');
    }
  }

  </script>


<div class = "cenario">
  <button class="toggle-music" on:click={toggleAudio}>
    <img src="/src/static/images/sound-on.png" alt="Sound" >
  </button>
    <img src="/src/static/images/jupt2.png" alt="jutp" class="jupt">
     <img src="/src/static/images/space.png" alt="" class= "space">
    
    <img src="/src/static/images/planet.png" alt="jutp" class="planet">
   
   <div class="it ">

        <a href="/jogar" id= "play">PLAY</a>
        <a href="/sobre" id= "about">ABOUT</a>
    </div>


</div>




