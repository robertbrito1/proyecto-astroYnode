# 📚 Book Explorer

Aplicación fullstack para buscar y explorar libros en tiempo real usando la **API de Google Books**.

## ¿Qué hace?

- Busca libros por tema o título directamente desde el navegador
- Muestra portada, autor, descripción, número de páginas y enlace a vista previa
- Soporta **modo oscuro / claro** con persistencia en `localStorage`
- La carga inicial trae 10 libros de economía; puedes cambiar el tema y la cantidad al instante

## 🏗️ Arquitectura

```
Browser (Astro + Tailwind CSS)
        │  fetch /api/libros?q=...
        ▼
API REST (Node.js + Express)  →  Google Books API
```

| Capa     | Tecnología         | Puerto |
| :------- | :----------------- | :----- |
| Frontend | Astro + Tailwind 4 | 4321   |
| Backend  | Node.js + Express  | 3000   |
| Datos    | Google Books API   | —      |

## 📁 Estructura del proyecto

```
proyecto-astroYnode/
├── back/
│   ├── server.js        # API REST con Express, proxy a Google Books
│   └── package.json
└── front/
    ├── astro.config.mjs # Integración Tailwind via @tailwindcss/vite
    ├── src/
    │   ├── pages/
    │   │   └── index.astro  # Página principal (SSR + cliente)
    │   └── styles/
    │       └── global.css   # @import "tailwindcss" + variante dark
    └── package.json
```

## 🚀 Cómo ejecutar

**1. Backend:**
```sh
cd back
npm install
node server.js        # → http://localhost:3000
```

**2. Frontend:**
```sh
cd front
npm install
npm run dev           # → http://localhost:4321
```

## 🧞 Comandos del frontend

| Comando          | Acción                                      |
| :--------------- | :------------------------------------------ |
| `npm run dev`    | Servidor de desarrollo en `localhost:4321`  |
| `npm run build`  | Genera el sitio estático en `./dist/`       |
| `npm run preview`| Previsualiza el build antes de desplegar    |
