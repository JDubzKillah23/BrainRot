const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const speechBubble = document.getElementById("speech-bubble");

// --- JUMP LOGIC ---
function jump() {
  dino.classList.add("jump-animation");
  setTimeout(() => dino.classList.remove("jump-animation"), 300);
}

// Keyboard support
document.addEventListener('keydown', () => {
  if (!dino.classList.contains('jump-animation')) {
    jump();
  }
});

// Touchscreen support
document.getElementById("game").addEventListener("touchstart", () => {
  if (!dino.classList.contains("jump-animation")) {
    jump();
  }
});

// Optional mobile button
const jumpBtn = document.getElementById("jump-btn");
if (jumpBtn) {
  jumpBtn.addEventListener("touchstart", () => {
    if (!dino.classList.contains("jump-animation")) {
      jump();
    }
  });
}

// --- GAME LOOP ---
setInterval(() => {
  const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
  const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));

  score.innerText = parseInt(score.innerText) + Math.floor(Math.random() * 5 + 1);

  if (rockLeft < 0) {
    rock.style.display = 'none';
  } else {
    rock.style.display = '';
  }

  if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
    const laugh = new Audio("laugh.mp3");
    laugh.play();

    setTimeout(() => {
      alert("💀💀💀 You Got Ohiod with a score of: " + score.innerText + "\n\nTry again, brave soul?");
      location.reload();
    }, 500); // delay so laugh can play a bit
  }
}, 33);

// --- BRAINROT ---
const brainrotQuotes = [
  "HELP ME BRO", "I ATE A CACTUS 💀", "RUNNING ON 3 PIXELS", "WHO GAVE HIM LEGS", "I'M HIM!!",
  "JUAN MODE ACTIVATED", "EL DINOSO SAUCE", "GRITTY INCOMING 🕺", "YO MAMA 💀", "CACTUS GANKED ME",
  "gyatt", "rizzler", "it's giving", "bro thinks he's him", "delulu is the solulu", "nah this got lore",
  "skibidi", "sigma grindset", "mid", "cap", "no cap", "he cooked", "she ate", "he’s so babygirl",
  "real (not clickbait)", "bro is in his villain arc", "🗿", "ratio + L", "you fell off", "i fear", "be so fr",
  "you are not real", "npc behavior", "bro spawned in", "corecore", "me when", "silent rizz", "brain go brr",
  "slay", "it's giving mental illness", "that’s so me-coded", "he’s a red flag but i can fix him",
  "i’m literally shaking", "i diagnose you with ✨cringe✨", "bro's stuck in a skit", "this can't be canon",
  "he's cooking… wait no he's burning", "i’m just a little creature", "🧍", "nah this scripted",
  "crazy rizzy rizzler", "absolute goober moment", "they got the whole squad laughing",
  "not even in a goofy way", "bro in the group project doing nothing", "no thoughts, head empty",
  "i forgor 💀", "based", "unbased", "bro’s main quest is wild", "he got put in a blender", "real ones know",
  "this got hidden lore", "caught in 4k", "he got that dog in him 🐶", "girl dinner", "goblin mode",
  "bro's running on 2 braincells", "the math ain't mathing", "plot armor", "i can't even",
  "bro dropped his mixtape and it was mid", "help is this satire", "bro blinked and the game crashed",
  "he in his flop era", "i am once again asking for serotonin", "spawn camper", "bro glitched",
  "level 1 crook vs level 100 boss", "bro just like me frfr", "you weren’t there", "nah that's generational trauma",
  "respawned with no loot", "he lagged irl", "bro downloaded extra chromosomes",
  "wifi went out and he started freestyling", "he got that nepo baby DLC", "nerf this man",
  "patch notes when?", "he’s a side quest character", "this whole convo is side quest energy"
];

function showBrainrot() {
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
  if (elapsedSeconds % 5 === 0) {
    showBrainrot();
  }
}, 1000);
