document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const initialStep = document.getElementById('initial-step');
    const greetingStep = document.getElementById('greeting-step');
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Particle Configuration
    let particles = [];
    const particleCount = 25;
    const colors = ['#ff758c', '#ff7eb3', '#f8bbd0', '#ff4081'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class HeartParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 15 + 10;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.4;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();

            // Heart shape drawing
            const topY = -this.size / 2;
            ctx.moveTo(0, topY + this.size / 4);
            ctx.bezierCurveTo(0, topY, -this.size / 2, topY, -this.size / 2, topY + this.size / 4);
            ctx.bezierCurveTo(-this.size / 2, topY + (this.size * 5) / 8, 0, topY + (this.size * 3) / 4, 0, topY + this.size);
            ctx.bezierCurveTo(0, topY + (this.size * 3) / 4, this.size / 2, topY + (this.size * 5) / 8, this.size / 2, topY + this.size / 4);
            ctx.bezierCurveTo(this.size / 2, topY, 0, topY, 0, topY + this.size / 4);

            ctx.fill();
            ctx.restore();
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new HeartParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // Button Click Logic
    openBtn.addEventListener('click', () => {
        // Transition steps
        initialStep.classList.add('hidden');

        // Timeout to allow hidden display none to take effect before removing hidden from next step
        setTimeout(() => {
            initialStep.style.display = 'none';
            greetingStep.classList.remove('hidden');

            // Init and Start Particles
            initParticles();
            animate();
        }, 500);
    });
});
