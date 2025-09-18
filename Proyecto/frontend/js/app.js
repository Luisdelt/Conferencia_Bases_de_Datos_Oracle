// Oracle Conference Dashboard - JavaScript functionality

// API Base URL
const API_BASE_URL = 'http://127.0.0.1:3000';

// Current view state
let currentView = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load welcome message from API
    loadWelcomeMessage();
    
    // Setup form event listeners
    setupFormListeners();
    
    // Show default view
    showView('home');
}

// Navigation functions
function showView(viewName) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.add('d-none'));
    
    // Show selected view
    const targetView = document.getElementById(viewName + 'View');
    if (targetView) {
        targetView.classList.remove('d-none');
    }
    
    // Update page title
    updatePageTitle(viewName);
    
    // Update active nav link
    updateActiveNavLink(viewName);
    
    // Load data for the view
    loadViewData(viewName);
    
    currentView = viewName;
}

function updatePageTitle(viewName) {
    const titles = {
        'home': 'Dashboard - Inicio',
        'connection': 'Prueba de Conexión Oracle',
        'grades': 'Calificaciones de Estudiantes',
        'approved': 'Estudiantes Aprobados',
        'count': 'Estadísticas de Evaluaciones',
        'questions': 'Preguntas con Más Aciertos',
        'departments': 'Gestión de Departamentos',
        'schools': 'Gestión de Escuelas'
    };
    
    document.getElementById('pageTitle').textContent = titles[viewName] || 'Dashboard';
}

function updateActiveNavLink(viewName) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current nav link
    const activeLink = document.querySelector(`[onclick="showView('${viewName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function loadViewData(viewName) {
    switch(viewName) {
        case 'grades':
            loadGrades();
            break;
        case 'approved':
            loadApprovedStudents();
            break;
        case 'count':
            loadEvaluationCount();
            break;
        case 'questions':
            loadQuestions();
            break;
    }
}

// API calling functions
async function makeApiCall(endpoint, method = 'GET', data = null) {
    showLoading(true);
    
    try {
        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        if (data && method !== 'GET') {
            config.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        showLoading(false);
        return result;
        
    } catch (error) {
        showLoading(false);
        console.error('API call error:', error);
        showAlert('Error al conectar con la API: ' + error.message, 'danger');
        throw error;
    }
}

// Load welcome message
async function loadWelcomeMessage() {
    try {
        const data = await makeApiCall('/');
        document.getElementById('welcomeMessage').innerHTML = `
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i> ${data.message}
            </div>
        `;
    } catch (error) {
        document.getElementById('welcomeMessage').innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle"></i> No se pudo conectar con el backend
            </div>
        `;
    }
}

// Test Oracle connection
async function testConnection() {
    try {
        const data = await makeApiCall('/api/dual');
        document.getElementById('connectionResult').innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle status-indicator online"></i>
                <strong>Conexión exitosa!</strong><br>
                ${data.saludo}
            </div>
        `;
    } catch (error) {
        document.getElementById('connectionResult').innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-x-circle status-indicator offline"></i>
                <strong>Error de conexión:</strong><br>
                ${error.message}
            </div>
        `;
    }
}

// Load grades data
async function loadGrades() {
    try {
        const data = await makeApiCall('/api/test/grades');
        const tbody = document.getElementById('gradesTableBody');
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay datos disponibles</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item.id_registro}</td>
                <td>${item.nombre_completo}</td>
                <td>${item.genero}</td>
                <td>${item.tipo_licencia}</td>
                <td>${item.tipo_tramite}</td>
                <td><span class="badge bg-info">${item.resultado_teorico}</span></td>
                <td><span class="badge bg-info">${item.resultado_practico}</span></td>
                <td>
                    <span class="badge ${item.resultado === 'Aprobado' ? 'bg-success' : 'bg-danger'}">
                        ${item.resultado}
                    </span>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        document.getElementById('gradesTableBody').innerHTML = 
            '<tr><td colspan="8" class="text-center text-danger">Error al cargar los datos</td></tr>';
    }
}

// Load approved students
async function loadApprovedStudents() {
    try {
        const data = await makeApiCall('/api/test/aproved');
        const tbody = document.getElementById('approvedTableBody');
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay datos disponibles</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${new Date(item.fecha).toLocaleDateString()}</td>
                <td>${item.id_registro}</td>
                <td>${item.nombre_completo}</td>
                <td>${item.genero}</td>
                <td>${item.tipo_licencia}</td>
                <td><span class="badge bg-success">${item.resultado_teorico}</span></td>
                <td><span class="badge bg-success">${item.resultado_practico}</span></td>
            </tr>
        `).join('');
        
    } catch (error) {
        document.getElementById('approvedTableBody').innerHTML = 
            '<tr><td colspan="7" class="text-center text-danger">Error al cargar los datos</td></tr>';
    }
}

// Load evaluation count
async function loadEvaluationCount() {
    try {
        const data = await makeApiCall('/api/test/count');
        const tbody = document.getElementById('countTableBody');
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="text-center">No hay datos disponibles</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item.tipo_tramite}</td>
                <td>${item.tipo_licencia}</td>
                <td><span class="badge bg-primary">${item.numero_evaluaciones}</span></td>
            </tr>
        `).join('');
        
    } catch (error) {
        document.getElementById('countTableBody').innerHTML = 
            '<tr><td colspan="3" class="text-center text-danger">Error al cargar los datos</td></tr>';
    }
}

// Load questions with most correct answers
async function loadQuestions() {
    try {
        const data = await makeApiCall('/api/test/questions');
        const tbody = document.getElementById('questionsTableBody');
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="text-center">No hay datos disponibles</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item.id_pregunta}</td>
                <td class="text-wrap" style="max-width: 400px;">${item.texto}</td>
                <td><span class="badge bg-warning text-dark">${item.aciertos}</span></td>
            </tr>
        `).join('');
        
    } catch (error) {
        document.getElementById('questionsTableBody').innerHTML = 
            '<tr><td colspan="3" class="text-center text-danger">Error al cargar los datos</td></tr>';
    }
}

// Form management
function setupFormListeners() {
    // Department form
    const departmentForm = document.getElementById('departmentForm');
    if (departmentForm) {
        departmentForm.addEventListener('submit', handleDepartmentSubmit);
    }
    
    // School form
    const schoolForm = document.getElementById('schoolForm');
    if (schoolForm) {
        schoolForm.addEventListener('submit', handleSchoolSubmit);
    }
}

async function handleDepartmentSubmit(event) {
    event.preventDefault();
    
    const formData = {
        id_departamento: parseInt(document.getElementById('departmentId').value),
        nombre: document.getElementById('departmentName').value,
        codigo: document.getElementById('departmentCode').value
    };
    
    try {
        await makeApiCall('/api/department/insert', 'POST', formData);
        showAlert('Departamento agregado exitosamente', 'success');
        
        // Reset form
        document.getElementById('departmentForm').reset();
        
    } catch (error) {
        showAlert('Error al agregar departamento: ' + error.message, 'danger');
    }
}

async function handleSchoolSubmit(event) {
    event.preventDefault();
    
    const schoolId = document.getElementById('schoolId').value;
    const updateData = {};
    
    // Only include fields that have values
    const name = document.getElementById('schoolName').value;
    const address = document.getElementById('schoolAddress').value;
    const phone = document.getElementById('schoolPhone').value;
    
    if (name) updateData.nombre = name;
    if (address) updateData.direccion = address;
    if (phone) updateData.telefono = phone;
    
    if (Object.keys(updateData).length === 0) {
        showAlert('Debe proporcionar al menos un campo para actualizar', 'warning');
        return;
    }
    
    try {
        await makeApiCall(`/api/school/${schoolId}`, 'PUT', updateData);
        showAlert('Escuela actualizada exitosamente', 'success');
        
        // Reset form
        document.getElementById('schoolForm').reset();
        
    } catch (error) {
        showAlert('Error al actualizar escuela: ' + error.message, 'danger');
    }
}

// Utility functions
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="bi bi-${getAlertIcon(type)}"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    alertContainer.innerHTML = alertHtml;
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle',
        'danger': 'exclamation-triangle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function refreshData() {
    loadViewData(currentView);
    if (currentView === 'home') {
        loadWelcomeMessage();
    }
    showAlert('Datos actualizados', 'info');
}

// Export functions for global access
window.showView = showView;
window.testConnection = testConnection;
window.refreshData = refreshData;