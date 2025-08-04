/**
 *
 * @param {string} style css declarations like in a css file e.g. "color:red"
 * if multi lines must be separated by a semi-colon e.g. "color:red;height:200px".
 * Note that for the color value, only rgb is supported.
 * And for the height and width take into account box-sizing and default padding or margin from browsers
 * which could be added by the browser to your height and width.
 *
 * @param {HTMLElement} [rootElement=null]  the element from where the research should start. If nothing
 * is provided then the html tag will be used as default
 *
 * @returns {HTMLElement[]}  elements which match with the css properties
 */

function getElementByStyle(style, rootElement = null) {
  if (!/^(([a-z- ])+:([A-Za-z0-9-(), ])+;?)+$/.test(style)) {
    throw new Error(
      `${style} format  is invalid as style.Declarations should be made like in css. e.g:'color:rgb(8,8,8);background-color:rgb(177,87,0)'`
    );
  }

  if (rootElement && !(rootElement instanceof Element)) {
    throw new Error(
      "The rootElement must be a tag element or null if the research should be in all the DOM"
    );
  }
  if (!rootElement) {
    const htmlElement = document.getElementsByTagName("html")[0];
    rootElement = htmlElement;
  }

  let declarations = style.split(";");
  let styles = {};

  declarations.forEach((declaration) => {
    const [property, value] = declaration.split(":");
    styles = { ...styles, [property]: value.trim() };
  });

  let results = [];
  passThroughAllNodes(styles, rootElement, results);
  return results;
}
/**
 * Utilities functions
 */

/**
 * Check if css declarations match with the html tag
 * @param {string} style 
 * @param {HTMLElement} element 
 * @returns {boolean}
 */

function styleMatch(style, element) {
  const elementStyles = getComputedStyle(element);
  return Object.keys(style).every(
    (property) => style[property] === elementStyles[property]
  );
}

/**
 * 
 * @param {string} style 
 * @param {HTMLElement} parentNode 
 * @param {HTMLElement[]} results 
 */
function passThroughAllNodes(style, parentNode, results = []) {
  let nodes = parentNode instanceof NodeList ? [...parentNode] : [parentNode];
  for (let node of nodes) {
    if (node.nodeType !== Element.TEXT_NODE) {
      if (styleMatch(style, node)) {
        results.push(node);
      }
      if (node.childNodes && node instanceof Element) {
        passThroughAllNodes(style, node.childNodes, results);
      }
    }
  }
}

document.getElementByStyle = getElementByStyle;
