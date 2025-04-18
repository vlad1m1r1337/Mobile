import {weatherDescriptions} from "@/app/constants";

export const parseCurentInfo = (weatherData: any) => {
    const { temperature2m: temperature, time } = weatherData.current;
    const timestamp = time[0].toISOString();

    const result = {temperature: temperature.toFixed(1), time: timestamp};
    return result;
};

export const parseTodayInfo = (weatherData: any) => {
    const length = weatherData.hourly.time.filter(el => el.getDate() === new Date().getDate()).length;
    const index = weatherData.hourly.time.findIndex(el => el.toISOString() > new Date().toISOString());

    const result = Array.from(weatherData.hourly.temperature2m).slice(index, index + length).map((value, i) => ({
        temperature: value.toFixed(1),
        time: weatherData.hourly.time[index + i].toISOString(),
        windSpeed: weatherData.hourly.windSpeed10m[index + i].toFixed(1),
    }))

    // console.log(result);
    return result;
}

export const parseWeekInfo = (weatherData: any) => {
    const { temperature2m, time, weatherCode } = weatherData.daily;
    const result = Array.from(temperature2m).map((value, i) => ({
        temperature: value.toFixed(1),
        time: time[i].toISOString(),
        description: weatherDescriptions[weatherCode[i]],
    }));
    // console.log(result);
    return result;
};


