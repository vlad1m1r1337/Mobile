import {StyleSheet, Text, View} from "react-native";
import useLocation from "@/app/hooks/useLocation";
import {useEffect, useMemo} from "react";

export default function Index({
    latitude,
    longitude,
    errorMsg,
    dislocation
}) {
    useEffect(() => {
        console.log('dislocation updated: index', dislocation);
    }, [dislocation]);
    const dis = useMemo(() => dislocation, [dislocation]);
    return (
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
                        <Text style={styles.header}>Currently</Text>
                        { dis && <Text>{dis.city} {dis.country} {dis.region}</Text>}
                        <Text style={styles.header}>{latitude} {longitude}</Text>
                    </>
                )
            }
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
    },
    errorText: {
        paddingHorizontal:10,
        paddingVertical:10,
        fontSize: 25,
        color: "#FF0000",
    }
})
