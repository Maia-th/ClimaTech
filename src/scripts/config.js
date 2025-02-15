//Obtem o valor dos tokens no cookie
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

document.addEventListener("DOMContentLoaded", async () => {
    const token = getCookie("access_token");
    const tabelaUsuarios = document.querySelector("#usuarios tbody");
    const inputBuscaNome = document.getElementById("busca-nome");

    let usuarioIdParaExcluir = null;
    let usuarioIdParaEditar = null;

    document.querySelector(".adicionar").addEventListener("click", () => {
        document.getElementById("modalCadastro").classList.remove("hidden");
    });

    document.getElementById("cancelarCadastro").addEventListener("click", () => {
        document.getElementById("modalCadastro").classList.add("hidden");
    });

    document.getElementById("cadastrarUsuario").addEventListener("click", async () => {
        const nome = document.getElementById("nomeUsuario").value;
        const email = document.getElementById("emailUsuario").value;
        const senha = document.getElementById("senhaUsuario").value || "12345678";
        const permissao = document.getElementById("permissaoUsuario").value;

        if (!nome || !email) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: senha,
                    access: permissao
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            document.getElementById("modalCadastro").classList.add("hidden");
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    });

    async function carregarUsuarios() {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/usuarios", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar usuários");
            }

            const usuarios = await response.json();
            tabelaUsuarios.innerHTML = "";

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

            document.querySelectorAll(".excluir-usuario").forEach(botao => {
                botao.addEventListener("click", () => mostrarModalExcluir(botao.dataset.id));
            });

            document.querySelectorAll(".alterar-permissao").forEach(botao => {
                botao.addEventListener("click", () => editarUsuario(botao.dataset.id));
            });

        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        }
    }

    function mostrarModalExcluir(id) {
        usuarioIdParaExcluir = id;
        document.getElementById("modalExcluir").classList.remove("hidden");
    }

    function esconderModalExcluir() {
        usuarioIdParaExcluir = null;
        document.getElementById("modalExcluir").classList.add("hidden");
    }

    async function excluirUsuario() {
        if (!usuarioIdParaExcluir) return;

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${usuarioIdParaExcluir}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir usuário");
            }

            esconderModalExcluir();
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    }

    function configurarModal() {
        document.getElementById("cancelarExclusao").addEventListener("click", esconderModalExcluir);
        document.getElementById("confirmarExclusao").addEventListener("click", excluirUsuario);
    }

    function editarUsuario(id) {
        usuarioIdParaEditar = id;

        fetch(`http://127.0.0.1:3000/api/usuarios/${usuarioIdParaEditar}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(usuario => {
                document.getElementById("nomeUsuarioEditar").value = usuario.name;
                document.getElementById("emailUsuarioEditar").value = usuario.email;
                document.getElementById("permissaoUsuarioEditar").value = usuario.access;
                document.getElementById("modalEditar").classList.remove("hidden");
            })
            .catch(error => console.error("Erro ao carregar dados do usuário:", error));
    }

    document.getElementById("resetarSenha").addEventListener("click", () => {
        fetch(`http://127.0.0.1:3000/api/usuarios/${usuarioIdParaEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password: "12345678"
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao resetar a senha");
                }
                console.log("Senha resetada para 12345678");
            })
            .catch(error => console.error("Erro ao resetar a senha:", error));
    });

    document.getElementById("salvarEdicao").addEventListener("click", async () => {
        const nome = document.getElementById("nomeUsuarioEditar").value;
        const email = document.getElementById("emailUsuarioEditar").value;
        const permissao = document.getElementById("permissaoUsuarioEditar").value;
        const senha = "12345678";

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/usuarios/${usuarioIdParaEditar}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: senha,
                    access: permissao
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao editar usuário");
            }

            document.getElementById("modalEditar").classList.add("hidden");
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    });

    document.getElementById("cancelarEdicao").addEventListener("click", () => {
        document.getElementById("modalEditar").classList.add("hidden");
    });

    inputBuscaNome.addEventListener("input", () => {
        const termo = inputBuscaNome.value.toLowerCase(); 
        document.querySelectorAll("#usuarios tbody tr").forEach(row => { 
            const nomeUsuario = row.cells[0].textContent.toLowerCase(); 
            row.style.display = nomeUsuario.includes(termo) ? "" : "none"; 
        });
    });
    configurarModal();
    carregarUsuarios();
});

document.addEventListener("DOMContentLoaded", async () => {
    const token = getCookie("access_token");
    const tabelaEmails = document.querySelector("#newsletter tbody");
    const inputBuscaEmail = document.getElementById("busca-email");
    const modalExcluirEmail = document.getElementById("modalExcluirEmail");
    const modalAddEmail = document.getElementById("modalAddEmail"); 
    const confirmarExclusaoEmail = document.getElementById("confirmarExclusaoEmail");
    const cancelarExclusaoEmail = document.getElementById("cancelarExclusaoEmail");
    const confirmarAddEmail = document.getElementById("confirmarAddEmail"); 
    const cancelarAddEmail = document.getElementById("cancelarAddEmail"); 
    const inputEmailInserir = document.getElementById("emailInserir");
    let idEmailToDelete = null;
    const exportarDadosButton = document.getElementById("exportarDados");


    async function carregarEmails() {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/inscricoes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar e-mails: ${response.statusText}`);
            }

            const inscricoes = await response.json();
            tabelaEmails.innerHTML = "";

            inscricoes.forEach(inscricao => {
                const tr = document.createElement("tr");
                tr.classList.add("border-b");

                tr.innerHTML = `
                    <td class="py-3 px-4">${inscricao.email}</td>
                    <td class="py-3 px-4">${new Date().toLocaleDateString()}</td>
                    <td class="py-3 px-4 text-center">
                        <span class="fas fa-trash-alt text-gray-600 cursor-pointer hover:text-red-500 excluir-email" data-id="${inscricao.idInscricao}"></span>
                    </td>
                `;

                tabelaEmails.appendChild(tr);
            });

            document.querySelectorAll(".excluir-email").forEach(botao => {
                botao.addEventListener("click", () => {
                    idEmailToDelete = botao.dataset.id;
                    modalExcluirEmail.classList.remove("hidden");
                });
            });

        } catch (error) {
            console.error("Erro ao carregar e-mails:", error);
        }
    }

    async function excluirEmail() {
        if (!idEmailToDelete) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/inscricoes/${idEmailToDelete}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir inscrição");
            }

            carregarEmails();
        } catch (error) {
            console.error("Erro ao excluir inscrição:", error);
        } finally {
            modalExcluirEmail.classList.add("hidden"); 
        }
    }

    cancelarExclusaoEmail.addEventListener("click", () => {
        modalExcluirEmail.classList.add("hidden");
    });

    confirmarExclusaoEmail.addEventListener("click", excluirEmail);

    inputBuscaEmail.addEventListener("input", () => {
        const termo = inputBuscaEmail.value.toLowerCase();
        document.querySelectorAll("#newsletter tbody tr").forEach(row => {
            const email = row.cells[0].textContent.toLowerCase();
            row.style.display = email.includes(termo) ? "" : "none";
        });
    });

    async function adicionarEmail() {
        const email = inputEmailInserir.value;
        const dataCadastro = new Date().toISOString().split("T")[0];

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!email || !emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/api/inscricoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email, data_cadastro: dataCadastro })
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar inscrição");
            }

            const novoEmail = await response.json();
            carregarEmails();
            modalAddEmail.classList.add("hidden");
        } catch (error) {
            console.error("Erro ao cadastrar inscrição:", error);
        }
    }

    document.getElementById("adicionarNovoEmail").addEventListener("click", () => {
        modalAddEmail.classList.remove("hidden");
    });

    cancelarAddEmail.addEventListener("click", () => {
        modalAddEmail.classList.add("hidden");
    });


    confirmarAddEmail.addEventListener("click", adicionarEmail);

    exportarDadosButton.addEventListener("click", async () => {
        try {

            const response = await fetch("http://127.0.0.1:3000/api/inscricoes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar e-mails");
            }

            const inscricoes = await response.json();

            let csvContent = "Email\n";

            inscricoes.forEach(inscricao => {
                csvContent += `${inscricao.email}\n`;
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");

            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, "emails.csv");
            } else {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "emails.csv");
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Erro ao exportar dados:", error);
        }
    });

    carregarEmails();
});


