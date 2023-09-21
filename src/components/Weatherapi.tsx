'use client';
import React, { useEffect, useState } from 'react'

const WeatherAPI = () => {

        const [weatherData, setWeatherData] = useState({
            cloud_pct: 0,
            feels_like: 0,
            humidity: 0,
            max_temp: 0,
            min_temp: 0,
            sunrise: 0,
            sunset: 0,
            temp: 0,
            wind_degrees: 0,
            wind_speed: 0
        })


    const [cityName, setCityName] = useState('Narowal');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getWeatherData();
    }, [])


    const getWeatherData = () => {
        const apiUrl = `https://api.api-ninjas.com/v1/weather?city=${cityName}`
        fetch(apiUrl, {
            method: 'GET',
            headers: { 'X-Api-Key': 'JFFpjFL1Dfy0wN+Ozj6ZTw==qo8PKkCpUaZilwzq' }
        })

            .then(response => response.json())
            .then(data => { setWeatherData(data)})
            .catch(error => setLoading(false));
    }

    const getDate = () => {
        const currentDate = new Date();

        const options: any = { year: 'numeric', month: 'long', day: '2-digit' };
        const formattedDate: any = currentDate.toLocaleDateString('en-US', options);

        return formattedDate;
    }

    const getTime = (timestamp: any) => {
        const timestampMilliseconds = timestamp * 1000;

        const date = new Date(timestampMilliseconds);

        const formattedTime = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return formattedTime;

    }

    return (
        <div className="mx-auto p-4 bg-purple-400 h-screen flex justify-center">
            <div className="flex flex-wrap">
                <div className="w-full   px-2">
                    <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full dark:bg-gray-600">
                        <div className="p-4 rounded-lg">
                            <h1 className="text-2xl font-semibold mb-4 text-center">Weather App</h1>
                            <div className="flex items-center">
                                <input type="text" className="border-2 bg-transparent border-gray-300 p-2 rounded-l-md w-full" placeholder="City Name..."
                                    onChange={(e) => setCityName(e.target.value)}
                                    value={cityName} />
                                <button type="button" className="bg-blue-500 border-2 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                                    onClick={() => getWeatherData()}>Search</button>
                            </div>
                        </div>
                        {loading ? <div className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow-md w-96">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v6m0 2v4"></path>
                                </svg>
                                <p className="text-sm font-semibold">Loading Weather data for {cityName}</p>
                            </div>
                        </div> : weatherData.temp ? <>
                            <div className="px-6 py-6 relative">
                                <div className="flex mb-4 justify-between items-center">
                                    <div>
                                        <h5 className="mb-0 font-medium text-xl">{cityName.charAt(0).toUpperCase() + cityName.slice(1)}</h5>
                                        <h6 className="mb-0">{getDate()}</h6><small>{weatherData.cloud_pct >= 50 ? 'Cloudy' : 'Clear'}</small>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-bold text-4xl mb-0"><span>{Math.round(weatherData.temp)}&deg;</span></h3>
                                    </div>
                                </div>
                                <div className="block sm:flex justify-between items-center flex-wrap">
                                    <div className="w-full sm:w-1/2">
                                        <div className="flex mb-2 justify-between items-center"><span>Temp</span><small className="px-2 inline-block">{weatherData.temp}&nbsp;&deg;</small></div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <div className="flex mb-2 justify-between items-center"><span>Feels like</span><small className="px-2 inline-block">{weatherData.feels_like}&nbsp;&deg;</small></div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <div className="flex mb-2 justify-between items-center"><span>Temp min</span><small className="px-2 inline-block">{weatherData.min_temp}&nbsp;&deg;</small></div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <div className="flex mb-2 justify-between items-center"><span>Temp max</span><small className="px-2 inline-block">{weatherData.max_temp}&nbsp;&deg;</small></div>
                                    </div>
                                </div>
                            </div>
                            <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><small>Forecast</small></span></div>
                            <div className="px-6 py-6 relative">
                                <div className="text-center justify-between items-center flex" style={{ flexFlow: 'initial' }}>
                                    <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Humidity</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">{weatherData.humidity} gm<sup>-3</sup></span></div>
                                    <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Wind Speed</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">{weatherData.wind_speed} ms<sup>-1</sup></span></div>
                                    <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Sunrise</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">{getTime(weatherData.sunrise)}</span></div>
                                    <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Sunset</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">{getTime(weatherData.sunset)}</span></div>
                                    {/* <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8" /><span className="block my-1">{weatherData.}&deg;</span></div>
                                <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8" /><span className="block my-1">38&deg;</span></div> */}
                                </div>
                            </div>
                        </> : <div className="text-white bg-red-500 px-4 py-2 rounded-lg shadow-md w-96">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v6m0 2v4"></path>
                                </svg>
                                <p className="text-sm font-semibold">Error: Could not find data for {cityName}</p>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )

}


export default WeatherAPI;