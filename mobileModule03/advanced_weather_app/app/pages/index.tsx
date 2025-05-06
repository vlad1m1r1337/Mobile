import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";
import {useEffect, useMemo} from "react";
import {parseCurentInfo} from "@/app/utils/parseInfo";
import {weatherIcons} from "@/app/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index({
    errorMsg,
    dislocation,
    weatherData,
}) {
    const data = useMemo(() => parseCurentInfo(weatherData), [weatherData]);
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
                                    <Text style={styles.font}>{dislocation.city}</Text>
                                    <Text style={styles.font}>{dislocation.region}, {dislocation.country}</Text>
                                    <Text style={[styles.temperatureFont, styles.temperatureColor]}>{data.temperature} °C</Text>
                                   <View style={styles.weatherDescription}>
                                       <Text style={styles.font}>{data.description}</Text>
                                       <MaterialCommunityIcons name={weatherIcons[data.code]} size={64} color="#000" />
                                   </View>
                                    <Text style={styles.font}>{data.windSpeed} km/h</Text>
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
    temperatureColor: {
        color: "#FFA500",
    },
    temperatureFont: {
      fontSize: 40,
    },
    centerText: {
        display: "flex",
        alignItems: "center",
    },
    errorText: {
        paddingHorizontal:10,
        paddingVertical:10,
        fontSize: 25,
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    weatherDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    }
})
