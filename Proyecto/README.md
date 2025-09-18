# Conferencia Bases de Datos Oracle - Proyecto

Este proyecto es una aplicación web desarrollada para la conferencia de bases de datos Oracle, que incluye un backend API REST desarrollado en Flask y un frontend (por implementar).

## 📋 Tabla de Contenidos

- [Backend API](#backend-api)
  - [Configuración](#configuración)
  - [Instalación](#instalación)
  - [Endpoints Disponibles](#endpoints-disponibles)
  - [Formato de Respuestas](#formato-de-respuestas)
  - [Ejecución](#ejecución)
- [Frontend](#frontend)
- [Estructura del Proyecto](#estructura-del-proyecto)

## 🚀 Backend API

### Configuración

El backend está desarrollado en **Flask** y se conecta a una base de datos **Oracle Cloud**.

#### Tecnologías utilizadas:
- Python 3.13+
- Flask 3.1.2
- Oracle Database (oracledb 3.3.0)
- Flask-CORS para manejo de CORS

### Instalación

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar las dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar la conexión a Oracle Cloud en `config_cloud.py`

### Endpoints Disponibles

El servidor se ejecuta en: `http://127.0.0.1:3000`

#### 🏠 General
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Página de bienvenida al backend |

#### 🔗 Conexión y Pruebas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/dual` | Prueba de conexión con Oracle Cloud |

#### 📊 Gestión de Exámenes y Calificaciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/test/grades` | Obtener todas las calificaciones de estudiantes (fecha: 13-03-23) |
| `GET` | `/api/test/aproved` | Obtener estudiantes aprobados (fechas: 12-03-23 a 13-03-23) |
| `GET` | `/api/test/count` | Contar evaluaciones por tipo de trámite y licencia (01-03-23 a 13-03-23) |
| `GET` | `/api/test/questions` | Obtener preguntas con más aciertos (12-03-23 a 13-03-23) |

#### 🏢 Gestión de Departamentos
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `POST` | `/api/department/insert` | Insertar nuevo departamento | `id_departamento`, `nombre`, `codigo` |

#### 🏫 Gestión de Escuelas
| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `PUT` | `/api/school/<int:id_escuela>` | Actualizar datos de una escuela | `id_escuela` (URL), campos a actualizar (JSON) |

### Ejemplos de Uso

#### Obtener calificaciones:
```bash
GET http://127.0.0.1:3000/api/test/grades
```

#### Insertar departamento:
```bash
POST http://127.0.0.1:3000/api/department/insert
Content-Type: application/json

{
  "id_departamento": 1,
  "nombre": "Departamento de Sistemas",
  "codigo": "SIS"
}
```

#### Actualizar escuela:
```bash
PUT http://127.0.0.1:3000/api/school/1
Content-Type: application/json

{
  "nombre": "Nuevo Nombre de Escuela",
  "direccion": "Nueva Dirección"
}
```

### Formato de Respuestas

#### Respuestas exitosas:
```json
// Endpoints de consulta (GET)
[
  {
    "id_registro": 1,
    "nombre_completo": "Juan Pérez",
    "resultado": "Aprobado"
  }
]

// Endpoints de inserción/actualización (POST/PUT)
{
  "message": "Operation completed successfully"
}
```

#### Respuestas de error:
```json
{
  "error": "Error description message"
}
```

### Ejecución

Para ejecutar el backend:

```bash
python app.py
```

El servidor se iniciará en modo desarrollo en `http://127.0.0.1:3000`

## 🎨 Frontend

✅ **Implementado** - Frontend completamente funcional con Bootstrap v5.3

### Tecnologías utilizadas:
- **Bootstrap v5.3** - Framework CSS responsivo
- **JavaScript ES6+** - Funcionalidad interactiva
- **Bootstrap Icons** - Iconografía moderna
- **Fetch API** - Comunicación con backend REST
- **CSS3 Custom** - Estilos personalizados

### Características:
- **Dashboard responsivo** con sidebar de navegación
- **8 vistas principales** para todos los endpoints
- **Formularios interactivos** para gestión de datos
- **Tablas responsivas** con estados visuales
- **Manejo de errores** con alertas dinámicas
- **Actualización en tiempo real** de datos

### Cómo usar:
1. Asegurar que el backend esté ejecutándose en `http://127.0.0.1:3000`
2. Abrir `frontend/index.html` en el navegador
3. Navegar usando el sidebar para acceder a diferentes funcionalidades

## 📁 Estructura del Proyecto

```
Proyecto/
├── README.md
├── backend/
│   ├── app.py                    # Aplicación principal Flask
│   ├── config_cloud.py          # Configuración Oracle Cloud
│   ├── config_docker.py         # Configuración Docker
│   ├── config_xe.py             # Configuración Oracle XE
│   ├── requirements.txt         # Dependencias Python
│   └── recursos/
│       ├── Wallet_BDConferencia.zip
│       └── Wallet_BDConferencia/
│           ├── cwallet.sso
│           ├── ewallet.p12
│           ├── ewallet.pem
│           ├── keystore.jks
│           ├── ojdbc.properties
│           ├── README
│           ├── sqlnet.ora
│           ├── tnsnames.ora
│           └── truststore.jks
└── frontend/
    ├── index.html               # Página principal del dashboard
    ├── README.md               # Documentación del frontend
    ├── css/
    │   └── style.css           # Estilos personalizados
    └── js/
        └── app.js              # Lógica de la aplicación
```

## ⚙️ Configuración de Base de Datos

El proyecto incluye configuraciones para diferentes entornos de Oracle:
- **Oracle Cloud**: `config_cloud.py`
- **Oracle Docker**: `config_docker.py` 
- **Oracle XE**: `config_xe.py`

Los archivos de wallet de Oracle Cloud se encuentran en `backend/recursos/Wallet_BDConferencia/`

## 📝 Notas

- El servidor funciona en modo desarrollo con debug habilitado
- Se recomienda usar un servidor WSGI para producción
- CORS está habilitado para permitir conexiones desde el frontend
- Todas las consultas SQL están optimizadas para Oracle Database

---

**Desarrollado para la Conferencia de Bases de Datos Oracle 2025**