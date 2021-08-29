const loader = document.querySelector('.spinner-grow');
loader.style.display = 'none';
const searchResult = document.getElementById('search-result');
const searchError = document.getElementById('search-error');
const notFound = document.getElementById('not-found');
const weatherImg = document.getElementById('weather-img');
const cityName = document.getElementById('city');
const countryName = document.getElementById('country');
const coord = document.getElementById('coord');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const loadWeather = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    if (searchText == '') {
        alert('Enter A City First!');
    }
    else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=23a47d1564c036c9eed3cd3394962803`;


        fetch(url)
            .then(res => {
                if (res.ok) { //or res.status == 200
                    // setTimeout(() => { loader.style.display = 'none' }, 1000);
                    // loader.style.display = 'block';
                    return res.json();
                }
                else {
                    searchResult.style.display = 'none';
                    searchError.style.display = 'block';
                    notFound.style.display = 'block';
                    return notFound.innerText = `City Not Found!`;
                }
            })
            .then(data => {
                displayWeather(data);
                weatherBackground(data);
            })
            .catch(err => displayError(err));
    }
}
const loadCurrentLocation = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=23a47d1564c036c9eed3cd3394962803`;
    const res = await fetch(url)
    const data = await res.json();
    displayCurrentLocation(data);
}
loadCurrentLocation();

const processer = (city) => {
    coord.innerHTML = `Latitude: ${city.coord.lat}<br>Longitude: ${city.coord.lon}`;

    const country = city.sys;
    countryName.innerText = country.country;

    const tempareture = city.main
    temp.innerHTML = `${((Number(tempareture.temp)) - 273).toFixed(2)} &deg;C`;

    const weathers = city.weather;
    weathers.map(weather => {
        condition.innerText = weather.main;
        weatherImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">`
    });

    cityName.innerText = city.name;
}
const displayWeather = (city) => {
    console.log(city);
    searchResult.style.display = 'block';
    searchError.style.display = 'none';
    notFound.style.display = 'none';
    setTimeout(() => {
        loader.style.display = 'none';
        processer(city);
    }, 2000);
    loader.style.display = 'block';
}
const displayCurrentLocation = (currentCity) => {
    setTimeout(() => { loader.style.display = 'none'; processer(currentCity); }, 2000);
    loader.style.display = 'block';
    weatherBackground(currentCity);
}

const displayError = (err) => {
    console.log(err);
    notFound.style.display = 'block';
    searchResult.style.display = 'none';
    searchError.style.display = 'block';
    searchError.innerText = `Something Went Wrong!`;
    setTimeout(() => {
        searchError.innerText = ``;
    }, 3000);
}

const weatherBackground = background => {
    background.weather.map(bg => {
        setTimeout(() => {
            if (bg.main == 'Clouds') {
                console.log(bg.main == 'Clouds');
                document.body.style.background = 'url(./images/bg-image-sunny.jpg) no-repeat';
            }
            else if (bg.main == 'Clear') {
                console.log(bg.main == 'Clear');
                document.body.style.background = 'url(./images/bg-image-clear.jpg) no-repeat';
            }
            else if (bg.main == 'Rain') {
                console.log(bg.main == 'Rain');
                document.body.style.background = 'url(./images/bg-image-rain.jpg) no-repeat';
            }
            else if (bg.main == 'Drizzle') {
                console.log(bg.main == 'Drizzle');
                document.body.style.background = 'url(./images/bg-image-rain.jpg) no-repeat';
            }
            else if (bg.main == 'Mist') {
                console.log(bg.main == 'Mist');
                document.body.style.background = 'url(./images/bg-image-mist.jpg) no-repeat';
            }
            else if (bg.main == 'Haze') {
                console.log(bg.main == 'Haze');
                document.body.style.background = 'url(./images/bg-image-haze.jpg) no-repeat';
            }
            else if (bg.main == 'Fog') {
                console.log(bg.main == 'Fog');
                document.body.style.background = 'url(./images/bg-image-mist.jpg) no-repeat';
            }
            else if (bg.main == 'Sand') {
                console.log(bg.main == 'Sand');
                document.body.style.background = 'url(./images/bg-image-sand.jpg) no-repeat';
            }
            else if (bg.main == 'Snow') {
                console.log(bg.main == 'Snow');
                document.body.style.background = 'url(./images/bg-image-snow.jpg) no-repeat';
            }
        }, 2000);
    })
}