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
    const [, setLongitude] = useState<number | null>(null);
    const [, setLatitude] = useState<number | null>(null);
    const [, setErroMsg] = useState("");
    const [dislocation, setDislocation] = useState({})
    useEffect(() => {
        getWeather()
    }, []);

    useLocation({setLatitude, setLongitude, setErroMsg, setDislocation});

    useEffect(() => {
        console.log('dislocation updated:', dislocation);
    }, [dislocation]);
    return (
        <>
            <GeolocationSearch setGeolocation={setGeolocation} />
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
                    {({setLatitude, setLongitude, latitude, longitude, errorMsg, dislocation}) => (
                        <Index/>
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
                    {({setLatitude, setLongitude, latitude, longitude, errorMsg, dislocation}) => (
                        <Today/>
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
                    {({setLatitude, setLongitude, latitude, longitude, errorMsg, dislocation}) => (
                        <Weekly/>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    );
}
