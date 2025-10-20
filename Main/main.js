document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.perspective-container');
    const parallaxGroups = document.querySelectorAll('.parallax-group');

    // Track scroll and apply scaling
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;

        parallaxGroups.forEach((group) => {
            const groupTop = group.offsetTop;

            // Calculate how far we've scrolled past this group
            // Positive value = we've scrolled down past it
            // Negative value = it's still below us
            const scrollDistance = scrollTop - groupTop;

            // Calculate scale: larger as we scroll down toward and past the element
            const maxScale = 3.0; // Maximum scale when fully scrolled past
            const minScale = 0.3; // Minimum scale when far above
            const scaleRange = containerHeight * 2; // Distance over which scaling occurs

            // Calculate scale factor based on scroll distance
            // Goes from 0 (far below) to 1 (scrolled past)
            let scaleFactor = scrollDistance / scaleRange;
            scaleFactor = Math.max(0, Math.min(1, scaleFactor)); // Clamp between 0 and 1

            // Calculate final scale
            const scale = minScale + (scaleFactor * (maxScale - minScale));

            // Get the base depth transform
            const depthClass = group.className.match(/depth-\d+/)[0];
            const baseTransform = getBaseTransform(depthClass);

            // Apply combined transform
            group.style.transform = `${baseTransform} scale(${scale})`;

            // Also scale the rectangle inside
            const rectangle = group.querySelector('.rectangle');
            if (rectangle) {
                rectangle.style.transform = `scale(${scale})`;
            }
        });
    });

    // Trigger initial scroll event
    container.dispatchEvent(new Event('scroll'));

    // Helper function to get base depth transform
    function getBaseTransform(depthClass) {
        const transforms = {
            'depth-1': 'translateZ(-1px)',
            'depth-2': 'translateZ(-2.5px)',
            'depth-3': 'translateZ(-4px)',
            'depth-4': 'translateZ(-5.5px)',
            'depth-5': 'translateZ(-7px)',
            'depth-6': 'translateZ(-8.5px)'
        };
        return transforms[depthClass] || 'translateZ(0)';
    }
});
