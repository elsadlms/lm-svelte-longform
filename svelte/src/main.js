import App from './App.svelte';

const wrapperToAppMap = new Map();

const init = (context) => {
  const wrapper = document.createElement('div');
  const app = new App({
    target: wrapper,
    props: { context, pContext: undefined },
  });
  wrapperToAppMap.set(wrapper, app);
  return wrapper;
};

const update = (wrapper, context, pContext) => {
  const app = wrapperToAppMap.get(wrapper);
  if (app !== undefined) app.$set({ context, pContext });
};

window.__svelte_scrllgngn_module = {
  init,
  update,
};

if (import.meta.env.MODE === 'development') {
  const defaultContext = {
    height: window.innerHeight,
    width: window.innerWidth,
    page: 0,
    progression: 0,
    pageProgression: 0,
  };

  let prevContext = defaultContext;

  const devWrapper = init(defaultContext);
  document.body.appendChild(devWrapper);

  const handleScroll = (e) => {
    const scrollMax =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollValue = document.documentElement.scrollTop;

    const context = prevContext != undefined ? prevContext : defaultContext;
    const updatedContext = { ...context };

    updatedContext.progression = scrollValue / scrollMax;

    update(devWrapper, updatedContext, prevContext);

    prevContext = updatedContext;
  };

  const handleResize = (e) => {
    const context = prevContext != undefined ? prevContext : defaultContext;
    const updatedContext = { ...context };

    updatedContext.width = window.innerWidth;
    updatedContext.height = window.innerHeight;

    update(devWrapper, updatedContext, prevContext);

    prevContext = updatedContext;
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
}
