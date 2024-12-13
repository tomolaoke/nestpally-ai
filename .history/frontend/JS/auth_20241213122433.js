// public/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const role = document.getElementById('role').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, name, email, password })
            });

            const data = await response.json();
            const message = document.getElementById('registerMessage');

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                message.textContent = data.message;
                message.style.color = 'red';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            const message = document.getElementById('loginMessage');

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                message.textContent = data.message;
                message.style.color = 'red';
            }
        });
    }

    // Logout functionality
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});
