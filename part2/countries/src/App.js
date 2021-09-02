import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Country = ({country}) => {
    // https://www.weatherapi.com/api-explorer.aspx
    const api_key = process.env.REACT_APP_API_KEY;
    const { capital } = country;
    const [weatherArray, setWeatherArray] = useState([]);
    
      const weatherHook = () => {
        axios
            .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
            .then(res => {
                const weatherInfo = res.data.current;
                setWeatherArray(weatherArray.concat(weatherInfo.temp_f, weatherInfo.wind_dir, weatherInfo.wind_mph, weatherInfo.condition.icon));
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    }
    useEffect(weatherHook, []);
    
    return (
        <>
            <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            <br/>
            <h3>languages</h3>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            <br/>
            <img src={country.flag} alt="country flag" style={{ width: '250px'}}/>
            <h3>Weather in {capital}</h3>

            <p><b>temperature:</b> {weatherArray[0]} fahrenheit</p>
            <img src={weatherArray[3]} alt="weather icon"/>
            <p><b>wind:</b> {weatherArray[2]} mph direction {weatherArray[1]}</p>
        </>
    );
}

const Countries = ({countries}) => { 
    const [displayCountry, setDisplayCountry] = useState(null);   
    const countriesLen = countries.length;
    
    const matchedCountry = countries.find(({name}) => name === displayCountry);

    const onHandleSelectCountry = (country) => {
        setDisplayCountry(selected => {
            return selected !== country.name ? country.name : null
        });
    };

    if (countriesLen === 0) {
        return (
           <p>Please try another search...</p>
        );
    } else if (countriesLen === 1) {
        return (
           <ul>
                {countries.map((country, i) => <Country key={i} countriesLen={countriesLen} country={country}/>)}
           </ul>
        );
    } else if (countriesLen > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        );
    } else {
        return (
            <>
            <ul>
                {countries.map((country, i) => <li key={i}>{country.name}<Button handleViewButton={() => onHandleSelectCountry(country)}/></li>)}
            </ul>
                { matchedCountry && <Country countriesLen={countriesLen} country={matchedCountry}/> }
            </>
        )
    };
};

const Button = ({handleViewButton}) => {
    return (
        <button onClick={handleViewButton}>Show</button>
    );
};

const Input = ({newSearch, handleSearch}) => {
    return (
        <div>
            find countries <input value={newSearch} onChange={handleSearch}/>
        </div>
    );
};

function App() {
    const [countries, setCountries] = useState([]);
    const [newSearch, setNewSearch] = useState('');

    const handleSearch = (event) => {
        const search = event.target.value;
        setNewSearch(search);
    };

    const handleViewButton = (event) => {
        const search = event.target.value;
        setNewSearch(countries.filter(country => country === search));
    };

    const showCountrySearch = newSearch
        ? countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
        : countries;

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data);
                console.log('Countries array loaded');
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    }, []);

    return ( 
        <div>
            <Input newSearch={newSearch} handleSearch={handleSearch}/>
            <Countries countries={showCountrySearch} handleViewButton={handleViewButton}/>
        </div>
    );
};

export default App;