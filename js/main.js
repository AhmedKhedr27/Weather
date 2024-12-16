navigator.geolocation.getCurrentPosition((pos) => {
    let myLatitude = pos.coords.latitude;
    let myLongitude = pos.coords.longitude;
    getWeather(`${myLatitude},${myLongitude}`)
})


async function getWeather(query) {
    let res = await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=79eb043a68a34fa397b163245241512&q=${query}&days=3&aqi=no&alerts=no`);

    let data = await res.json();
    displayData(data);
    
    
}


function displayData(data){
    //today
    let todydate = data.current.last_updated;
    let myDate = new Date(todydate);
    let todayName = myDate.toLocaleString("en-us" , {weekday : "long"});
    document.querySelector(".today .day").innerHTML = todayName;
    let todayMonth = myDate.toLocaleString("en-us" , {month : "long"});
    let todayNum = myDate.getDate();
    document.querySelector(".today .month").innerHTML = (todayNum + " " + todayMonth);
    document.querySelector(".today .location .city").innerHTML = data.location.name;
    document.querySelector("#todayDeg").innerHTML = data.current.temp_c;
    document.querySelector("#dayTime img").setAttribute("src" , data.current.condition.icon );
    document.querySelector("#sky").innerHTML = data.current.condition.text;
    document.querySelector("#humidty").innerHTML = ` ${data.current.humidity} %`;
    document.querySelector("#wind").innerHTML = ` ${data.current.wind_kph} km/h`;
    document.querySelector("#windDir").innerHTML = ` ${data.current.wind_dir}`;

    //tomorrow
    let tomorrowDate = new Date(data.forecast.forecastday[1].date);
    let tomorrowName = tomorrowDate.toLocaleString("en-us" , {weekday : "long"});
    document.querySelector("#tomorrowDay").innerHTML = tomorrowName;
    document.querySelector("#tomorrowCon img").setAttribute('src' , data.forecast.forecastday[1].day.condition.icon) ;
    document.querySelector("#tomorrowUpper").innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    document.querySelector("#tomorrowLower").innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    document.querySelector("#tomorrowSky").innerHTML = data.forecast.forecastday[1].day.condition.text;
    //dayAfter
    let dayAfterDate = new Date(data.forecast.forecastday[1].date);
    let dayAfterName = dayAfterDate.toLocaleString("en-us" , {weekday : "long"});
    document.querySelector("#dayAfterDay").innerHTML = dayAfterName;
    document.querySelector("#dayAfterCon img").setAttribute('src' , data.forecast.forecastday[2].day.condition.icon) ;
    document.querySelector("#dayAfterUpper").innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector("#dayAfterLower").innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    document.querySelector("#dayAfterSky").innerHTML = data.forecast.forecastday[2].day.condition.text;

}

document.getElementById('search').addEventListener('input' , (e) => {
    getWeather(e.target.value)
});