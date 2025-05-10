// Quando o usuário clicar em uma capa de filme
const cards = document.querySelectorAll('.card');
const banner = document.getElementById('trailerBanner');
const bannerVideo = document.getElementById('bannerVideo');
const bannerTitle = document.getElementById('bannerTitle');
const bannerDesc = document.getElementById('bannerDesc');
const watchButton = document.getElementById('watchButton');

// Controles de áudio
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');


// Controla o comportamento do banner
cards.forEach(card => {
  card.addEventListener('click', () => {
    const trailer = card.getAttribute('data-trailer');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const page = card.getAttribute('data-page');
    
    // Se o banner estiver visível, esconde
    if (banner.style.display === 'block') {
      banner.style.display = 'none';
    } else {
      // Exibe o banner com o vídeo do trailer
      banner.style.display = 'block';
      bannerVideo.src = trailer;
      bannerTitle.innerText = title;
      bannerDesc.innerText = desc;
      watchButton.href = page;
    }
  });
});

// Controle de volume
volumeSlider.addEventListener('input', function() {
  bannerVideo.volume = volumeSlider.value;

  
});
const bannarVideo = document.getElementById('bannerVideo');
bannerVideo.controls = false; // Desativa os controles do vídeo

// Controle de mudo (mutar)
muteBtn.addEventListener('click', function() {
  if (bannerVideo.muted) {
    bannerVideo.muted = false;
    muteBtn.innerText = '🔊'; // Volta ao ícone de som
  } else {
    bannerVideo.muted = true;
    muteBtn.innerText = '🔇'; // Exibe o ícone de mudo
  }
});

// Função para rolar suavemente até as seções
const links = document.querySelectorAll('.menu a, .dropdown-content a');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Implementando a funcionalidade de busca
document.getElementById('search').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const categories = document.querySelectorAll('.category');
  
  categories.forEach(category => {
    const cards = category.querySelectorAll('.card');
    let hasMatch = false;
    cards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const desc = card.getAttribute('data-desc').toLowerCase();
      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block'; // Exibe o card
        hasMatch = true;
      } else {
        card.style.display = 'none'; // Esconde o card
      }
    });
    category.style.display = hasMatch ? 'block' : 'none'; // Exibe ou esconde a categoria
  });
});



const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arraste
    carousel.scrollLeft = scrollLeft - walk;
  });
});

