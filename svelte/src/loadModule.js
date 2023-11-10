export const loadModule = async () => {
  let componentPromise

  if (import.meta.env.VITE_MODULE === 'intro') {
    componentPromise = import('~/modules/intro/Index.svelte')
  }
  
  const component = await componentPromise
  return component.default
}
