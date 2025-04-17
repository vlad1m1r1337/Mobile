import { View, StyleSheet, TextInput, Text} from "react-native";
import {useEffect, useState} from "react";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {color} from "@/app/constants";
import {getCity} from "@/app/requests";

type GeolocationSearchParams = {
    setGeolocation: (geolocation: string) => void;
}

export const GeolocationSearch = ({setGeolocation}: GeolocationSearchParams) => {
    const [search, setSearch] = useState('');
    const [hints, setHints] = useState([]);

    useEffect(() => {
        const getHints = async () => {
            const res = await getCity(search) || [];
            setHints(res);
        }
        getHints();
    }, [search]);

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
                <FontAwesome onPress={() => setGeolocation(search)} name="location-arrow" size={30} color="white" />

            </View>
            <View style={styles.dropdownList} >
                    {hints.map((hint, i) => (
                        <View style={styles.suggestionLine}>
                            <FontAwesome name="building" size={24} color="black" />
                            <Text>{hint?.name}</Text>
                            <Text>{hint?.admin1}</Text>
                            <Text>{hint?.country}</Text>
                        </View>
                    ))}
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
        backgroundColor: 'grey',
    },
    input: {
        width: '80%',
        color: 'white',
        fontSize: 20,
    },
    dropdownList: {
        display: 'flex',
        flexDirection: 'column',
        color: color.grayBackground,
    },
    suggestionLine: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
})

