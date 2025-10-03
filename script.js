// [AI Generated] Data: 03/10/2025
// Descrição: Animações de entrada por interseção e confetes ao abrir o convite
// Gerado por: Cursor AI
// Versão: ES2020
// AI_GENERATED_CODE_START 
(function () {
  "use strict";

  // Utilitário: throttle simples
  function throttle(fn, wait) {
    let lastTime = 0;
    return function throttled() {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, arguments);
      }
    };
  }

  // 1) Animação de entrada por IntersectionObserver
  const animated = Array.from(document.querySelectorAll('.animate-in'));
  if ('IntersectionObserver' in window && animated.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.2 });
    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('is-visible'));
  }

  // 2) Confetes simples em canvas
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  if (!canvas || !ctx) return;

  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const confettiCount = Math.min(140, Math.floor(window.innerWidth / 6));
  const gravity = 0.15;
  const terminalVelocity = 3.5;
  const drag = 0.005;
  const colors = [
    { front: '#22c55e', back: '#15803d' },
    { front: '#60a5fa', back: '#2563eb' },
    { front: '#f472b6', back: '#db2777' },
    { front: '#fbbf24', back: '#d97706' },
  ];

  function resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  const onResize = throttle(resizeCanvas, 200);
  window.addEventListener('resize', onResize);
  resizeCanvas();

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Confetto() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dimensions = {
      x: randomRange(6, 12),
      y: randomRange(10, 18)
    };
    this.position = {
      x: randomRange(0, canvas.width / DPR),
      y: randomRange(-20, -canvas.height / (2 * DPR))
    };
    this.rotation = randomRange(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = {
      x: randomRange(-1, 1),
      y: randomRange(0, 1)
    };
  }

  Confetto.prototype.update = function update() {
    this.velocity.x -= this.velocity.x * drag;
    this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation += this.velocity.x * 0.05;
    this.scale.y = Math.cos((this.position.y + this.rotation) * 0.1);
  };

  Confetto.prototype.draw = function draw() {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.fillStyle = this.scale.y > 0 ? this.color.front : this.color.back;
    ctx.fillRect(-this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
    ctx.restore();
  };

  let confetti = [];
  function initConfetti() {
    confetti = new Array(confettiCount).fill(0).map(() => new Confetto());
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      c.update();
      c.draw();
    });
    confetti = confetti.filter((c) => c.position.y < canvas.height / DPR + 40);
    requestAnimationFrame(render);
  }

  // Dispara confetes ao carregar a página
  initConfetti();
  render();

  // Re-disparar ao focar/retornar
  window.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      initConfetti();
    }
  });
})();
// AI_GENERATED_CODE_END 

