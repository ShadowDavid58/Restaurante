# 🍽️ Sistema de Reservas de Restaurantes

> **Trabajo Final - Arquitectura de Software**  
> Sistema completo de gestión de reservas para restaurantes con arquitectura de microservicios, frontend HTML/CSS/JS, y principios SOLID.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Documentación](#-documentación)
- [Trade-offs](#-trade-offs)
- [Atributos de Calidad](#-atributos-de-calidad)
- [Principios SOLID](#-principios-solid)
- [Diagramas](#-diagramas)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## 🎯 Descripción

Sistema completo de gestión de reservas para restaurantes diseñado con una arquitectura moderna de microservicios. El sistema permite a los usuarios realizar reservas, consultar menús, procesar pagos y recibir notificaciones en tiempo real.

### Objetivos del Proyecto

- Demostrar dominio de arquitecturas de software modernas
- Implementar principios SOLID en un proyecto real
- Aplicar patrones de diseño arquitectónicos
- Diseñar un sistema escalable y mantenible
- Evaluar trade-offs en decisiones de arquitectura

## 🏗️ Arquitectura

### Arquitectura Elegida

**Arquitectura Híbrida: Microservicios + N-Tier + Event-Driven**

La arquitectura combina lo mejor de tres enfoques:

1. **Microservicios**: Escalabilidad independiente y despliegues aislados
2. **N-Tier**: Separación de responsabilidades dentro de cada servicio
3. **Event-Driven**: Comunicación asíncrona y desacoplamiento

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (React SPA)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Reservas │  │  Menús   │  │  Pagos   │  │  Perfil  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTPS/REST + WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  API GATEWAY (Kong/Nginx)                   │
│  • Autenticación JWT                                        │
│  • Rate Limiting                                            │
│  • Load Balancing                                           │
└──────────┬──────────┬──────────┬──────────┬───────────────┘
           │          │          │          │
    ┌──────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐
    │ Reservas │ │ Menús  │ │ Pagos  │ │ Auth  │ │ Notif. │
    │ Service  │ │Service │ │Service │ │Service │ │Service │
    │          │ │        │ │        │ │        │ │        │
    │ ┌──────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │
    │ │Ctrl  │ │ │ │Ctrl│ │ │ │Ctrl│ │ │ │Ctrl│ │ │ │Ctrl│ │
    │ └──────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │
    │ ┌──────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │
    │ │Svc   │ │ │ │Svc │ │ │ │Svc │ │ │ │Svc │ │ │ │Svc │ │
    │ └──────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │
    │ ┌──────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │ │ ┌────┐ │
    │ │Repo  │ │ │ │Repo│ │ │ │Repo│ │ │ │Repo│ │ │ │Repo│ │
    │ └──────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │ │ └────┘ │
    └──────┬───┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
           │          │          │          │          │
    ┌──────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐
    │PostgreSQL│ │ MongoDB│ │Postgres│ │Postgres│ │ MongoDB│
    └──────────┘ └────────┘ └────────┘ └────────┘ └────────┘
           │          │          │          │          │
           └──────────┴──────────┴──────────┴──────────┘
                             │
                    ┌────────▼────────┐
                    │  Message Broker │
                    │   (RabbitMQ)    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Redis Cache   │
                    └─────────────────┘
```

### Microservicios

1. **Reservas Service**: Gestión de reservas, disponibilidad, confirmaciones
2. **Menús Service**: Gestión de menús, platos, precios, disponibilidad
3. **Pagos Service**: Procesamiento de pagos, integración con pasarelas
4. **Autenticación Service**: JWT, OAuth, gestión de usuarios
5. **Notificaciones Service**: Emails, SMS, push notifications

### Patrones de Arquitectura Aplicados

- ✅ **MVC (Model-View-Controller)**: Frontend React
- ✅ **Layered Architecture (N-Tier)**: Backend (Controller-Service-Repository)
- ✅ **API Gateway Pattern**: Punto de entrada único
- ✅ **Event-Driven Architecture**: Comunicación asíncrona
- ✅ **Repository Pattern**: Abstracción de acceso a datos
- ✅ **Circuit Breaker Pattern**: Protección contra fallos

## ✨ Características

### Funcionalidades Principales

- 🔐 **Autenticación y Autorización**: JWT con refresh tokens
- 📅 **Gestión de Reservas**: Crear, modificar, cancelar reservas
- 🍽️ **Gestión de Menús**: Consulta de menús y disponibilidad
- 💳 **Procesamiento de Pagos**: Integración con pasarelas de pago
- 🔔 **Notificaciones en Tiempo Real**: WebSocket para actualizaciones
- 📊 **Dashboard Administrativo**: Gestión de restaurantes y reservas
- 📱 **Responsive Design**: Optimizado para móvil, tablet y desktop

### Características Técnicas

- Arquitectura de microservicios escalable
- Comunicación asíncrona con Event-Driven
- Caché distribuido con Redis
- Base de datos poliglota (PostgreSQL + MongoDB)
- API RESTful con documentación OpenAPI
- WebSocket para actualizaciones en tiempo real
- CI/CD automatizado
- Monitoreo y logging centralizado

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modulares con metodología BEM
- **JavaScript ES6+**: Código modular y organizado
- **Fetch API**: Comunicación HTTP con microservicios
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js + Express**: Runtime y framework
- **TypeScript**: Tipado estático
- **JWT**: Autenticación
- **Bcrypt**: Hash de contraseñas
- **Validator.js**: Validación

### Bases de Datos
- **PostgreSQL**: Datos transaccionales (reservas, pagos, usuarios)
- **MongoDB**: Datos no estructurados (menús, logs)
- **Redis**: Caché y sesiones

### Infraestructura
- **Docker + Docker Compose**: Containerización
- **Kubernetes**: Orquestación (producción)
- **Nginx / Kong**: API Gateway
- **RabbitMQ**: Message Broker

### DevOps
- **GitHub Actions**: CI/CD
- **Jest**: Testing
- **ESLint + Prettier**: Calidad de código
- **SonarQube**: Análisis estático

## 📁 Estructura del Proyecto

```
restaurante-reservas/
├── frontend/                 # Frontend HTML/CSS/JS
│   ├── index.html           # Página principal
│   ├── css/                 # Estilos modulares
│   │   ├── main.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   └── responsive.css
│   └── js/                  # JavaScript modular
│       ├── config.js
│       ├── api.js
│       ├── auth.js
│       ├── reservations.js
│       ├── menu.js
│       └── main.js
│
├── backend/                 # Microservicios
│   ├── reservas-service/    # N-Tier: Controller-Service-Repository
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── repositories/
│   │   └── package.json
│   ├── menus-service/
│   ├── auth-service/
│   └── api-gateway/
│
├── database/                # Scripts de BD
│   ├── init.sql             # PostgreSQL
│   └── init-menus.js        # MongoDB
│
├── docs/                    # Documentación
│   ├── ARQUITECTURA.md
│   └── DIAGRAMAS.md
│
├── docker-compose.yml       # Orquestación
├── README.md
└── INSTRUCCIONES_USO.md
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- Docker y Docker Compose
- Git

### Instalación Rápida con Docker

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/restaurante-reservas.git
cd restaurante-reservas
```

2. **Levantar toda la infraestructura**
```bash
docker-compose up -d
```

3. **Inicializar datos de menú**
```bash
cd database
node init-menus.js
cd ..
```

4. **Abrir el frontend**
```bash
cd frontend
python -m http.server 8080
# O usar cualquier servidor HTTP local
```

Accede a: `http://localhost:8080`

### Instalación Manual (Desarrollo)

Ver [INSTRUCCIONES_USO.md](./INSTRUCCIONES_USO.md) para instrucciones detalladas.

## 💻 Uso

### Inicio Rápido

1. **Levantar servicios con Docker:**
```bash
docker-compose up -d
```

2. **Abrir frontend:**
```bash
cd frontend
python -m http.server 8080
```

3. **Acceder a la aplicación:**
   - Frontend: `http://localhost:8080`
   - API Gateway: `http://localhost:8000`

### Endpoints Principales

- `GET /api/reservas` - Listar reservas
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/availability` - Verificar disponibilidad
- `GET /api/menus` - Listar menús
- `GET /api/menus/category/:category` - Menús por categoría
- `POST /api/auth/login` - Autenticación
- `POST /api/auth/register` - Registro

Para más detalles, ver [INSTRUCCIONES_USO.md](./INSTRUCCIONES_USO.md)

## 📚 Documentación

### Documentación Completa

- [Arquitectura Detallada](./ARQUITECTURA.md) - Documentación completa de la arquitectura
- [Diagramas](./docs/DIAGRAMAS.md) - Diagramas visuales del sistema
- [API Documentation](./docs/API.md) - Documentación de la API

### Resumen Ejecutivo

**Justificación de la Arquitectura (300 palabras)**

Se ha elegido una arquitectura híbrida de **microservicios con N-Tier y Event-Driven** para el sistema de reservas de restaurantes. Esta combinación optimiza escalabilidad, mantenibilidad y resiliencia.

Los **microservicios** permiten escalar independientemente cada funcionalidad crítica. El servicio de reservas puede manejar picos de tráfico sin afectar menús o pagos. Cada servicio implementa **N-Tier** (Controller-Service-Repository), garantizando separación de responsabilidades y facilitando testing.

El patrón **Event-Driven** desacopla servicios mediante un message broker. Cuando se crea una reserva, se publica un evento que dispara notificaciones y actualizaciones de inventario sin acoplamiento directo.

**Principios SOLID** se aplican en cada capa: servicios con responsabilidad única (SRP), extensibles sin modificación (OCP), y dependencias invertidas (DIP) mediante inyección.

**Atributos de calidad priorizados**: escalabilidad horizontal (10,000 usuarios concurrentes), disponibilidad 99.9% mediante redundancia, y rendimiento <200ms con caché Redis. La seguridad se garantiza con JWT, HTTPS y validación estricta.

**Trade-offs**: Se prioriza disponibilidad sobre consistencia estricta (CAP), aceptando consistencia eventual. La complejidad operativa de microservicios se justifica por la escalabilidad y mantenibilidad a largo plazo.

Esta arquitectura soporta crecimiento futuro, permite tecnologías heterogéneas por servicio, y facilita despliegues independientes sin downtime.

## ⚖️ Trade-offs

### 1. Microservicios vs Monolito

**Elegido: Microservicios**

| Aspecto | Microservicios | Monolito |
|---------|---------------|----------|
| Escalabilidad | ✅ Independiente | ❌ Todo o nada |
| Complejidad | ❌ Mayor | ✅ Menor |
| Despliegue | ✅ Independiente | ❌ Todo junto |
| Debugging | ❌ Más complejo | ✅ Más simple |

**Justificación**: Para una app que necesita escalar en horarios pico, los microservicios permiten escalar solo el servicio de reservas sin afectar otros.

### 2. Consistencia vs Disponibilidad (CAP)

**Elegido: Disponibilidad con Consistencia Eventual**

**Justificación**: Es más importante que el sistema esté disponible (aunque con ligera inconsistencia temporal) que tener consistencia perfecta pero sistema caído.

### 3. Rendimiento vs Mantenibilidad

**Elegido: Balance (60% Mantenibilidad, 40% Rendimiento)**

**Justificación**: Para un proyecto académico y futuro profesional, es mejor tener código mantenible que optimizaciones prematuras.

## 🎯 Atributos de Calidad

| Atributo | Objetivo | Estrategia |
|----------|----------|------------|
| **Rendimiento** | <200ms (95% peticiones) | Redis cache, CDN, lazy loading |
| **Escalabilidad** | 10,000 usuarios concurrentes | Escalado horizontal, load balancing |
| **Disponibilidad** | 99.9% uptime | Redundancia, health checks, failover |
| **Mantenibilidad** | Código modular | Microservicios, tests, documentación |
| **Seguridad** | Protección datos sensibles | JWT, HTTPS, validación, rate limiting |
| **Usabilidad** | Interfaz intuitiva | Responsive, feedback visual, errores amigables |

## 🔧 Principios SOLID

### S - Single Responsibility Principle
Cada microservicio tiene una única responsabilidad:
- `ReservasService`: Solo gestiona reservas
- `PagosService`: Solo procesa pagos

### O - Open/Closed Principle
Servicios extensibles sin modificación:
```typescript
class PaymentProcessor {
  processPayment(amount: number): Promise<PaymentResult>;
}

class CreditCardProcessor extends PaymentProcessor { }
class PayPalProcessor extends PaymentProcessor { }
```

### L - Liskov Substitution Principle
Implementaciones intercambiables sin romper el contrato.

### I - Interface Segregation Principle
Interfaces específicas y pequeñas:
- `IAuthService`: login, logout
- `IReservationService`: create, cancel

### D - Dependency Inversion Principle
Dependencia de abstracciones:
```typescript
class ReservaController {
  constructor(private reservaService: IReservaService) {}
}
```

## 📊 Diagramas

Ver [DIAGRAMAS.md](./docs/DIAGRAMAS.md) para diagramas detallados:
- Diagrama de arquitectura completa
- Diagrama de flujo de reserva
- Diagrama de secuencia
- Diagrama de componentes

## 🤝 Contribución

Este es un proyecto académico. Para mejoras o sugerencias:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👤 Autor

**Tu Nombre**  
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Profesores y compañeros del curso
- Comunidad de desarrolladores open source
- Documentación de las tecnologías utilizadas

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

