import axios from 'axios';
import yargs from 'yargs';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY

interface WeatherResponse {
    weather: {
        description: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
}

const argv: any = yargs
    .options('city', {
        alias: 'c',
        description: 'City name',
        type: 'string',
        demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;

const city = argv.city;

axios.get<WeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
).then((response) => {
    const weather = response.data.weather[0].description;
    const temperature = response.data.main.temp;
    const feelsLike = response.data.main.feels_like;
    const humidity = response.data.main.humidity;

    console.log(`Weather in ${city}: ${weather}`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Feels like: ${feelsLike}°C`);
    console.log(`Humidity: ${humidity}%`);
}).catch((error) => {
    console.error('Error fetching weather data:', error.message);
});