import {weatherDescriptions} from "@/app/constants";

export const parseCurentInfo = (weatherData: any) => {
    const { temperature2m: temperature, time } = weatherData.current;
    const timestamp = time[0].toISOString();

    console.log('current', temperature, timestamp);
};

export const parseTodayInfo = (weatherData: any) => {
    const length = weatherData.hourly.time.filter(el => el.getDate() === new Date().getDate()).length;
    const index = weatherData.hourly.time.findIndex(el => el.toISOString() > new Date().toISOString());
    console.log(weatherData)
    console.log('\n')
    for(let i = 0; i < 20; i++) {
        console.log(
            'время', weatherData.hourly.time[i],
            'температура', weatherData.hourly.temperature2m[index].toFixed(1),
            'скорость', weatherData.hourly.windSpeed10m[index].toFixed(1));
    }
    console.log('\n')

}

export const parseWeekInfo = (weatherData: any) => {
    const { temperature2m, time, weatherCode } = weatherData.daily;
    const result = Array.from(temperature2m).map((value, i) => ({
        temperature: value.toFixed(1),
        time: time[i].toISOString(),
        description: weatherDescriptions[weatherCode[i]],
    }));
};


