const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const speechBubble = document.getElementById("speech-bubble");

// --- JUMP LOGIC ---
function jump() {
  const jumpSound = new Audio("jump.mp3");
  jumpSound.play();

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
  "bro is not real", "what is bro cooking", "bro thinks hes him",
  "nahhh", "bro got caught lacking", "you fell off",
  "skibidi", "gyatt", "sigma",
  "bark for me", "NPC behavior", "Ohio moment",
  "bro is an op", "rizz god", "that is wild",
  "on god", "no cap", "sus",
  "bro is tweaking", "mid", "who asked",
  "bozo", "cringe", "touch grass",
  "ratio", "L take", "cry about it",
  "he is cooked", "get good", "copium",
  "skill issue", "bro is lagging", "actual NPC",
  "you are free", "dogwater", "get packed",
  "EZ clap", "no maidens", "built different",
  "he is lost", "that is tough", "do not care",
  "bro thinks hes in an edit", "bro is the main character", "bro thinks hes slick",
  "he is a munch", "broke boy", "literal bot",
  "devious", "sheeeesh", "violated",
  "bro got humbled", "caught in 4k", "meat riding is crazy",
  "you are done", "he got folded", "back to the lobby",
  "you fell off plus L plus ratio", "emotional damage", "bro cannot recover",
  "outplayed", "brainrot", "not even close",
  "sit down", "bro is finished", "say sike",
  "bro is hallucinating", "that is a flag", "aint no way",
  "built like a fridge", "mommy issues", "bro got that rizzy disease",
  "caught lacking IRL", "you are not that guy", "rizzler of Oz",
  "bro started lagging IRL", "get yo money up", "crazy work",
  "goofy ahh", "this is a W", "clap those cheeks",
  "you are the weakest link", "hes mid tier", "F to pay respects",
  "ratio me you wont", "bros beta", "better luck next time",
  "easy dub", "bros about to catch the smoke", "not him",
  "cracked out", "knee deep in cap", "you are so lost",
  "Bro got hit with the RKO", "back to the gulag", "clout chaser",
  "he is all talk", "hes acting like a villain", "hard to watch",
  "no shot", "hes about to get smoked", "you sound like an NPC",
  "bro is ghosted", "get bodied", "you are a whole meme",
  "you are washed", "bros on that villain arc", "lucky you",
  "oh that is a flag", "wrong side of the bed", "too much cap",
  "catch these hands", "hands are rated E for everyone", "RIP bozo",
  "unreal", "bro is screaming internally", "bros talking out of his neck",
  "hes on that gamer grind", "take the L", "you are getting cooked",
  "FYP material", "stop the cap", "stop the riz",
  "just built different", "straight up dog", "mental collapse",
  "just wait till I get in", "how are you alive", "he needs a patch",
  "you are a whole bot", "please tell me you are joking", "devious little me",
  "that is a whole clown moment", "you really thought", "shut it down",
  "yeah nah", "that is a wrap", "put some respect on it",
  "not even a challenge", "you play like an NPC", "you got absolutely folded",
  "get wrecked", "you are just a placeholder", "imagine",
  "peak performance", "see you in the gulag", "you are walking L",
  "play better", "drop the riz", "end of story",
  "deadass", "you are cooked", "bet",
  "check the scoreboard", "no ones scared", "we up",
  "you are a LIMA", "try again next time", "back to the basics",
  "hes about to get smoked", "bros an NPC in real life", "fr you are wild",
  "playing on easy mode", "you are a walking dub", "not even competitive",
  "oh you are one of those", "this aint it", "stay mad",
  "you got no moves", "shut your mouth", "bros a whole meme",
  "stay humble", "time to go to the lobby", "its a ghost town",
  "talk your talk", "stop the cap fr", "easy win",
  "no cap you are done", "wheres your riz", "grind set",
  "that is tough bro", "you are an NPC in the chat", "no flinch",
  "caught lacking hard", "fall off harder", "you cannot be serious",
  "weird flex but okay", "straight up clown", "bet you cannot",
  "oh we are rizzin now", "bros taking the L", "nah bros lagging",
  "lets call it a day", "you are finished", "stop simpin",
  "you are playing for second place", "cry about it", "you aint him",
  "bros a walking L", "bozo alert", "that is an L for sure",
  "bros a lost cause", "stop it with the cap", "we are built different",
  "aint no way", "your riz game is weak", "hold that L",
  "we do not claim you", "not the vibe", "chill with that riz",
  "hes the side character", "you are stuck on pause", "bro cannot keep up",
  "bros out here wildin", "did not ask", "the audacity",
  "bro needs a new personality", "its a game not a lifestyle", "say less",
  "you are all cap no facts", "bro really tried", "keep that energy",
  "hes acting like its GTA", "overrated", "cap king",
  "catch these hands bro", "you are a whole sim", "bros tripping",
  "bro touch grass", "you are a whole joke", "that is an instant block",
  "you are playing checkers I am playing chess", "cringe game strong", "you are irrelevant",
  "catch me outside", "zero riz", "shut the front door", "sike",
  "call me daddy", "bros down bad", "its a vibe",
  "straight up smoke", "you aint built for this", "you are cooked for sure",
  "fr you are a walking L", "endgame", "you really out here",
  "stay mad bro", "wait for it", "aint no cap",
  "look whos talking", "hes fumbled the bag", "bros about to get the smoke"
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
