// 智能定位popup卡片，避免超出屏幕
document.addEventListener('DOMContentLoaded', function() {
    const pins = document.querySelectorAll('.pin');
    const map = document.querySelector('.map');

    // 桌面端：hover 即时定位
    pins.forEach(pin => {
        const popup = pin.querySelector('.popup-card');
        pin.addEventListener('mouseenter', function() {
            openCard(pin, popup);
        });
        pin.addEventListener('mouseleave', function() {
            closeCard(popup);
        });

        // 移动端：点击/触摸切换
        pin.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCard(pin, popup);
        });
        pin.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            toggleCard(pin, popup);
        }, { passive: true });
    });

    // 点击空白区域关闭
    document.addEventListener('click', function() {
        document.querySelectorAll('.popup-card').forEach(closeCard);
    });
});

function positionCard(pin, popup) {
    // 移除所有之前的位置类
    popup.classList.remove('position-top', 'position-bottom', 'position-left', 'position-right');
    
    // 获取pin的位置信息（相对于视口）
    const pinRect = pin.getBoundingClientRect();
    
    // 先临时显示以获得真实尺寸
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
    popup.style.transform = 'none';
    popup.style.display = 'block';
    const popupRect = popup.getBoundingClientRect();
    popup.style.display = '';
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const SAFE = 12; // 安全边距
    
    // 重置内联定位（用于fixed定位）
    popup.style.top = '';
    popup.style.bottom = '';
    popup.style.left = '';
    popup.style.right = '';
    
    let left, top;
    
    // 默认优先显示在右侧
    if (pinRect.right + 15 + popupRect.width > viewportWidth) {
        // 右侧空间不够，尝试左侧
        if (pinRect.left - 15 - popupRect.width > 0) {
            // 左侧
            left = pinRect.left - popupRect.width - 15;
            // 垂直居中于pin
            top = pinRect.top + (pinRect.height / 2) - (popupRect.height / 2);
        } else {
            // 上方
            left = pinRect.left;
            top = pinRect.top - popupRect.height - 15;
        }
    } else {
        // 右侧有空间
        left = pinRect.right + 15;
        // 垂直居中于pin
        top = pinRect.top + (pinRect.height / 2) - (popupRect.height / 2);
    }
    
    // 边界夹取：确保不超出视口
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    
    // 水平边界
    left = clamp(left, SAFE, viewportWidth - popupRect.width - SAFE);
    
    // 垂直边界
    top = clamp(top, SAFE, viewportHeight - popupRect.height - SAFE);
    
    // 设置fixed定位
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
}

function openCard(pin, popup) {
    positionCard(pin, popup);
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
}

function closeCard(popup) {
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
}

function toggleCard(pin, popup) {
    const visible = popup.style.visibility === 'visible' || getComputedStyle(popup).visibility === 'visible';
    if (visible) {
        closeCard(popup);
    } else {
        // 先关闭其它卡片
        document.querySelectorAll('.popup-card').forEach(el => el !== popup && closeCard(el));
        openCard(pin, popup);
    }
}

// 响应窗口大小变化
window.addEventListener('resize', function() {
    // 当窗口大小变化时，重新定位所有popup
    document.querySelectorAll('.pin').forEach(pin => {
        const popup = pin.querySelector('.popup-card');
        const visible = popup && (popup.style.visibility === 'visible' || getComputedStyle(popup).visibility === 'visible');
        if (visible) positionCard(pin, popup);
    });
});

