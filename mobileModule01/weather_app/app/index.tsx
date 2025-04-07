import {StyleSheet, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Index({geolocation}: {geolocation: string}) {
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
            <Text style={styles.header}>Currently</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
    }
})
