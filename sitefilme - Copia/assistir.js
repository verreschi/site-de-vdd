const video = document.getElementById('mainVideo');
const skipIntroBtn = document.getElementById('skipIntroBtn');
const nextContainer = document.getElementById('nextContainer');
const progressFill = document.getElementById('progressFill');
const nextEpisodeBtn = document.getElementById('nextEpisodeBtn');

let nextTimeout = null;

const introEnd = 90;
const outroStart = 1140;

video.addEventListener('timeupdate', () => {
  const current = video.currentTime;
  const duration = video.duration;

  // Mostrar botão pular
  if (current >= 0 && current <= introEnd) {
    skipIntroBtn.classList.add('show');
  } else {
    skipIntroBtn.classList.remove('show');
  }

  // Mostrar barra de próximo episódio nos últimos 30s
  if (duration - current <= 30 && !nextContainer.classList.contains('show')) {
    nextContainer.classList.add('show');
    progressFill.style.width = '0%';

    // Inicia animação da barra
    setTimeout(() => {
      progressFill.style.width = '100%';
    }, 50);

    // Troca automático após 5 segundos
    nextTimeout = setTimeout(() => {
      playNextEpisode();
    }, 5000);
  }
});

skipIntroBtn.addEventListener('click', () => {
  video.currentTime = introEnd;
});

nextEpisodeBtn.addEventListener('click', () => {
  clearTimeout(nextTimeout);
  playNextEpisode();
});

function playNextEpisode() {
  // Troque o caminho para o episódio real seguinte
  video.src = "videos/temporada1_ep2.mp4";
  video.play();

  // Reset UI
  nextContainer.classList.remove('show');
  progressFill.style.width = '0%';
}


const VIDEO_KEY = `progresso_${video.currentSrc.split('/').pop()}`; // Pode mudar conforme o episódio

// Salva o tempo atual a cada 5 segundos
setInterval(() => {
  if (!video.paused && !video.ended) {
    localStorage.setItem(VIDEO_KEY, video.currentTime);
  }
}, 5000);

// Ao carregar o vídeo, tenta continuar de onde parou
video.addEventListener('loadedmetadata', () => {
  const tempoSalvo = localStorage.getItem(VIDEO_KEY);
  if (tempoSalvo) {
    video.currentTime = parseFloat(tempoSalvo);
  }
});
