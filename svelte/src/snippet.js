import App from './Snippet.svelte';

const containerId = `${import.meta.env.VITE_MODULE}-container`

const app = new App({
  target: document.getElementById(containerId),
  props: { id: containerId },
});

export default app;
