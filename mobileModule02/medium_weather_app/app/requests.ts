import { fetchWeatherApi } from 'openmeteo';
import axios from "axios";
import {parseCurentInfo, parseTodayInfo, parseWeekInfo} from "@/app/utils/parseInfo";

type getWeatherParams = {
    latitude: number;
    longitude: number;
}

export const getWeather = async ({lat, long}) => {
    if (!lat || !long) {
        return {}
    }
    const params = {
        latitude: lat,
        longitude: long,
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
    console.log('wData', weatherData);
    // parseCurentInfo(weatherData);
    // parseTodayInfo(weatherData);
    // parseWeekInfo(weatherData);
    return weatherData;
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