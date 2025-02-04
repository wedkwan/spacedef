<script lang="ts">
    import { disparar, moverTiros  } from '../func/tiros.js';
    import {  velocidadeNave , jogo } from '../stores/gstores.js'
    import { houveColisao } from '../func/funcutil.js';
    
    
  
    export function onKeyDown(event: KeyboardEvent) {
      jogo.update(state => {
        let novaPosicaoX = state.nave.x;
  
        if (event.key === "a" || event.key === "ArrowLeft") {
          novaPosicaoX -= velocidadeNave;
        } else if (event.key === "d" || event.key === "ArrowRight") {
          novaPosicaoX += velocidadeNave;
        } else if (event.key === "x" || event.key === " ") {
          disparar();
          moverTiros();
          
           
        }
  
        if (!houveColisao(novaPosicaoX)) {
          state.nave.x = novaPosicaoX;
        }
  
        return state;
      });
    }
  </script>
  
  <svelte:window on:keydown|preventDefault={onKeyDown} />
  
  <img
    src="src\static\images\navep1.gif"
    alt="Nave"
    class="nave"
    style="left: {$jogo.nave.x}px; top: {$jogo.nave.y}px;"
  />
