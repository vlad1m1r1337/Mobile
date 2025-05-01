import {View, StyleSheet, TextInput, Text, TouchableOpacity, useWindowDimensions, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {color} from "@/app/constants";
import {getCity} from "@/app/requests";
import useLocation from "@/app/hooks/useLocation";
import {DislocatoinType} from "@/app/_layout";

type GeolocationSearchParams = {
    setGeolocation: (geolocation: string) => void;
    setLatitude: (latitude: number) => void;
    setLongitude: (longitude: number) => void;
    setErrorMsg: (msg: string) => void;
    setDislocation: (dislocation: DislocatoinType) => void;
}

export const GeolocationSearch = ({
    setGeolocation,
    setLatitude,
    setLongitude,
    setDislocation,
    setErrorMsg
}: GeolocationSearchParams) => {
    const [search, setSearch] = useState('');
    const [hints, setHints] = useState([]);
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        const getHints = async () => {
            const res = await getCity(search, setErrorMsg) || [];
            setHints(res);
        }
        getHints();
    }, [search]);
    useLocation({setLatitude, setLongitude, setErrorMsg, setDislocation, trigger});

    const { height, width } = useWindowDimensions();
    return (
        <>
            <View style={styles.container}>
                <EvilIcons name="search" size={30} color="white" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    placeholder="Search Location..."
                />
                <FontAwesome onPress={() => setTrigger(!trigger) } name="location-arrow" size={30} color="white" />

            </View>
            <View style={styles.dropdownList}>
                <ScrollView>
                    {hints.map((hint, i) => (
                        <TouchableOpacity key={Date.now().toString() + Math.random().toString()} onPress={() => {
                            setSearch('');
                            setLongitude(hint?.longitude);
                            setLatitude(hint?.latitude);
                            setDislocation({
                                'city': hint.name,
                                'country': hint.country,
                                'region': hint.admin1
                            })
                        }}>
                            <View style={styles.suggestionLine}>
                                <FontAwesome name="building" size={24} color="black" />
                                <Text>{hint?.name}</Text>
                                <Text>{hint?.admin1}</Text>
                                <Text>{hint?.country}</Text>
                            </View>
                            <View/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        height: 70,
        backgroundColor: 'transparent',
        zIndex: 20
    },
    input: {
        width: '80%',
        color: 'white',
        fontSize: 20,
    },
    dropdownList: {
        position: 'absolute',
        top: 50,
        left: 15,
        zIndex: 200,
        display: 'flex',
        height: 200,
        flexDirection: 'column',
        color: color.grayBackground,
        backgroundColor: 'white',
    },
    suggestionLine: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    horizontalLine: {
        width: '80%',
        height: 1,
        backgroundColor: 'red',
    }
})

