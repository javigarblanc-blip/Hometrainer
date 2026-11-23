# Umbral (antes Hometrainer): instrucciones para Claude

App web de entrenamiento en rodillo de Javi, llamada **Umbral** desde la v0.7.2. El repositorio y la dirección siguen siendo Hometrainer, y las claves de localStorage siguen con el prefijo `ht_` (Salamanca), hecha en un único `index.html`. Él no programa: dirige, prueba en el móvil y decide rápido. Respuestas en español.

## Dónde está todo
- Código (fuente de verdad): este repositorio, rama `main`. GitHub Pages la publica en https://javigarblanc-blip.github.io/Hometrainer/
- Especificación e historial: documento `claude/especificacion-hometrainer.md` del proyecto "Rodillo Home Trainer" en claude.ai.

## Archivos
- `index.html`: toda la app (HTML, CSS y JS en un solo archivo, con localStorage).
- `sw.js`: service worker. Va primero a la red y, sin conexión, tira de la caché. **Sube el nombre de la caché (`umbral-vN`) en cada versión.**
- `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`: archivos de PWA.
- `prueba.html`: diagnóstico Bluetooth del rodillo (paso 0).

## Forma de trabajar
1. Antes de tocar nada, trae la última versión (`git pull` o un clon nuevo). No partas de copias antiguas.
2. Sube `VER` en `index.html` y la caché en `sw.js`.
3. Comprueba la sintaxis: extrae el `<script>` y pásalo por `node --check`.
4. Pruébalo en Chrome headless con Playwright, con el rodillo simulado (`BT.dev`, `BT.fecTx` y `BT.cpP`/`cpAt`), y revisa capturas.
5. Haz commit en `main` con un mensaje en español y push. Javi prueba directamente en la dirección publicada.
6. Actualiza la especificación del proyecto si cambia algo importante.

## Cosas que no hay que romper
- Rodillo Thinkrider X3 (de rueda): **sin FTMS**. Control por FE-C sobre Bluetooth (UUIDs de Tacx 6e40fec1/2/3): ERG con la página 0x31 y pendiente con la 0x33. Potencia por Cycling Power 0x1818. No da cadencia.
- Strava: la aplicación de Strava de Javi tiene el dominio de vuelta **localhost** y no se cambia, porque la usan sus otras apps. Se conecta con el flujo manual: pegar la URL de localhost con el código.
- Entrenador IA: llamada directa a la API de Anthropic desde el navegador. La clave solo vive en el móvil (localStorage) y **nunca** va al repositorio, al proyecto ni a la copia de seguridad.
- Temas por variables CSS (`data-theme`: grafito, claro, noche). No metas colores fijos de fondo o texto.
- Estilo: Barlow y Barlow Condensed, títulos en minúscula, colores de zona como sistema de color, naranja `#ff7a1a` solo para acciones y potencia.
