<script>
  import { onMount } from 'svelte'
  import { loadModule } from '~/loadModule'

  export let id

  let Module
  let width

  onMount(async () => {
    Module = await loadModule()
    width = document.querySelector(`#${id}`).offsetWidth
  })
</script>

<div {id} class="lm-svelte-snippet">
  {#if Module !== undefined}
    <svelte:component this={Module} {width} />
  {/if}
</div>

<style>
  .lm-svelte-snippet {
    width: 100%;
    box-sizing: border-box;
  }
</style>
