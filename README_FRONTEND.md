# Frontend - Sistema de Reservas de Restaurantes

## Estructura del Proyecto

```
frontend/
├── index.html          # Página principal
├── css/
│   ├── main.css        # Variables y estilos base
│   ├── components.css  # Componentes reutilizables
│   ├── layout.css      # Estructura y layout
│   └── responsive.css  # Media queries
└── js/
    ├── config.js       # Configuración
    ├── api.js          # Cliente API
    ├── utils.js        # Utilidades
    ├── auth.js         # Autenticación
    ├── reservations.js # Reservas
    ├── menu.js         # Menú
    └── main.js         # Inicialización
```

## Características

### Arquitectura Frontend
- **HTML5 semántico**: Estructura clara y accesible
- **CSS modular**: Separación por responsabilidades
- **JavaScript modular**: Código organizado por funcionalidad
- **BEM Methodology**: Nomenclatura consistente en CSS
- **Responsive Design**: Mobile-first approach

### Mejores Prácticas Implementadas

1. **CSS**
   - Variables CSS para design tokens
   - Metodología BEM para nombres de clases
   - Separación por responsabilidades (main, components, layout, responsive)
   - Mobile-first responsive design

2. **JavaScript**
   - Modularización por funcionalidad
   - Separación de concerns (API, UI, Business Logic)
   - Manejo de errores centralizado
   - Validación de datos

3. **HTML**
   - Estructura semántica
   - Accesibilidad (ARIA labels, focus states)
   - SEO básico (meta tags)

## Uso

### Desarrollo Local

1. Abrir `index.html` en un navegador
2. O usar un servidor local:
```bash
# Con Python
python -m http.server 8080

# Con Node.js (http-server)
npx http-server -p 8080

# Con PHP
php -S localhost:8080
```

3. Acceder a `http://localhost:8080`

### Configuración de API

Editar `js/config.js` para cambiar la URL de la API:

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api',
    // ...
};
```

## Funcionalidades

- ✅ Reserva de mesas
- ✅ Visualización de menú
- ✅ Filtrado por categorías
- ✅ Autenticación de usuarios
- ✅ Gestión de reservas
- ✅ Diseño responsive
- ✅ Validación de formularios
- ✅ Manejo de errores

## Compatibilidad

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## Notas

- El frontend se comunica con los microservicios a través del API Gateway
- Requiere que los servicios backend estén corriendo
- Usa localStorage para guardar tokens de autenticación

