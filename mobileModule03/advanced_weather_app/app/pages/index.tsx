import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";
import {useEffect, useMemo} from "react";
import {parseCurentInfo} from "@/app/utils/parseInfo";

export default function Index({
    errorMsg,
    dislocation,
    weatherData,
}) {
    const data = useMemo(() => parseCurentInfo(weatherData), [weatherData]);
    const image = {uri: 'https://png.pngtree.com/background/20210711/original/pngtree-hand-drawn-blue-sky-white-clouds-weather-forecast-illustration-background-picture-image_1137685.jpg'};
    const {width, height} = useWindowDimensions();

    return (
    <>
        <ScrollView style={{height: 400, backgroundColor: 'transparent'}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.centerText}>
                    {errorMsg ?
                        <Text style={styles.errorText}>{errorMsg}</Text> :
                        (
                            <>
                                {dislocation &&
                                    <View style={styles.info}>
                                        <Text>{dislocation.city}</Text>
                                        <Text>{dislocation.region}</Text>
                                        <Text>{dislocation.country}</Text>
                                        <Text>{data.temperature} °C</Text>
                                        <Text>{data.windSpeed} km/h</Text>
                                    </View>
                                }
                            </>
                        )
                    }
                </View>
            </View>
        </ScrollView>
    </>
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
