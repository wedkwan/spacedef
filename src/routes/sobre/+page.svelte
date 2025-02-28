<script lang="ts">
  import { writable } from "svelte/store";
  import X from "lucide-svelte/icons/x";

  const abaAtiva = writable<
    "integrantes" | "historia" | "controles" | "mostrar_IA" | null
  >(null);

  function mostrarAba(
    aba: "integrantes" | "historia" | "controles" | "mostrar_IA"
  ) {
    abaAtiva.set($abaAtiva === aba ? null : aba);
  }

  function fecharAba() {
    abaAtiva.set(null);
  }
</script>

<div class="container">
  <div class="planeta"></div>

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
  <button class="botao" id="IA" on:click={() => mostrarAba("mostrar_IA")}>
    ?
  </button>

  <img src="/src/static/images/logif.png" alt="" class="logo" />
  <a class="menu" href="/">BACK</a>

  <div class="conteudo {$abaAtiva === 'integrantes' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h2 class="integrantes">Members</h2>
    <br /><br />
    <p><strong>Paulo Fernandes</strong></p>
    <p><strong>Wedney Kawan</strong></p>
    <p><strong>Jean Lucas</strong></p>
    <p><strong>Ryan Carlos</strong></p>
    <p><strong>Davi Guilherme</strong></p>
  </div>

  <div class="conteudo {$abaAtiva === 'mostrar_IA' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h1>ffff</h1>
  </div>

  <div
    class="conteudo {$abaAtiva === 'historia' ? 'ativo' : ''}"
    id="historia-container"
  >
    <button class="fechar" on:click={fecharAba}><X /></button>
    <div class="background"></div>
    <div class="fade"></div>
    <div class="text-container">
      <div class="text">
        <p>
          In the year 2123, humanity faces an unexpected threat from Jupiter.
        </p>
        <br /><br />
        <p>
          The Jovian Devourers, gaseous intelligent beings who inhabit the upper
          layers of the gas giant's atmosphere, have begun a devastating
          invasion of Earth.
        </p>
        <br /><br />

        <p>
          Living in massive floating cities supported by anti-gravity fields,
          they rely on extracting resources from rocky planets to sustain their
          existence.
        </p>
        <br /><br />

        <p>
          Their advanced technology allows them to drain vital energy, minerals,
          and atmosphere from other worlds, turning them into radioactive
          deserts.
        </p>
        <br /><br />
        <p>Now, Earth is under attack, and time is running out for humanity.</p>
        <br /><br />
        <p>
          Captain Orion Voss, commander of the Earth Rapid Response Force
          (ERRF), leads the last line of defense from the Atlas Tower, an
          orbital station that generates a global protective shield.
        </p>
        <br /><br />

        <p>
          Facing endless waves of invaders, Voss must destroy the Jovian
          extractor ships before they initiate the 'Jovian Purge' process, which
          would drain all Earth's resources, leaving it barren.
        </p>
      </div>
    </div>
  </div>

  <!-- Seção Controles -->
  <div class="conteudo {$abaAtiva === 'controles' ? 'ativo' : ''}">
    <button class="fechar" on:click={fecharAba}><X /></button>
    <h3>Controls</h3>
    <br /><br />
    <p>A / ← - Move left</p>
    <p>D / → - Move right</p>
    <p>Space / x - Shoots</p>
    <p>Esc - Pause</p>
  </div>
</div>
