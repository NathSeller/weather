import React, { useState } from 'react';
import githubIcon from './assets/github.png';

const api = {
  key: '65b6d19905d26071a493c3f1205cb6de',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day =days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
  
  return (
    <div className={(typeof weather.weather != 'undefined')
    ? ((weather.weather[0].main === 'Clear')
    ? 'app clear' : (weather.weather[0].main === 'Clouds')
    ? 'app cloudy' : (weather.weather[0].main === 'Rain')
    ? 'app rain' : (weather.weather[0].main === 'Lightning')
    ? 'app lightning' : (weather.weather[0].main === 'Mist')
    ? 'app mist' : (weather.weather[0].main === 'Snow')
    ? 'app snow' : (weather.weather[0].main === 'Sunny')
    ? 'app sunny' : (weather.weather[0].main === 'Fog')
    ? 'app fog' : (weather.weather[0] === 'Smoke')
    ? 'app smoke' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input 
          type='text'
          className='search-bar'
          placeholder='Search...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
        <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temp'>
            {Math.round(weather.main.temp)}°C
          </div>
          <div className='weather'>
            {weather.weather[0].main}, {weather.weather[0].description}
            </div>
        </div>
        </div>
        ) : (
          <div className='cover'>
            <div className='filler'>
            Use the search bar at the top to check the weather!
            </div>
          </div>
        )}
        <div className='footer'>
          <a href='https://github.com/NathSeller'>
            <img className='github' src={githubIcon} alt='GitHub'/>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;


