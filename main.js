// main.js: carga header.html y footer.html en las páginas que NO son el index

// 1. Busca los div con data-include y los reemplaza por el archivo indicado
async function cargarIncludes() {
  const elementos = document.querySelectorAll('[data-include]');
  await Promise.all(
    [...elementos].map(async (el) => {
      try {
        const res = await fetch(el.dataset.include);
        el.outerHTML = await res.text();
      } catch (err) {
        console.error('No se pudo cargar', el.dataset.include, err);
      }
    }),
  );
}

// 2. Marca en amarillo el link de la página actual (si está en el menú)
function marcarActivo() {
  const pagina = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#menuNav .nav-link').forEach((link) => {
    if (link.getAttribute('href') === pagina) link.classList.add('active');
  });
}

// 3. Cierra el menú del celular al tocar un link
function activarMenu() {
  const nav = document.getElementById('menuNav');
  if (!nav) return;
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if (!link || !nav.classList.contains('show')) return;

    const destino = link.hash ? document.getElementById(link.hash.slice(1)) : null;
    if (destino) {
      // la sección está en esta misma página (ej. #info)
      e.preventDefault();
      nav.addEventListener(
        'hidden.bs.collapse',
        () => destino.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        { once: true },
      );
    }
    bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
}

// Primero carga el header y el footer, después activa lo demás
cargarIncludes().then(() => {
  marcarActivo();
  activarMenu();
});
