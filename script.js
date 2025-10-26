// Pobranie elementu <canvas> z dokumentu HTML
const canvas = document.getElementById("demo");

// Pobranie kontekstu 2D – dzięki niemu można rysować po canvasie
const ctx = canvas.getContext("2d");

// Funkcja dopasowująca rozmiar canvasa do aktualnego rozmiaru okna
function resize() {
  canvas.width = window.innerWidth;   // szerokość = szerokość okna
  canvas.height = window.innerHeight; // wysokość = wysokość okna
}

// Nasłuchiwanie zdarzenia "resize" – gdy użytkownik zmieni rozmiar okna
window.addEventListener("resize", resize);

// Jednorazowe wywołanie przy starcie (żeby ustawić rozmiar)
resize();

// Zmienna czasu – używana do animacji (z każdą klatką rośnie)
let time = 0;

// Główna funkcja rysująca jedną klatkę animacji
function draw() {
  // Zwiększamy czas – kontroluje prędkość ruchu i animacji
  time += 0.8;

  // Skróty do szerokości i wysokości canvasa
  const w = canvas.width;
  const h = canvas.height;

  // --- RYSOWANIE TŁA NOCY ---
  // Kolor ciemny granat – imituje niebo nocą
  ctx.fillStyle = "#33025c";
  ctx.fillRect(0, 0, w, h); // wypełnienie całego ekranu prostokątem

  // --- RYSOWANIE GWIAZD ---
  for (let i = 1; i < 300; i++) { // pętla rysująca 100 gwiazd
    // Pozycja X każdej gwiazdy: przesuwana sinusoidą, żeby wyglądało jak błyskanie
    const x = (i * 123 + Math.sin(time * 0.04 + i) * 550) % w;

    // Pozycja Y zależy tylko od numeru gwiazdy (rozrzucone po ekranie)
    const y = (i++ * 321) % h;

    // Twinkle = migotanie (wartość między 0 i 1 zmieniająca przez czas)
    const twinkle = Math.sin(time * 0.05 + i) * 0.5 + 0.5;

    // Kolor i przezroczystość gwiazdy – używamy twinkle, żeby migała
    ctx.fillStyle = `rgba(255,255,200,${twinkle})`;

    // Mały kwadrat 2x2 piksele jako gwiazda
    ctx.fillRect(x, y, 6, 6);
  }

  // --- RYSOWANIE WARSTW BUDYNKÓW (PARALLAX) ---
  // Parallax = różne warstwy przesuwające się z różną prędkością
  for (let layer = 0; layer < 8; layer++) {
    // Każda warstwa porusza się z inną prędkością
    const speed = (layer + 1) * 0.4;

    // Kolor warstwy – im bliżej, tym jaśniejszy
    const color = ["#120a30", "#1a1040", "#261860"][layer];

    // Ustawiamy kolor do rysowania budynków
    ctx.fillStyle = color;

    // Każda warstwa ma kilka "budynków"
    for (let i = 0; i < 10; i++) {
      // Przesunięcie w osi X – efekt przesuwania w prawo
      const offset = (time * speed + i * 220) % w;
      const x = w - offset; // rysowanie od prawej do lewej

      // Wysokość budynku – lekko losowa, zależy od warstwy
      const buildingHeight = h / 2 + Math.sin(i++ + layer) * 20 + layer * 10;

      // Rysujemy prostokąt (budynek)
      ctx.fillRect(x, h - buildingHeight, 30, buildingHeight);
    }
  }

  // --- RYSOWANIE MGŁY NA DOLE ---
  // Tworzymy gradient od przezroczystego do czarnego
  const gradient = ctx.createLinearGradient(0, h * 0.7, 0, h);
  gradient.addColorStop(0, "rgba(100,100,200,0.3)"); // górna część – lekko szara
  gradient.addColorStop(1, "rgba(0,0,0,0.8)");       // dolna część – ciemna, prawie czarna

  // Wypełniamy cały dół gradientem
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // --- PONOWNE WYWOŁANIE FUNKCJI ---
  // requestAnimationFrame() prosi przeglądarkę o narysowanie kolejnej klatki
  requestAnimationFrame(draw);
}

// Pierwsze uruchomienie pętli animacji
draw();
