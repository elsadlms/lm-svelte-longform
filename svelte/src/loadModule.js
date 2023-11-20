export const loadModule = async () => {
  let componentPromise

  if (import.meta.env.VITE_MODULE === 'intro') {
    componentPromise = import('~/modules/intro/Index.svelte')
  }
  
  if (import.meta.env.VITE_MODULE === 'example') {
    componentPromise = import('~/modules/example/Index.svelte')
  }
  
  const component = await componentPromise
  return component.default
}
