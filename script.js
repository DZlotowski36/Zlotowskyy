const canvas = document.getElementById("demo");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let time = 0;

function draw() {
  time += 0.5;
  const w = canvas.width;
  const h = canvas.height;

  // --- Nocne tło ---
  ctx.fillStyle = "#0a0320";
  ctx.fillRect(0, 0, w, h);

  // --- Gwiazdy ---
  for (let i = 0; i < 100; i++) {
    const x = (i * 123 + Math.sin(time * 0.01 + i) * 500) % w;
    const y = (i * 321) % h;
    const twinkle = Math.sin(time * 0.05 + i) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,255,200,${twinkle})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // --- Sylwetki budynków (parallax) ---
  for (let layer = 0; layer < 3; layer++) {
    const speed = (layer + 1) * 0.2;
    const color = ["#120a30", "#1a1040", "#261860"][layer];
    ctx.fillStyle = color;
    for (let i = 0; i < 10; i++) {
      const offset = (time * speed + i * 200) % w;
      const x = w - offset;
      const buildingHeight = h / 3 + Math.sin(i + layer) * 40 + layer * 40;
      ctx.fillRect(x, h - buildingHeight, 80, buildingHeight);
    }
  }

  // --- Mgiełka ---
  const gradient = ctx.createLinearGradient(0, h * 0.7, 0, h);
  gradient.addColorStop(0, "rgba(100,100,150,0.1)");
  gradient.addColorStop(1, "rgba(0,0,0,0.8)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  requestAnimationFrame(draw);
}

draw();
