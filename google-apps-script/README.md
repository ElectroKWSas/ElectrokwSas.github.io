# Conectar el formulario de contacto a Google Sheets

Guía paso a paso para que el formulario de `/contacto` guarde cada envío en
una hoja de Google Sheets, sin backend tradicional.

## 1. Crear la hoja de cálculo

1. Entra a [sheets.google.com](https://sheets.google.com) con la cuenta de
   Google de la empresa (`electrokw.empresa@gmail.com` o la que se vaya a
   usar).
2. Crea una hoja de cálculo nueva y ponle un nombre, por ejemplo
   **"ElectroKW — Contactos web"**.
3. No hace falta crear ninguna pestaña ni encabezado manualmente: el script
   crea la pestaña `Contactos` y sus encabezados automáticamente en el
   primer envío.

## 2. Pegar el script

1. Dentro de la hoja, ve a **Extensiones → Apps Script**.
2. Borra el contenido del archivo `Code.gs` que abre por defecto.
3. Copia y pega el contenido completo del archivo
   [`Code.gs`](./Code.gs) de esta carpeta.
4. Guarda el proyecto (ícono de disquete o `Ctrl+S`). Puedes ponerle un
   nombre al proyecto, por ejemplo "ElectroKW Contacto".

## 3. Publicar como aplicación web

1. En el editor de Apps Script, haz clic en **Implementar → Nueva
   implementación**.
2. En "Selecciona el tipo", elige **Aplicación web**.
3. Configura:
   - **Descripción:** ElectroKW — formulario de contacto (puedes ajustarla).
   - **Ejecutar como:** Yo (tu cuenta de Google).
   - **Quién tiene acceso:** **Cualquier usuario**.
4. Haz clic en **Implementar**.
5. Google te pedirá autorizar permisos la primera vez — acepta con la misma
   cuenta de Google dueña de la hoja.
6. Copia la **URL de la aplicación web** que te entrega al finalizar. Tiene
   este formato:
   `https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec`

## 4. Configurar la URL en el proyecto

1. En la raíz del proyecto, crea un archivo `.env` (si no existe) a partir
   de `.env.example`.
2. Pega la URL copiada en la variable:

   ```
   VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

3. Si el sitio se publica con GitHub Actions (ver `.github/workflows/deploy.yml`),
   agrega esta misma URL como **secret** del repositorio en
   `Settings → Secrets and variables → Actions` con el nombre
   `VITE_GOOGLE_SHEETS_ENDPOINT`.
4. Reinicia `npm run dev` (o vuelve a desplegar) para que la nueva variable
   de entorno se aplique.

## 5. Probar

1. Con el sitio corriendo (`npm run dev` o el sitio ya publicado), llena el
   formulario de `/contacto` y envíalo.
2. Debe aparecer el mensaje **"Mensaje enviado correctamente."**.
3. Verifica en la hoja de cálculo que apareció una fila nueva en la pestaña
   `Contactos`.

## Notas

- Si más adelante necesitas **volver a implementar** el script (por ejemplo,
  después de editar `Code.gs`), usa **Implementar → Gestionar
  implementaciones → editar (ícono de lápiz) → Nueva versión**, no crees una
  implementación nueva desde cero, o la URL cambiará y habrá que actualizar
  el `.env` de nuevo.
- El campo `IP` se obtiene desde el navegador del visitante vía
  `api.ipify.org`. Si ese servicio no responde (bloqueo de red, sin
  internet, etc.), el formulario igual se envía y el campo queda como
  "desconocida" — nunca bloquea el envío.
