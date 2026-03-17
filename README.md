# Movie App

Aplicación web desarrollada con **React + TypeScript** que permite buscar películas utilizando la API de **The Movie Database (TMDB)**.

Incluye gestión de estado con Redux, diseño responsive, validaciones de usuario y tests unitarios.

---

## Características

* 🔍 Búsqueda de películas por título
* 📅 Filtro opcional por año
* 📄 Paginación de resultados
* ⚠️ Validación de formularios
* ❌ Manejo de errores de red y servidor
* 📱 Diseño responsive (mobile friendly)
* 🧪 Tests unitarios con Vitest y React Testing Library

---

## 🛠️ Tecnologías utilizadas

* **React** (con Hooks)
* **TypeScript**
* **Redux Toolkit**
* **Fluent UI**
* **Sass**
* **Vitest**
* **React Testing Library**

---

## 📁 Estructura del proyecto

```
src/
  components/
    Movies.tsx
    Movies.test.tsx
    Pagination.tsx
    Pagination.test.tsx
    SearchForm.tsx
    SearchForm.test.tsx
  hooks/
    useMovieSearch.ts
  store/
    hooks.ts
    index.ts
    moviesSlice.ts
    moviesSlice.test.ts
  utils/
    validateSearch.ts
    validateSearch.test.tsx
  test/
    setup.ts
  App.scss
  App.tsx
  index.scss
  main.tsx
  types.d.ts
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd movie-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🧪 Tests

El proyecto incluye tests unitarios para lógica, estado y componentes.

### Ejecutar todos los tests

```bash
npm run test
```

### Ejecutar en modo watch

```bash
npm run test:watch
```

---

## 🧠 Decisiones técnicas

* Se ha utilizado **Redux Toolkit** para centralizar el estado y manejar peticiones asíncronas.
* La validación de formularios se ha separado en una función pura (`validateSearch`) para facilitar su testeo.
* Se ha priorizado el uso de **React Hooks** para una arquitectura funcional y moderna.
* Se ha implementado una paginación optimizada mostrando solo páginas cercanas a la actual.
* El diseño es **responsive**, adaptándose a dispositivos móviles mediante media queries.

---

## ⚠️ Manejo de errores

La aplicación contempla:

* Validaciones de entrada del usuario
* Errores de red
* Errores de servidor (status HTTP)
* Estados vacíos (sin resultados)
* Fallback de imágenes

---

## 🔑 Configuración de API

La aplicación utiliza la API de TMDB.

Actualmente la API Key está definida en el código, pero se recomienda usar variables de entorno en entornos reales.

---

## 📌 Mejoras futuras

* Implementar tests para llamadas asíncronas (mock de API)
* Añadir modo oscuro
* Persistencia de búsquedas recientes
* Mejora de accesibilidad (ARIA)
* Internacionalización (i18n)

---

## 👨‍💻 Autor

Proyecto creado por Jan Castells Sanllehí

---
