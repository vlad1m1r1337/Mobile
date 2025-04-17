import { fetchWeatherApi } from 'openmeteo';
import axios from "axios";
import {parseCurentInfo, parseTodayInfo, parseWeekInfo} from "@/app/utils/parseInfo";

export const getWeather = async () => {
    const params = {
        latitude: 35.1056,
        longitude: 33.4198,
        hourly: ["temperature_2m", "windspeed_10m"],
        daily: ["temperature_2m_min", "temperature_2m_max", "weathercode"],
        current: ["temperature_2m", "windspeed_10m", "weathercode"],
        wind_speed_unit: "kmh",
        timezone: "Europe/Moscow",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const current = response.current()!;

    // console.log(current)

    const weatherData = {
        current: {
            time: [...Array((Number(current.timeEnd()) - Number(current.time())) / current.interval())].map(
                (_, i) => new Date((Number(current.time()) + i * current.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: current.variables(1)!.value(),
            windSpeed10m: current.variables(0)!.value(),
            weatherCode: current.variables(2)!.value(),
        },
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            windSpeed10m: hourly.variables(1)!.valuesArray()!,
            weatherCode: hourly.variables(2)!.valuesArray()!,
        },
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: daily.variables(0)!.valuesArray()!,
            windSpeed10mMax: daily.variables(0)!.valuesArray()!,
            weatherCode: daily.variables(2)!.valuesArray()!,
        },
    };
    parseCurentInfo(weatherData);
    parseTodayInfo(weatherData);
    parseWeekInfo(weatherData);
    const weatherDescriptions: Record<number, string> = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm: slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    };
};

type WeatherApiResponse = {
    name?: string;
    admin1?: string;
    country?: string;
}

type WeatherApiResponseArray = WeatherApiResponse[] | {};

export const getCity = async (city: string) => {
    try {
        const response = await axios.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=6&language=en&format=json`);
        return response.data.results as WeatherApiResponse[];
    }
    catch (error) {
        console.log(error);
    }
}