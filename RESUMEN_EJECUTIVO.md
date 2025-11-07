# Resumen Ejecutivo - Sistema de Reservas de Restaurantes

## Justificación de la Arquitectura (300 palabras)

Se ha elegido una arquitectura híbrida de **microservicios con N-Tier y Event-Driven** para el sistema de reservas de restaurantes. Esta combinación optimiza escalabilidad, mantenibilidad y resiliencia.

Los **microservicios** permiten escalar independientemente cada funcionalidad crítica. El servicio de reservas puede manejar picos de tráfico sin afectar menús o pagos. Cada servicio implementa **N-Tier** (Controller-Service-Repository), garantizando separación de responsabilidades y facilitando testing.

El patrón **Event-Driven** desacopla servicios mediante un message broker. Cuando se crea una reserva, se publica un evento que dispara notificaciones y actualizaciones de inventario sin acoplamiento directo.

**Principios SOLID** se aplican en cada capa: servicios con responsabilidad única (SRP), extensibles sin modificación (OCP), y dependencias invertidas (DIP) mediante inyección.

**Atributos de calidad priorizados**: escalabilidad horizontal (10,000 usuarios concurrentes), disponibilidad 99.9% mediante redundancia, y rendimiento <200ms con caché Redis. La seguridad se garantiza con JWT, HTTPS y validación estricta.

**Trade-offs**: Se prioriza disponibilidad sobre consistencia estricta (CAP), aceptando consistencia eventual. La complejidad operativa de microservicios se justifica por la escalabilidad y mantenibilidad a largo plazo.

Esta arquitectura soporta crecimiento futuro, permite tecnologías heterogéneas por servicio, y facilita despliegues independientes sin downtime.

---

## Arquitectura Elegida

**Microservicios + N-Tier + Event-Driven**

## Stack Tecnológico

- **Frontend**: React 18+, Redux Toolkit, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **Bases de Datos**: PostgreSQL, MongoDB, Redis
- **Infraestructura**: Docker, Kubernetes, RabbitMQ

## Microservicios

1. Reservas Service
2. Menús Service
3. Pagos Service
4. Autenticación Service
5. Notificaciones Service

## Principios SOLID Aplicados

✅ Single Responsibility Principle  
✅ Open/Closed Principle  
✅ Liskov Substitution Principle  
✅ Interface Segregation Principle  
✅ Dependency Inversion Principle

## Atributos de Calidad

- **Rendimiento**: <200ms (95% peticiones)
- **Escalabilidad**: 10,000 usuarios concurrentes
- **Disponibilidad**: 99.9% uptime
- **Seguridad**: JWT, HTTPS, validación estricta
- **Mantenibilidad**: Código modular y documentado

## Trade-offs Principales

1. **Microservicios vs Monolito**: Elegido microservicios por escalabilidad
2. **Consistencia vs Disponibilidad**: Elegido disponibilidad (CAP)
3. **Rendimiento vs Mantenibilidad**: Balance 60/40

---

**Autor**: [Tu Nombre]  
**Fecha**: 2024  
**Proyecto**: Trabajo Final - Arquitectura de Software

