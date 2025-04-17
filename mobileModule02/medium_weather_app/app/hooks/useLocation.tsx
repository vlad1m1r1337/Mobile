import {useEffect, useState} from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [erroMsg, setErroMsg] = useState("");
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);

    const getUserLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErroMsg('Geolocation is not available, please enable it in tour App settings');
            return;
        }

        let {coords} = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            setLatitude(latitude);
            setLongitude(longitude);
            let result = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            // console.log('user location', result);
        }
    }

    useEffect(() => {
        getUserLocation();
    }, [])
    return {latitude, longitude, erroMsg}
}

export default useLocation