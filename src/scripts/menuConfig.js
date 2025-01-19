function toggleMenu() {
    const nav = document.querySelector('nav');
    const iconImage = document.querySelector('#iconCT img'); 

    nav.classList.toggle('active');
    iconImage.classList.toggle('transparent');
}

function selectMenuItem() {
    const nav = document.querySelector('nav');
    const iconImage = document.querySelector('#iconCT img'); 

    if (window.innerWidth <= 768) {
        nav.classList.toggle('active');
        iconImage.classList.toggle('transparent');
    }
}