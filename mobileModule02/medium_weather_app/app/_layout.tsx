import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from "@/app/index";
import Today from "@/app/today";
import Weekly from "@/app/weekly";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {GeolocationSearch} from "@/app/geolocation-search";
import {useState} from "react";
import useLocation from "@/app/hooks/useLocation";
const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
    const [geolocation, setGeolocation] = useState('');
    const {latitude, longitude, erroMsg} = useLocation();
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
                    tabBarInactiveTintColor: '#778899',
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <MaterialCommunityIcons
                            name="calendar-account"
                            size={24}
                            color={focused ? '#000000' : '#778899'}
                        />
                    ),
            }}
            >
                {() => (
                    <Index
                        geolocation={geolocation}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="MoreInfo"
                options={{
                    tabBarLabel: "Today",
                    tabBarInactiveTintColor: '#778899',
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <MaterialCommunityIcons
                            name="calendar"
                            size={24}
                            color={focused ? '#000000' : '#778899'}
                        />
                    ),
            }}
            >
                {() => (
                    <Today
                        geolocation={geolocation}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Weekly"
                options={{
                    tabBarLabel: "Weekly",
                    tabBarInactiveTintColor: '#778899',
                    tabBarActiveTintColor: '#000000',
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <AntDesign
                            name="calendar"
                            size={24}
                            color={focused ? '#000000' : '#778899'}
                        />
                    ),
            }}
            >
                {() => (
                    <Weekly
                        geolocation={geolocation}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    </>
  );
}

