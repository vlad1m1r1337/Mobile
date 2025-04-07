import {StyleSheet, Text, View} from "react-native";


export default function Index({geolocation}: {geolocation: string}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <View style={styles.centerText}>
            <Text style={styles.header}>Currently</Text>
            <Text style={styles.header}>{geolocation}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
    },
    centerText: {
        display: "flex",
        alignItems: "center",
    }
})
