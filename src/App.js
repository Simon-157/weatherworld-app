import React, {useState} from 'react';
import './App.css';




const api={
  key: "b70f58ced0c9cbb580eda9e78eb30cd0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);


    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
      }
    }   



    const dateBuilder= (d) => {
      let months=['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`

    }
    
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'weather-app' : 'weather-app fall') : 'app'}>
      <main>
        
        
        <div className='search-container'>
          <input className="search-area"
           type="text" 
           placeholder="search city" 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="geographical-area">
            <div className="city">{weather.name}, {weather.sys.country} </div>
            <div className="period">
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className="weather-show">
            <div className="temperature"> {(weather.main.temp)}°c</div>
            <div className="weather-state">{weather.weather[0].main}</div>
            
            {/* <div className="weather-state">{(weather.weather[1].main)}</div> */}
          </div>

        </div>
        ) :('')}
      </main>
    </div>
  );
}

export default App;