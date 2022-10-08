export const debounce = (fn) => {
  let timer;
  return function () {
    clearTimeout(timer);
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, 500);
  };
};
