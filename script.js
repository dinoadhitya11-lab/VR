const buttons = document.querySelectorAll(".keypad button");
const display = document.querySelector(".display");
const pinKunci = "241005";
const cakeScreen = document.querySelector(".cake-screen");
const cakeElement = document.getElementById("birthday-cake");
const candleTrigger = document.getElementById("candle-trigger");
const lockScreen = document.querySelector(".lock-screen");
const vinyl = document.querySelector(".vinyl");
const vinylZone = document.querySelector(".vinyl-zone");
const music = document.querySelector("#music");
music.volume = 0.5;
const trackTitle = document.querySelector("#track-title");
const togglePlay = document.querySelector("#toggle-play");
const playlist = [
    {
        artist: "Perunggu",
        title: "Gemilang",
        src: "Perunggu - Gemilang.mp3",
        artwork: "dalam-dinamika.jpg"
    },
    {
        artist: "Perunggu",
        title: "Tapi",
        src: "Perunggu - Tapi.mp3",
        artwork: "dalam-dinamika.jpg"
    },
    {
        artist: "Perunggu",
        title: "ini Abadi",
        src: "Perunggu - Ini Abadi.mp3",
        artwork: "memorandum.jpg"
    },
    {
        artist: "Perunggu",
        title: "Pastikan Riuh Akhiri Malammu",
        src: "Perunggu - Pastikan Riuh Akhiri Malammu.mp3",
        artwork: "memorandum.jpg"
    }
];
let currentTrack = 0;
const albumArtwork = document.querySelector("#album-artwork");
const prevTrack = document.querySelector("#prev-track");
const nextTrack = document.querySelector("#next-track");
function loadTrack(index) {
    currentTrack = index;

    const track = playlist[currentTrack];

    trackTitle.textContent = `${track.artist} - ${track.title}`;
    music.src = track.src;
    albumArtwork.src = track.artwork;

    music.load();
}

prevTrack.addEventListener("click", function() {
    const index = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(index);
    music.play();
});

nextTrack.addEventListener("click", function() {
    const index = (currentTrack + 1) % playlist.length;
    loadTrack(index);
    music.play();
});
const paper = document.querySelector("#paper");
const paperTrigger = document.querySelector(".paper-trigger");
const mainScreen = document.querySelector(".main-screen");
const wishInput = document.querySelector("#wish-input");
const wishSubmit = document.querySelector("#wish-submit");
const wishResult = document.querySelector(".wish-result");
const wishScreen = document.querySelector(".wish-screen");
const scrollToWish = document.querySelector("#scroll-to-wish");
const userLantern = document.querySelector(".user-lantern");
const wishLantern = document.querySelector(".wish-lantern");
const supportLanterns = document.querySelectorAll(".support-lantern");
let flameCount = 0;
let pin = ""
function resetPin() {
    pin = "";
    display.textContent = pin;
}
function unlock() {
    document.body.classList.add("cake-active");
    cakeScreen.style.display = "block";
    vinylZone.style.display = "flex";
    music.play();
    setTimeout(function() {
        cakeScreen.style.opacity = "1";
        lockScreen.style.opacity = "0";
    }, 50);
    setTimeout(function() {
        lockScreen.style.display = "none";
    }, 800);
}
buttons.forEach(function(btn) {
    btn.addEventListener("click", function () {
        if (btn.id === "btn-del") {
            pin = pin.slice(0, -1);
            display.textContent = pin;
        } else if (btn.id === "btn-ok") {
            if (pin === pinKunci && pin.length === 6 ) {
                unlock();
            } else {
                resetPin();
            }
        } else {
            if (pin.length < 6) {
                pin = pin + btn.textContent.trim();
                display.textContent = pin;
            }
        }    
    });
});

function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
};

vinyl.addEventListener("click", toggleMusic);
togglePlay.addEventListener("click", toggleMusic);

music.addEventListener("play", function() {
    togglePlay.textContent = "\u{23F8}";
    togglePlay.setAttribute("Aria-label", "Pause music");
    document.querySelector(".record-assembly").classList.add("playing");
});

music.addEventListener("pause", function() {
    togglePlay.textContent = "\u25B6";
    togglePlay.setAttribute("aria-label", "Play music");
    document.querySelector(".record-assembly").classList.remove("playing");
});

music.addEventListener("ended", function() {
    const index = (currentTrack + 1) % playlist.length;
    loadTrack(index);
    music.play();
});

function bukaCakeGate() {
    flameCount = flameCount + 1;

    if (flameCount === 2) {
        cakeScreen.style.opacity = "0";

        setTimeout(function() {
            cakeScreen.style.display = "none";
            document.body.classList.remove("cake-active");
            mainScreen.style.display = "block";
            wishScreen.style.display = "block";

            setTimeout(function() {
                mainScreen.style.opacity = "1";
                wishScreen.style.opacity = "1";
                wishScreen.style.pointerEvents = "auto";
            }, 50);
        }, 800);
    }
} 

fetch("Cake.svg")
    .then(response => response.text())
    .then(svg => {
        document.getElementById("birthday-cake").innerHTML = svg;

        const windLeft = document.getElementById("wind-left");
        const windRight = document.getElementById("wind-right");

        const flameLeft = document.getElementById("flame-left");
        const flameRight = document.getElementById("flame-right");

        flameLeft.addEventListener("click", () => {
            windLeft.classList.add("wind-blow");
            flameLeft.classList.add("flame-out");
            bukaCakeGate();
        });

        flameRight.addEventListener("click", () => {
            windRight.classList.add("wind-blow");
            flameRight.classList.add("flame-out");
            bukaCakeGate();
        });
    });

fetch("vinyl.svg")
    .then(response => response.text())
    .then(svg => {
        document.getElementById("vinyl").innerHTML = svg;
    });

paperTrigger.addEventListener("click", function(event) {
    event.stopPropagation();
    paper.classList.add("open");
    paperTrigger.style.pointerEvents = "none";
});

mainScreen.addEventListener("click", function(event) {
    if (
        paper.classList.contains("open") &&
        !paper.contains(event.target)
    ) {
        paper.classList.remove("open");
        paperTrigger.style.pointerEvents = "auto";
    }
});


wishSubmit.addEventListener("click", function() {
    if (wishInput.value.trim() === "") {
        return;
    }
    document.body.classList.add("nigth-mode");
    document.querySelector(".experience-screen").classList.add("night-mode");
    document.querySelector(".vinyl-zone").classList.add("night-mode");

    wishResult.textContent = wishInput.value;
    wishResult.style.display = "block";
    document.querySelector(".wish-container").style.display = "none";
    userLantern.classList.remove("is-manifesting");
    void userLantern.offsetWidth;
    userLantern.classList.add("is-manifesting");
});

userLantern.addEventListener("animationend", function(e) {
    if (e.target !== userLantern) {
        return;
    }

    if (e.animationName !== "masterManifest") {
        return;
    }

    userLantern.classList.remove("is-manifesting");
    if (wishLantern) {
        void wishLantern.offsetWidth;
        wishLantern.classList.add("is-rising");
    }
});

scrollToWish.addEventListener("click", function() {
    wishScreen.scrollIntoView({
        behavior: "smooth"
    });
});

fetch("lantern-master.svg")
    .then(response => {
        if (!response.ok) throw new Error("Gagal memuat user lantern");
        return response.text();
    })
    .then(svgText => {
        const uniqueSvg = svgText
            .replace(/id="([^"]+)"/g, 'id="$1-user"')
            .replace(/url\(#([^)]+)\)/g, 'url(#$1-user)');
        userLantern.innerHTML = uniqueSvg;
    })
    .catch(error => console.error(error));

supportLanterns.forEach((lantern, index) => {
    const fileNumber = index + 1;

    fetch(`lantern-${fileNumber}.svg`)
        .then(response => {
            if (!response.ok) throw new Error(`Gagal memuat lantern-${fileNumber}.svg`);
            return response.text();
        })
        .then(svgText => {
            const uniqueSvg = svgText
                .replace(/id="([^"]+)"/g, `id="$1-supp-${fileNumber}"`)
                .replace(/url\(#([^)]+)\)/g, `url(#$1-supp-${fileNumber})`);
            
            lantern.innerHTML = uniqueSvg;
        })
        .catch(error => console.error(error));
});

fetch("lantern-master.svg")
    .then(response => {
        if (!response.ok) throw new Error("Gagal memuat wish lantern");
        return response.text();
    })
    .then(svgText => {
        const uniqueSvg = svgText
            .replace(/id="([^"]+)"/g, 'id="$1-wish"')
            .replace(/url\(#([^)]+)\)/g, 'url(#$1-wish)');
        document.querySelector(".wish-lantern").innerHTML = uniqueSvg;
    })
    .catch(error => console.error(error));

function updateDisplay(value) {
    const displayElement = document.getElementById("passkey-display");

    if (value.length === 0) {
        displayElement.innerHTML = `<span class="placeholder-hint">DDMMYY</span>`;
    } else {
        displayElement.textContent = value;
    }
}

cakeElement.addEventListener("click", function() {
    extinguishCandles();
});

candleTrigger.addEventListener("click", function() {
    extinguishCandles();
});