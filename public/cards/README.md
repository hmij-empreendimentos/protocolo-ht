# Imágenes de los cards de módulos

Pon aquí el arte de cada módulo (opcional). Si no hay imagen, el card usa el
diseño dorado en degradado automáticamente.

- Formato: PNG o JPG, **cuadrado** (1:1), recomendado **800×800 px**.
- Nombre del archivo = el `slug` del módulo. Ejemplos:
  - `comienza-por-aqui.png`
  - `protocolo-ht.png`
  - `modo-acelerado.png`
  - `boost-ht.png`
  - `codigo-del-hombre.png`
  - `formula-de-la-seduccion.png`

Después, en `src/lib/modulos-conteudo.ts`, agrega `imagen: "/cards/boost-ht.png"`
al módulo correspondiente.
