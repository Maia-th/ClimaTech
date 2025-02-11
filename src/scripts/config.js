//Obtem o valor dos tokens no cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

//Obtem o token do Cookie, decodifica, preenche a pag com os dados do usuario...
document.addEventListener('DOMContentLoaded', async () => {
    const token = getCookie('access_token');

    if (token) {
        try {
            const decoded = jwt_decode(token);
            const userId = decoded.id;

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
                    showModal('../components/modalUpdateFalha.html');
                    return;
                }

                const updatedData = {
                    name: usernameInput.value,
                };

                if (newPasswordInput.value) {
                    updatedData.password = newPasswordInput.value;
                }

                const updateResponse = await fetch(`http://127.0.0.1:3000/api/usuarios/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                });

                if (updateResponse.ok) {
                    showModal('../components/modalUpdateSucesso.html');
                    originalUsername = usernameInput.value;
                    currentPasswordInput.value = '';
                    newPasswordInput.value = '';
                    confirmPasswordInput.value = '';
                } else {
                    showModal('../components/modalUpdateFalha.html');
                }
            });

        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
        }
    }
});


async function showModal(modalPath) {
    try {
        const response = await fetch(modalPath);
        if (!response.ok) throw new Error('Erro ao carregar modal');

        const modalHTML = await response.text();
        
        let modalContainer = document.getElementById('modal-container');
        
        if (!modalContainer) {
            modalContainer = document.createElement('div');
            modalContainer.id = 'modal-container';
            document.body.appendChild(modalContainer);
        }

        modalContainer.innerHTML = modalHTML;

        const modalOverlay = modalContainer.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.style.display = 'flex';
        }

        const closeButton = modalContainer.querySelector('.modal-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modalContainer.innerHTML = '';
            });
        }
    } catch (error) {
        console.error('Erro ao carregar modal:', error);
    }
}

//configurações usuarios
document.addEventListener("DOMContentLoaded", async () => {
    const token = getCookie("access_token"); // Se precisar de autenticação
    const tabelaUsuarios = document.querySelector("#usuarios tbody");

    async function carregarUsuarios() {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/usuarios", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Se necessário
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar usuários");
            }

            const usuarios = await response.json();
            tabelaUsuarios.innerHTML = ""; // Limpa a tabela antes de carregar

            usuarios.forEach(usuario => {
                const tr = document.createElement("tr");
                tr.classList.add("border-b");

                tr.innerHTML = `
                    <td class="py-3 px-4 text-center">${usuario.name}</td>
                    <td class="py-3 px-4 text-center">${usuario.email}</td>
                    <td class="py-3 px-4 text-center">${usuario.access}</td>
                    <td class="py-3 px-4">
                        <div class="flex items-center justify-center space-x-4">
                            <span class="fas fa-lock text-gray-600 cursor-pointer hover:text-yellow-500 alterar-permissao" data-id="${usuario.idUsers}"></span>
                            <span class="fas fa-trash-alt text-gray-600 cursor-pointer hover:text-red-500 excluir-usuario" data-id="${usuario.idUsers}"></span>
                        </div>
                    </td>
                `;

                tabelaUsuarios.appendChild(tr);
            });

            // Adiciona eventos aos ícones de exclusão e alteração de permissão
            document.querySelectorAll(".excluir-usuario").forEach(botao => {
                botao.addEventListener("click", () => excluirUsuario(botao.dataset.id));
            });

            document.querySelectorAll(".alterar-permissao").forEach(botao => {
                botao.addEventListener("click", () => alterarPermissao(botao.dataset.id));
            });

        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        }
    }

    async function excluirUsuario(id) {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir usuário");
            }

            carregarUsuarios(); // Recarregar tabela após exclusão
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    }

    async function alterarPermissao(id) {
        try {
            const novaPermissao = prompt("Nova permissão (root, user, etc.):");
            if (!novaPermissao) return;

            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ access: novaPermissao })
            });

            if (!response.ok) {
                throw new Error("Erro ao alterar permissão");
            }

            carregarUsuarios(); // Atualiza tabela
        } catch (error) {
            console.error("Erro ao alterar permissão:", error);
        }
    }

    carregarUsuarios();
});
