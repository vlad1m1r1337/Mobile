import { fetchWeatherApi } from 'openmeteo';
import axios from "axios";
import {parseCurentInfo, parseTodayInfo, parseWeekInfo} from "@/app/utils/parseInfo";

type getWeatherParams = {
    latitude: number;
    longitude: number;
}

type getWeatherType = {
    lat: number;
    long: number;
    setErrorMsg: (msg: string) => void;
}

export const getWeather = async ({lat, long, setErrorMsg}: getWeatherType) => {
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
    try {
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
                temperature2mMax: daily.variables(0)!.valuesArray()!,
                temperature2mMin: daily.variables(1)!.valuesArray()!,
            },
        };
        return weatherData;
    } catch (e) {
        setErrorMsg("Error occured");
        return {};
    }
};

type WeatherApiResponse = {
    name?: string;
    admin1?: string;
    country?: string;
}

export const getCity = async (city: string, setErrorMsg: (msg: string) => void) => {
    try {
        const response = await axios.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=6&language=en&format=json`);
        return response.data.results as WeatherApiResponse[];
    }
    catch (error) {
        setErrorMsg("Error occured");
    }
}