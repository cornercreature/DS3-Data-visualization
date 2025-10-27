// Scroll handler like HTML Review
window.onload = () => {
    handleScroll();
    setupGreenLinks();
    setupModal();
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

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('modal');
    const btn = document.getElementById('modalButton');
    const span = document.getElementsByClassName('close')[0];

    // Open modal when button is clicked
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Close modal when X is clicked
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
