// ========== API CONFIGURATION ==========
const API_URL = 'http://localhost:5000/api';

// ========== UTILITY FUNCTIONS ==========
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const token = localStorage.getItem('token');
        if (token) {
            options.headers.Authorization = `Bearer ${token}`;
        }

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'auth.html';
            }
            const error = await response.json();
            throw new Error(error.message || `API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.add('show');
        if (type === 'success') {
            element.classList.remove('error-message');
            element.classList.add('success-message');
        } else {
            element.classList.add('error-message');
        }
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ========== DARK MODE ==========
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Check if dark mode was previously enabled
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
        darkModeToggle.classList.add('active');
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isActive = document.body.classList.contains('dark-mode');
        
        // Update button appearance
        darkModeToggle.textContent = isActive ? '☀️' : '🌙';
        darkModeToggle.classList.toggle('active', isActive);
        
        // Save preference
        localStorage.setItem('darkMode', isActive);
    });
}

// ========== IMAGE UPLOAD PREVIEW ==========
function initImagePreview() {
    const profileImageInput = document.getElementById('profileImage');
    if (!profileImageInput) return;

    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('imagePreview');
                preview.innerHTML = `<img src="${event.target.result}" alt="Profile Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// ========== AUTHENTICATION ==========
function initAuthPage() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Show selected form and activate button
            document.getElementById(tabName).classList.add('active');
            btn.classList.add('active');
        });
    });

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const role = document.getElementById('loginRole').value;

            if (!role) {
                showMessage('loginError', 'Please select your role');
                return;
            }

            try {
                const result = await apiCall('/auth/login', 'POST', {
                    email,
                    password,
                    role,
                });

                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                
                showMessage('loginSuccess', 'Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    if (role === 'patient') {
                        window.location.href = 'patient-dashboard.html';
                    } else if (role === 'doctor') {
                        window.location.href = 'doctor-dashboard.html';
                    }
                }, 1500);
            } catch (error) {
                showMessage('loginError', error.message);
            }
        });
    }

    // Register
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const phone = document.getElementById('registerPhone').value;
            const role = document.getElementById('registerRole').value;

            if (!role) {
                showMessage('registerError', 'Please select your role');
                return;
            }

            try {
                const result = await apiCall('/auth/register', 'POST', {
                    name,
                    email,
                    password,
                    phone,
                    role,
                });

                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                
                showMessage('registerSuccess', 'Account created! Redirecting...', 'success');
                
                setTimeout(() => {
                    if (role === 'patient') {
                        window.location.href = 'patient-dashboard.html';
                    } else if (role === 'doctor') {
                        window.location.href = 'doctor-dashboard.html';
                    }
                }, 1500);
            } catch (error) {
                showMessage('registerError', error.message);
            }
        });
    }
}

// ========== PATIENT DASHBOARD ==========
function initPatientDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || user.role !== 'patient') {
        window.location.href = 'auth.html';
        return;
    }

    document.getElementById('userName').textContent = `Welcome, ${user.name}`;

    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.textContent.includes('Logout')) return;
            
            e.preventDefault();
            const section = item.dataset.section;
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
            });
            
            document.getElementById(`${section}-section`).classList.add('active');
            document.getElementById('pageTitle').textContent = 
                section === 'appointments' ? 'My Appointments' :
                section === 'doctors' ? 'Find a Doctor' :
                'My Profile';
            
            if (section === 'appointments') loadAppointments();
            if (section === 'doctors') loadDoctors();
            if (section === 'profile') loadProfileForm();
        });
    });

    // Load initial sections
    loadAppointments();
    loadDoctors();

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                await apiCall('/patients/profile', 'PUT', {
                    name: document.getElementById('profileName').value,
                    phone: document.getElementById('profilePhone').value,
                    dateOfBirth: document.getElementById('profileDOB').value,
                    address: document.getElementById('profileAddress').value,
                });

                showMessage('profileMessage', 'Profile updated successfully!', 'success');
            } catch (error) {
                showMessage('profileMessage', error.message);
            }
        });
    }

    // Modal handling
    const modal = document.getElementById('appointmentModal');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Book appointment form
    const bookForm = document.getElementById('bookAppointmentForm');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                await apiCall('/appointments', 'POST', {
                    patientId: user.id,
                    doctorId: document.getElementById('appointmentDoctorId').value,
                    appointmentDate: document.getElementById('appointmentDate').value,
                    appointmentTime: document.getElementById('appointmentTime').value,
                    reason: document.getElementById('appointmentReason').value,
                    description: document.getElementById('appointmentDescription').value,
                });

                showMessage('appointmentError', 'Appointment booked successfully!', 'success');
                modal.classList.remove('show');
                bookForm.reset();
                loadAppointments();
                
                setTimeout(() => {
                    document.getElementById('appointmentError').classList.remove('show');
                }, 2000);
            } catch (error) {
                showMessage('appointmentError', error.message);
            }
        });
    }
}

async function loadAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    if (!appointmentsList) return;

    try {
        appointmentsList.innerHTML = '<div class="loading">Loading appointments...</div>';
        
        const appointments = await apiCall('/appointments/user/appointments', 'GET');

        if (appointments.length === 0) {
            appointmentsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <p>No appointments yet. <a href="#" onclick="document.querySelector('[data-section=\"doctors\"]').click()">Book one now!</a></p>
                </div>
            `;
            return;
        }

        appointmentsList.innerHTML = appointments.map(apt => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <div>
                        <div class="appointment-title">${apt.doctorId?.userId?.name || 'Doctor'}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">${apt.doctorId?.specialization || ''}</div>
                    </div>
                    <span class="appointment-status status-${apt.status}">${apt.status}</span>
                </div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">📅 Date</div>
                        <div class="appointment-detail-value">${new Date(apt.appointmentDate).toLocaleDateString()}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">⏰ Time</div>
                        <div class="appointment-detail-value">${apt.appointmentTime}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">🏥 Reason</div>
                        <div class="appointment-detail-value">${apt.reason}</div>
                    </div>
                </div>
                ${apt.status === 'scheduled' ? `
                    <div class="appointment-actions">
                        <button class="btn-reschedule" onclick="showRescheduleModal('${apt._id}')">Reschedule</button>
                        <button class="btn-cancel" onclick="cancelAppointment('${apt._id}')">Cancel</button>
                    </div>
                ` : ''}
            </div>
        `).join('');
    } catch (error) {
        appointmentsList.innerHTML = `<div style="color: var(--error); padding: 2rem;">${error.message}</div>`;
    }
}

async function loadDoctors() {
    const doctorsList = document.getElementById('doctorsList');
    if (!doctorsList) return;

    try {
        doctorsList.innerHTML = '<div class="loading">Loading doctors...</div>';
        
        const doctors = await apiCall('/doctors', 'GET');

        if (doctors.length === 0) {
            doctorsList.innerHTML = '<div style="text-align: center; padding: 2rem;">No doctors available</div>';
            return;
        }

        doctorsList.innerHTML = doctors.map(doctor => `
            <div class="doctor-card">
                <div class="doctor-avatar">
                    ${doctor.profileImage ? `<img src="${doctor.profileImage}" alt="${doctor.userId.name}" />` : '👨‍⚕️'}
                </div>
                <div class="doctor-info">
                    <div class="doctor-name">${doctor.userId.name}</div>
                    <div class="doctor-specialty">${doctor.specialization}</div>
                    <div class="doctor-details">
                        <div>📞 ${doctor.userId.phone}</div>
                        <div>⭐ ${doctor.yearsOfExperience} years experience</div>
                    </div>
                    <div class="doctor-rating">Rating: ${doctor.rating}/5 ⭐</div>
                    <div class="doctor-fee">$${doctor.consultationFee}</div>
                    <button class="btn btn-primary book-btn" onclick="showBookModal('${doctor._id}', '${doctor.userId.name}')">
                        Book Appointment
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        doctorsList.innerHTML = `<div style="color: var(--error); padding: 2rem;">${error.message}</div>`;
    }
}

function loadProfileForm() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileEmail').value = user.email || '';
    document.getElementById('profilePhone').value = user.phone || '';
}

function showBookModal(doctorId, doctorName) {
    document.getElementById('appointmentDoctor').value = doctorName;
    document.getElementById('appointmentDoctorId').value = doctorId;
    document.getElementById('appointmentModal').classList.add('show');
}

async function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        try {
            await apiCall(`/appointments/${appointmentId}`, 'DELETE');
            showMessage('appointmentsList', 'Appointment cancelled successfully!', 'success');
            loadAppointments();
        } catch (error) {
            alert(error.message);
        }
    }
}

// ========== DOCTOR DASHBOARD ==========
function initDoctorDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || user.role !== 'doctor') {
        window.location.href = 'auth.html';
        return;
    }

    document.getElementById('userName').textContent = `Welcome, Dr. ${user.name}`;

    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.textContent.includes('Logout')) return;
            
            e.preventDefault();
            const section = item.dataset.section;
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
            });
            
            document.getElementById(`${section}-section`).classList.add('active');
            document.getElementById('pageTitle').textContent = 
                section === 'dashboard' ? 'Dashboard' :
                section === 'appointments' ? 'Appointments' :
                'My Profile';
            
            if (section === 'dashboard') loadDoctorDashboard();
            if (section === 'appointments') loadDoctorAppointments();
            if (section === 'profile') loadDoctorProfile();
        });
    });

    // Load initial sections
    loadDoctorDashboard();

    // Profile form
    const profileForm = document.getElementById('doctorProfileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const doctorProfile = {
                    specialization: document.getElementById('specialization').value,
                    yearsOfExperience: parseInt(document.getElementById('yearsOfExperience').value),
                    licenseNumber: document.getElementById('licenseNumber').value,
                    qualifications: document.getElementById('qualifications').value.split(',').map(q => q.trim()).filter(q => q),
                    bio: document.getElementById('bio').value,
                    consultationFee: parseFloat(document.getElementById('consultationFee').value),
                };

                // Handle profile image if selected
                const profileImageInput = document.getElementById('profileImage');
                if (profileImageInput && profileImageInput.files.length > 0) {
                    const file = profileImageInput.files[0];
                    const reader = new FileReader();
                    
                    await new Promise((resolve, reject) => {
                        reader.onload = () => {
                            doctorProfile.profileImage = reader.result;
                            resolve();
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                }

                // Get all doctors and find the one for current user
                const doctors = await apiCall('/doctors', 'GET');
                const existingDoctor = doctors.find(d => {
                    const doctorUserId = typeof d.userId === 'string' ? d.userId : d.userId?._id;
                    return doctorUserId === user.id;
                });

                if (existingDoctor) {
                    // Update existing profile
                    await apiCall(`/doctors/${existingDoctor._id}`, 'PUT', doctorProfile);
                    showMessage('profileMessage', 'Profile updated successfully!', 'success');
                } else {
                    // Create new profile
                    doctorProfile.userId = user.id;
                    await apiCall('/doctors', 'POST', doctorProfile);
                    showMessage('profileMessage', 'Profile created successfully!', 'success');
                }

                // Immediately refresh the profile display for user to see changes
                setTimeout(() => {
                    loadDoctorProfile();
                }, 500);
            } catch (error) {
                showMessage('profileMessage', error.message);
            }
        });
    }
}

async function loadDoctorDashboard() {
    try {
        const appointments = await apiCall('/appointments/user/appointments', 'GET');
        
        // Calculate stats
        const totalAppointments = appointments.length;
        const completedAppointments = appointments.filter(a => a.status === 'completed').length;
        const uniquePatients = new Set(appointments.map(a => a.patientId._id)).size;

        document.getElementById('totalPatients').textContent = uniquePatients;
        document.getElementById('totalAppointments').textContent = totalAppointments;
        document.getElementById('completedAppointments').textContent = completedAppointments;

        const upcomingAppointments = appointments
            .filter(a => a.status === 'scheduled' && new Date(a.appointmentDate) > new Date())
            .slice(0, 5);

        const upcomingList = document.getElementById('upcomingAppointments');
        if (upcomingAppointments.length === 0) {
            upcomingList.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">No upcoming appointments</div>';
            return;
        }

        upcomingList.innerHTML = upcomingAppointments.map(apt => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <div>
                        <div class="appointment-title">${apt.patientId.name}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">📞 ${apt.patientId.phone}</div>
                    </div>
                    <span class="appointment-status status-scheduled">${apt.status}</span>
                </div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">📅 Date</div>
                        <div class="appointment-detail-value">${new Date(apt.appointmentDate).toLocaleDateString()}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">⏰ Time</div>
                        <div class="appointment-detail-value">${apt.appointmentTime}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">🏥 Reason</div>
                        <div class="appointment-detail-value">${apt.reason}</div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

async function loadDoctorAppointments() {
    const appointmentsList = document.getElementById('allAppointments');
    if (!appointmentsList) return;

    try {
        appointmentsList.innerHTML = '<div class="loading">Loading appointments...</div>';
        
        const appointments = await apiCall('/appointments/user/appointments', 'GET');

        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<div style="text-align: center; padding: 2rem;">No appointments</div>';
            return;
        }

        appointmentsList.innerHTML = appointments.map(apt => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <div>
                        <div class="appointment-title">${apt.patientId.name}</div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">📧 ${apt.patientId.email}</div>
                    </div>
                    <span class="appointment-status status-${apt.status}">${apt.status}</span>
                </div>
                <div class="appointment-details">
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">📅 Date</div>
                        <div class="appointment-detail-value">${new Date(apt.appointmentDate).toLocaleDateString()}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">⏰ Time</div>
                        <div class="appointment-detail-value">${apt.appointmentTime}</div>
                    </div>
                    <div class="appointment-detail">
                        <div class="appointment-detail-label">🏥 Reason</div>
                        <div class="appointment-detail-value">${apt.reason}</div>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        appointmentsList.innerHTML = `<div style="color: var(--error); padding: 2rem;">${error.message}</div>`;
    }
}

async function loadDoctorProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const doctors = await apiCall('/doctors', 'GET');
        const doctorProfile = doctors.find(d => {
            // Compare userId - handle both string and object formats
            const doctorUserId = typeof d.userId === 'string' ? d.userId : d.userId?._id;
            return doctorUserId === user.id;
        });

        if (doctorProfile) {
            document.getElementById('doctorName').value = user.name;
            document.getElementById('doctorEmail').value = user.email;
            document.getElementById('specialization').value = doctorProfile.specialization || '';
            document.getElementById('yearsOfExperience').value = doctorProfile.yearsOfExperience || '';
            document.getElementById('licenseNumber').value = doctorProfile.licenseNumber || '';
            document.getElementById('qualifications').value = (doctorProfile.qualifications || []).join(', ');
            document.getElementById('bio').value = doctorProfile.bio || '';
            document.getElementById('consultationFee').value = doctorProfile.consultationFee || '';
            
            // Display profile image if exists
            if (doctorProfile.profileImage) {
                const preview = document.getElementById('imagePreview');
                if (preview) {
                    preview.innerHTML = `<img src="${doctorProfile.profileImage}" alt="Profile Preview">`;
                }
            }
        } else {
            document.getElementById('doctorName').value = user.name;
            document.getElementById('doctorEmail').value = user.email;
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Initialize dark mode on all pages
    initDarkMode();
    initImagePreview();

    if (currentPage === 'auth.html') {
        initAuthPage();
    } else if (currentPage === 'patient-dashboard.html') {
        initPatientDashboard();
    } else if (currentPage === 'doctor-dashboard.html') {
        initDoctorDashboard();
    }
});
