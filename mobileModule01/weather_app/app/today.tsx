import {StyleSheet, Text, View} from "react-native";

export default function Today({geolocation}: {geolocation: string}) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View>
                <Text style={styles.header}>{geolocation}</Text>
                <Text  style={styles.header}>Today</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
    }
})
