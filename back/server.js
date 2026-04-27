const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Ruta que acepta un parámetro de búsqueda, por ejemplo: /api/libros?q=javascript
app.get('/api/libros', async (req, res) => {
  try {
    const query = req.query.q || 'economia'; // Término por defecto
    const cantidad = req.query.max || 10;
    const googleResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${cantidad}`);
    const data = await googleResponse.json();

    // Limpiamos los datos para enviar solo lo que Astro necesita
    const librosProcesados = data.items?.map(item => ({
      id: item.id,
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconocido',
      portada: item.volumeInfo.imageLinks?.thumbnail,
      //limitar maximo 200 caracteres
      descripcion: item.volumeInfo.description ? item.volumeInfo.description.substring(0, 200) : 'Sin descripción disponible.',
     linkLectura: item.volumeInfo.previewLink,
  paginas: item.volumeInfo.pageCount
    })) || [];

    res.json(librosProcesados);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con Google Books' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});