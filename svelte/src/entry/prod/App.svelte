<script>
  import { onMount } from 'svelte'
  import { loadModule } from '~/loadModule'

  export let context
  export let pContext

  let Module
  onMount(async () => {
    Module = await loadModule()
  })
</script>

<div>
  {#if Module !== undefined}
    <svelte:component
      this={Module}
      width={context.width}
      height={context.height}
      currentPage={context.page}
      progression={context.progression}
      pageProgression={context.pageProgression}
    />
  {/if}
</div>
