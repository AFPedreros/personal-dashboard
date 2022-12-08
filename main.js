const authorEl = document.getElementById("author");

async function getBackgroundImage() {
    const response = await fetch(
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=city"
    );
    const json = await response.json();
    const url = json.urls.regular;

    document.body.style.backgroundImage = `url(${url})`;

    console.log(json.user.username);
    authorEl.textContent = `By ${json.user.name}`;
}

getBackgroundImage();
