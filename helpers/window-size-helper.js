// TODO: Use windowWidth and windowHeight directly in modules that import this module and don't use the callbacks to set width/height of canvas.

// export let windowWidth = window.innerWidth;
// export let windowHeight = window.innerHeight;

const windowResizeCallbacks = [];
export const addWindowResizeCallback = (callback) => {
  windowResizeCallbacks.push(callback);
};

const obs = new ResizeObserver((entries) => {
  // const [entry] = entries;
  // ({ width: windowWidth, height: windowHeight } = entry.contentRect);

  for (const callback of windowResizeCallbacks) {
    callback();
  }
});

obs.observe(document.documentElement);
