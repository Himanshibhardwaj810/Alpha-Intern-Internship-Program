const audioElement = document.getElementById('audio');
const playPauseButton = document.querySelector('.play-pause-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const songTime = document.querySelector('.song-time');

playPauseButton.addEventListener('click', () => {
  if (audioElement.paused) {
    audioElement.play();
    playPauseButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="5" width="4" height="14" fill="white"/>
        <rect x="14" y="5" width="4" height="14" fill="white"/>
      </svg>`;
  } else {
    audioElement.pause();
    playPauseButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" fill="white"/>
      </svg>`;
  }
});

audioElement.addEventListener('timeupdate', () => {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  songTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

prevButton.addEventListener('click', () => {
  audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
});

nextButton.addEventListener('click', () => {
  audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const newTime = (offsetX / rect.width) * audioElement.duration;
  audioElement.currentTime = newTime;
});