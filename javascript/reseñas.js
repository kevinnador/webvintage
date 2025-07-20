let reseñas = [];
let indiceActual = 0;

// Frases de reseña simuladas
const textosReseña = [
  "Una experiencia excelente. Productos únicos y atención personalizada.",
  "Muy satisfecho con el servicio. ¡Repetiría sin dudarlo!",
  "Trato amable y muy profesional. Lo recomiendo totalmente.",
  "Me encantó todo. Desde el primer momento hasta el final.",
  "Rápido, simple y de gran calidad. ¡Gracias!",
  "Un equipo muy atento y dispuesto. ¡Felicitaciones!",
  "Increíble experiencia de compra. Todo perfecto.",
  "Estoy muy conforme con el resultado. Superaron mis expectativas.",
  "Atención al cliente destacable. Muy recomendable.",
  "Calidad y compromiso en cada detalle. Volveré pronto."
];

// Traer reseñas desde RandomUser
async function cargarReseñas(cantidad) {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
    const data = await response.json();

    // Asignar texto aleatorio a cada persona
    reseñas = data.results.map(usuario => {
      const texto = textosReseña[Math.floor(Math.random() * textosReseña.length)];
      return {
        nombre: `${usuario.name.first} ${usuario.name.last}`,
        ciudad: usuario.location.city,
        pais: usuario.location.country,
        foto: usuario.picture.large,
        texto: texto
      };
    });

    mostrarReseña(indiceActual);
  } catch (error) {
    console.error("Error al cargar reseñas:", error);
  }
}

// Mostrar reseña actual
function mostrarReseña(indice) {
  const r = reseñas[indice];
  const contenedor = document.getElementById('reseña-activa');

  contenedor.innerHTML = `
    <img src="${r.foto}" alt="Foto de ${r.nombre}">
    <div class="reseña-contenido">
      <h3>${r.nombre}</h3>
      <p><strong>Ubicación:</strong> ${r.ciudad}, ${r.pais}</p>
      <p>"${r.texto}"</p>
    </div>
  `;
}

// Botones
document.getElementById('btn-anterior').addEventListener('click', () => {
  if (indiceActual > 0) {
    indiceActual--;
    mostrarReseña(indiceActual);
  }
});

document.getElementById('btn-siguiente').addEventListener('click', () => {
  if (indiceActual < reseñas.length - 1) {
    indiceActual++;
    mostrarReseña(indiceActual);
  }
});

// Iniciar
cargarReseñas(5); // Cambiá el número si querés más reseñas
