const url = 'https://api.openweathermap.org/data/2.5/';
const key = '68f0bcd57899eb21d8e9375652162bd7';

const setQuery = (e) => {
    if(e.keyCode == '13') {
        getResult(searchBar.value);
    }
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
    .then(weather => {
        return weather.json();
    })
    .then(displayResult)
}

const displayResult = (result) => {
    let city = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let desc = document.querySelector(".desc");
    let minmax = document.querySelector(".minmax");
    let wind = document.querySelector(".wind");
    if (result.cod == '404') {
        city.innerHTML = ('Lütfen geçerli bir konum giriniz.');
        temp.innerHTML = ('');
        desc.innerHTML = ('');
        minmax.innerHTML = ('');
        wind.innerHTML = ('');
    } 
    else {
        console.log(result)
        city.innerHTML = `${result.name}, ${result.sys.country}`;
        temp.innerHTML = `${Math.round(result.main.temp)}&deg`;
        descData = `${result.weather[0].description}`;
        if (result.weather[0].description == 'açık') {
            desc.innerHTML = `<i class="fas fa-sun"></i> ${descData.toUpperCase()}`;
        }
        else if (result.weather[0].description == 'kapalı') {
            desc.innerHTML = `<i class="fa-solid fa-cloud"></i> ${descData.toUpperCase()}`;
        }
        else if (result.weather[0].description == 'kar yağışlı' || result.weather[0].description == 'hafif kar yağışlı') {
            desc.innerHTML = `<i class="fa-regular fa-snowflake"></i> ${descData.toUpperCase()}`;
        }
        else if (result.weather[0].description == 'parçalı az bulutlu' || result.weather[0].description == 'parçalı bulutlu' || result.weather[0].description == 'az bulutlu') {
            desc.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ${descData.toUpperCase()}`;
        }
        else if (result.weather[0].description == 'şiddetli yağmur' || result.weather[0].description == 'hafif yağmur') {
            desc.innerHTML = `<i class="fa-solid fa-cloud-rain"></i> ${descData.toUpperCase()}`;
        }
        else{
            desc.innerHTML = ` ${descData.toUpperCase()}`;
        }
        minmax.innerHTML = `En Düşük Sıcaklık: <b>${Math.round(result.main.temp_min)}&deg</b> <br> En Yüksek Sıcaklık: <b>${Math.round(result.main.temp_max)}&deg</b>`;
        wind.innerHTML = 'Rüzgar: <b>' + result.wind.speed + ' m/s</b>';
    }
}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery);