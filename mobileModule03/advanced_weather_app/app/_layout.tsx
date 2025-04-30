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
import {View, StyleSheet, Dimensions, ImageBackground, Image, useWindowDimensions, Text} from "react-native";
const Tab = createMaterialTopTabNavigator();

export interface DislocatoinType {
    city: string;
    region: string;
    country: string;
}

export default function RootLayout() {
    const [, setGeolocation] = useState('');
    const [ weatherData, setWeatherData] = useState(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [dislocation, setDislocation] = useState<DislocatoinType | null>(null);
    useEffect(() => {
        const getData = async () => {
            const data = await getWeather({ lat: latitude, long: longitude, setErrorMsg });
            setWeatherData(data);
        };
        getData();
    }, [latitude, longitude]);
    const {width, height} = useWindowDimensions();

    useLocation({setLatitude, setLongitude, setErrorMsg, setDislocation});
    return (
        <>
            <ImageBackground
                source={{ uri: 'https://media.newyorker.com/photos/59095c67ebe912338a37455d/master/pass/Stokes-Hello-Kitty2.jpg' }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
            >
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
                            zIndex: 10,
                            backgroundColor: 'transparent',
                        },
                        tabBarInactiveTintColor: 'red',
                        tabBarIndicatorStyle: {
                            display: 'none',
                        },
                    }}
                    style={{ backgroundColor: 'transparent' }}
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
                        style={{ backgroundColor: 'transparent' }}
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
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({

});


/*
                <View>
                    <Text>lol</Text>
                </View>
 */