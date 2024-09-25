let money = 200;
let selectedPresents = [];
let discardedPresents = [];
let revealCount = 0;
const maxReveals = 3;
const debugMode = new URLSearchParams(window.location.search).get("Debug") === "True";

let presents = [
  { name: "Turtle pillow", image: "https://i.imgur.com/IVL3UF4.png" },
  { name: "Carregador Portátil", image: "https://i.imgur.com/ZyYJ4Dh.png" },
  { name: "Uber One", image: "https://i.imgur.com/0ipjNvh.png" },
  { name: "Perfume Dior", image: "https://i.imgur.com/xDfp2mE.png" },
  { name: "Pelúcia grande", image: "https://i.imgur.com/CDaWefX.png" },
  { name: "Whey Dux", image: "https://i.imgur.com/EATPwxa.png" },
  { name: "Calendário de cenário", image: "https://i.imgur.com/nwUJjhC.png" },
  { name: "Fone Baseus", image: "https://i.imgur.com/HXq2AAv.png" },
  { name: "Head Spa", image: "https://i.imgur.com/OBiiTNW.png" },
  { name: "Livro Meow", image: "https://i.imgur.com/GQbwtFm.png" },
  { name: "Tênis (Aceite os termos)", image: "https://i.imgur.com/G083rDw.png" },
  { name: "Comer em restaurante", image: "https://i.imgur.com/xtIXbpv.png" },
  { name: "G502 Sem fio", image: "https://i.imgur.com/KxWjrfA.png" },
  { name: "Capinha de celular", image: "https://i.imgur.com/EeRiM8M.png" },
  { name: "Skin de faca no Valorant", image: "https://i.imgur.com/7fd8EFj.png" },
  { name: "Abraço", image: "https://media.tenor.com/-uqrnytctDoAAAAj/bear-hug.gif" },
  { name: "Giraffas pra comer o Kley", image: "https://i.imgur.com/lojw4oJ.png" },
  { name: "Cineminha com tudo pago", image: "https://i.imgur.com/hRyT17g.png" },
  { name: "Vale presente R$ 150", image: "https://i.imgur.com/RDNpxC9.png" },
  { name: "Dinossauro 3d (puzzle)", image: "https://i.imgur.com/Oh1mLYV.png" },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(presents);

let boxNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
shuffle(boxNumbers);

function updateAvailablePresents() {
  const availablePresents = presents.filter(
    (present) => !discardedPresents.includes(present.name)
  );
  document.getElementById("available-presents").innerText = `${availablePresents
    .map((p) => p.name)
    .join(" | ")}`;
}

function revealPresent(boxNumber) {
  // Check if debug mode is active
  if (debugMode) {
    performReveal(boxNumber);
    return;
  }

  // Check if the user has already revealed 3 presents
  if (revealCount >= maxReveals) {
    showPopup("Você já revelou 3 presentes. Descarte um antes de revelar outro.");
    return;
  }

  const box = document.querySelector(`.box:nth-child(${boxNumber})`);

  // Check if the box is already revealed or discarded
  if (box.classList.contains("revealed") || box.classList.contains("discarded")) {
    return; // Do nothing if already revealed or discarded
  }

  // Check if "G502 Sem fio" is still revealed
  if (selectedPresents.includes("G502 Sem fio")) {
    showPopup("Você não pode revelar outro presente enquanto o G502 Sem fio estiver ativo.");
    return;
  }

  // Perform the reveal if all conditions are satisfied
  performReveal(boxNumber);
}

function performReveal(boxNumber) {
  const box = document.querySelector(`.box:nth-child(${boxNumber})`);
  const presentIndex = boxNumbers[boxNumber - 1] - 1;
  const present = presents[presentIndex];

  // Update box content and classes
  box.innerHTML = `<img src="${present.image}" alt="${present.name}"><p>${present.name}</p><button class="discard-button" onclick="discardPresent(${boxNumber})">X</button>`;
  box.classList.add("revealed");

  selectedPresents.push(present.name);
  revealCount++;
  updateAvailablePresents();
}

function discardPresent(boxNumber) {
  const box = document.querySelector(`.box:nth-child(${boxNumber})`);

  // Only proceed if the box is revealed
  if (!box.classList.contains("revealed")) {
    return;
  }

  const presentIndex = boxNumbers[boxNumber - 1] - 1;
  const present = presents[presentIndex];

  // Remove from selected presents
  const presentNameIndex = selectedPresents.indexOf(present.name);
  if (presentNameIndex !== -1) {
    selectedPresents.splice(presentNameIndex, 1);
  }

  // Add to discarded presents
  discardedPresents.push(present.name);

  // Update box classes
  box.classList.add("discarded");
  box.classList.remove("revealed");
  box.querySelector("button").remove();

  // Deduct money only if not "G502 Sem fio"
  if (present.name !== "G502 Sem fio") {
    money -= 25;
    document.getElementById("money").innerText = `R$ ${money}`;
  }

  // Decrement revealCount because the present was discarded
  revealCount--;
  updateAvailablePresents();
}

function showPopup(message) {
  document.getElementById("popup-message").innerText = message; // Define a mensagem do pop-up
  document.getElementById("popup").style.display = "block"; // Exibe o pop-up
}

function closePopup() {
  document.getElementById("popup").style.display = "none"; // Oculta o pop-up
}

document.addEventListener("DOMContentLoaded", updateAvailablePresents);