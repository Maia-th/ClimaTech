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
  
            if (usernameInput) {
                usernameInput.value = decoded.name || '';
            }
  
            if (emailInput) {
                emailInput.value = decoded.email || '';
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
                }
  
                if (userData.email) {
                    emailInput.value = userData.email;
                }
            }
  
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
        }
    }
});
