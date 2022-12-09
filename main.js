const authorEl = document.getElementById("author");
const cryptoTopEl = document.getElementById("crypto-top");
const cryptoBottomEl = document.getElementById("crypto-bottom");
const timeEl = document.getElementById("time");
const weatherEl = document.getElementById("weather");

async function main() {
    setInterval(getTime, 1000);

    try {
        getWeather();
        await getBackgroundImage();
        await getEthInfo();
    } catch (error) {
        console.log(error);
    }
}

async function getBackgroundImage() {
    const response = await fetch(
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape"
    );
    if (!response.ok) {
        document.body.style.backgroundImage =
            "url(https://images.unsplash.com/photo-1669173034813-fff51b1ee64d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzA2MDU2ODE&ixlib=rb-4.0.3&q=80&w=1080)";

        throw Error("Something went wrong with the image API");
    }
    const json = await response.json();
    const url = json.urls.regular;

    document.body.style.backgroundImage = `url(${url})`;

    authorEl.textContent = `By ${json.user.name}`;
}

async function getEthInfo() {
    const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/ethereum"
    );
    if (!response.ok) {
        throw Error("Something went wrong with the Coingecko API");
    }
    const json = await response.json();

    cryptoTopEl.innerHTML = `
        <img src=${json.image.small} class="img-token" />
        <span>${json.name}</span>
    `;

    cryptoBottomEl.innerHTML = `
        <span>Current price: $${json.market_data.current_price.usd}</span>
        <span>24-hour high: $${json.market_data.high_24h.usd}</span>
        <span>24-hour low: $${json.market_data.low_24h.usd}</span>
    `;
}

function getTime() {
    const date = new Date();
    timeEl.innerText = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch(
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
        );
        if (!response.ok) {
            throw Error("Something went wrong with the weather API");
        }
        const json = await response.json();
        const iconUrl = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

        weatherEl.innerHTML = `
            <img src=${iconUrl} />
            <p class="temp">${Math.round(json.main.temp)}º</p>
            <p class="city">${json.name}</p>
        `;
    });
}

main();
