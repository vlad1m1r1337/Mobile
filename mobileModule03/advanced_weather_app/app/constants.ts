export const color = {
    grayBackground: '#003366'
};

export const params = {
    "latitude": 52.52,
    "longitude": 13.41,
    "hourly": "temperature_2m"
};
export const url = "https://api.open-meteo.com/v1/forecast";

export const weatherDescriptions: Record<number, string> = {
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

export const weatherIcons: Record<number, string> = {
    0: 'weather-sunny', // Clear sky
    1: 'weather-sunny', // Mainly clear
    2: 'weather-partly-cloudy', // Partly cloudy
    3: 'weather-cloudy', // Overcast
    45: 'weather-fog', // Fog
    48: 'weather-fog', // Depositing rime fog
    51: 'weather-drizzle', // Light drizzle
    53: 'weather-drizzle', // Moderate drizzle
    55: 'weather-drizzle', // Dense drizzle
    56: 'weather-rainy', // Light freezing drizzle
    57: 'weather-rainy', // Dense freezing drizzle
    61: 'weather-rainy', // Slight rain
    63: 'weather-rainy', // Moderate rain
    65: 'weather-pouring', // Heavy rain
    66: 'weather-snowy-rainy', // Light freezing rain
    67: 'weather-snowy-rainy', // Heavy freezing rain
    71: 'weather-snowy', // Slight snow fall
    73: 'weather-snowy', // Moderate snow fall
    75: 'weather-snowy-heavy', // Heavy snow fall
    77: 'weather-snowy-heavy', // Snow grains
    80: 'weather-rainy', // Slight rain showers
    81: 'weather-rainy', // Moderate rain showers
    82: 'weather-pouring', // Violent rain showers
    85: 'weather-snowy', // Slight snow showers
    86: 'weather-snowy-heavy', // Heavy snow showers
    95: 'weather-lightning', // Thunderstorm: slight or moderate
    96: 'weather-lightning-rainy', // Thunderstorm with slight hail
    99: 'weather-lightning-rainy', // Thunderstorm with heavy hail
};
