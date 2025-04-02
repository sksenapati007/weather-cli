import axios from 'axios';
import yargs from 'yargs';
import dotenv from 'dotenv';
import express from 'express';
const chalk = require('chalk');
import cors from 'cors';
import { weatherIcons } from './weatherIcons';

dotenv.config();

const apiKey = process.env.API_KEY;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface WeatherResponse {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  name: string;
}

async function getWeatherData(city: string = "Dubai"): Promise<WeatherResponse> {
  const response = await axios.get<WeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return response.data;
}

function getWeatherIcon(description: string): string {
  const normalizedDescription = description.toLowerCase();
  return weatherIcons[normalizedDescription] || weatherIcons['default'];
}

function formatWeatherOutput(data: WeatherResponse): string {
  const weather = data.weather[0].description;
  const temperature = data.main.temp;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const city = data.name;
  const weatherIcon = getWeatherIcon(weather);

  return chalk`
${weatherIcon}
{blue.bold Weather Report for ${city}}
{green.bold Condition:} ${weather}
{green.bold Temperature:} ${temperature}°C
{green.bold Feels like:} ${feelsLike}°C
{green.bold Humidity:} ${humidity}%
`;
}

// Web API endpoint
app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city as string;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weatherData = await getWeatherData(city);
    const formattedOutput = formatWeatherOutput(weatherData);

    res.json({
      city: weatherData.name,
      weather: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      formattedOutput
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CLI functionality
if (require.main === module) {
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

  const city = argv.city || "Dubai";

  getWeatherData(city)
    .then((data) => {
      console.log(formatWeatherOutput(data));
    })
    .catch((error) => {
      console.error(chalk.red('Error fetching weather data:'), error.message);
    });
} else {
  // Start the web server
  app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
  });
}