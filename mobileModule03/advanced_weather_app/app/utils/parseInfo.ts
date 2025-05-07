import {weatherDescriptions} from "@/app/constants";

export const parseCurentInfo = (weatherData: any) => {
    const temperature = weatherData?.current?.temperature2m;
    const windSpeed = weatherData?.current?.windSpeed10m;
    const code = weatherData?.current?.weatherCode;
    if (!temperature || !windSpeed) {return {};}
    const result = {
        temperature: temperature?.toFixed(1),
        windSpeed: windSpeed.toFixed(1),
        description: weatherDescriptions[code],
        code: code,
    };
    return result;
};

export const parseTodayInfo = (weatherData: any) => {
    if (!weatherData || Object.keys(weatherData).length === 0) {return null}
    const length = weatherData.hourly?.time.filter(el => el.getDate() === new Date().getDate()).length;
    const index = weatherData.hourly?.time.findIndex(el => el.toISOString() > new Date().toISOString());
    const result = Array.from(weatherData?.hourly?.temperature2m).slice(index, index + length).map((value, i) => ({
        temperature: value.toFixed(1),
        time: weatherData.hourly.time[index + i].toISOString().split('T')[1].slice(0, 5),
        windSpeed: weatherData.hourly.windSpeed10m[index + i].toFixed(1),
        code: weatherData.hourly.weatherCode[index + i],
    }))

    return result;
}

export const parseWeekInfo = (weatherData: any) => {
    if (!weatherData || Object.keys(weatherData).length === 0) { return null }
    const result = Array.from(weatherData?.daily?.weatherCode).map(function(value, i){
        const day = weatherData.daily.time[i].getDate().toString().padStart(2, '0');
        const month = (weatherData.daily.time[i].getMonth() + 1).toString().padStart(2, '0');
        return {
            time: `${day}/${month}`,
            timeMin: weatherData?.daily?.temperature2mMin[i].toFixed(1),
            timeMax: weatherData?.daily?.temperature2mMax[i].toFixed(1),
            code: value,
        }
    });
    return result;
};

export const parseChartInotherInfo = (data: any) => {
    if (!data) {
        return { first: [], second: [] };
    }
    if(data.length === 7){
        console.log('here data', data);
        const min = data.map(item => ({'value': Number(item.timeMin), 'dataPointText': item.time}));
        const max = data.map(item => ({'value': Number(item.timeMax), 'dataPointText': item.time}));
        const labels = data.map(item => item.time);
        return { first: min, second: max, labels,};
    }
    else {
        const res = data.map(item => ({'value': Number(item.temperature), 'dataPointText': item.time}));
        const labels = data.map(item => item.time);
        return {first : [], second: res, labels,};
    }
}
