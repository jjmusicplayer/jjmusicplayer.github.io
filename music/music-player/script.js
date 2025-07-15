const playlist = [
  {
    title: "Unknown title",
    artist: "Unknown artist",
    album: "Unknown album",
    src: "music/placeholder.mp3",
    cover: "img/unknown.png",
    coverSize: "1000x1000",
    lyrics: "<br>",
    background: "linear-gradient(#515151, #121212)",
    lyricsBackground: "#515151",
    explicit: "0"
  },
  {
    title: "SQUID GAME",
    artist: "Smileslow",
    album: "SQUID GAME - Single",
    src: "music/sklid-gej.mp3",
    cover: "",
    coverSize: "1000x1000",
    lyrics: "<br>",
    background: "linear-gradient(#515151, #121212)",
    lyricsBackground: "#515151",
    explicit: "0"
  }
];



let currentTrackIndex = 0;
let isShuffle = false;
let isLoop = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playLyr = document.getElementById("play-lyr");
const prevLyr = document.getElementById("prev-lyr");
const nextLyr = document.getElementById("next-lyr");
const seekBar = document.getElementById("seek");
const seekBarLyr = document.getElementById("seek-lyr");
const playMini = document.getElementById("play-mini");
const currentTimeElem = document.getElementById("current-time");
const durationElem = document.getElementById("duration");
const titleElem = document.querySelector("h1");
const artistElem = document.querySelector("h2");
const imgElem = document.getElementById("img1");
const titleElemLyr = document.querySelector("h3");
const artistElemLyr = document.querySelector("h4");
const imgElemLyr = document.getElementById("img2");
const odtwarzanie = document.getElementById("head");
const lyrics = document.getElementById("lyrics-new");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const loopBtnLyr = document.getElementById("loop-lyr");


let isPlaying = false;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  titleElem.textContent = track.title;
  artistElem.textContent = track.artist;
  imgElem.src = track.cover;
  titleElemLyr.textContent = track.title;
  artistElemLyr.textContent = track.artist;
  imgElemLyr.src = track.cover;
  seekBar.value = 0;
  updateSeekBackground();
  currentTimeElem.textContent = "0:00";
  durationElem.textContent = "0:00";
  odtwarzanie.innerHTML = `
    <div id="go-back"><i class="icon-open"></i></div>
    „${track.album}”
    <div id="more"><i class="icon-more"></i></div>
  `;

  if(track.cover == '')
  {
    imgElem.src = 'img/unknown.png';
    document.getElementById("img3").src = 'img/unknown.png';
  }
  lyrics.innerHTML = `${track.lyrics}`;
  document.getElementById("player-container").style.background = track.background;
  document.querySelector("#mini-track-info h5").textContent = track.title;
  document.querySelector("#mini-track-info h6").textContent = track.artist;
  document.getElementById("img3").src = track.cover;
  document.getElementById('player-mini').style.background = track.lyricsBackground;

  if (`${track.explicit}` == '1') {
    titleElem.innerHTML += '<p id="explicit">🅴</p>';
    titleElemLyr.innerHTML += '<p id="explicit">🅴</p>';
  }

  document.getElementById("lyrics-overlay").style.backgroundColor = track.lyricsBackground;
  document.getElementById("lyrics-new").style.backgroundColor = track.lyricsBackground;
  document.getElementById("song-info").style.backgroundColor = track.lyricsBackground;
  document.getElementById("bottom-bar").style.backgroundColor = track.lyricsBackground;
}

audio.addEventListener("play", () => {
  setMediaMetadata(currentTrackIndex);
});

function setMediaMetadata(index) {
  const track = playlist[index];
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: [
        {
          src: `https://jjmusicplayer.github.io/music/music-player/${track.cover}`,
          sizes: track.coverSize || "512x512",
          type: "image/png"
        }
      ]
    });
    navigator.mediaSession.setActionHandler('play', () => {
      playBtn.click();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      playBtn.click();
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      prevBtn.click();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      nextBtn.click();
    });
  }
}

function playSong(index) {
  const track = playlist[index];
  audio.src = `${track.src}`;
  audio.play();
  setMediaMetadata(index);
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = "<i class='icon-pause'></i>";
  playLyr.innerHTML = "<i class='icon-pause'></i>";
  playMini.innerHTML = "<i class='icon-pause'></i>";
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = "<i class='icon-play'></i>";
  playLyr.innerHTML = "<i class='icon-play'></i>";
  playMini.innerHTML = "<i class='icon-play'></i>";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

playMini.addEventListener("click", () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

nextBtn.addEventListener("click", () => {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentTrackIndex && playlist.length > 1);
    currentTrackIndex = newIndex;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }
  loadTrack(currentTrackIndex);
  playTrack();
});


prevBtn.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

playLyr.addEventListener("click", () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

nextLyr.addEventListener("click", () => {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentTrackIndex && playlist.length > 1);
    currentTrackIndex = newIndex;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }
  loadTrack(currentTrackIndex);
  playTrack();
});


prevLyr.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

playMini.addEventListener("click", () => {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

audio.addEventListener("ended", () => {
  if (isLoop) {
    audio.currentTime = 0;
    playTrack();
  } else if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentTrackIndex && playlist.length > 1);
    currentTrackIndex = newIndex;
    loadTrack(currentTrackIndex);
    playTrack();
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }
});

audio.addEventListener("timeupdate", () => {
  const percentage = (audio.currentTime / audio.duration) * 100 || 0;
  seekBar.value = percentage;
  seekBarLyr.value = percentage;
  updateSeekBackground();
  currentTimeElem.textContent = formatTime(audio.currentTime);
  durationElem.textContent = formatTime(audio.duration);
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.querySelector("i").classList.toggle("active", isShuffle);
});

loopBtn.addEventListener("click", () => {
  isLoop = !isLoop;
  loopBtn.querySelector("i").classList.toggle("active", isLoop);
});

loopBtnLyr.addEventListener("click", () => {
  isLoop = !isLoop;
  loopBtn.querySelector("i").classList.toggle("active", isLoop);
});

seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
  updateSeekBackground();
});

seekBarLyr.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
  updateSeekBackground();
});

function updateSeekBackground() {
  const value = seekBar.value;
  seekBar.style.background = `linear-gradient(to right, #ededed ${value}%, rgba(237, 237, 237, 0.1) ${value}%)`;
  seekBarLyr.style.background = `linear-gradient(to right, #ededed ${value}%, rgba(237, 237, 237, 0.1) ${value}%)`;
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    playBtn.click();
  }
  if (e.code === 'ArrowRight') {
    nextBtn.click();
  }
  if (e.code === 'ArrowLeft') {
    prevBtn.click();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("lyrics")?.addEventListener('click', function () {
    document.getElementById("lyrics-overlay")?.classList.toggle('hidden');
  });

  document.getElementById("hide-lyrics")?.addEventListener('click', function () {
    document.getElementById("lyrics-overlay")?.classList.toggle('hidden');
  });


document.getElementById("mini-info")?.addEventListener('click', function () {
  document.getElementById("player-container").classList.remove('hidden');
  document.getElementById("container").classList.add('hidden');
  document.getElementById("player-mini").classList.add('hidden');
});

document.getElementById("play-mini")?.addEventListener("click", function (e) {
  e.stopPropagation();
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});


  document.getElementById("img3")?.addEventListener('click', function () {
    document.getElementById("player-container")?.classList.toggle('hidden');
    document.getElementById("container").classList.toggle('hidden');
  });

  document.getElementById("head")?.addEventListener('click', function (e) {
  if (e.target.closest("#go-back")) {
    document.getElementById("player-container").classList.add("hidden");
    document.getElementById("container").classList.remove('hidden');
    document.getElementById("player-mini").classList.remove('hidden');
  }
});
});

loadTrack(currentTrackIndex);
