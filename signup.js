window.onload = function() {

    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');

    document.getElementById('signup-btn').addEventListener('click', async () => {
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const errorDiv = document.getElementById('signup-error');

        errorDiv.textContent = "";

        if (!username || !email || !password || !confirmPassword) {
            errorDiv.textContent = "Please fill all fields.";
            return;
        }
        if (password !== confirmPassword) {
            errorDiv.textContent = "Passwords do not match.";
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (data.success) {
                alert("Sign-Up successful! Please login.");
                signupContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            } else {
                errorDiv.textContent = data.message || "Sign-Up failed!";
            }
        } catch (err) {
            errorDiv.textContent = "Server error. Try again later.";
            console.error(err);
        }
    });

};
