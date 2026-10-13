// ========================================
// MUSIC DATA
// ========================================

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        audio: "assets/audio/song-1.mp3",
        cover: "assets/images/song-1.jpg"
    },

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        audio: "assets/audio/song-2.mp3",
        cover: "assets/images/song-2.jpg"
    },

    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        audio: "assets/audio/song-3.mp3",
        cover: "assets/images/song-3.jpg"
    },

    {
        title: "Believer",
        artist: "Imagine Dragons",
        audio: "assets/audio/song-4.mp3",
        cover: "assets/images/song-4.jpg"
    }
];


// ========================================
// HTML ELEMENTS
// ========================================

const audioPlayer = document.getElementById("audioPlayer");

const albumCover = document.getElementById("albumCover");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const playButton = document.getElementById("playBtn");

const previousButton = document.getElementById("previousBtn");

const nextButton = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const volumeBar = document.getElementById("volumeBar");

const currentTimeElement = document.getElementById("currentTime");

const durationElement = document.getElementById("duration");

const playlistItems =
    document.querySelectorAll(".playlist-item");


// ========================================
// CURRENT SONG
// ========================================

let currentSongIndex = 0;


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    albumCover.src = song.cover;

    albumCover.alt = `${song.title} album cover`;

    audioPlayer.src = song.audio;

    audioPlayer.load();

    updateActivePlaylistItem();
}


// ========================================
// PLAY SONG
// ========================================

function playSong() {

    audioPlayer.play();

    playButton.textContent = "❚❚";
}


// ========================================
// PAUSE SONG
// ========================================

function pauseSong() {

    audioPlayer.pause();

    playButton.textContent = "▶";
}


// ========================================
// PLAY / PAUSE
// ========================================

playButton.addEventListener("click", () => {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    playSong();
}


nextButton.addEventListener("click", nextSong);


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    playSong();
}


previousButton.addEventListener("click", previousSong);


// ========================================
// UPDATE PROGRESS
// ========================================

audioPlayer.addEventListener("timeupdate", () => {

    if (!audioPlayer.duration) {
        return;
    }

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress;

    currentTimeElement.textContent =
        formatTime(audioPlayer.currentTime);

});


// ========================================
// LOAD SONG DURATION
// ========================================

audioPlayer.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(audioPlayer.duration);

});


// ========================================
// CHANGE SONG POSITION
// ========================================

progressBar.addEventListener("input", () => {

    if (!audioPlayer.duration) {
        return;
    }

    const newTime =
        (progressBar.value / 100) *
        audioPlayer.duration;

    audioPlayer.currentTime = newTime;

});


// ========================================
// VOLUME CONTROL
// ========================================

volumeBar.addEventListener("input", () => {

    audioPlayer.volume = volumeBar.value;

});


// ========================================
// AUTO NEXT SONG
// ========================================

audioPlayer.addEventListener("ended", () => {

    nextSong();

});


// ========================================
// PLAYLIST CLICK
// ========================================

playlistItems.forEach((item) => {

    item.addEventListener("click", () => {

        const selectedIndex =
            Number(item.dataset.index);

        currentSongIndex = selectedIndex;

        loadSong(currentSongIndex);

        playSong();

    });

});


// ========================================
// ACTIVE PLAYLIST ITEM
// ========================================

function updateActivePlaylistItem() {

    playlistItems.forEach((item, index) => {

        if (index === currentSongIndex) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "00:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;

}


// ========================================
// INITIALIZE PLAYER
// ========================================

audioPlayer.volume = 1;

loadSong(currentSongIndex);












// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (event) => {

    // Spacebar: Play / Pause
    if (event.code === "Space") {
        event.preventDefault();

        if (audioPlayer.paused) {
            playSong();
        } else {
            pauseSong();
        }
    }

    // Arrow Right: Next Song
    if (event.code === "ArrowRight") {
        nextSong();
    }

    // Arrow Left: Previous Song
    if (event.code === "ArrowLeft") {
        previousSong();
    }

    // Arrow Up: Increase Volume
    if (event.code === "ArrowUp") {
        event.preventDefault();

        let newVolume = Math.min(
            audioPlayer.volume + 0.1,
            1
        );

        audioPlayer.volume = newVolume;
        volumeBar.value = newVolume;
    }

    // Arrow Down: Decrease Volume
    if (event.code === "ArrowDown") {
        event.preventDefault();

        let newVolume = Math.max(
            audioPlayer.volume - 0.1,
            0
        );

        audioPlayer.volume = newVolume;
        volumeBar.value = newVolume;
    }
});