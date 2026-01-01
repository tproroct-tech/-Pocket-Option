// Copy promo code to clipboard
function copyPromoCode() {
    const promoCode = document.getElementById('promoCode').textContent;
    const notification = document.getElementById('copyNotification');

    // Use modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(promoCode).then(() => {
            showNotification();
        }).catch(err => {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(promoCode);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(promoCode);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

// Show notification
function showNotification() {
    const notification = document.getElementById('copyNotification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Trading Chart Drawing
function drawTradingChart() {
    const canvas = document.getElementById('tradingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    if (canvas.width === 0 || canvas.height === 0) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw multiple trading lines
    ctx.strokeStyle = 'rgba(255, 140, 0, 0.4)';
    ctx.lineWidth = 2;
    
    // Draw 3-4 different trading lines
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const startY = padding + Math.random() * chartHeight * 0.3;
        let x = padding;
        let y = startY;
        
        ctx.moveTo(x, y);
        
        const segments = 15;
        const segmentWidth = chartWidth / segments;
        
        for (let j = 0; j < segments; j++) {
            x += segmentWidth;
            // Create realistic trading fluctuations
            const change = (Math.random() - 0.5) * chartHeight * 0.15;
            y += change;
            y = Math.max(padding, Math.min(height - padding, y));
            ctx.lineTo(x, y);
        }
        
        ctx.stroke();
    }
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(58, 58, 58, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i < 5; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i < 6; i++) {
        const x = padding + (chartWidth / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
}

// Initialize chart on load and resize
window.addEventListener('load', () => {
    setTimeout(drawTradingChart, 100);
});

window.addEventListener('resize', () => {
    setTimeout(drawTradingChart, 100);
});

// Redraw periodically for subtle animation
setInterval(() => {
    drawTradingChart();
}, 5000);

