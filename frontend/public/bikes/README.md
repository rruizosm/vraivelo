# Imágenes de bicicletas

Todas las imágenes de las bicis viven aquí, con una carpeta por marca → familia → modelo:

```
bikes/
  index.json                      ← índice de todo (por id de la tabla `bikes`)
  <marca>/<familia>/
    _family/                      ← recursos compartidos por toda la familia
      lifestyle/01.webp …         ← fotos de ambiente de la web oficial (landing de la familia)
      manifest.json
    <modelo>/                     ← una carpeta por bici
      <color>.webp|jpg            ← imagen de catálogo que usa hoy la tienda (BD: image_url)
      cover.webp                  ← portada, si es distinta de las de color
      cutout-<color>.png          ← recorte con fondo transparente (si existe)
      studio/                     ← fotos oficiales de estudio, fondo blanco o transparente
        <color>-side.webp                 lateral
        <color>-three-quarter-front.webp  3/4 delantera
        <color>-three-quarter-rear.webp   3/4 trasera
        <color>-detail-N.webp             detalles (cockpit, cuadro, transmisión…)
      lifestyle/01.webp …         ← fotos de ambiente específicas del modelo
      manifest.json               ← fuente (URL oficial), fecha, color y vista de cada imagen
```

## `match` en los manifest

- `exact`: la ficha oficial corresponde a este modelo.
- `closest`: el fabricante ya no publica este modelo/año; las fotos de `studio/` son del modelo
  actual más parecido (mismo cuadro o grupo). Revisar antes de usarlas como si fueran idénticas.
- `family`: no hay ficha equivalente; sólo hay recursos de familia en `../_family/`.

## Reglas

- Nombres en minúsculas y con guiones; WebP, máximo 2000 px de ancho.
- Las fotos son material de prensa/catálogo de cada marca (Giant, Liv, Berria, MMR) para
  distribuidores; usarlas sólo para presentar sus bicis.
- Para añadir una bici nueva: crear `<marca>/<familia>/<modelo>/`, poner la imagen de catálogo y
  apuntar `image_url` de la BD a `/bikes/...`.
