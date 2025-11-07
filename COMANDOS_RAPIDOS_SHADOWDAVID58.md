# ⚡ Comandos Rápidos - ShadowDavid58

## 🚀 Copia y Pega Estos Comandos

**⚠️ IMPORTANTE: Reemplaza `NOMBRE_REPOSITORIO` con el nombre real de tu repositorio en GitHub**

```bash
# 1. Ir a la carpeta
cd C:\Users\DavidR\Documents\Quipux\Restaurante

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Agregar todos los archivos
git add .

# 4. Hacer commit
git commit -m "Initial commit: Sistema de Reservas de Restaurantes - Trabajo Final"

# 5. Conectar con GitHub (REEMPLAZA NOMBRE_REPOSITORIO)
git remote add origin https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git

# 6. Cambiar a rama main
git branch -M main

# 7. Subir a GitHub
git push -u origin main
```

---

## 🔍 Cómo Saber el Nombre de Tu Repositorio

1. Ve a: https://github.com/ShadowDavid58
2. Busca tu repositorio en la lista
3. El nombre está en la URL cuando lo abres

**Ejemplo:**
- Si la URL es: `https://github.com/ShadowDavid58/restaurante-reservas`
- Entonces el nombre es: `restaurante-reservas`

---

## 🔑 Si Pide Autenticación

Cuando hagas `git push`, puede pedirte:
- **Username**: `ShadowDavid58`
- **Password**: Usa un **Personal Access Token** (no tu contraseña)

### Cómo obtener el token:

1. GitHub.com → Tu foto → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. Marca ✅ **repo**
5. **Generate token**
6. **COPIA EL TOKEN** (solo se muestra una vez)
7. Úsalo como contraseña

---

## ✅ Verificar que Funcionó

Después de `git push`, ve a:
```
https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO
```

Deberías ver todos tus archivos.

---

## 🔄 Para Actualizar Cambios Futuros

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

---

## ❌ Si Algo Sale Mal

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/ShadowDavid58/NOMBRE_REPOSITORIO.git
```

### "authentication failed"
- Usa Personal Access Token, no contraseña
- Verifica que el token tenga permisos de "repo"

### "repository not found"
- Verifica que el nombre del repositorio sea correcto
- Verifica que el repositorio exista en GitHub

---

**¡Copia, pega y reemplaza NOMBRE_REPOSITORIO!** 🚀

