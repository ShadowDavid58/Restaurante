# Diagramas del Sistema de Reservas de Restaurantes

## 1. Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENTES                                    │
│              (Web Browser, Mobile App, Tablet)                     │
└────────────────────────────┬───────────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    REACT APPLICATION (SPA)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │  Reservas    │  │    Menús     │  │    Pagos     │            │
│  │  Component   │  │  Component   │  │  Component   │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│  ┌──────────────┐  ┌──────────────┐                              │
│  │   Perfil     │  │  Dashboard   │                              │
│  │  Component   │  │  Component   │                              │
│  └──────────────┘  └──────────────┘                              │
│                                                                     │
│  State: Redux Store                                                │
│  Real-time: WebSocket Client                                       │
└────────────────────────────┬───────────────────────────────────────┘
                             │ REST API + WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Kong/Nginx)                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  • Autenticación JWT                                         │  │
│  │  • Rate Limiting (100 req/min por usuario)                  │  │
│  │  • Load Balancing (Round Robin)                              │  │
│  │  • Request Routing                                           │  │
│  │  • CORS Management                                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
└──────────┬──────────┬──────────┬──────────┬──────────┬─────────────┘
           │          │          │          │          │
    ┌──────▼─────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐
    │  Reservas  │ │  Menús  │ │  Pagos  │ │  Auth   │ │ Notif. │
    │  Service   │ │ Service │ │ Service │ │ Service │ │ Service│
    │            │ │         │ │         │ │         │ │        │
    │ ┌────────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌─────┐│
    │ │Controller│ │ │Controller│ │ │Controller│ │ │Controller│ │ │Controller│
    │ └────────┘│ │ └──────┘│ │ └──────┘│ │ └──────┘│ │ └─────┘│
    │ ┌────────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌─────┐│
    │ │ Service│ │ │ Service│ │ │ Service│ │ │ Service│ │ │ Service│
    │ └────────┘│ │ └──────┘│ │ └──────┘│ │ └──────┘│ │ └─────┘│
    │ ┌────────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌──────┐│ │ ┌─────┐│
    │ │Repository│ │ │Repository│ │ │Repository│ │ │Repository│ │ │Repository│
    │ └────────┘│ │ └──────┘│ │ └──────┘│ │ └──────┘│ │ └─────┘│
    └──────┬─────┘ └───┬──────┘ └───┬──────┘ └───┬──────┘ └───┬──────┘
           │          │          │          │          │
    ┌──────▼─────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐
    │ PostgreSQL │ │ MongoDB │ │PostgreSQL│ │PostgreSQL│ │ MongoDB │
    │ (Reservas) │ │ (Menús) │ │ (Pagos) │ │ (Users) │ │ (Logs) │
    └────────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
           │          │          │          │          │
           └──────────┴──────────┴──────────┴──────────┘
                             │
                    ┌────────▼────────┐
                    │  Message Broker │
                    │   (RabbitMQ)    │
                    │                 │
                    │  • ReservaCreada│
                    │  • PagoProcesado│
                    │  • NotifEnviada │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Redis Cache   │
                    │                 │
                    │  • Sessions     │
                    │  • Hot Data     │
                    │  • Rate Limits  │
                    └─────────────────┘
```

## 2. Diagrama de Flujo de una Reserva

```
Usuario                    Frontend              API Gateway        Reservas Service      RabbitMQ      Notif Service
  │                           │                      │                    │                  │              │
  │─── Selecciona restaurante │                      │                    │                  │              │
  │<──────────────────────────┘                      │                    │                  │              │
  │                           │                      │                    │                  │              │
  │─── Consulta disponibilidad│                      │                    │                  │              │
  │                           │─── GET /reservas/available ──────────────>│                  │              │
  │                           │                      │                    │─── Query Redis ──>│              │
  │                           │                      │                    │<── Cache Hit ────│              │
  │                           │<─── 200 OK ──────────│<─── 200 OK ────────│                  │              │
  │<─── Muestra disponibilidad│                      │                    │                  │              │
  │                           │                      │                    │                  │              │
  │─── Confirma reserva       │                      │                    │                  │              │
  │                           │─── POST /reservas ────>                    │                  │              │
  │                           │                      │─── POST /reservas ─>│                  │              │
  │                           │                      │                    │─── Save to DB ───>│              │
  │                           │                      │                    │<─── Success ─────│              │
  │                           │                      │                    │─── Publish Event ────────────────>│
  │                           │                      │                    │                  │              │
  │                           │<─── 201 Created ─────│<─── 201 Created ────│                  │              │
  │<─── Reserva confirmada    │                      │                    │                  │              │
  │                           │                      │                    │                  │              │
  │                           │                      │                    │                  │─── Consume Event
  │                           │                      │                    │                  │─── Send Email
  │                           │                      │                    │                  │<─── Email Sent
  │<─── Email de confirmación │                      │                    │                  │              │
```

## 3. Diagrama de Componentes (Frontend React)

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Redux Store (State Management)             │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │ Reservas │  │  Menús    │  │  Auth    │            │ │
│  │  │  Slice   │  │  Slice    │  │  Slice   │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Pages (Route Components)                    │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │ HomePage │  │ Reservas  │  │  Menús    │            │ │
│  │  │          │  │   Page   │  │   Page   │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Components (Reusable)                       │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │ Reserva  │  │  Menu    │  │  Payment │            │ │
│  │  │  Card    │  │  Card    │  │  Form    │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Services (API Clients)                      │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │ Reservas │  │  Menús   │  │  Auth    │            │ │
│  │  │  API     │  │   API    │  │   API    │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              WebSocket Client                            │ │
│  │  • Real-time updates                                     │ │
│  │  • Notifications                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

## 4. Diagrama de Secuencia: Proceso de Pago

```
Usuario    Frontend    API Gateway    Pagos Service    Payment Gateway    RabbitMQ    Notif Service
  │           │             │              │                 │              │              │
  │─── Click "Pagar"       │              │                 │              │              │
  │           │─── POST /pagos ────────────>│                 │              │              │
  │           │             │              │                 │              │              │
  │           │             │─── POST /pagos ───────────────>│                 │              │
  │           │             │              │                 │              │              │
  │           │             │              │─── Validate Payment Data ────────>│              │
  │           │             │              │                 │              │              │
  │           │             │              │<─── Payment Token ────────────────│              │
  │           │             │              │                 │              │              │
  │           │             │              │─── Process Payment ───────────────>│              │
  │           │             │              │                 │              │              │
  │           │             │              │<─── Payment Success ──────────────│              │
  │           │             │              │                 │              │              │
  │           │             │              │─── Save to DB                    │              │
  │           │             │              │                 │              │              │
  │           │             │              │─── Publish Event ───────────────────────────────>│
  │           │             │              │                 │              │              │
  │           │             │<─── 200 OK ──│                 │              │              │
  │           │<─── 200 OK ─│              │                 │              │              │
  │<─── Payment Success    │              │                 │              │              │
  │           │             │              │                 │              │              │
  │           │             │              │                 │              │─── Consume Event
  │           │             │              │                 │              │─── Send Receipt
  │           │             │              │                 │              │<─── Email Sent
  │<─── Email Receipt      │              │                 │              │              │
```

## 5. Diagrama de Despliegue

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└────────────────────────────┬────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Load Balancer   │
                    │     (Nginx)       │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│  Frontend Pod  │   │  Frontend Pod    │   │  Frontend Pod  │
│  (React)       │   │  (React)        │   │  (React)       │
│  Replicas: 3   │   │  Replicas: 3    │   │  Replicas: 3   │
└───────┬────────┘   └────────┬────────┘   └───────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   API Gateway     │
                    │   (Kong)          │
                    │   Replicas: 2     │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│ Reservas Pod   │   │  Menús Pod      │   │  Pagos Pod     │
│ Replicas: 2    │   │  Replicas: 2    │   │  Replicas: 2   │
└───────┬────────┘   └────────┬────────┘   └───────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌───────▼────────┐
│ PostgreSQL    │   │  MongoDB        │   │  RabbitMQ     │
│ Master-Slave  │   │  Replica Set     │   │  Cluster      │
│ Replicas: 2   │   │  Replicas: 3    │   │  Replicas: 3  │
└───────────────┘   └─────────────────┘   └───────────────┘
```

## 6. Diagrama de Base de Datos (PostgreSQL - Reservas)

```
┌─────────────────┐
│    usuarios      │
├─────────────────┤
│ id (PK)         │
│ email           │
│ nombre          │
│ telefono        │
│ password_hash   │
│ created_at      │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│   reservas      │
├─────────────────┤
│ id (PK)         │
│ usuario_id (FK) │
│ restaurante_id │
│ fecha           │
│ hora            │
│ num_personas    │
│ estado          │
│ created_at      │
└────────┬────────┘
         │
         │ 1:1
         │
┌────────▼────────┐
│    pagos        │
├─────────────────┤
│ id (PK)         │
│ reserva_id (FK) │
│ monto           │
│ metodo          │
│ estado          │
│ transaction_id │
│ created_at      │
└─────────────────┘
```

## 7. Diagrama de Eventos (Event-Driven)

```
┌─────────────────┐
│ Reservas Service│
└────────┬────────┘
         │
         │ Publica
         │
         ▼
┌─────────────────────────────────┐
│      RabbitMQ Exchange          │
│  ┌───────────────────────────┐ │
│  │  reserva.created          │ │
│  │  reserva.cancelled        │ │
│  │  reserva.updated          │ │
│  └───────────────────────────┘ │
└────────┬────────────────────────┘
         │
         │ Consumen
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Notif  │ │ Menús  │ │ Logs   │ │ Analytics│
│Service │ │Service │ │Service │ │Service │
└────────┘ └────────┘ └────────┘ └────────┘
```

## 8. Diagrama de Principios SOLID Aplicados

```
┌─────────────────────────────────────────────────────────┐
│                    SOLID Principles                      │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  S - Single Responsibility Principle              │  │
│  │  Cada microservicio = Una responsabilidad        │  │
│  │  ReservasService → Solo reservas                  │  │
│  │  PagosService → Solo pagos                       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  O - Open/Closed Principle                        │  │
│  │  PaymentProcessor (base)                         │  │
│  │    ├── CreditCardProcessor (extiende)           │  │
│  │    └── PayPalProcessor (extiende)              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  L - Liskov Substitution Principle                │  │
│  │  Cualquier PaymentProcessor puede usarse          │  │
│  │  sin romper el contrato                           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  I - Interface Segregation Principle              │  │
│  │  IAuthService (login, logout)                    │  │
│  │  IReservationService (create, cancel)             │  │
│  │  No una interfaz grande con todo                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  D - Dependency Inversion Principle               │  │
│  │  Controller depende de IReservaService            │  │
│  │  No de ReservaServiceImpl directamente            │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

**Nota**: Estos diagramas están en formato texto/ASCII. Para presentaciones, se recomienda convertirlos a diagramas visuales usando herramientas como:
- Draw.io / diagrams.net
- Lucidchart
- PlantUML
- Mermaid (compatible con Markdown)

