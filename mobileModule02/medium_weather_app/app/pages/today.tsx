import {StyleSheet, Text, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";
import {useEffect} from "react";

export default function Today({
    latitude,
    longitude,
    errorMsg,
    dislocation,
    weatherData
}) {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {errorMsg ?
                <Text style={styles.errorText}>{errorMsg}</Text> :
                (
                    <>
                        <Text style={styles.header}>Today</Text>
                        {dislocation &&
                            <View style={styles.info}>
                                <Text>{dislocation.city}</Text>
                                <Text>{dislocation.country}</Text>
                                <Text>{dislocation.region}</Text>
                            </View>
                        }
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
    },
    info: {
        display: "flex",
        flexDirection: "column",
    }
})
