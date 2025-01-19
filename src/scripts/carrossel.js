document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function showNextItem() {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].style.display = 'flex';
    }

    setInterval(showNextItem, 5000);
});