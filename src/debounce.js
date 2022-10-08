export const debounce = (fn) => {
  let timer;
  return function (e) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this,[e]);
    }, 500);
  };
};
