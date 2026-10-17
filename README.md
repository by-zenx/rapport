# Rapport offline copy

This folder is a self-contained copy of the app's HTML, CSS, JavaScript, images, and animation assets. It does not load fonts or other assets from external websites. The font uses your operating system's system UI font. Local portraits are included for the images present in the original capture.

Keep the folder structure intact. The bundled app expects the URL path `/rapport/`. Open PowerShell in the parent folder (`cac-crm`) and run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000/rapport/> in your browser. The app uses JavaScript modules, so use the local server rather than opening `index.html` directly as a `file://` URL.
