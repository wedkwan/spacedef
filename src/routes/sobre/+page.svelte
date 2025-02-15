<script lang="ts">
  import { writable } from "svelte/store";
  import X from "lucide-svelte/icons/x";

  const abaAtiva = writable<"integrantes" | "historia" | "controles" | null>(
    null
  );

  function mostrarAba(aba: "integrantes" | "historia" | "controles") {
    abaAtiva.set($abaAtiva === aba ? null : aba);
  }

  function fecharAba() {
    abaAtiva.set(null);
  }
</script>

<div class="container">
  <!-- Planeta no centro -->
  <div class="planeta"></div>

  <!-- Botões alinhados à esquerda -->
  <div class="botoes">
    <button class="botao" on:click={() => mostrarAba("integrantes")}
      >DEVELOPERS</button
    >
    <button class="botao" id="history" on:click={() => mostrarAba("historia")}
      >HISTORY</button
    >
    <button class="botao" on:click={() => mostrarAba("controles")}
      >CONTROLS</button
    >
  </div>

  <!-- Botão BACK no canto inferior direito -->
  <a class="menu" href="/">BACK</a>

  <!-- Seção Integrantes -->
  <div class="conteudo {$abaAtiva === 'integrantes' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h3 class="integrantes">Integrantes</h3>
    <p><strong>Paulo Fernandes</strong> – Programador</p>
    <p><strong>Wedney Kawan</strong> – Designer</p>
    <p><strong>Jean Lucas</strong> – Roteiro</p>
    <p><strong>Ryan Carlos</strong> – Som</p>
    <p><strong>Davi Guilherme</strong> – Testes</p>
  </div>

  <!-- Seção História -->
  <div class="conteudo {$abaAtiva === 'historia' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h3>História</h3>
    <p>
      Esse jogo foi criado para fins educacionais e busca ensinar de forma
      interativa.
    </p>
  </div>

  <!-- Seção Controles -->
  <div class="conteudo {$abaAtiva === 'controles' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h3>Controles</h3>
    <p>A / ← - Mover para esquerda</p>
    <p>D / → - Mover para direita</p>
    <p>Espaço / x - atira</p>
    <p>Enter - Interagir</p>
    <p>Esc - Pausar</p>
  </div>
</div>
