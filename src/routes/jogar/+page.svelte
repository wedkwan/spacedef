<script lang="ts">
  import Nave from "$lib/componetes/Player.svelte";
  import Tiro from "$lib/componetes/Tiro.svelte";
  import Inimigo from "$lib/componetes/Enemy.svelte";
  import {
    score,
    gameOver,
    vida,
    
    pause,
    DefinirPause,
  } from "$lib/stores/gstores.js";
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import {
    recorde,
    carregarRecorde,
    type Recorde,
  } from "$lib/stores/recordStore.js";
  import {
    tocarMusicajogar,
    paraMusica,
    pararTodosOsSons,
  } from "$lib/func/audio.js";

  let gameOverStatus = false; // Controle para exibir tela "Game Over"
  let finalScore = 0;
  let recordeData: Recorde = { nick: "kawan", score: 20 }; // Corrigido

  // Carrega o recorde ao iniciar a tela
  onMount(async () => {
    await carregarRecorde();
    recordeData = get(recorde);
  });

  onMount(() => {
    tocarMusicajogar("/music/jogo.mp3"); // Música da home
    paraMusica;
  });
  onDestroy(() => {
    paraMusica();
    pararTodosOsSons(); // Para a música ao sair da página
  });

  // Observa mudanças no gameOver
  gameOver.subscribe(async (value) => {
    gameOverStatus = value;

    if (value) {
      finalScore = get(score);
      await carregarRecorde();
      recordeData = get(recorde);
    }
  });

  const  Apiuse = import.meta.env.VITE_API_URL || "http://localhost:3000";

  $: if (gameOverStatus) {
    if (finalScore > recordeData.score) {
      setTimeout(async () => {
        let nick = prompt("Congratulations! New record! Enter your name:");
        if (nick) {
          try {
            const response = await fetch (`${Apiuse}/records`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ nick, score: finalScore }),
            });

            const data = await response.json();
            alert(data.message);

            await carregarRecorde();
          } catch (error) {
            console.error("Erro ao enviar o recorde:", error);
            alert("There was an error saving the record.");
          }
        }
      }, 500);
    }
  }

  function reiniciarJogo() {
    gameOver.set(false);
    score.set(0);
    location.reload(); // Recarrega a página para resetar tudo
  }
</script>

<div class="tela">
  <Nave />
  <Tiro />
  <Inimigo />
  <h1 class="life">HP: {$vida}</h1>
  <h1 class="score">SCORE: {$score}</h1>

  <h1 class="record">RECORD: {$recorde.nick} : {$recorde.score}</h1>
</div>
<a href="/" class="menu-jogar" on:click={DefinirPause}>back</a>

{#if gameOverStatus}
  <div class="game-over">
    <div class="game-over-content">
      <h1>GAME OVER</h1>
      <p>Score: <strong>{finalScore}</strong></p>
      <p>Records: <strong>{$recorde.nick} : {$recorde.score}</strong></p>
      <button on:click={reiniciarJogo}>🔄 Play Again</button>
    </div>
  </div>
{/if}
{#if $pause}
  <div class="pause">
    <div class="pause-conteiner">
      <h1>pause</h1>
      <br />
      <p>Score: <strong>{$score}</strong></p>
      <p>Records: <strong>{$recorde.nick} - {$recorde.score}</strong></p>
      <button on:click={DefinirPause}>🚀 Return</button>
      <button on:click={reiniciarJogo}>🔄 Play Again</button>
    </div>
  </div>
{/if}
