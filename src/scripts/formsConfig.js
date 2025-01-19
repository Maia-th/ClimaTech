function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

// Exibe o formulário de Dados Pessoais por padrão
showForm('dados-pessoais');
