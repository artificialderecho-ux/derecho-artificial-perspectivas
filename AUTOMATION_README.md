# Automatización de Indexación en Google Search Console

Esta guía explica cómo configurar la automatización para notificar a Google sobre nuevos contenidos publicados en `derechoartificial.com`.

## 1. Configuración en Google Cloud

1.  **Crear un proyecto en Google Cloud Console:** Si aún no tienes uno, crea un nuevo proyecto.
2.  **Habilitar la API de Google Indexing:** En tu proyecto, ve a "APIs y servicios" > "Biblioteca", busca "Indexing API" y habilítala.
3.  **Crear una cuenta de servicio:**
    *   Ve a "IAM y administración" > "Cuentas de servicio".
    *   Haz clic en "Crear cuenta de servicio".
    *   Dale un nombre (por ejemplo, `google-indexing-api`) y una descripción.
    *   Asígnale el rol de "Propietario" (`Owner`) para asegurar que tenga los permisos necesarios.
    *   Haz clic en "Listo".
4.  **Descargar la clave privada JSON:**
    *   En la lista de cuentas de servicio, busca la que acabas de crear.
    *   Haz clic en los tres puntos bajo "Acciones" y selecciona "Administrar claves".
    *   Haz clic en "Agregar clave" > "Crear nueva clave".
    *   Selecciona "JSON" y haz clic en "Crear". Se descargará un archivo JSON.

## 2. Configuración en GitHub

1.  **Añadir la clave a los secretos del repositorio:**
    *   Ve a la configuración de tu repositorio en GitHub (`https://github.com/artificialderecho-ux/derecho-artificial-perspectivas/settings/secrets/actions`).
    *   Haz clic en "New repository secret".
    *   Nombra el secreto `GOOGLE_SERVICE_ACCOUNT_KEY`.
    *   Copia y pega el **contenido completo** del archivo JSON que descargaste de Google Cloud en el campo "Value".

## 3. Configuración en Google Search Console

1.  **Añadir la cuenta de servicio como propietario:**
    *   Ve a la configuración de tu propiedad en Google Search Console.
    *   Haz clic en "Usuarios y permisos".
    *   Haz clic en "Añadir usuario".
    *   En el campo de correo electrónico, pega la dirección de correo electrónico de la cuenta de servicio que creaste en Google Cloud (la encontrarás en los detalles de la cuenta de servicio o en el archivo JSON, en el campo `client_email`).
    *   Asegúrate de que el permiso esté establecido en "Propietario".

## 4. Verificación

Una vez que todo esté configurado, cada vez que se haga un `push` a la rama `main`, el workflow de GitHub Actions se ejecutará, generará un nuevo mapa del sitio y notificará a Google sobre las nuevas URLs.

Puedes verificar el estado de la indexación en Google Search Console.
