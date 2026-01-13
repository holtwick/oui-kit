// Polyfill for the HTML switch element
// https://github.com/tomayac/input-switch-polyfill

// Import the polyfill CSS
import 'input-switch-polyfill/input-switch-polyfill.css'

// Only load the polyfill if the browser doesn't support the switch attribute
if (!('switch' in HTMLInputElement.prototype)) {
  import('input-switch-polyfill')
}
