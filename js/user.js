class UsersManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderUsers();
    }

    loadUsers() {
        const saved = localStorage.getItem('gympro_users');
        if (saved) {
            return JSON.parse(saved);
        }

        // Datos de ejemplo
        return [
            {
                id: 1,
                name: 'Lucas Pérez',
                email: 'lucas@gym.com',
                role: 'entrenador',
                phone: '+54 9 11 1234 5678',
                status: 'activo',
                avatar: 'L'
            },
            {
                id: 2,
                name: 'María González',
                email: 'maria@gym.com',
                role: 'alumno',
                phone: '+54 9 11 8765 4321',
                status: 'activo',
                height: '165cm',
                weight: '68kg',
                avatar: 'M'
            },
            {
                id: 3,
                name: 'Juan Rodríguez',
                email: 'juan@gym.com',
                role: 'entrenador',
                phone: '+54 9 11 2468 1357',
                status: 'activo',
                avatar: 'J'
            },
            {
                id: 4,
                name: 'Ana Silva',
                email: 'ana@gym.com',
                role: 'alumno',
                phone: '+54 9 11 9876 5432',
                status: 'activo',
                height: '170cm',
                weight: '62kg',
                avatar: 'A'
            },
            {
                id: 5,
                name: 'Carlos Martínez',
                email: 'carlos@gym.com',
                role: 'alumno',
                phone: '+54 9 11 5555 6666',
                status: 'inactivo',
                height: '180cm',
                weight: '85kg',
                avatar: 'C'
            }
        ];
    }

    saveUsers() {
        localStorage.setItem('gympro_users', JSON.stringify(this.users));
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Botón nuevo usuario
            document.getElementById('newUserBtn')?.addEventListener('click', () => {
                this.openUserModal();
            });

            // Modal events
            document.getElementById('modalClose')?.addEventListener('click', () => {
                this.closeUserModal();
            });

            document.getElementById('modalCancel')?.addEventListener('click', () => {
                this.closeUserModal();
            });

            // Form submit
            document.getElementById('userForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveUser();
            });

            // Búsqueda en tiempo real
            document.querySelector('.search-input')?.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });

            // Filtro por rol/estado
            document.querySelector('.filter-select')?.addEventListener('change', (e) => {
                this.filterUsersByType(e.target.value);
            });
        });
    }

    renderUsers(usersToRender = this.users) {
        const tbody = document.getElementById('usersTableBody');
        const countElement = document.getElementById('usersCount');
        
        if (!tbody) return;

        tbody.innerHTML = '';
        countElement.textContent = `${usersToRender.length} Usuarios`;

        usersToRender.forEach(user => {
            const row = this.createUserRow(user);
            tbody.appendChild(row);
        });
    }

    createUserRow(user) {
        const row = document.createElement('tr');
        row.className = 'user-row';
        row.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-details">
                        <p class="font-medium">${user.name}</p>
                        ${user.height && user.weight ? 
                            `<p class="text-muted">${user.height} · ${user.weight}</p>` : ''
                        }
                    </div>
                </div>
            </td>
            <td class="text-muted">${user.email}</td>
            <td>
                <span class="badge ${user.role === 'entrenador' ? 'badge-primary' : 'badge-secondary'}">
                    ${user.role === 'entrenador' ? 'Entrenador' : 'Alumno'}
                </span>
            </td>
            <td class="text-muted">${user.phone}</td>
            <td>
                <span class="badge ${user.status === 'activo' ? 'badge-success' : 'badge-secondary'}">
                    ${user.status === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon edit-user" data-id="${user.id}">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="btn-icon danger delete-user" data-id="${user.id}">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </td>
        `;

        // Agregar event listeners a los botones
        row.querySelector('.edit-user').addEventListener('click', () => {
            this.editUser(user.id);
        });

        row.querySelector('.delete-user').addEventListener('click', () => {
            this.deleteUser(user.id);
        });

        return row;
    }

    openUserModal(user = null) {
        const modal = document.getElementById('userModal');
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('userForm');

        if (user) {
            title.textContent = 'Editar Usuario';
            this.populateForm(user);
        } else {
            title.textContent = 'Nuevo Usuario';
            form.reset();
            this.currentEditingId = null;
        }

        modal.classList.add('show');
    }

    closeUserModal() {
        document.getElementById('userModal').classList.remove('show');
        document.getElementById('userForm').reset();
        this.currentEditingId = null;
    }

    populateForm(user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userPhone').value = user.phone;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userHeight').value = user.height || '';
        document.getElementById('userWeight').value = user.weight || '';
        this.currentEditingId = user.id;
    }

    saveUser() {
        const form = document.getElementById('userForm');
        const formData = new FormData(form);
        
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            height: formData.get('height'),
            weight: formData.get('weight'),
            status: 'activo',
            avatar: formData.get('name').charAt(0).toUpperCase()
        };

        if (this.currentEditingId) {
            // Editar usuario existente
            const index = this.users.findIndex(u => u.id === this.currentEditingId);
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...userData };
            }
        } else {
            // Nuevo usuario
            const newId = Math.max(...this.users.map(u => u.id), 0) + 1;
            this.users.push({
                id: newId,
                ...userData
            });
        }

        this.saveUsers();
        this.renderUsers();
        this.closeUserModal();
        
        this.showNotification(
            this.currentEditingId ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
            'success'
        );
    }

    editUser(id) {
        const user = this.users.find(u => u.id === id);
        if (user) {
            this.openUserModal(user);
        }
    }

    deleteUser(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            this.users = this.users.filter(u => u.id !== id);
            this.saveUsers();
            this.renderUsers();
            this.showNotification('Usuario eliminado correctamente', 'success');
        }
    }

    filterUsers(searchTerm) {
        const filtered = this.users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderUsers(filtered);
    }

    filterUsersByType(filter) {
        let filtered = this.users;
        
        switch (filter) {
            case 'Entrenadores':
                filtered = this.users.filter(u => u.role === 'entrenador');
                break;
            case 'Alumnos':
                filtered = this.users.filter(u => u.role === 'alumno');
                break;
            case 'Activos':
                filtered = this.users.filter(u => u.status === 'activo');
                break;
            case 'Inactivos':
                filtered = this.users.filter(u => u.status === 'inactivo');
                break;
        }
        
        this.renderUsers(filtered);
    }

    showNotification(message, type = 'info') {
        // Implementar notificación toast
        console.log(`${type}: ${message}`);
    }
}

// Inicializar el gestor de usuarios
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('usersTableBody')) {
        new UsersManager();
    }
});