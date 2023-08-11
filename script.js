const keywordInput = document.getElementById("keyword");
const getInfoButton = document.getElementById("get-info-button");
const randomJoke = document.getElementById("random-joke");
const randomImage = document.getElementById("random-image");

getInfoButton.addEventListener("click", fetchUselessInfo);

async function fetchUselessInfo() {
    const keyword = keywordInput.value.trim();

    if (!keyword) {
        return;
    }

    const jokeResponse = await fetch(`https://v2.jokeapi.dev/joke/Any?contains=${keyword}`);
    const jokeData = await jokeResponse.json();


    if (jokeData.joke) {
        randomJoke.textContent = jokeData.joke;
    } else if (jokeData.setup && jokeData.delivery) {
        randomJoke.textContent = `${jokeData.setup} ${jokeData.delivery}`;
    } else {
        randomJoke.textContent = "Couldn't fetch a joke. Try another keyword.";
    }

    const imageResponse = await fetch(`https://api.unsplash.com/photos/random?query=${keyword}&client_id=gt2_FBn-rpdC-s2llBwrXaHowg2V4a1e-ji7EXger-o`);
    const imageData = await imageResponse.json();

    if (imageData.urls && imageData.urls.regular) {
        randomImage.src = imageData.urls.regular;
        randomImage.alt = `Random Image of ${keyword}`;
    } else {
        randomImage.src = "";
        randomImage.alt = "Random Image";
    }
}
