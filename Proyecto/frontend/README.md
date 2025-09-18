# Frontend - Conferencia Bases de Datos Oracle

Este es el frontend de la aplicación desarrollado con **Bootstrap v5.3** y JavaScript vanilla.

## 🚀 Características

- **Responsive Design** con Bootstrap v5.3
- **Sidebar Navigation** para fácil navegación entre vistas
- **Integración completa** con todos los endpoints del backend
- **Interfaz moderna** con iconos Bootstrap
- **Formularios interactivos** para gestión de datos
- **Tablas responsivas** para visualización de datos
- **Alertas dinámicas** para feedback del usuario

## 📋 Vistas Implementadas

### 🏠 **Dashboard Principal**
- Mensaje de bienvenida desde el API
- Resumen del sistema

### 🔗 **Prueba de Conexión**
- Botón para probar conexión con Oracle Cloud
- Indicador visual del estado de conexión

### 📊 **Gestión de Exámenes**
- **Calificaciones**: Tabla con todas las calificaciones de estudiantes
- **Aprobados**: Lista de estudiantes aprobados
- **Estadísticas**: Conteo de evaluaciones por tipo
- **Preguntas**: Preguntas con más aciertos

### 🏢 **Gestión Administrativa**
- **Departamentos**: Formulario para agregar nuevos departamentos
- **Escuelas**: Formulario para actualizar información de escuelas

## 🛠️ Instalación y Uso

### Prerrequisitos
- Servidor backend ejecutándose en `http://127.0.0.1:3000`
- Navegador web moderno

### Instalación
1. No requiere instalación adicional
2. Simplemente abrir `index.html` en un navegador web
3. O servir desde un servidor web local

### Servidor web local (opcional)
Para evitar problemas de CORS, puedes usar un servidor web local:

```bash
# Con Python
python -m http.server 8080

# Con Node.js (http-server)
npx http-server -p 8080

# Con PHP
php -S localhost:8080
```

Luego visitar: `http://localhost:8080`

## 📁 Estructura de Archivos

```
frontend/
├── index.html          # Página principal con todas las vistas
├── css/
│   └── style.css      # Estilos personalizados
└── js/
    └── app.js         # Lógica de la aplicación
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **Bootstrap v5.3**: Framework CSS
- **Bootstrap Icons**: Iconografía
- **JavaScript ES6+**: Funcionalidad interactiva
- **Fetch API**: Comunicación con backend
- **CSS3**: Estilos personalizados

## 🔧 Configuración

### API Endpoint
El frontend está configurado para conectarse al backend en:
```javascript
const API_BASE_URL = 'http://127.0.0.1:3000';
```

Para cambiar la URL, editar la variable en `js/app.js`.

## 📱 Funcionalidades

### Navegación
- **Sidebar responsivo** que se colapsa en dispositivos móviles
- **Navegación por pestañas** entre diferentes vistas
- **Indicador visual** de la vista activa

### Datos en Tiempo Real
- **Actualización automática** al cambiar de vista
- **Botón de actualizar** para refrescar datos manualmente
- **Indicadores de carga** durante las peticiones API

### Formularios
- **Validación HTML5** en todos los formularios
- **Feedback inmediato** con alertas de éxito/error
- **Reset automático** después de operaciones exitosas

### Tablas
- **Diseño responsivo** para todos los tamaños de pantalla
- **Badges coloridos** para estados y resultados
- **Scroll horizontal** en tablas grandes

## 🎯 Endpoints Integrados

| Endpoint | Método | Vista | Descripción |
|----------|--------|-------|-------------|
| `/` | GET | Dashboard | Mensaje de bienvenida |
| `/api/dual` | GET | Conexión | Prueba de conexión Oracle |
| `/api/test/grades` | GET | Calificaciones | Lista de calificaciones |
| `/api/test/aproved` | GET | Aprobados | Estudiantes aprobados |
| `/api/test/count` | GET | Estadísticas | Conteo de evaluaciones |
| `/api/test/questions` | GET | Preguntas | Preguntas con más aciertos |
| `/api/department/insert` | POST | Departamentos | Agregar departamento |
| `/api/school/{id}` | PUT | Escuelas | Actualizar escuela |

## 🚨 Manejo de Errores

- **Alertas automáticas** para errores de API
- **Mensajes descriptivos** para diferentes tipos de error
- **Fallbacks visuales** cuando no hay datos
- **Timeout automático** de alertas

## 🎨 Personalización

### Colores y Temas
Los colores principales se pueden modificar en `css/style.css`:

```css
/* Personalizar colores principales */
:root {
    --primary-color: #0d6efd;
    --sidebar-bg: #343a40;
    --success-color: #198754;
    --danger-color: #dc3545;
}
```

### Responsive Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🔍 Debugging

Para debug, abrir las **Developer Tools** del navegador:
- **Console**: Ver logs de JavaScript
- **Network**: Monitorear peticiones API
- **Elements**: Inspeccionar estructura HTML

---

**Desarrollado para la Conferencia de Bases de Datos Oracle 2025**