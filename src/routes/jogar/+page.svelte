<script lang="ts">
  import Nave from '$lib/componetes/Player.svelte';
  import Tiro from '$lib/componetes/Tiro.svelte';
  import Inimigo from '$lib/componetes/Enemy.svelte';
  import  {score , gameOver} from '$lib/stores/gstores.js';
  import { onMount , onDestroy} from 'svelte';
  import { tocarMusica, paraMusica, tocarSom } from '$lib/func/audio.js';

  onMount(() => {
  tocarMusica('/src/static/music/jogo.mp3'); // Música da home
  paraMusica 
    tocarSom
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
<h2>{finalScore}</h2>
<div class="tela">
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




      
 
