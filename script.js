let money = 200;
let selectedPresents = [];
let discardedPresents = []; // Lista de presentes descartados

// Lista de presentes com imagens
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

// Função para embaralhar uma lista (Fisher-Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
}

// Embaralha a lista de presentes
shuffle(presents);

// Gera uma lista de números aleatórios para as caixas (de 1 a 12)
let boxNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
shuffle(boxNumbers);

// Atualiza o texto de presentes disponíveis
function updateAvailablePresents() {
  const availablePresents = presents.filter(
    (present) =>
      // !selectedPresents.includes(present.name) &&
      !discardedPresents.includes(present.name) // Não mostra presentes descartados
  );
  document.getElementById("available-presents").innerText = `${availablePresents
    .map((p) => p.name)
    .join(" | ")}`;
}

function revealPresent(boxNumber) {
  const box = document.querySelector(`.box:nth-child(${boxNumber})`);

  if (
    box.classList.contains("revealed") ||
    box.classList.contains("discarded")
  ) {
    return;
  }

  // A posição real do presente é obtida pelo número da caixa aleatória
  const presentIndex = boxNumbers[boxNumber - 1] - 1; // Mapeia o número da caixa para o índice do presente
  const present = presents[presentIndex]; // Pega o presente correspondente

  // Exibir a imagem e o nome do presente
  box.innerHTML = `<img src="${present.image}" alt="${present.name}"><p>${present.name}</p><button class="discard-button" onclick="discardPresent(${boxNumber})">X</button>`;
  box.classList.add("revealed");

  selectedPresents.push(present.name);
  updateAvailablePresents(); // Atualiza a lista de disponíveis
}

function discardPresent(boxNumber) {
  const box = document.querySelector(`.box:nth-child(${boxNumber})`);
  if (!box.classList.contains("revealed")) {
    return;
  }

  // A posição real do presente é obtida pelo número da caixa aleatória
  const presentIndex = boxNumbers[boxNumber - 1] - 1;
  const present = presents[presentIndex];

  // Remove o presente de selectedPresents e adiciona a discardedPresents
  const presentNameIndex = selectedPresents.indexOf(present.name);
  if (presentNameIndex !== -1) {
    selectedPresents.splice(presentNameIndex, 1);
  }
  discardedPresents.push(present.name); // Adiciona à lista de descartados

  box.classList.add("discarded");
  box.classList.remove("revealed");
  box.querySelector("button").remove(); // Remove o botão "X"

  // Atualizar o valor do dinheiro
  money -= 25;
  document.getElementById("money").innerText = `R$ ${money}`;

  updateAvailablePresents(); // Atualiza a lista de disponíveis
}

// Inicializa a lista de presentes disponíveis ao carregar a página
document.addEventListener("DOMContentLoaded", updateAvailablePresents);
