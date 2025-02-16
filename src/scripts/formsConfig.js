function showForm(formId) {
    const forms = document.querySelectorAll('main > div');
    forms.forEach(form => form.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

showForm('dados-pessoais');
