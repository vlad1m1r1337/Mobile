import {weatherDescriptions} from "@/app/constants";

export const parseCurentInfo = (weatherData: any) => {
    const temperature = weatherData?.current?.temperature2m;
    const windSpeed = weatherData?.current?.windSpeed10m;
    if (!temperature || !windSpeed) {return {};}
    const result = {temperature: temperature?.toFixed(1), windSpeed: windSpeed.toFixed(1)};
    return result;
};

export const parseTodayInfo = (weatherData: any) => {
    if(!weatherData || Object.keys(weatherData).length === 0) {return null}
    const length = weatherData.hourly?.time.filter(el => el.getDate() === new Date().getDate()).length;
    const index = weatherData.hourly?.time.findIndex(el => el.toISOString() > new Date().toISOString());

    const result = Array.from(weatherData?.hourly?.temperature2m).slice(index, index + length).map((value, i) => ({
        temperature: value.toFixed(1),
        time: weatherData.hourly.time[index + i].toISOString().split('T')[1].slice(0, 5),
        windSpeed: weatherData.hourly.windSpeed10m[index + i].toFixed(1),
    }))

    return result;
}

export const parseWeekInfo = (weatherData: any) => {
    if (!weatherData || Object.keys(weatherData).length === 0 || Object.keys(weatherData?.daily).length === 0) return null
    const result = Array.from(weatherData?.daily?.temperature2m).map((value, i) => ({
        time: weatherData.hourly.time[i].toISOString().split('T')[0],
        timeMin: weatherData?.daily?.temperature2mMin[i].toFixed(1),
        timeMax: weatherData?.daily?.temperature2mMax[i].toFixed(1),
        description: weatherDescriptions[weatherData?.daily?.weatherCode[i]],
    }));
    return result;
};


