const hamburger = document.querySelector(".hamburger");
const closeSidebar = document.querySelector(".close-sidebar");
const sidebar = document.querySelector(".sidebar");

if (!hamburger) {
  const hamburgerIcon = document.createElement("button");
  hamburgerIcon.classList.add("hamburger");
  hamburgerIcon.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector(".header").prepend(hamburgerIcon);
}

if (!closeSidebar && window.innerWidth <= 768) {
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-sidebar");
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  sidebar.prepend(closeButton);
}

document.querySelector(".hamburger").addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.querySelector(".close-sidebar")?.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

document.addEventListener("click", (event) => {
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnHamburger = event.target.closest(".hamburger");

  if (!isClickInsideSidebar && !isClickOnHamburger) {
    sidebar.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    sidebar.classList.remove("active");
  }
});

const playButtons = document.querySelectorAll("[class^='play-button']");
const audioList = Array.from({ length: 14 }, (_, i) => ({
  audio: new Audio(`Songs/music${i + 1}.mp3`), 
  isPlaying: false,
}));

playButtons.forEach((button, index) => {
  button.addEventListener("click", () => togglePlayPause(button, index));
});

function togglePlayPause(button, index) {
  const audioData = audioList[index];

  if (!audioData.isPlaying) {
    pauseAllAudios();
    audioData.audio.play();
    audioData.isPlaying = true;
    button.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioData.audio.pause();
    audioData.isPlaying = false;
    button.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function pauseAllAudios() {
  audioList.forEach((audioData, index) => {
    if (audioData.isPlaying) {
      audioData.audio.pause();
      audioData.isPlaying = false;
      playButtons[index].innerHTML = '<i class="fas fa-play"></i>';
    }
  });
}

const volumeControl = document.querySelector(".volume-control input");
const volumeIcon = document.getElementById("volume-icon");

volumeControl.addEventListener("input", (e) => {
  const volume = e.target.value / 100;
  audioList.forEach((audioData) => {
    audioData.audio.volume = volume;
  });

  updateVolumeIcon(volume);
});

volumeIcon.addEventListener("click", () => {
  const isMuted = audioList[0].audio.muted;
  audioList.forEach((audioData) => {
    audioData.audio.muted = !isMuted;
  });

  if (isMuted) {
    volumeIcon.className = "fas fa-volume-up";
    volumeControl.value = 50;
  } else {
    volumeIcon.className = "fas fa-volume-mute";
    volumeControl.value = 0;
  }
});

function updateVolumeIcon(volume) {
  if (volume === 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (volume < 0.5) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
}

const seekForwardButton = document.querySelector(".seek-forward");
const seekBackwardButton = document.querySelector(".seek-backward");

seekForwardButton.addEventListener("click", () => {
  audioList.forEach((audioData) => {
    if (audioData.isPlaying) {
      audioData.audio.currentTime += 10;
    }
  });
});

seekBackwardButton.addEventListener("click", () => {
  audioList.forEach((audioData) => {
    if (audioData.isPlaying) {
      audioData.audio.currentTime -= 10;
    }
  });
});
