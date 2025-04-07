import { View, StyleSheet, TextInput} from "react-native";
import {useState} from "react";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type GeolocationSearchParams = {
    setGeolocation: (geolocation: string) => void;
}

export const GeolocationSearch = ({setGeolocation}: GeolocationSearchParams) => {
    const [search, setSearch] = useState('')
    return (
        <View style={styles.container}>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSearch(text)}
                value={search}
                placeholder="Write login"
            />
            <FontAwesome onPress={() => setGeolocation(search)} name="location-arrow" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        height: 50,
    },
    input: {
        width: '80%',
    }
})

