const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
let highScore = localStorage.getItem("highScore") || 0;
updateHighScoreDisplay();

function updateHighScoreDisplay() {
  if (!document.getElementById("high-score")) {
    const highScoreEl = document.createElement("h2");
    highScoreEl.id = "high-score";
    highScoreEl.style.textAlign = "center";
    highScoreEl.style.color = "black";
    highScoreEl.innerText = "🏆 High Score: " + highScore;
    score.insertAdjacentElement("afterend", highScoreEl);
  } else {
    document.getElementById("high-score").innerText = "🏆 High Score: " + highScore;
  }
}

const speechBubble = document.getElementById("speech-bubble");
const gameOverImg = document.getElementById("game-over-image");
const phonk = document.getElementById("phonk");
const jumpSound = new Audio("jump.mp3");
jumpSound.preload = "auto";
const laughSound = new Audio("laugh.mp3");

let musicOn = localStorage.getItem("musicOn") === "false" ? false : true;
let sfxOn = localStorage.getItem("sfxOn") === "false" ? false : true;

phonk.volume = 0.5;
if (musicOn) {
  phonk.play().catch(() => {
    document.addEventListener("click", () => phonk.play(), { once: true });
  });

}

const musicBtn = document.getElementById("toggle-music");
musicBtn.innerText = `🎶 Music: ${musicOn ? "On" : "Off"}`;
musicBtn.addEventListener("click", () => {
  musicOn = !musicOn;
  localStorage.setItem("musicOn", musicOn);
  musicBtn.innerText = `🎶 Music: ${musicOn ? "On" : "Off"}`;
  musicOn ? phonk.play() : phonk.pause();
});

const sfxBtn = document.getElementById("toggle-sfx");
sfxBtn.innerText = `🔊 Sound: ${sfxOn ? "On" : "Off"}`;
sfxBtn.addEventListener("click", () => {
  sfxOn = !sfxOn;
  localStorage.setItem("sfxOn", sfxOn);
  sfxBtn.innerText = `🔊 Sound: ${sfxOn ? "On" : "Off"}`;
});

let isDead = false;

function jump() {
  if (isDead) return;
  if (sfxOn) {
    jumpSound.currentTime = 0;
    jumpSound.play();
  }
  dino.classList.add("jump-animation");
  setTimeout(() => dino.classList.remove("jump-animation"), 300);
}

document.addEventListener('keydown', () => { if (!dino.classList.contains('jump-animation')) jump(); });
document.getElementById("game").addEventListener("touchstart", () => { if (!dino.classList.contains("jump-animation")) jump(); });
const jumpBtn = document.getElementById("jump-btn");
if (jumpBtn) jumpBtn.addEventListener("touchstart", () => { if (!dino.classList.contains("jump-animation")) jump(); });

let gameInterval = setInterval(() => {
  if (isDead) return;
  const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
  const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
  if (!score.innerText) score.innerText = "0";
  score.innerText = parseInt(score.innerText) + Math.floor(Math.random() * 5 + 1);
  rock.style.display = rockLeft < 0 ? 'none' : '';
  if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
    endGame();
  }
}, 33);

const brainrotQuotes = ["fuck you", "67", "mason", "nahhh", "bro got caught lacking", "you fell off", "skibidi", "gyatt", "sigma", "bark for me", "NPC behavior", "Ohio moment", "bro is a fucking op", "rizz god", "on god", "no cap", "sus", "bro is tweaking", "mid", "who asked", "balls deep", "cringe", "touch grass", "ratio", "L take", "cry about it", "he is cooked", "get good", "copium", "skill issue", "bro is lagging", "actual NPC", "you are free", "dogwater", "get packed", "EZ clap", "no maidens", "built different", "cant put down the cup", "that is tough", "do not care", "bro thinks hes in an edit", "bro is the main character", "bro thinks hes slick", "We Are Charlie Kirk!!!", "broke boy", "literal bot", "devious", "sheeeesh", "violated", "bro got humbled", "caught in 4k", "meat riding is crazy", "you are done", "he got folded", "back to the lobby", "you fell off plus L plus ratio", "emotional damage", "bro cannot recover", "outplayed", "brainrot", "We Are Charlie Kirk!!!", "We Are Charlie Kirk!!!", "bro is finished", "say sike", "bro is hallucinating", "that is a flag", "aint no way", "built like a fridge", "mommy issues", "Wnba ahh green dildo", "caught lacking IRL", "you are not that guy", "rizzler of Oz", "bro started lagging IRL", "get yo money up", "crazy work", "goofy ahh", "this is a W", "clap those cheeks", "I fucked your mommy last night", "hes mid tier", "F to pay respects"];

function showBrainrot() {
  if (isDead) return;
  const randomQuote = brainrotQuotes[Math.floor(Math.random() * brainrotQuotes.length)];
  speechBubble.innerText = randomQuote;
  speechBubble.style.display = "block";
  setTimeout(() => { speechBubble.style.display = "none"; }, 2500);
}

let elapsedSeconds = 0;
setInterval(() => {
  elapsedSeconds += 1;
  if (elapsedSeconds % 5 === 0 && !isDead) showBrainrot();
}, 1000);

/* Cannonball from top-right, low trajectory */
function spawnCannonball() {
  if (isDead) return;

  const cannonball = document.createElement('div');
  cannonball.classList.add('cannonball');

  const gameRect = document.getElementById('game').getBoundingClientRect();
  const startX = gameRect.width - 40; // top-right corner
  const startY = 150; // low enough to dodge

  cannonball.style.left = startX + 'px';
  cannonball.style.top = startY + 'px';
  document.getElementById('game').appendChild(cannonball);

  const dinoRect = dino.getBoundingClientRect();
  const dinoX = dinoRect.left - gameRect.left;
  const dinoY = dinoRect.top - gameRect.top;

  // Add speed factor here
  const speedFactor = 2; // 1 = normal, 2 = twice as fast, 0.5 = half speed
  const dx = (dinoX - startX) * speedFactor;
  const dy = (dinoY - startY) * speedFactor;

  cannonball.style.setProperty('--dx', dx + 'px');
  cannonball.style.setProperty('--dy', dy + 'px');

  const interval = setInterval(() => {
    const cRect = cannonball.getBoundingClientRect();
    const dRect = dino.getBoundingClientRect();
    const overlap = !(
      cRect.right < dRect.left ||
      cRect.left > dRect.right ||
      cRect.bottom < dRect.top ||
      cRect.top > dRect.bottom
    );
    if (overlap) {
      clearInterval(interval);
      cannonball.remove();
      // endGame();  <-- removed so Juan doesn't die
      if (sfxOn) laughSound.play(); // optional feedback that you got hit
    }

  }, 30);

  setTimeout(() => { clearInterval(interval); cannonball.remove(); }, 2000);
}

// Random cannonballs every 5-10s
setInterval(() => {
  if (!isDead && Math.random() < 0.5) spawnCannonball();
}, 200);

/* END GAME FUNCTION */
function endGame() {
  if (isDead) return;
  isDead = true;
  if (sfxOn) laughSound.play();
  if (parseInt(score.innerText) > highScore) {
    highScore = parseInt(score.innerText);
    localStorage.setItem("highScore", highScore);
    updateHighScoreDisplay();
  }
  gameOverImg.style.display = "block";
  phonk.pause();
  rock.style.animationPlayState = "paused";
  dino.style.animationPlayState = "paused";

  setTimeout(() => {
    if (!document.getElementById("restart-btn")) {
      const restartBtn = document.createElement("button");
      restartBtn.id = "restart-btn";
      restartBtn.innerText = "🔁 Restart";
      restartBtn.style.position = "absolute";
      restartBtn.style.top = "60%";
      restartBtn.style.left = "50%";
      restartBtn.style.transform = "translate(-50%, -50%)";
      restartBtn.style.padding = "10px 20px";
      restartBtn.style.fontSize = "18px";
      restartBtn.style.backgroundColor = "#ff4747";
      restartBtn.style.color = "white";
      restartBtn.style.border = "none";
      restartBtn.style.borderRadius = "10px";
      restartBtn.style.cursor = "pointer";
      restartBtn.style.zIndex = "999";
      restartBtn.addEventListener("click", () => location.reload());
      document.body.appendChild(restartBtn);
    }
  }, 500);
}
const logo = document.getElementById("dvd-logo");
const game = document.getElementById("game"); // the container div

// starting position
let posX = Math.random() * (game.clientWidth - 100); // 100 = logo width
let posY = Math.random() * (game.clientHeight - 100); // 100 = logo height

// starting velocity
let velX = 20 + Math.random() * 2; // pixels per frame
let velY = 20 + Math.random() * 2;

// choose random direction
if (Math.random() < 0.5) velX *= -1;
if (Math.random() < 0.5) velY *= -1;

function moveLogo() {
  // update position
  posX += velX;
  posY += velY;

  // bounce off left/right edges
  if (posX <= 0 || posX + logo.clientWidth >= game.clientWidth) {
    velX *= -1;
  }

  // bounce off top/bottom edges
  if (posY <= 0 || posY + logo.clientHeight >= game.clientHeight) {
    velY *= -1;
  }

  // apply position
  logo.style.left = posX + "px";
  logo.style.top = posY + "px";

  requestAnimationFrame(moveLogo); // smooth animation
}

// start the animation
moveLogo();
const overlay = document.getElementById("color-overlay");

// List of random images/GIFs
const distractionImages = [
  "br1.gif",
  "br2.gif",
  "br3.gif",
  "br4.gif"
];
// Spawn a distraction
function spawnDistraction(alwaysHere = false) {
  const img = document.createElement("img");
  img.src = distractionImages[Math.floor(Math.random() * distractionImages.length)];
  img.classList.add("distraction");

  // Random starting position
  img.style.left = Math.random() * (game.clientWidth - 80) + "px";
  img.style.top = Math.random() * (game.clientHeight - 80) + "px";

  game.appendChild(img);

  // Random jitter movement
  const dx = (Math.random() - 0.5) * 6;
  const dy = (Math.random() - 0.5) * 6;
  const moveInterval = setInterval(() => {
    let newX = parseFloat(img.style.left) + dx;
    let newY = parseFloat(img.style.top) + dy;

    // bounce inside game
    if (newX < 0 || newX > game.clientWidth - 80) img.style.left = parseFloat(img.style.left) - dx + "px";
    else img.style.left = newX + "px";

    if (newY < 0 || newY > game.clientHeight - 80) img.style.top = parseFloat(img.style.top) - dy + "px";
    else img.style.top = newY + "px";
  }, 100);

  // Remove if temporary
  if (!alwaysHere) setTimeout(() => {
    clearInterval(moveInterval);
    img.remove();
  }, 3000 + Math.random() * 3000);
}

// Spawn a few permanent distractions
for (let i = 0; i < 3; i++) spawnDistraction(true);

// Spawn random temporary distractions every second
setInterval(() => { if (!isDead) spawnDistraction(false); }, 1000);

// Screen shake effect
function shakeScreen(duration = 400, intensity = 10) {
  const start = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - start;
    if (elapsed > duration) {
      game.style.transform = "";
      clearInterval(interval);
      return;
    }
    const x = (Math.random() - 0.5) * intensity;
    const y = (Math.random() - 0.5) * intensity;
    game.style.transform = `translate(${x}px, ${y}px)`;
  }, 16);
}

// Color overlay effect
function randomColorOverlay() {
  overlay.style.backgroundColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
  overlay.style.filter = "saturate(2) contrast(2)";
}

// Trigger effects randomly
setInterval(() => {
  if (!isDead) {
    shakeScreen();
    randomColorOverlay();
  }
}, 3000);
function scaleGame() {
  const baseWidth = 600;
  const baseHeight = 300;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;

  const scale = Math.min(scaleX, scaleY);

  game.style.transform = `scale(${scale})`;
}

