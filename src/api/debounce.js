export const debounce = (fn) => {
  let timer;
  return (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, [e]);
    }, 500);
  };
};
