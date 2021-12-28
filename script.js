const timeEl = document.getElementById('time')
const AM_PM_EL = document.getElementById('am-pm')
const dateEl = document.getElementById('date')
const timeZoneEl = document.getElementById('timeZone')
const cordinatesEl = document.getElementById('cordinates')
const currentWeatherItemsEl = document.getElementById('currentWeatherItems')
const weatherForecastEl = document.getElementById('weatherForecast')
const currentTempEl = document.getElementById('current-temp')

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

const API_KEY = '8cd1919d376db1b62b3b0a79266b0730'
const API_URL = 'https://api.openweathermap.org/data/2.5/onecall'

setInterval(()=>{
    const time = new Date()

    const month = time.getMonth()

    const date =time.getDate()

    const day = time.getDay()

    const hour = time.getHours()

    const hourIn12HrsFormat = hour >= 13 ? hour%12 : hour

    const minutes = time.getMinutes()

    const Am_Pm =  hour >= 12 ? 'PM' : 'AM'

    console.log(hourIn12HrsFormat)

    timeEl.innerHTML = (hourIn12HrsFormat < 10 ? '0' + hourIn12HrsFormat : hourIn12HrsFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes ) + ' ' + `<span id='am-pm'>${Am_Pm}</span>`


    dateEl.innerHTML = days[day] + ', '  + date +' ' + months[month]

},1000)

getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((sucess) => {
        console.log(sucess)

        let {latitude, longitude} = sucess.coords

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data) 
        })
    })
}

function showWeatherData(data){
    let {humidity,pressure,sunrise,sunset,wind_speed} = data.current

    timeZoneEl.innerHTML = data.timezone
    cordinatesEl.innerHTML = data.lat + 'N ' + data.lon + 'E'

    currentWeatherItemsEl.innerHTML = `
    <div class="humidity">
    <p>Humidity</p>
    <p>${humidity}%</p>
</div>
<div class="humidity">
    <p>Pressure</p>
    <p>${pressure}%</p>
</div>
<div class="humidity">
    <p>Wind Speed</p>
    <p>${wind_speed}%</p>
</div>
<div class="humidity">
    <p>Sunrise</p>
    <p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
</div>
<div class="humidity">
    <p>Sunset</p>
    <p>${window.moment(sunset * 1000).format('HH:mm a')}</p>
</div>`

let otherDAyForecast = ''

data.daily.forEach((day, idx) => {
    if(idx == 0) {
        currentTempEl.innerHTML = `
        <div class="icon">
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon" alt="ico">
        </div>
        <div class="data">
            <div class="monday">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="night">Night- ${day.temp.night}&#176; C</div>
            <div class="day">Day- ${day.temp.day}&#176; C</div>
        </div>
        
        `
    }else{
        otherDAyForecast += `
        <div class="futureForecast">
            <div class="tue">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon"" alt="">
            <div class="temp">${day.temp.night}&#176; C - ${day.temp.day}&#176; C</div>
        </div>
        
        `
    }
})
weatherForecastEl.innerHTML = otherDAyForecast
}
    

