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

/**
 * @param {string} color The color in the string format `rgb(int, int, int)`
 * @returns The color's hex string represantation
 */
function rgbStringToHex(color) {
  const rgbToHex = (r, g, b) => {
    const componentToHex = (c) => {
      var hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  if (color.includes('rgb')) {
    const regEx = /\(([^)]+)\)/;
    const matches = regEx.exec(color);

    const [r, g, b] = matches[1].split(',')
    color = rgbToHex(Number(r), Number(g), Number(b))
  }

  return color;
}

module.exports = {
  getYOffsetBreakpoints: getYOffsetBreakpoints,
  rgbStringToHex: rgbStringToHex
}