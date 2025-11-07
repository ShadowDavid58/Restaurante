# 📊 Datos Estructurados para Trade-offs

## Trade-off 1: Microservicios vs Monolito

### Datos para Gráfico de Barras

**Eje X:** Criterios
**Eje Y:** Puntuación (1-5)
**Series:** Monolito (Azul) | Microservicios (Rojo)

| Criterio | Monolito | Microservicios |
|----------|----------|----------------|
| Escalabilidad | 2 | 5 |
| Complejidad | 5 | 2 |
| Costo Inicial | 5 | 2 |
| Mantenibilidad | 3 | 5 |
| Despliegue | 2 | 5 |

### Datos para Gráfico Radar

**Categorías:** Escalabilidad, Complejidad, Costo, Mantenibilidad, Despliegue
**Monolito:** [2, 5, 5, 3, 2]
**Microservicios:** [5, 2, 2, 5, 5]

---

## Trade-off 2: Consistencia vs Disponibilidad (CAP)

### Datos para Gráfico de Barras

| Opción | Consistencia | Disponibilidad |
|--------|--------------|----------------|
| Consistencia Estricta | 5 | 2 |
| Disponibilidad | 2 | 5 |
| Balance | 3 | 3 |

### Visualización Sugerida: Diagrama de Venn

```
        ┌─────────────────┐
        │  Consistencia   │
        │      (5)        │
        └────────┬────────┘
                 │
        ┌────────┴────────┐
        │   ELEGIDO:      │
        │ Disponibilidad  │
        │      (5)        │
        └─────────────────┘
```

---

## Trade-off 3: Rendimiento vs Mantenibilidad

### Datos para Gráfico de Barras

| Enfoque | Rendimiento | Mantenibilidad |
|---------|-------------|----------------|
| Solo Rendimiento | 5 | 2 |
| Solo Mantenibilidad | 2 | 5 |
| Balance 60/40 | 3 | 4 |

### Visualización Sugerida: Gráfico de Torta

**Balance Elegido:**
- Mantenibilidad: 60%
- Rendimiento: 40%

---

## Trade-off 4: Seguridad vs Usabilidad

### Datos para Gráfico de Barras

| Enfoque | Seguridad | Usabilidad |
|---------|-----------|------------|
| Solo Seguridad | 5 | 2 |
| Solo Usabilidad | 2 | 5 |
| Balance 70/30 | 4 | 3 |

---

## Datos para Tabla Comparativa Completa

### Todos los Trade-offs en una Tabla

| Trade-off | Opción 1 | Opción 2 | Elegido | Justificación |
|-----------|----------|----------|---------|---------------|
| Arquitectura | Monolito | Microservicios | Microservicios | Escalabilidad |
| CAP Theorem | Consistencia | Disponibilidad | Disponibilidad | Resiliencia |
| Desarrollo | Rendimiento | Mantenibilidad | Balance 60/40 | Código limpio |
| UX | Seguridad | Usabilidad | Balance 70/30 | Protección datos |

---

## Valores para Gráficos en Excel/PowerPoint

### Para Gráfico de Barras Agrupadas

**Serie 1: Monolito**
```
Escalabilidad: 2
Complejidad: 5
Costo: 5
Mantenibilidad: 3
Despliegue: 2
```

**Serie 2: Microservicios**
```
Escalabilidad: 5
Complejidad: 2
Costo: 2
Mantenibilidad: 5
Despliegue: 5
```

### Para Gráfico Radar

**Monolito:**
- Escalabilidad: 2
- Complejidad: 5
- Costo: 5
- Mantenibilidad: 3
- Despliegue: 2

**Microservicios:**
- Escalabilidad: 5
- Complejidad: 2
- Costo: 2
- Mantenibilidad: 5
- Despliegue: 5

---

## Código de Colores Sugerido

- **Verde (#28a745)**: Ventajas / Elegido
- **Rojo (#dc3545)**: Desventajas / No elegido
- **Azul (#0d6efd)**: Neutral / Información
- **Amarillo (#ffc107)**: Advertencia / Consideración

---

## Texto para Justificaciones

### Trade-off 1: Microservicios vs Monolito
```
Para una app de reservas que necesita escalar en horarios pico,
los microservicios permiten escalar solo el servicio de reservas
sin afectar otros. La complejidad se justifica por los beneficios
a largo plazo en escalabilidad y mantenibilidad.
```

### Trade-off 2: Consistencia vs Disponibilidad
```
En reservas de restaurantes, es más importante que el sistema
esté disponible (aunque con ligera inconsistencia temporal) que
tener consistencia perfecta pero sistema caído. Los usuarios
prefieren poder hacer reservas aunque haya un pequeño retraso
en la sincronización.
```

### Trade-off 3: Rendimiento vs Mantenibilidad
```
Para un proyecto académico y futuro profesional, es mejor tener
código mantenible que optimizaciones prematuras. El balance 60/40
favorece mantenibilidad porque facilita la incorporación de nuevos
desarrolladores y reduce la deuda técnica.
```

---

## Formato para Copiar en PowerPoint/Excel

### Tabla 1: Microservicios vs Monolito

```
Criterio	Monolito	Microservicios
Escalabilidad	2	5
Complejidad	5	2
Costo Inicial	5	2
Mantenibilidad	3	5
Despliegue	2	5
```

### Tabla 2: CAP Theorem

```
Opción	Consistencia	Disponibilidad
Consistencia Estricta	5	2
Disponibilidad	2	5
Balance	3	3
```

---

¡Usa estos datos para crear tus gráficos! 📊

