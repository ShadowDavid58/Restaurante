# 🚀 Instrucciones de Uso - Sistema Completo

## Requisitos Previos

- Node.js 18+ instalado
- Docker y Docker Compose instalados
- Git instalado

## Opción 1: Ejecutar con Docker (Recomendado)

### Paso 1: Clonar/Preparar el Proyecto

```bash
cd Restaurante
```

### Paso 2: Levantar la Infraestructura

```bash
# Levantar todas las bases de datos y servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Paso 3: Inicializar Datos

```bash
# Inicializar menús en MongoDB
cd database
node init-menus.js
cd ..
```

### Paso 4: Abrir el Frontend

Abre `frontend/index.html` en tu navegador o usa un servidor local:

```bash
cd frontend
python -m http.server 8080
# O
npx http-server -p 8080
```

Accede a: `http://localhost:8080`

## Opción 2: Ejecutar sin Docker (Desarrollo)

### Paso 1: Instalar Bases de Datos

**PostgreSQL:**
```bash
# Instalar PostgreSQL localmente o usar Docker solo para BD
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=restaurante_db \
  -p 5432:5432 \
  postgres:15-alpine
```

**MongoDB:**
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:6
```

### Paso 2: Inicializar Base de Datos

```bash
# Ejecutar script SQL
psql -U postgres -f database/init.sql

# O conectarse y ejecutar manualmente
psql -U postgres -d restaurante_db -f database/init.sql
```

### Paso 3: Inicializar Menús

```bash
cd database
node init-menus.js
cd ..
```

### Paso 4: Instalar Dependencias de Microservicios

```bash
# Reservas Service
cd backend/reservas-service
npm install
cd ../..

# Menús Service
cd backend/menus-service
npm install
cd ../..

# Auth Service
cd backend/auth-service
npm install
cd ../..

# API Gateway
cd backend/api-gateway
npm install
cd ../..
```

### Paso 5: Ejecutar Microservicios

Abre terminales separadas para cada servicio:

**Terminal 1 - Reservas:**
```bash
cd backend/reservas-service
npm run dev
```

**Terminal 2 - Menús:**
```bash
cd backend/menus-service
npm run dev
```

**Terminal 3 - Auth:**
```bash
cd backend/auth-service
npm run dev
```

**Terminal 4 - API Gateway:**
```bash
cd backend/api-gateway
npm run dev
```

### Paso 6: Abrir Frontend

```bash
cd frontend
python -m http.server 8080
```

## Verificar que Todo Funciona

### 1. Verificar Servicios

```bash
# Health checks
curl http://localhost:3001/health  # Reservas
curl http://localhost:3002/health  # Menús
curl http://localhost:3004/health # Auth
curl http://localhost:8000/health # API Gateway
```

### 2. Probar Endpoints

```bash
# Obtener menús
curl http://localhost:8000/api/menus

# Crear reserva
curl -X POST http://localhost:8000/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+1234567890",
    "fecha": "2024-12-25",
    "hora": "19:00",
    "num_personas": 2
  }'
```

## Estructura de URLs

- **Frontend**: `http://localhost:8080` (o el puerto que uses)
- **API Gateway**: `http://localhost:8000`
- **Reservas Service**: `http://localhost:3001`
- **Menús Service**: `http://localhost:3002`
- **Auth Service**: `http://localhost:3004`
- **PostgreSQL**: `localhost:5432`
- **MongoDB**: `localhost:27017`

## Solución de Problemas

### Error: Puerto en uso

```bash
# Ver qué está usando el puerto
lsof -i :3001  # Linux/Mac
netstat -ano | findstr :3001  # Windows

# Cambiar puerto en .env o docker-compose.yml
```

### Error: No se puede conectar a la base de datos

1. Verificar que PostgreSQL/MongoDB estén corriendo
2. Verificar credenciales en variables de entorno
3. Verificar que los servicios estén en la misma red Docker

### Error: CORS

El API Gateway ya tiene CORS habilitado. Si tienes problemas, verifica:
- Que estés usando el API Gateway (puerto 8000)
- Que el frontend esté en el mismo dominio o configurar CORS manualmente

### Error: Frontend no carga datos

1. Verificar que el API Gateway esté corriendo
2. Verificar la URL en `frontend/js/config.js`
3. Abrir la consola del navegador para ver errores

## Comandos Útiles

```bash
# Ver logs de Docker
docker-compose logs -f [servicio]

# Reiniciar un servicio
docker-compose restart [servicio]

# Detener todo
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache
```

## Desarrollo

### Hot Reload

Los servicios tienen `nodemon` configurado para desarrollo. Los cambios se recargan automáticamente.

### Variables de Entorno

Crea archivos `.env` en cada servicio si necesitas configuraciones personalizadas:

```env
# backend/reservas-service/.env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurante_db
DB_USER=postgres
DB_PASSWORD=postgres
```

## Producción

Para producción:

1. Cambiar `JWT_SECRET` a un valor seguro
2. Usar HTTPS
3. Configurar variables de entorno de producción
4. Usar un servidor web (Nginx) para servir el frontend
5. Configurar rate limiting
6. Habilitar logging y monitoreo

---

¡Listo! El sistema debería estar funcionando. 🎉

