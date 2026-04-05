// ----------------------
// Auth Helpers (LOCALSTORAGE BASED)
// ----------------------

// Get current logged-in user
function getSession() {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (err) {
        console.error('Error reading user:', err);
        return null;
    }
}

// Logout user
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check login and optionally restrict to admin
function checkLogin(adminOnly = false) {
    const user = getSession();

    if (!user) {
        window.location.href = 'login.html';
        return null;
    }

    if (adminOnly && user.role !== 'Admin') {
        window.location.href = 'index.html';
        return null;
    }

    return user;
}

// ----------------------
// Navigation Bar Builder
// ----------------------
function buildNav(currentPage) {
    const user = getSession();
    if (!user) return;

    const adminLinks = [
        ['index.html', 'Dashboard'],
        ['add-book.html', 'Add Book'],
        ['view-books.html', 'All Books'],
        ['add-student.html', 'Add Student'],
        ['view-students.html', 'All Students'],
        ['issue-book.html', 'Issue Book'],
        ['return-book.html', 'Return Book'],
        ['manage-requests.html', 'Requests'],
        ['reports.html', 'Reports']
    ];

    const studentLinks = [
        ['index.html', 'My Books'],
        ['view-books.html', 'Browse Books'],
        ['request-issue.html', 'Request Book']
    ];

    const links = (user.role === 'Admin') ? adminLinks : studentLinks;

    const nav = document.getElementById('nav');
    if (!nav) return;

    let html = `<a class="logo" href="index.html">📚 Library</a><ul>`;

    links.forEach(([page, name]) => {
        html += `<li><a href="${page}" ${page === currentPage ? 'class="active"' : ''}>${name}</a></li>`;
    });

    html += `<li><a href="#" onclick="logout()">Logout (${user.username})</a></li></ul>`;

    nav.innerHTML = html;
}

// ----------------------
// API Helper
// ----------------------
async function api(method, endpoint, body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(endpoint);
        const data = await res.json();

        return {
            ok: res.ok,
            data,
            status: res.status
        };
    } catch (err) {
        console.error('API error:', err);
        return { ok: false, data: null, status: 500 };
    }
}

// ----------------------
// Utility Functions
// ----------------------

// Format date as YYYY-MM-DD
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
}

// Status badge
function statusBadge(status, issueDate) {
    if (status === 'Returned') {
        return '<span class="badge green">Returned</span>';
    }

    const due = new Date(new Date(issueDate).getTime() + 7 * 24 * 60 * 60 * 1000);

    if (new Date() > due) {
        return '<span class="badge red">Overdue</span>';
    }

    return '<span class="badge orange">Issued</span>';
}

// ----------------------
// Table Helper
// ----------------------
function fillTable(tbodyId, rows, emptyMessage) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    tbody.innerHTML = rows.length
        ? rows.join('')
        : `<tr><td colspan="7" style="text-align:center">${emptyMessage}</td></tr>`;
}

// ----------------------
// Simple getters
// ----------------------
function getUsername() {
    return getSession()?.username || '';
}

function getRole() {
    return getSession()?.role || '';
}

function getStudentId() {
    return getSession()?.studentId || '';
}