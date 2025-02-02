<script lang="ts">
    import { tiros } from '../stores/gstores.js';
</script>
  
  

{#each $tiros as tiro}
  {#if tiro.ativo}   
    <div 
    class="tiro"  
    style="left: {tiro.x}px; top: {tiro.y}px; background-image: url('/src/static/images/bullet.gif'); background-size: cover;  height: 15px;   width: 5px; ">
    </div>
 {/if}  
{/each}


    