<script>
  import { onMount } from 'svelte'
  import { loadModule } from '~/loadModule'

  export let context
  export let pContext
  export let currentPage = 0

  let Module
  onMount(async () => {
    Module = await loadModule()
  })

  const incrementPage = () => {
    currentPage++
  }

  const decrementPage = () => {
    if (currentPage === 0) return
    currentPage--
  }

  const resetPage = () => {
    currentPage = 0
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="dev-container">
  <div class="dev-dashboard">
    <div>
      <p>page: {currentPage}</p>
      <p>progression: {context.progression.toFixed(2)}</p>
    </div>
    <div>
      <p on:click={incrementPage}>page++</p>
      <p on:click={decrementPage}>page--</p>
      <p on:click={resetPage}>reset page</p>
    </div>
    {#if Module === undefined}
      <p>
        Le composant `{import.meta.env.VITE_MODULE}` ne fait pas partie de la
        liste des composants !
      </p>
    {:else}
      <p>
        composant: `{import.meta.env.VITE_MODULE}`
      </p>
    {/if}
  </div>

  {#if Module !== undefined}
    <svelte:component
      this={Module}
      width={context.width}
      height={context.height}
      {currentPage}
      progression={context.progression}
      pageProgression={context.pageProgression}
    />
  {/if}
</div>

<style lang="scss">
  :global(body) {
    margin: 0;
  }

  .dev-container {
    height: 300vh;
    position: relative;
    font-family: var(--ff-marr-sans);
  }

  .dev-dashboard {
    position: fixed;
    top: 0;
    z-index: 10;
    margin: 12px;
    background-color: #00000033;
    padding: 20px;
    border-radius: 3px;

    > div {
      display: flex;

      p {
        margin: 0;
      }

      p + p {
        padding-left: 1em;
      }
    }
  }
</style>
