function getYOffsetBreakpoints(elements) {

  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Find the yOffset breakpoints for each section to be called active
  const yBreakpoints = elements.map(el => {
    const rect = el.getBoundingClientRect();
    const position = rect.top + scrollTop;
    const yBreakpoint = (2 * position - windowHeight) / 2;
    return yBreakpoint - 300;
  });

  return yBreakpoints;
}

module.exports = {
  getYOffsetBreakpoints: getYOffsetBreakpoints,
}