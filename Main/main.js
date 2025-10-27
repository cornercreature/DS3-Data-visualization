// Scroll handler like HTML Review
window.onload = () => {
    handleScroll();
    setupGreenLinks();
}

window.onscroll = () => handleScroll();

function handleScroll() {
    const root = document.querySelector(':root');

    // Update --scroll variable (drives the translateZ transforms)
    root.style.setProperty('--scroll', Math.floor(window.scrollY) + 'px');

    // Update --visible variable (controls opacity fade)
    root.style.setProperty('--visible', (Math.floor(window.scrollY - 17000) / -100).toFixed(1));
}

// Setup green link interactions
function setupGreenLinks() {
    const greenLinks = document.querySelectorAll('.green-link');

    greenLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Green link ${index + 1} clicked!`);
            // Add your custom action here
            alert(`You clicked green image #${index + 1}!`);
        });
    });
}
