 const colors = [
            { name: 'G1', value: '#144955', time: 0 },
            { name: 'G2', value: '#146151', time: 2 },
            { name: 'G3', value: '#498558', time: 4 },
            { name: 'G4', value: '#7faa5e', time: 6 },
            { name: 'G5', value: '#b4ce65', time: 8 },
            { name: 'G6', value: '#cfdd3c', time: 10 }
        ];
        
        let currentPosition = 0;
        let animationFrame = null;
        let isHoldingUp = false;
        let isHoldingDown = false;
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
            if (!isHoldingUp && !isHoldingDown) return;
            
            const now = Date.now();
            const deltaTime = (now - lastUpdateTime) / 1000;
            lastUpdateTime = now;
            
            if (isHoldingUp) {
                currentPosition += deltaTime;
            } else if (isHoldingDown) {
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
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                isHoldingUp = false;
                if (!isHoldingDown && animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
            } else if (e.key === 'ArrowDown') {
                isHoldingDown = false;
                if (!isHoldingUp && animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
            }
        });