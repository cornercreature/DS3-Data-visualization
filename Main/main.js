// Scroll handler like HTML Review
window.onload = () => {
    handleScroll();
}

window.onscroll = () => handleScroll();

function handleScroll() {
    const root = document.querySelector(':root');

    // Update --scroll variable (drives the translateZ transforms)
    root.style.setProperty('--scroll', Math.floor(window.scrollY) + 'px');

    // Update --visible variable (controls opacity fade)
    root.style.setProperty('--visible', (Math.floor(window.scrollY - 17000) / -100).toFixed(1));
}
