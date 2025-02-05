<script lang="ts">
  import Nave  from '$lib/componetes/Player.svelte';
  import Tiro from '$lib/componetes/Tiro.svelte';
  import Inimigo from '$lib/componetes/Enemy.svelte';
  import  {score , gameOver, vida , audioEnabled } from '$lib/stores/gstores.js';
  import { onMount , onDestroy } from 'svelte';
  import { tocarMusica, paraMusica, } from '$lib/func/audio.js';
  import { get } from 'svelte/store';
  onMount(() => {
   // Música da home
  paraMusica 
});
   onDestroy(() => {
    paraMusica(); // Para a música ao sair da página
  });



let gameOverStatus = false;
let finalScore = 0;

$: {
  gameOver.subscribe(value => {
    gameOverStatus = value;
    if (value) {
      score.subscribe(s => finalScore = s);
    }
  });
}

function reiniciarJogo() {
  gameOver.set(false);
  score.set(0);
  location.reload(); // Recarrega a página para resetar tudo
}

</script>

<div class="tela">
  <h1 class = "life"> LIFE:{$vida}</h1>

     
 
  <h1 class="score">SCORE:{$score}</h1>
  <Nave />
  <Tiro />
  <Inimigo />
</div>
{#if gameOverStatus}
<div class="game-over">
  <div class="game-over-content">
    <h1>GAME OVER </h1>
     <p>Score: <strong>{finalScore}</strong></p>
   <button on:click={reiniciarJogo}>🔄Play Again </button>
</div>
</div>
{/if}



      
 
