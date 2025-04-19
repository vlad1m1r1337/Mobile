import {StyleSheet, Text, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";
import {useMemo} from "react";
import {parseWeekInfo} from "@/app/utils/parseInfo";

export default function Weekly({
    latitude,
    longitude,
    errorMsg,
    dislocation,
    weatherData
}) {
    const data = useMemo(() => parseWeekInfo(weatherData), [weatherData]);
    console.log(data)
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
                        {dislocation &&
                            <View style={styles.info}>
                                <Text>{dislocation.city}</Text>
                                <Text>{dislocation.country}</Text>
                                <Text>{dislocation.region}</Text>

                                {data && Object.keys(data).length && data.map(function (el) {
                                    return (
                                        <View style={styles.weekly_info} key={Date.now().toString() + Math.random().toString()}>
                                            <Text>{el.time}</Text>
                                            <Text>{el.timeMin}</Text>
                                            <Text>{el.timeMax}</Text>
                                            <Text>{el.description}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        }

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
    },
    weekly_info: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    }
})
