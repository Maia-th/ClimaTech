function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = getCookie('access_token');

    if (token) {
        try {
            const decoded = jwt_decode(token);
            const usernameInput = document.getElementById('username');
            const emailInput = document.getElementById('email');
            const currentPasswordInput = document.getElementById('current-password');
            const newPasswordInput = document.getElementById('new-password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const cancelButton = document.querySelector('.cancel');
            const confirmButton = document.querySelector('.confirm');

            let originalUsername = '';

            if (usernameInput && emailInput) {
                emailInput.value = decoded.email || '';
                usernameInput.value = decoded.name || '';
                originalUsername = usernameInput.value;
            }

            const userId = decoded.id;

            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                if (userData.name) {
                    usernameInput.value = userData.name;
                    originalUsername = userData.name;
                }
                if (userData.email) {
                    emailInput.value = userData.email;
                }
            }

            cancelButton.addEventListener('click', () => {
                usernameInput.value = originalUsername;
                currentPasswordInput.value = '';
                newPasswordInput.value = '';
                confirmPasswordInput.value = '';
            });

            confirmButton.addEventListener('click', async (event) => {
                event.preventDefault();

                if (newPasswordInput.value !== confirmPasswordInput.value) {
                    alert("As senhas não coincidem!");
                    return;
                }

                const updatedData = {
                    name: usernameInput.value,
                    currentPassword: currentPasswordInput.value,
                    newPassword: newPasswordInput.value || undefined,
                };

                const updateResponse = await fetch(`http://127.0.0.1:3000/api/usuarios/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                });

                if (updateResponse.ok) {
                    alert("Dados atualizados com sucesso!");
                    originalUsername = usernameInput.value;
                    currentPasswordInput.value = '';
                    newPasswordInput.value = '';
                    confirmPasswordInput.value = '';
                } else {
                    alert("Erro ao atualizar os dados.");
                }
            });

        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
        }
    }
});
