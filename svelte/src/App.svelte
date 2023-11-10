<script>
  import { onMount } from 'svelte'

  export let context
  export let pContext

  let AppComponent

  onMount(async () => {
    let appComponentPromise

    if (import.meta.env.MODE === 'production') {
      appComponentPromise = import('~/entry/prod/App.svelte')
    } else {
      appComponentPromise = import('~/entry/dev/App.svelte')
    }

    const promiseResult = await appComponentPromise
    AppComponent = promiseResult.default
  })
</script>

<div class="lm-svelte-module">
  {#if AppComponent !== undefined}
    <svelte:component
      this={AppComponent}
      {context}
      {pContext}
    />
  {/if}
</div>

<style>
  :global(.lm-svelte-module p) {
    margin: 0;
  }
</style>