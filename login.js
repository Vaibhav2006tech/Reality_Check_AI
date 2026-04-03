window.onload = function() {

    // Toggle forms
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');

    document.getElementById('show-signup').addEventListener('click', () => {
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', () => {
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // LOGIN
    document.getElementById('login-btn').addEventListener('click', async () => {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');

        errorDiv.textContent = "";

        if (!username || !password) {
            errorDiv.textContent = "Please fill all fields.";
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                errorDiv.textContent = data.message || "Login failed!";
            }
        } catch (err) {
            errorDiv.textContent = "Server error. Try again later.";
            console.error(err);
        }
    });

};
