
# Prueba técnica — React developer - RAONA

## Objetivo

El objetivo de esta prueba técnica es que el candidato muestre sus habilidades con las herramientas que utilizará luego en su trabajo diario en Raona. Está diseñado para verificar las habilidades de desarrollo front-end utilizando React y su capacidad para resolver problemas.

Pondremos el foco en obtener un **código simple, bien diseñado y organizado, eficaz, pensando en el perfomance y en el uso de best practices**, así como el cumplimiento de todos los requerimientos solicitados.
El objetivo es entender el punto o nivel técnico actual del developer con lo que se espera que la solución se pueda entregar en 2 o 3 dias (máx. 5).

**Lo que se intenta es valorar también el nivel resolutivo del developer, asi que en cualquier duda o problema, es preferible incluir en el `README` cualquier asumpción y continuar con el desarrollo.**

## Desarrollo del proyecto

- Se deberá clonar este repositorio para poder modificarlo y completarlo con la resolución del proyecto.
- Una vez que su código esté listo, suba el código a un repositorio público propio y envíenos el enlace a dicho repositorio para que lo revisaremos.
- 
Se deberá incluir también `README` con instrucciones de configuración/ejecución y cualquier prueba u otra documentación que haya creado como parte de su solución.
Además, agregue la siguiente información a su archivo `README`:

- ¿Cómo decidió las opciones técnicas y arquitectónicas utilizadas como parte de su solución?
- ¿Hay alguna mejora que pueda hacer en su envío?
- ¿Qué haría de manera diferente si se le asignara más tiempo?
  
> Se pueden utilizar herramientas como Next.js, [create-react-app](https://github.com/facebookincubator/create-react-app) y similares para inicializar el proyecto.

## Prueba técnica

Se pide una aplicación en React con typescript (funcional Hooks o por clases, a elección del developer ) con Redux para gestionar el estado. A nivel de interfície se pide utilizar [FluentUI](https://developer.microsoft.com/en-us/fluentui#/controls/web) Fluent UI a nivel de framework de componentes visuales.  Se pide desarrollar usando best practices a nivel de organización de código, separación por componentes, nomenclaturas .... (todo lo que el developer crea conveniente).
Cree componentes para cada parte de la página (por ejemplo, encabezado, contenido, pie de página, etc.). Puede utilizar las imágenes externas que se requieran, simplemente hay que añadirlas a un directorio assets en el proyecto.

A nivel de estilos se pide utilizar Sass siguiendo los mismos criterios de código en cuestión de best practices. (No se requiere y no se evaluará si una interfície es mas bonita que otra... )
Se pide que el desarrollo sea responsive para verse en dispositivos móviles y que funcione en Chrome (no hace falta que sea compatible en mas navegadores).

A nivel de backend se pide realizar las llamadas a la API gratis de [themoviedb](https://developer.themoviedb.org/docs). Para evitar tener que registraros se ha activado una cuenta temporal, y podéis usarla APIKey hbb243a88130a9fd8dcdc2880c7af4649 para las llamadas. (Si teneis cualquier problema , podéis registrar vosotros mismos una cuenta temporal).

## Detalles
Necesitará construir las siguientes 2 páginas con React:

- Una página "Inicio" con el listado de Peliculas (visualmente con la imagen, el título y el año de la película) con un buscador por texto en el título.
- Cuando se clique en el listado a una película, esta deberá llamar a la API para obtener el detalle de la película y mostrarse en un modal o panel con el "Detalle" de la pelicula


### Otras consideraciones

También necesitará manejar los estados de carga/loading y error de obtener los datos:

- Estado de "Carga/Loading" 
- Estado de "Error" 

#### Opcional

- Filtro por año
  - agregar arriba del listado de series/películas un input que permita filtrar películas por año.
- Paginación
  - agregar un selector de cantidad de resultados a mostrar (5, 10, 20)
  - permitir ir a próxima página de resultados o página anterior
  - permitir moverse de página en página utilizando un parámetro en la URL

## Requisitos de Stack

Para el desarrollo de la aplicación deberá utilizar:

- React / React Hooks
- Typescript
- Redux
- Fluent UI
- Uso de Sass
- Mobile friendly
- Manejo de errores
- _(opcional)_ Unit tests (jest, react-testing-library, o similar)
- _(opcional)_ Deploy automático
- _(opcional)_ ...

Importante saber:
- No es necesario crear un entorno de desarrollo/producción.
- Se pueden utilizar otras librerías que crea conveniente siempre que se explique el porque se ha utilizando en el `README`.


> Happy coding!
