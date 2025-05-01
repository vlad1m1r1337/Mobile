import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {parseChartInotherInfo, parseCurentInfo, parseTodayInfo} from "@/app/utils/parseInfo";
import {useMemo} from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import ChartScreen from "@/app/chart-screen";

export default function Today({
    errorMsg,
    dislocation,
    weatherData
}) {
    const data = useMemo(() => parseTodayInfo(weatherData), [weatherData]);
    const {width, height} = useWindowDimensions();
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
                                        <Text>{dislocation.city}</Text>
                                        <Text>{dislocation.country}</Text>
                                        <Text>{dislocation.region}</Text>
                                        <ChartScreen data={data}/>
                                        {data && Object.keys(data).length && data.map(function (el) {
                                            return (
                                                <View style={styles.today_info} key={Date.now().toString() + Math.random().toString()}>
                                                    <Text>{el.time}</Text>
                                                    <Text>{el.temperature} °C</Text>
                                                    <Text>{el.windSpeed} km/h</Text>
                                                </View>
                                            )
                                        })}
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
    today_info: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    }
})
