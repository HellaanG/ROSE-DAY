/* 💬 Surprise Messages */
const messages = [
  "Every day with you feels like a gift I never deserved but always prayed for ❤️",
  "Your love is my safest place, my peace, my home 🫶",
  "Even in silence, my heart speaks your name 💖",
  "You make my ordinary days feel magical ✨",
  "No matter how far, my heart is always with you 💌"
];

let msgIndex = 0;

function nextMessage() {
  const msg = document.getElementById("message");
  msg.classList.remove("fade-in");
  setTimeout(() => {
    msg.innerText = messages[msgIndex];
    msg.classList.add("fade-in");
    msgIndex = (msgIndex + 1) % messages.length;
  }, 200);
}

/* 🎵 SONG LOGIC (NO REPEAT + TOGGLE PLAY/STOP) */
const songs = ["Engae Irul Endralum.mp3", "Nallai_Allai.mp3", "Nenjil Maamazhai.mp3", "Vazhithunai.mp3"];
const audio = document.getElementById("music");
let lastSongIndex = -1;
let isPlaying = false;

function toggleSong() {
  if (isPlaying) {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("songBtn").innerText = "Play Our Song 🎵";
    isPlaying = false;
    roseIntervalTime = 600;
  } else {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === lastSongIndex);

    lastSongIndex = randomIndex;
    audio.src = songs[randomIndex];
    audio.play();
    document.getElementById("songBtn").innerText = "Stop Song ⏸";
    isPlaying = true;
    roseIntervalTime = 300;
  }
}

/* 🌹 Roses Speed Control */
let roseIntervalTime = 600;

function createRose() {
  const rose = document.createElement("div");
  rose.className = "rose";
  rose.innerText = "🌹";
  rose.style.left = Math.random() * window.innerWidth + "px";
  rose.style.animationDuration = (Math.random() * 2 + 3) + "s";
  document.body.appendChild(rose);
  setTimeout(() => rose.remove(), 5000);
}

setInterval(() => {
  createRose();
}, 600);

/* 🔐 PASSWORD */
const SECRET_PASSWORD = "14SEPT2024";
function askPassword() { document.getElementById("passwordBox").style.display = "flex"; }
function closePassword() { document.getElementById("passwordBox").style.display = "none"; }
function showPasswordClue() { document.getElementById("clueBox").style.display = "flex"; }
function closeClue() { document.getElementById("clueBox").style.display = "none"; }

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === SECRET_PASSWORD) {
    closePassword();
    openLetter();
  } else {
    document.getElementById("passwordError").innerText = "Wrong password 😢 Try again";
  }
}

function openLetter() {
  document.getElementById("letterBox").style.display = "flex";
  startFireworks();
}
function closeLetter() {
  document.getElementById("letterBox").style.display = "none";
  stopFireworks();
}

/* 🎆 FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];
let fireworksInterval;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function startFireworks() {
  fireworksInterval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;

    for (let i = 0; i < 25; i++) {
      particles.push({
        x, y,
        dx: (Math.random() - 0.5) * 5,
        dy: (Math.random() - 0.5) * 5,
        life: 50
      });
    }
  }, 600);

  animateFireworks();
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillRect(p.x, p.y, 2, 2);
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animateFireworks);
}

function stopFireworks() {
  clearInterval(fireworksInterval);
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
