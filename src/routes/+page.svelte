<script lang="ts">
    import { onMount , onDestroy} from 'svelte';
    import { tocarMusica, paraMusica } from '$lib/func/audio.js';

onMount(() => {
  tocarMusica('/src/static/music/home.mp3'); // Música da home
  paraMusica 
});
   onDestroy(() => {
    paraMusica(); // Para a música ao sair da página
  });
  </script>


<div class = "cenario">

    <img src="/src/static/images/jupt2.png" alt="jutp" class="jupt">
     <img src="/src/static/images/space.png" alt="" class= "space">
    <img src="/src/static/images/naveit.gif" alt="" class = "nave">
    
   
   <div class="it ">

        <a href="/jogar" id= "play">PLAY</a>
        <a href="/sobre" id= "about">ABOUT</a>
    </div>


</div>




