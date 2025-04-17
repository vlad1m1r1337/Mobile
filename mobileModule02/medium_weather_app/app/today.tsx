import {StyleSheet, Text, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";

export default function Today() {
    const {latitude, longitude, erroMsg} = useLocation();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {erroMsg ?
                <Text style={styles.errorText}>{erroMsg}</Text> :
                (
                    <>
                        <Text style={styles.header}>Today</Text>
                        <Text style={styles.header}>{`${latitude}  ${longitude}`}</Text>
                    </>
                )
            }
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
    },
    errorText: {
        paddingHorizontal:10,
        paddingVertical:10,
        fontSize: 25,
        color: "#FF0000",
    }
})
