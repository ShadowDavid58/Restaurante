# Arquitectura de Software: Sistema de Reservas de Restaurantes

## 1. Arquitectura de Software Elegida

**Arquitectura Híbrida: Microservicios + N-Tier + Event-Driven**

Se ha elegido una arquitectura híbrida que combina:
- **Microservicios** como arquitectura principal
- **N-Tier (3 capas)** dentro de cada microservicio
- **Event-Driven** para comunicación asíncrona entre servicios

### Justificación de la Elección

Los microservicios permiten escalar independientemente cada funcionalidad (reservas, menús, pagos, notificaciones). La arquitectura N-Tier dentro de cada servicio garantiza separación de responsabilidades (presentación, lógica de negocio, datos). El patrón Event-Driven desacopla los servicios y mejora la resiliencia del sistema.

---

## 2. Arquitectura Completa: React + Microservicios

### Frontend (React)

```
┌─────────────────────────────────────────┐
│         React Application (SPA)         │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Reservas │  │  Menús   │  │ Perfil ││
│  └──────────┘  └──────────┘  └────────┘│
│  ┌──────────┐  ┌──────────┐           │
│  │ Pagos    │  │ Notif.   │           │
│  └──────────┘  └──────────┘           │
└─────────────────────────────────────────┘
              │
              │ HTTPS/REST + WebSocket
              ▼
┌─────────────────────────────────────────┐
│      API Gateway (Kong/Nginx)          │
│  - Autenticación                        │
│  - Rate Limiting                       │
│  - Load Balancing                       │
└─────────────────────────────────────────┘
```

### Backend (Microservicios)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Microservicio│  │ Microservicio│  │ Microservicio│
│   Reservas   │  │    Menús     │  │    Pagos     │
│              │  │              │  │              │
│ ┌──────────┐│  │ ┌──────────┐│  │ ┌──────────┐│
│ │Controller││  │ │Controller││  │ │Controller││
│ └──────────┘│  │ └──────────┘│  │ └──────────┘│
│ ┌──────────┐│  │ ┌──────────┐│  │ ┌──────────┐│
│ │ Service  ││  │ │ Service  ││  │ │ Service  ││
│ └──────────┘│  │ └──────────┘│  │ └──────────┘│
│ ┌──────────┐│  │ ┌──────────┐│  │ ┌──────────┐│
│ │Repository││  │ │Repository││  │ │Repository││
│ └──────────┘│  │ └──────────┘│  │ └──────────┘│
└──────────────┘  └──────────────┘  └──────────────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
              ┌──────────▼──────────┐
              │  Message Broker     │
              │  (RabbitMQ/Kafka)  │
              └──────────┬──────────┘
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│ PostgreSQL  │  │   MongoDB   │  │   Redis     │
│ (Reservas)  │  │   (Menús)   │  │  (Cache)    │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Microservicios Identificados

1. **Reservas Service** (Node.js/Express)
   - Gestiona reservas, disponibilidad, confirmaciones
   - Base de datos: PostgreSQL

2. **Menús Service** (Node.js/Express)
   - Gestiona menús, platos, precios, disponibilidad
   - Base de datos: MongoDB

3. **Pagos Service** (Node.js/Express)
   - Procesa pagos, integración con pasarelas
   - Base de datos: PostgreSQL

4. **Notificaciones Service** (Node.js/Express)
   - Envía emails, SMS, push notifications
   - Base de datos: MongoDB (logs)

5. **Autenticación Service** (Node.js/Express)
   - JWT, OAuth, gestión de usuarios
   - Base de datos: PostgreSQL

6. **API Gateway** (Kong/Nginx)
   - Punto de entrada único
   - Autenticación centralizada
   - Rate limiting

---

## 3. Patrones de Arquitectura Aplicados

### 3.1 MVC (Model-View-Controller) - Frontend React
- **Model**: Estado global (Redux/Context)
- **View**: Componentes React
- **Controller**: Hooks y servicios de API

### 3.2 Layered Architecture (N-Tier) - Backend
Cada microservicio implementa 3 capas:
- **Presentation Layer**: Controllers (Express routes)
- **Business Logic Layer**: Services
- **Data Access Layer**: Repositories

### 3.3 API Gateway Pattern
- Punto de entrada único
- Enrutamiento a microservicios
- Autenticación centralizada

### 3.4 Event-Driven Architecture
- Message Broker (RabbitMQ/Kafka)
- Eventos: `ReservaCreada`, `PagoProcesado`, `NotificacionEnviada`
- Desacoplamiento entre servicios

### 3.5 Repository Pattern
- Abstracción de acceso a datos
- Facilita testing y cambio de BD

### 3.6 Circuit Breaker Pattern
- Protección contra fallos en cascada
- Implementado con Hystrix o similar

---

## 4. Principios SOLID Aplicados

### S - Single Responsibility Principle (SRP)
Cada microservicio tiene una única responsabilidad:
- `ReservasService`: Solo gestiona reservas
- `PagosService`: Solo procesa pagos
- `NotificacionesService`: Solo envía notificaciones

**Ejemplo en código:**
```javascript
// ❌ Violación SRP
class ReservaService {
  crearReserva() { /* ... */ }
  procesarPago() { /* ... */ }  // No debería estar aquí
  enviarEmail() { /* ... */ }    // No debería estar aquí
}

// ✅ Cumple SRP
class ReservaService {
  crearReserva() { /* ... */ }
  cancelarReserva() { /* ... */ }
  consultarDisponibilidad() { /* ... */ }
}
```

### O - Open/Closed Principle (OCP)
Los servicios están abiertos para extensión pero cerrados para modificación:

```javascript
// Interfaz base
class PaymentProcessor {
  processPayment(amount) {
    throw new Error('Must implement processPayment');
  }
}

// Extensiones sin modificar la base
class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount) { /* ... */ }
}

class PayPalProcessor extends PaymentProcessor {
  processPayment(amount) { /* ... */ }
}
```

### L - Liskov Substitution Principle (LSP)
Las implementaciones pueden sustituirse sin romper el contrato:

```javascript
// Cualquier implementación de PaymentProcessor debe funcionar igual
function procesarPago(processor, amount) {
  return processor.processPayment(amount); // Funciona con cualquier implementación
}
```

### I - Interface Segregation Principle (ISP)
Interfaces específicas y pequeñas:

```javascript
// ❌ Interfaz grande
interface IUserService {
  login();
  logout();
  createReservation();
  cancelReservation();
  processPayment();
}

// ✅ Interfaces segregadas
interface IAuthService {
  login();
  logout();
}

interface IReservationService {
  createReservation();
  cancelReservation();
}
```

### D - Dependency Inversion Principle (DIP)
Dependencia de abstracciones, no de implementaciones:

```javascript
// ❌ Dependencia directa
class ReservaController {
  constructor() {
    this.reservaService = new ReservaService(); // Dependencia concreta
  }
}

// ✅ Dependencia de abstracción
class ReservaController {
  constructor(reservaService) { // Inyección de dependencia
    this.reservaService = reservaService;
  }
}
```

---

## 5. Atributos de Calidad

### 5.1 Rendimiento
- **Objetivo**: Tiempo de respuesta < 200ms para 95% de las peticiones
- **Estrategias**:
  - Caché con Redis para consultas frecuentes
  - CDN para assets estáticos del frontend
  - Lazy loading en React
  - Paginación en listados
  - Índices optimizados en BD

### 5.2 Escalabilidad
- **Objetivo**: Soportar 10,000 usuarios concurrentes
- **Estrategias**:
  - Escalado horizontal de microservicios (Kubernetes)
  - Load balancing en API Gateway
  - Base de datos con réplicas de lectura
  - Message broker distribuido

### 5.3 Disponibilidad
- **Objetivo**: 99.9% uptime (8.76 horas de downtime/año)
- **Estrategias**:
  - Redundancia de servicios (mínimo 2 instancias)
  - Health checks automáticos
  - Failover automático
  - Circuit breakers

### 5.4 Mantenibilidad
- **Objetivo**: Código modular y documentado
- **Estrategias**:
  - Separación por microservicios
  - Código documentado (JSDoc)
  - Tests unitarios y de integración
  - CI/CD automatizado

### 5.5 Seguridad
- **Objetivo**: Protección de datos sensibles
- **Estrategias**:
  - Autenticación JWT con refresh tokens
  - HTTPS en todas las comunicaciones
  - Validación de entrada (sanitización)
  - Rate limiting
  - Encriptación de datos sensibles (PCI-DSS para pagos)

### 5.6 Usabilidad
- **Objetivo**: Interfaz intuitiva y rápida
- **Estrategias**:
  - Diseño responsive (mobile-first)
  - Feedback visual inmediato
  - Manejo de errores amigable
  - Notificaciones en tiempo real

---

## 6. Trade-Offs

### 6.1 Microservicios vs Monolito

**Elegido: Microservicios**

**Pros:**
- Escalabilidad independiente por servicio
- Despliegues independientes
- Tecnologías diferentes por servicio
- Aislamiento de fallos

**Contras:**
- Mayor complejidad operativa
- Overhead de comunicación entre servicios
- Necesidad de infraestructura distribuida
- Debugging más complejo

**Justificación**: Para una app de reservas que necesita escalar (especialmente en horarios pico), los microservicios permiten escalar solo el servicio de reservas sin afectar otros. La complejidad se justifica por los beneficios a largo plazo.

### 6.2 Consistencia vs Disponibilidad (CAP Theorem)

**Elegido: Disponibilidad con Consistencia Eventual**

**Pros:**
- Sistema siempre disponible
- Mejor experiencia de usuario
- Resiliente a fallos de red

**Contras:**
- Posible inconsistencia temporal
- Necesidad de mecanismos de reconciliación

**Justificación**: En reservas de restaurantes, es más importante que el sistema esté disponible (aunque con ligera inconsistencia temporal) que tener consistencia perfecta pero sistema caído.

### 6.3 Rendimiento vs Mantenibilidad

**Elegido: Balance (60% Mantenibilidad, 40% Rendimiento)**

**Pros:**
- Código más fácil de mantener
- Facilita incorporación de nuevos desarrolladores
- Menor deuda técnica

**Contras:**
- Posible sobre-ingeniería
- Algunas optimizaciones prematuras evitadas

**Justificación**: Para un proyecto académico y futuro profesional, es mejor tener código mantenible que optimizaciones prematuras que dificulten el mantenimiento.

### 6.4 Seguridad vs Usabilidad

**Elegido: Balance (70% Seguridad, 30% Usabilidad)**

**Pros:**
- Datos protegidos (especialmente pagos)
- Cumplimiento de regulaciones
- Confianza del usuario

**Contras:**
- Proceso de autenticación más largo
- Validaciones más estrictas

**Justificación**: En aplicaciones que manejan pagos, la seguridad es crítica. Se puede mejorar la UX con autenticación social (OAuth) y recordar dispositivos.

---

## 7. Diagrama de Arquitectura Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIOS                                │
│                    (Web, Mobile, Tablet)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT APPLICATION (SPA)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │ Reservas   │  │   Menús    │  │   Pagos    │  │ Perfil   │ │
│  │ Component  │  │ Component  │  │ Component  │  │ Component │ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘ │
│                                                                  │
│  State Management: Redux/Context API                           │
│  Real-time: WebSocket Client                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API + WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Kong)                         │
│  • Autenticación JWT                                            │
│  • Rate Limiting                                                │
│  • Load Balancing                                               │
│  • Request Routing                                               │
└──────────┬──────────┬──────────┬──────────┬──────────┬─────────┘
           │          │          │          │          │
    ┌──────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐
    │ Reservas │ │ Menús  │ │ Pagos  │ │ Auth  │ │ Notif. │
    │ Service  │ │Service │ │Service │ │Service │ │Service │
    └──────┬───┘ └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘
           │          │          │          │          │
    ┌──────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐ ┌───▼────┐
    │PostgreSQL│ │ MongoDB│ │Postgres│ │Postgres│ │ MongoDB│
    │(Reservas)│ │ (Menús)│ │(Pagos) │ │(Users) │ │(Logs)  │
    └──────────┘ └────────┘ └────────┘ └────────┘ └────────┘
           │          │          │          │          │
           └──────────┴──────────┴──────────┴──────────┘
                             │
                    ┌────────▼────────┐
                    │  Message Broker │
                    │  (RabbitMQ)     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Redis Cache   │
                    │  (Sessions,     │
                    │   Hot Data)     │
                    └─────────────────┘
```

---

## 8. Justificación de la Arquitectura (Máx 300 palabras)

Se ha elegido una arquitectura híbrida de **microservicios con N-Tier y Event-Driven** para el sistema de reservas de restaurantes. Esta combinación optimiza escalabilidad, mantenibilidad y resiliencia.

Los **microservicios** permiten escalar independientemente cada funcionalidad crítica. El servicio de reservas puede manejar picos de tráfico sin afectar menús o pagos. Cada servicio implementa **N-Tier** (Controller-Service-Repository), garantizando separación de responsabilidades y facilitando testing.

El patrón **Event-Driven** desacopla servicios mediante un message broker. Cuando se crea una reserva, se publica un evento que dispara notificaciones y actualizaciones de inventario sin acoplamiento directo.

**Principios SOLID** se aplican en cada capa: servicios con responsabilidad única (SRP), extensibles sin modificación (OCP), y dependencias invertidas (DIP) mediante inyección.

**Atributos de calidad priorizados**: escalabilidad horizontal (10,000 usuarios concurrentes), disponibilidad 99.9% mediante redundancia, y rendimiento <200ms con caché Redis. La seguridad se garantiza con JWT, HTTPS y validación estricta.

**Trade-offs**: Se prioriza disponibilidad sobre consistencia estricta (CAP), aceptando consistencia eventual. La complejidad operativa de microservicios se justifica por la escalabilidad y mantenibilidad a largo plazo.

Esta arquitectura soporta crecimiento futuro, permite tecnologías heterogéneas por servicio, y facilita despliegues independientes sin downtime.

---

## 9. Stack Tecnológico

### Frontend
- React 18+
- Redux Toolkit / Context API
- React Router
- Axios
- Socket.io-client
- Material-UI / Tailwind CSS

### Backend
- Node.js + Express
- TypeScript
- JWT (jsonwebtoken)
- Bcrypt
- Validator.js

### Bases de Datos
- PostgreSQL (reservas, pagos, usuarios)
- MongoDB (menús, logs)
- Redis (caché, sesiones)

### Infraestructura
- Docker + Docker Compose
- Kubernetes (producción)
- Nginx / Kong (API Gateway)
- RabbitMQ (Message Broker)

### DevOps
- GitHub Actions (CI/CD)
- Jest (testing)
- ESLint + Prettier
- SonarQube (calidad de código)

---

## 10. Flujo de una Reserva

1. Usuario selecciona restaurante y fecha/hora en React
2. Frontend consulta disponibilidad vía API Gateway → Reservas Service
3. Reservas Service valida disponibilidad (consulta Redis cache)
4. Usuario confirma reserva
5. Reservas Service crea reserva en PostgreSQL
6. Publica evento `ReservaCreada` en RabbitMQ
7. Notificaciones Service consume evento y envía email/SMS
8. Menús Service actualiza disponibilidad de mesas
9. Frontend recibe confirmación vía WebSocket
10. Usuario puede realizar pago (opcional) → Pagos Service

---

## 11. Consideraciones de Seguridad

- Autenticación JWT con refresh tokens
- HTTPS obligatorio
- Rate limiting por IP/usuario
- Validación y sanitización de inputs
- Encriptación de datos sensibles (PCI-DSS)
- Logs de auditoría
- CORS configurado correctamente
- Headers de seguridad (Helmet.js)

---

## 12. Métricas y Monitoreo

- Latencia de peticiones (Prometheus)
- Tasa de error (Grafana)
- Uptime de servicios (Health checks)
- Throughput (requests/segundo)
- Uso de recursos (CPU, RAM, disco)
- Logs centralizados (ELK Stack)

---

**Autor**: [Tu Nombre]  
**Fecha**: 2024  
**Proyecto**: Sistema de Reservas de Restaurantes - Trabajo Final

