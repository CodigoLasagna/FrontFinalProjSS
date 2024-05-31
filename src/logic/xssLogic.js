// En useXSS.js o donde desees mantener la lógica de XSS
export function useXSS(inputValue) {
  // Asegúrate de sanear o escapar el inputValue antes de mostrarlo en el DOM.
  // Aquí, por propósitos de demostración, simplemente lo mostraremos sin sanitizar.
  const script = inputValue;
  document.getElementById('xss-output').innerHTML = script;
}
