# 🚀 Pasos para Subir el Proyecto a GitHub

## 📋 Paso a Paso Completo

### Paso 1: Verificar que Tienes Todos los Archivos

Abre la carpeta `Restaurante` y verifica que tengas esta estructura:

```
Restaurante/
├── frontend/
├── backend/
├── database/
├── docs/
├── README.md
├── .gitignore
├── docker-compose.yml
└── ... (otros archivos)
```

Si falta algo, revisa `LISTA_ARCHIVOS.md`

---

### Paso 2: Abrir Terminal en la Carpeta del Proyecto

**Windows:**
- Abre PowerShell o CMD
- Navega a la carpeta: `cd C:\Users\DavidR\Documents\Quipux\Restaurante`

**Mac/Linux:**
- Abre Terminal
- Navega a la carpeta: `cd ~/ruta/a/Restaurante`

---

### Paso 3: Inicializar Git (Si no está inicializado)

```bash
# Verificar si ya es un repositorio Git
git status

# Si da error, inicializar Git
git init
```

---

### Paso 4: Agregar Todos los Archivos

```bash
# Agregar todos los archivos al staging
git add .

# Verificar qué se va a subir
git status
```

Deberías ver todos tus archivos listos para commit.

---

### Paso 5: Hacer el Primer Commit

```bash
git commit -m "Initial commit: Sistema de Reservas de Restaurantes - Trabajo Final"
```

---

### Paso 6: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba derecha)
3. Selecciona **"New repository"**
4. Completa el formulario:
   - **Repository name**: `restaurante-reservas` (o el nombre que prefieras)
   - **Description**: `Sistema de gestión de reservas para restaurantes con arquitectura de microservicios, HTML/CSS/JS frontend y principios SOLID`
   - **Visibility**: 
     - ✅ **Public** (recomendado para trabajo académico)
     - ⚪ Private (si prefieres privado)
   - ⚠️ **NO marques** "Add a README file" (ya tenemos uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tenemos uno)
   - ⚠️ **NO marques** "Choose a license" (ya tenemos uno)
5. Haz clic en **"Create repository"**

---

### Paso 7: Conectar Repositorio Local con GitHub

GitHub te mostrará instrucciones. Usa estas:

```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
# Ejemplo: si tu usuario es "david123", sería:
# git remote add origin https://github.com/david123/restaurante-reservas.git

git remote add origin https://github.com/TU_USUARIO/restaurante-reservas.git

# Verificar que se agregó correctamente
git remote -v
```

Deberías ver algo como:
```
origin  https://github.com/TU_USUARIO/restaurante-reservas.git (fetch)
origin  https://github.com/TU_USUARIO/restaurante-reservas.git (push)
```

---

### Paso 8: Cambiar a Rama Main (Si es necesario)

```bash
# Verificar en qué rama estás
git branch

# Si estás en "master", cambiar a "main"
git branch -M main
```

---

### Paso 9: Subir el Código a GitHub

```bash
# Subir código a GitHub
git push -u origin main
```

**Nota:** Si es la primera vez que usas Git, puede pedirte autenticación:
- **Token de acceso personal** (recomendado)
- O usuario y contraseña de GitHub

---

### Paso 10: Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Deberías ver todos tus archivos
3. Verifica que el README.md se muestre correctamente

---

## 🔧 Solución de Problemas Comunes

### Error: "remote origin already exists"

```bash
# Eliminar el remoto existente
git remote remove origin

# Agregar el correcto
git remote add origin https://github.com/TU_USUARIO/restaurante-reservas.git
```

### Error: "failed to push"

**Opción 1: Verificar URL**
```bash
git remote set-url origin https://github.com/TU_USUARIO/restaurante-reservas.git
git push -u origin main
```

**Opción 2: Si pide autenticación**
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Genera un nuevo token (classic)
3. Selecciona permisos: `repo`
4. Copia el token
5. Úsalo como contraseña cuando Git lo pida

### Error: "Permission denied"

- Verifica que el nombre del repositorio sea correcto
- Verifica que tengas permisos de escritura
- Verifica tu autenticación en GitHub

### Error: "Large files detected"

Si tienes archivos muy grandes:
```bash
# Ver qué archivos son grandes
git ls-files -z | xargs -0 du -h | sort -rh | head -10

# Si hay node_modules, verifica que esté en .gitignore
```

---

## ✅ Checklist Final

Antes de considerar que está listo:

- [ ] Todos los archivos están en GitHub
- [ ] El README.md se muestra correctamente
- [ ] La estructura de carpetas es correcta
- [ ] El repositorio es accesible públicamente (si es público)
- [ ] Puedes ver el código fuente
- [ ] Los archivos de documentación están presentes

---

## 🎨 Mejoras Opcionales

### Agregar Topics (Etiquetas)

En la página del repositorio:
1. Haz clic en el engranaje ⚙️ junto a "About"
2. Agrega estos topics:
   - `arquitectura-software`
   - `microservicios`
   - `html-css-javascript`
   - `nodejs`
   - `docker`
   - `solid-principles`
   - `rest-api`
   - `postgresql`
   - `mongodb`

### Agregar Descripción

En "About" del repositorio, agrega:
```
Sistema completo de gestión de reservas para restaurantes con arquitectura de microservicios, frontend HTML/CSS/JS, y principios SOLID. Trabajo Final - Arquitectura de Software.
```

### Agregar Badges (Opcional)

Puedes agregar badges al README.md. GitHub los renderiza automáticamente.

---

## 📝 Comandos Útiles para el Futuro

```bash
# Ver estado de cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push

# Ver historial
git log --oneline

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad
```

---

## 🎉 ¡Listo!

Tu proyecto está en GitHub. Comparte el enlace:
```
https://github.com/TU_USUARIO/restaurante-reservas
```

---

## 📞 Si Necesitas Ayuda

1. Revisa `GUIA_GITHUB.md` para más detalles
2. Revisa `LISTA_ARCHIVOS.md` para verificar archivos
3. Consulta la documentación de Git: https://git-scm.com/doc

