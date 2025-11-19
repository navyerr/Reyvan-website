const audio = document.getElementById("audioPlayer");
const cards = document.querySelectorAll(".song-card");

cards.forEach(card => {
    const btn = card.querySelector(".play-btn");
    const url = card.dataset.url;

    btn.addEventListener("click", () => {
        if (!url) {
            console.error("ERROR: data-url tidak ditemukan!");
            return;
        }

        audio.src = url;
        audio.play()
            .then(() => console.log("Playing:", url))
            .catch(err => console.error("Play Error:", err));
    });
});
