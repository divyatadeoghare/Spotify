const songs = [
  { title: "Haseen-Talwiinder", src: "songs/1.mp3", cover: "images/1.webp" },
  { title: "Dhurandhar", src: "songs/2.mp3", cover: "images/2.webp" },
  { title: "One Love", src: "songs/3.mp3", cover: "images/3.webp" },
  { title: "I Am Done", src: "songs/4.mp3", cover: "images/4.webp" },
  { title: "Sahiba", src: "songs/5.mp3", cover: "images/5.webp" },
  { title: "Pal Pal", src: "songs/6.mp3", cover: "images/6.webp" },
  { title: "Ishq Tera", src: "songs/7.mp3", cover: "images/7.webp" },
  { title: "Finding Her", src: "songs/8.mp3", cover: "images/8.webp" },
  { title: "DEEWANIYAT", src: "songs/9.mp3", cover: "images/9.webp" },
  { title: "Shaky", src: "songs/10.mp3", cover: "images/10.webp" },
];

let currentSong = 0;
const audio = new Audio(songs[currentSong].src);

// Elements
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const songDivs = document.querySelectorAll(".song");

const playPauseBtn = document.getElementById("playPauseBtn");
const icon = playPauseBtn.querySelector("i");

// Load Song
function loadSong(index) {
  audio.src = songs[index].src;
  title.innerText = songs[index].title;
  cover.src = songs[index].cover;

  songDivs.forEach(song => song.classList.remove("active"));
  songDivs[index].classList.add("active");
}

// Play / Pause Toggle
function playPause() {
  if (audio.paused) {
    audio.play();
    icon.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    icon.classList.replace("fa-pause", "fa-play");
  }
}

// Next Song
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  icon.classList.replace("fa-play", "fa-pause");
}

// Previous Song
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  icon.classList.replace("fa-play", "fa-pause");
}

// Progress Bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.innerText = formatTime(audio.currentTime);
  duration.innerText = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Song Click Play
songDivs.forEach(song => {
  song.addEventListener("click", () => {
    currentSong = song.dataset.index;
    loadSong(currentSong);
    audio.play();
    icon.classList.replace("fa-play", "fa-pause");
  });
});

// Reset icon when song ends
audio.addEventListener("ended", () => {
  icon.classList.replace("fa-pause", "fa-play");
});

// Time Format
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

loadSong(currentSong);
