// Scroll handler like HTML Review
window.onload = () => {
    handleScroll();
    setupGreenLinks();
    setupModal();
    setupTitleTooltip();
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
        // Skip green links that have actual hrefs (tree1green.png at index 0, tree3 green.png at index 3)
        if (index === 0 || index === 3) {
            return;
        }

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

    // Open modal when button is clicked
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Close modal when clicking outside of it
    modal.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Setup title box tooltip
function setupTitleTooltip() {
    const titleBox = document.getElementById('titleBox');
    const tooltip = document.getElementById('titleTooltip');

    // Set credits text for tooltip
    const creditsText = `Nicole Sun
Runping Mao-Wei
Susan He
for RISD GD DS3.

Typeset in ABCPressura.`;

    tooltip.textContent = creditsText;

    // Show tooltip on hover
    titleBox.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });

    // Hide tooltip when mouse leaves
    titleBox.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    // Move tooltip with cursor (above cursor)
    titleBox.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY - tooltip.offsetHeight - 15) + 'px';
    });
}
