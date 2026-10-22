# Veröffentlichung

Status: bereitgestellt

## Ziel

- Website: [wanderland.info](https://wanderland.info)
- Vorgeschlagener Pfad: `/7wege/` (bzw. Hauptverzeichnis oder Unterordner dank relativer Basispfade `base: './'`)

## Build und Bereitstellung

- **Build-Befehl:** `npm run build` (`tsc && vite build`)
- **Ausgabeordner:** [`dist/`](file:///d:/WANDERLAND/7WEGE/dist/) (autarke, optimierte statische HTML/JS/CSS/Asset-Ausgabe)
- **Test-Befehl:** `npm test` (`vitest run`, alle 49 Unit-Tests)
- **Lokale Vorschau:** `npm run preview` (`http://localhost:4173/`)

### Auslieferung & Hosting
- Durch die Konfiguration `base: './'` in [`vite.config.ts`](file:///d:/WANDERLAND/7WEGE/vite.config.ts) ist das Release vollständig pfadunabhängig und kann sowohl im Web-Root als auch unter beliebigen Unterverzeichnissen (z. B. `/7wege/`) auf Apache, Nginx, Cloudflare Pages, GitHub Pages oder einem statischen Webserver ohne Server-Side-Rendering betrieben werden.
- Alle 3D-GLB-Modelle und Texturen liegen einsatzbereit unter [`dist/assets/models/`](file:///d:/WANDERLAND/7WEGE/dist/assets/models/).
