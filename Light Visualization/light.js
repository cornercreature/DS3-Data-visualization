// Color palette definition
const colorPalette = {
    G1: '#144955',
    G2: '#146151',
    G3: '#498558',
    G4: '#7faa5e',
    G5: '#b4ce65',
    G6: '#cfdd3c'
};

// Color sequence timeline
const colors = [
    { name: 'G6', time: 0 },
    { name: 'G4', time: 2.5 },
    { name: 'G6', time: 7.5 },
    { name: 'G1', time: 9 },
    { name: 'G6', time: 19 },
    { name: 'G2', time: 21 },
    { name: 'G3', time: 23 },
    { name: 'G4', time: 25 },
    { name: 'G2', time: 28 },
    { name: 'G5', time: 30 },
    { name: 'G1', time: 32.5 },
    { name: 'G4', time: 36.5 },
    { name: 'G3', time: 40 },
    { name: 'G6', time: 43.5 },
    { name: 'G3', time: 45 },
    { name: 'G1', time: 52 },
    { name: 'G6', time: 53 },
    { name: 'G1', time: 53.5 },
    { name: 'G6', time: 54 },
    { name: 'G2', time: 56 },
    { name: 'G6', time: 57 },
    { name: 'G2', time: 58.5 },
    { name: 'G6', time: 59.5 },
    { name: 'G1', time: 61 },
    { name: 'G5', time: 64 },
    { name: 'G1', time: 65 },
    { name: 'G5', time: 67 },
    { name: 'G1', time: 68 },
    { name: 'G5', time: 69 },
    { name: 'G3', time: 70 },
    { name: 'G1', time: 72 },
    { name: 'G1', time: 74 },
    { name: 'G4', time: 78 },
    { name: 'G3', time: 80 },
    { name: 'G5', time: 85 },
    { name: 'G3', time: 86.5 },
    { name: 'G4', time: 88.5 },
    { name: 'G5', time: 90 },
    { name: 'G6', time: 92.5 },
    { name: 'G5', time: 96 },
    { name: 'G4', time: 97 },
    { name: 'G5', time: 98 },
    { name: 'G4', time: 99 },
    { name: 'G5', time: 101 },
    { name: 'G4', time: 103 },
    { name: 'G6', time: 105 },
    { name: 'G4', time: 107 },
    { name: 'G5', time: 109.5 },
    { name: 'G6', time: 112 },
    { name: 'G1', time: 114 },
    { name: 'G2', time: 119 },
    { name: 'G4', time: 122 },
    { name: 'G2', time: 125 },
    { name: 'G4', time: 129.5 },
    { name: 'G6', time: 132 },
    { name: 'G1', time: 132.5 },
    { name: 'G4', time: 134 },
    { name: 'G6', time: 135 },
    { name: 'G1', time: 136 },
    { name: 'G4', time: 138 },
    { name: 'G6', time: 139 },
    { name: 'G4', time: 141 },
    { name: 'G2', time: 143.5 },
    { name: 'G4', time: 144 },
    { name: 'G3', time: 145 },
    { name: 'G2', time: 148 },
    { name: 'G4', time: 150 },
    { name: 'G2', time: 152 },
    { name: 'G4', time: 156 },
    { name: 'G2', time: 157 },
    { name: 'G5', time: 158.5 },
    { name: 'G2', time: 160 },
    { name: 'G3', time: 161 },
    { name: 'G2', time: 162.5 },
    { name: 'G5', time: 164 },
    { name: 'G2', time: 169.5 },
    { name: 'G3', time: 177.5 },
    { name: 'G2', time: 179.5 },
    { name: 'G3', time: 184.5 },
    { name: 'G4', time: 192.5 },
    { name: 'G1', time: 194.5 },
    { name: 'G6', time: 196 },
    { name: 'G1', time: 197 },
    { name: 'G6', time: 198 },
    { name: 'G3', time: 199.5 },
    { name: 'G6', time: 205 }
].map(item => ({ ...item, value: colorPalette[item.name] }));

let currentPosition = 0;
let animationFrame = null;
let isHoldingUp = false;
let isHoldingDown = false;
let isHoldingRight = false;
let isHoldingLeft = false;
let lastUpdateTime = Date.now();

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function interpolateColor(color1, color2, factor) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = rgb1.r + factor * (rgb2.r - rgb1.r);
    const g = rgb1.g + factor * (rgb2.g - rgb1.g);
    const b = rgb1.b + factor * (rgb2.b - rgb1.b);

    return rgbToHex(r, g, b);
}

function updateColor() {
    const useRightLeft = currentPosition >= 50 && currentPosition < 112;
    const isAdvancing = useRightLeft ? isHoldingRight : isHoldingUp;
    const isReversing = useRightLeft ? isHoldingLeft : isHoldingDown;

    if (!isAdvancing && !isReversing) return;

    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 1000;
    lastUpdateTime = now;

    if (isAdvancing) {
        currentPosition += deltaTime;
    } else if (isReversing) {
        currentPosition -= deltaTime;
    }

    const maxTime = colors[colors.length - 1].time;
    currentPosition = Math.max(0, Math.min(maxTime, currentPosition));

    document.getElementById('holdTime').textContent = currentPosition.toFixed(1);

    let currentColor = colors[0].value;
    let currentColorName = colors[0].name;

    for (let i = 0; i < colors.length - 1; i++) {
        if (currentPosition >= colors[i].time && currentPosition < colors[i + 1].time) {
            const timeDiff = colors[i + 1].time - colors[i].time;
            const progress = (currentPosition - colors[i].time) / timeDiff;
            currentColor = interpolateColor(colors[i].value, colors[i + 1].value, progress);
            currentColorName = colors[i].name;
            break;
        }
    }

    if (currentPosition >= colors[colors.length - 1].time) {
        currentColor = colors[colors.length - 1].value;
        currentColorName = colors[colors.length - 1].name;
    }

    document.body.style.backgroundColor = currentColor;
    document.getElementById('colorName').textContent = currentColorName;

    animationFrame = requestAnimationFrame(updateColor);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && !isHoldingUp) {
        isHoldingUp = true;
        lastUpdateTime = Date.now();
        if (!animationFrame) {
            updateColor();
        }
    } else if (e.key === 'ArrowDown' && !isHoldingDown) {
        isHoldingDown = true;
        lastUpdateTime = Date.now();
        if (!animationFrame) {
            updateColor();
        }
    } else if (e.key === 'ArrowRight' && !isHoldingRight) {
        isHoldingRight = true;
        lastUpdateTime = Date.now();
        if (!animationFrame) {
            updateColor();
        }
    } else if (e.key === 'ArrowLeft' && !isHoldingLeft) {
        isHoldingLeft = true;
        lastUpdateTime = Date.now();
        if (!animationFrame) {
            updateColor();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        isHoldingUp = false;
        if (!isHoldingDown && !isHoldingRight && !isHoldingLeft && animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    } else if (e.key === 'ArrowDown') {
        isHoldingDown = false;
        if (!isHoldingUp && !isHoldingRight && !isHoldingLeft && animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    } else if (e.key === 'ArrowRight') {
        isHoldingRight = false;
        if (!isHoldingUp && !isHoldingDown && !isHoldingLeft && animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    } else if (e.key === 'ArrowLeft') {
        isHoldingLeft = false;
        if (!isHoldingUp && !isHoldingDown && !isHoldingRight && animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }
});
