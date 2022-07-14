import React,{useState, useEffect} from 'react';
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../data';

const Weather = () => {
  const [report, setReport] = useState([]);
  const [showDetails, setShowDetails] = useState(WeatherData);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const getCountry = async () => {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const report = await response.json();
    setReport(report.data);
  }
  
  useEffect(() => {
    getCountry();
  }, []);

useEffect(() => {
}, []);

  const showCity =
    report.find((key) => {
                if(key.country === country){
                  return true;
                }
                return false
              }
          );


       const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <section>
        <div className='sub-con'>
                <article className='get-weather'>
                    <div>
                     <h3 className='header'>Mikun.weather</h3>
                      <h3 className='location'>Location</h3>
                    </div>
                    <div className='select'>
                        <div className='select-1'>
                            <select value={country} onChange={(e) =>setCountry(e.target.value)}>
                                <option hidden className='hidden-option'>
                                Select Country
                                </option>
                                {report.map((item) => {
                                return(
                                    <option value={item.country}>{item.country}</option>
                                    )
                                })}
                            </select>
                                <h2 className='place'>Country: <span style={{color:'tomato'}}>{country}</span></h2>
                        </div>
                        <div className='select-2'>
                            <select value={city} onChange={(e) => setCity(e.target.value)}>
                                <option hidden className='hidden-option'>Select City</option>
                                {showCity && showCity.cities.map((place) => {
                                    return(
                                    <option value={place}>{place}</option>
                                        )
                                    })}
                            </select>
                                <h2 className='place'>City: <span style={{color:'tomato'}}>{city}</span></h2>
                        </div>
                    </div>

                            <div className='weather'>
                                    {showDetails.map((detail) => {
                                        const {firstletter, humidity, pressure, temperature, windspeed, cloud} = detail
                                        if(city.startsWith(firstletter)){
                                            return(
                                                <section>
                                                <h3>Weather Details</h3>
                                                    <article className='weather-card'>
                                                        <div className='weather-details'>
                                                            <p>Humidity</p>
                                                            <p>{humidity}</p>
                                                        </div>
                                                        <div className='weather-details'>
                                                            <p>Pressure</p>
                                                            <p>{pressure}</p>
                                                        </div>
                                                        <div className='weather-details'>
                                                            <p>Temperature</p>
                                                            <p>{temperature}</p>
                                                        </div>
                                                        <div className='weather-details'>
                                                            <p>Wind Speed</p>
                                                            <p>{windspeed}</p>
                                                        </div>
                                                        <div className='weather-details'>
                                                            <p>Cloud</p>
                                                            <p>{cloud}</p>
                                                        </div>
                                                    </article>
                                            </section>
                                                )
                                        }
                                    })}
                                
                            </div>
                </article>
                <article>
                    {showDetails.map((temp) => {
                        if(city.startsWith(temp.firstletter)){
                            return(
                                <div className='weather-showcase'>
                                    <h1>{temp.temperature}&deg;</h1>
                                    <div style={{padding:'0 10px'}}>
                                        <h2>{city}</h2>
                                        <p>{date}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faCloud} style={{fontSize:'35px'}}/>
                                </div>
                            )
                        }
                    })}
                </article>
             </div>
    </section>
  )
}

export default Weather