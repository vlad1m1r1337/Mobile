import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {parseChartInotherInfo, parseCurentInfo, parseTodayInfo} from "@/app/utils/parseInfo";
import {useMemo} from "react";
import ChartScreen from "@/app/chart-screen";
import {weatherIcons} from "@/app/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Today({
    errorMsg,
    dislocation,
    weatherData
}) {
    const data = useMemo(() => parseTodayInfo(weatherData), [weatherData]);
    const { width, height } = useWindowDimensions();
    return (
            <View
                style={{
                    height: height - 200,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ScrollView>
                    {errorMsg ?
                        <Text style={styles.errorText}>{errorMsg}</Text> :
                        (
                            <>
                                {dislocation &&
                                    <View style={styles.info}>
                                        <Text style={styles.font}>{dislocation.city}</Text>
                                        <Text style={styles.font}>{dislocation.region}, {dislocation.country}</Text>
                                        <ChartScreen data={data}/>
                                        <View style={{ width: '90%'}}>
                                                <ScrollView horizontal={true}>
                                                        {data && Object.keys(data).length && data.map(function (el) {
                                                            return (
                                                                <View style={styles.today_info} key={Date.now().toString() + Math.random().toString()}>
                                                                    <Text style={{fontSize: 20}}>{el.time}</Text>
                                                                    <MaterialCommunityIcons name={weatherIcons[el.code]} size={64} color="#000" />
                                                                    <Text style={{fontSize: 20}}>{el.temperature} °C</Text>
                                                                    <Text style={{fontSize: 20}}>{el.windSpeed} km/h</Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </ScrollView>
                                        </View>
                                    </View>
                                }
                            </>
                        )
                    }
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    font: {
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
        justifyContent: "center",
        alignItems: "center",
    },
    today_info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    info_slider: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})
