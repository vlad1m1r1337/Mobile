import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from "@/app/pages";
import Today from "@/app/pages/today";
import Weekly from "@/app/pages/weekly";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {GeolocationSearch} from "@/app/geolocation-search";
import {useEffect, useState} from "react";
import {color} from "@/app/constants";
import {getWeather} from "@/app/requests";
import useLocation from "@/app/hooks/useLocation";
const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
    const [, setGeolocation] = useState('');
    const [ weatherData, setWeatherData] = useState(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [dislocation, setDislocation] = useState({});
    useEffect(() => {
        const getData = async () => {
            const data = await getWeather({ lat: latitude, long: longitude });
            setWeatherData(data);
        };
        getData();
    }, [latitude, longitude]);


    useLocation({setLatitude, setLongitude, setErrorMsg, setDislocation});

    return (
        <>
            <GeolocationSearch
                setGeolocation={setGeolocation}
                setLongitude={setLongitude}
                setLatitude={setLatitude}
                setDislocation={setDislocation}
                setErrorMsg={setErrorMsg}
            />
            <Tab.Navigator
                initialRouteName="Index"
                screenOptions={{
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                    tabBarInactiveTintColor: 'white',
                    tabBarIndicatorStyle: {
                        display: 'none',
                    },
                }}
            >
                <Tab.Screen
                    name="Index"
                    options={{
                        tabBarLabel: "Currently",
                        tabBarInactiveTintColor: color.grayBackground,
                        tabBarActiveTintColor: '#000000',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <MaterialCommunityIcons
                                name="calendar-account"
                                size={24}
                                color={focused ? '#000000' : color.grayBackground}
                            />
                        ),
                }}
                >
                    {() => (
                        <Index
                            dislocation={dislocation}
                            latitude={latitude}
                            longitude={longitude}
                            errorMsg={errorMsg}
                            weatherData={weatherData}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="MoreInfo"
                    options={{
                        tabBarLabel: "Today",
                        tabBarInactiveTintColor: color.grayBackground,
                        tabBarActiveTintColor: '#000000',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <MaterialCommunityIcons
                                name="calendar"
                                size={24}
                                color={focused ? '#000000' : color.grayBackground}
                            />
                        ),
                }}
                >
                    {() => (
                        <Today
                            dislocation={dislocation}
                            latitude={latitude}
                            longitude={longitude}
                            errorMsg={errorMsg}
                            weatherData={weatherData}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Weekly"
                    options={{
                        tabBarLabel: "Weekly",
                        tabBarInactiveTintColor: color.grayBackground,
                        tabBarActiveTintColor: '#000000',
                        tabBarIcon: ({ focused }: { focused: boolean }) => (
                            <AntDesign
                                name="calendar"
                                size={24}
                                color={focused ? '#000000' : color.grayBackground}
                            />
                        ),
                }}
                >
                    {() => (
                        <Weekly
                            dislocation={dislocation}
                            latitude={latitude}
                            longitude={longitude}
                            errorMsg={errorMsg}
                            weatherData={weatherData}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    );
}
