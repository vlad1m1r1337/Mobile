import {useEffect, useState} from "react";
import * as Location from "expo-location";

const useLocation = ({
    setLatitude,
    setLongitude,
    setErrorMsg,
    setDislocation,
    trigger
}) => {

    const getUserLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== "granted") {
            console.log("Ашибачка");
            setErrorMsg('Geolocation is not available, please enable it in tour App settings');
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
            setDislocation({
                'city': result[0]?.city || '',
                'country': result[0]?.country || '',
                'region':  result[0]?.region || ''
            })
        }
    }

    useEffect(() => {
        console.log("Ge");
        getUserLocation();
    }, [trigger])
}

export default useLocation