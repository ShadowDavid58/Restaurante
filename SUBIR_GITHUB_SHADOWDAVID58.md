# 🚀 Subir Proyecto a GitHub - ShadowDavid58

## ✅ Comandos Específicos para Tu Usuario

### Paso 1: Abrir Terminal en la Carpeta del Proyecto

**Windows PowerShell:**
```powershell
cd C:\Users\DavidR\Documents\Quipux\Restaurante
```

**O desde cualquier lugar:**
```powershell
cd Documents\Quipux\Restaurante
```

---

### Paso 2: Verificar Estado de Git

```bash
git status
```

**Si dice "not a git repository":**
```bash
git init
```

---

### Paso 3: Agregar Todos los Archivos

```bash
git add .
```

**Verificar qué se agregó:**
```bash
git status
```

Deberías ver todos tus archivos listos (en verde).

---

### Paso 4: Hacer el Primer Commit

```bash
git commit -m "Initial commit: Sistema de Reservas de Restaurantes - Trabajo Final"
```

---

### Paso 5: Conectar con Tu Repositorio de GitHub

**IMPORTANTE: Reemplaza NOMBRE_REPOSITORIO con el nombre que le diste**

```bash
git remote add origin https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git
```

**Ejemplo si tu repositorio se llama "restaurante-reservas":**
```bash
git remote add origin https://github.com/ShadowDavid58/restaurante-reservas.git
```

**Verificar que se agregó correctamente:**
```bash
git remote -v
```

Deberías ver:
```
origin  https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git (fetch)
origin  https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git (push)
```

---

### Paso 6: Cambiar a Rama Main

```bash
git branch -M main
```

---

### Paso 7: Subir el Código a GitHub

```bash
git push -u origin main
```

**Si pide autenticación:**
- Usuario: `ShadowDavid58`
- Contraseña: Usa un **Personal Access Token** (no tu contraseña de GitHub)

---

## 🔑 Cómo Obtener Personal Access Token

Si Git te pide autenticación:

1. Ve a GitHub.com e inicia sesión
2. Click en tu foto (arriba derecha) → **Settings**
3. En el menú izquierdo: **Developer settings**
4. Click en **Personal access tokens** → **Tokens (classic)**
5. Click en **Generate new token** → **Generate new token (classic)**
6. Completa:
   - **Note**: "Token para restaurante-reservas"
   - **Expiration**: 90 days (o el que prefieras)
   - **Select scopes**: Marca ✅ **repo** (todos los permisos de repo)
7. Click en **Generate token**
8. **COPIA EL TOKEN** (solo se muestra una vez)
9. Cuando Git pida contraseña, pega el token (no tu contraseña)

---

## 🎯 Comandos Completos (Copia y Pega)

**Reemplaza NOMBRE_REPOSITORIO con el nombre real de tu repositorio:**

```bash
# 1. Ir a la carpeta
cd C:\Users\DavidR\Documents\Quipux\Restaurante

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Agregar archivos
git add .

# 4. Commit
git commit -m "Initial commit: Sistema de Reservas de Restaurantes - Trabajo Final"

# 5. Conectar con GitHub (REEMPLAZA NOMBRE_REPOSITORIO)
git remote add origin https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git

# 6. Cambiar a main
git branch -M main

# 7. Subir
git push -u origin main
```

---

## 🔍 Verificar Nombre del Repositorio

Si no recuerdas el nombre exacto de tu repositorio:

1. Ve a: https://github.com/ShadowDavid58
2. Verás todos tus repositorios
3. Busca el que creaste para este proyecto
4. El nombre está en la URL: `https://github.com/ShadowDavid58/NOMBRE_AQUI`

---

## ❌ Solución de Problemas

### Error: "remote origin already exists"

```bash
# Eliminar el remoto existente
git remote remove origin

# Agregar el correcto
git remote add origin https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git
```

### Error: "failed to push" o "Permission denied"

1. Verifica que el nombre del repositorio sea correcto
2. Verifica que tengas un Personal Access Token
3. Intenta de nuevo con el token

### Error: "repository not found"

- Verifica que el repositorio exista en GitHub
- Verifica que el nombre sea exacto (mayúsculas/minúsculas importan)
- Verifica que tengas acceso al repositorio

### Error: "authentication failed"

- Usa Personal Access Token, no tu contraseña
- Verifica que el token tenga permisos de "repo"
- Genera un nuevo token si es necesario

---

## ✅ Verificación Final

Después de hacer push:

1. Ve a: `https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO`
2. Deberías ver todos tus archivos
3. El README.md debería mostrarse automáticamente
4. Verifica que la estructura de carpetas sea correcta

---

## 📝 Para Futuros Cambios

Una vez que subiste todo, para actualizar cambios futuros:

```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .

# 3. Commit
git commit -m "Descripción de los cambios"

# 4. Subir
git push
```

---

## 🎉 ¡Listo!

Una vez que completes estos pasos, tu proyecto estará en:
```
https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO
```

**Comparte este enlace con tu profesor o en tu entrega.**

---

## 💡 Tip Rápido

Si no estás seguro del nombre del repositorio, puedes:
1. Ir a GitHub.com
2. Click en tu foto → **Your repositories**
3. Ver todos tus repositorios
4. Copiar el nombre exacto

---

¿Necesitas ayuda con algún paso? ¡Dime cuál y te ayudo! 🚀

