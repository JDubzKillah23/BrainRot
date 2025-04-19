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

document.addEventListener('keydown', () => {
  if (!dino.classList.contains('jump-animation')) jump();
});

document.getElementById("game").addEventListener("touchstart", () => {
  if (!dino.classList.contains("jump-animation")) jump();
});

const jumpBtn = document.getElementById("jump-btn");
if (jumpBtn) {
  jumpBtn.addEventListener("touchstart", () => {
    if (!dino.classList.contains("jump-animation")) jump();
  });
}

let gameInterval = setInterval(() => {
  if (isDead) return;
  const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
  const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
  score.innerText = parseInt(score.innerText) + Math.floor(Math.random() * 5 + 1);
  rock.style.display = rockLeft < 0 ? 'none' : '';
  if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
    isDead = true;
    if (sfxOn) laughSound.play();
    if (parseInt(score.innerText) > highScore) {
      highScore = parseInt(score.innerText);
      localStorage.setItem("highScore", highScore);
    }
    gameOverImg.style.display = "block";
    phonk.pause();
    rock.style.animationPlayState = "paused";
    dino.style.animationPlayState = "paused";

    setTimeout(() => {
      const restartBtn = document.createElement("button");
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
    }, 500);
  }
}, 33);

const brainrotQuotes = [
  "bro is not real", "what is bro cooking", "bro thinks hes him", "nahhh",
  "bro got caught lacking", "you fell off", "skibidi", "gyatt", "sigma", "bark for me",
  "NPC behavior", "Ohio moment", "bro is an op", "rizz god", "on god", "no cap", "sus",
  "bro is tweaking", "mid", "who asked", "bozo", "cringe", "touch grass", "ratio", "L take",
  "cry about it", "he is cooked", "get good", "copium", "skill issue", "bro is lagging",
  "actual NPC", "you are free", "dogwater", "get packed", "EZ clap", "no maidens",
  "built different", "he is lost", "that is tough", "do not care", "bro thinks hes in an edit",
  "bro is the main character", "bro thinks hes slick", "he is a munch", "broke boy",
  "literal bot", "devious", "sheeeesh", "violated", "bro got humbled", "caught in 4k",
  "meat riding is crazy", "you are done", "he got folded", "back to the lobby",
  "you fell off plus L plus ratio", "emotional damage", "bro cannot recover",
  "outplayed", "brainrot", "not even close", "sit down", "bro is finished", "say sike",
  "bro is hallucinating", "that is a flag", "aint no way", "built like a fridge",
  "mommy issues", "bro got that rizzy disease", "caught lacking IRL", "you are not that guy",
  "rizzler of Oz", "bro started lagging IRL", "get yo money up", "crazy work", "goofy ahh",
  "this is a W", "clap those cheeks", "you are the weakest link", "hes mid tier",
  "F to pay respects"
];

function showBrainrot() {
  if (isDead) return;
  const randomQuote = brainrotQuotes[Math.floor(Math.random() * brainrotQuotes.length)];
  speechBubble.innerText = randomQuote;
  speechBubble.style.display = "block";
  setTimeout(() => {
    speechBubble.style.display = "none";
  }, 2500);
}

let elapsedSeconds = 0;
setInterval(() => {
  elapsedSeconds += 1;
  if (elapsedSeconds % 5 === 0 && !isDead) {
    showBrainrot();
  }
}, 1000);
