// incluir.js
// Busca todos los elementos con data-include y les mete el contenido del archivo indicado
document.querySelectorAll('[data-include]').forEach(async (el) => {
  const archivo = el.getAttribute('data-include');
  const respuesta = await fetch(index.html); // pide el archivo (header.html, footer.html)
  el.innerHTML = await respuesta.text(); // lo pega dentro del div
});
