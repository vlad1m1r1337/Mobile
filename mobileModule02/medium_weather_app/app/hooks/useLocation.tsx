import {useEffect, useState} from "react";
import * as Location from "expo-location";

const useLocation = ({
    setLatitude,
    setLongitude,
    setErroMsg,
    setDislocation,
}) => {

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
            setDislocation({
                'city': result[0]?.city || '',
                'country': result[0]?.country || '',
                'region':  result[0]?.region || ''
            })
            console.log('city', result[0].city, 'country', result[0].country, 'region', result[0].region);
        }
    }

    useEffect(() => {
        getUserLocation();
    }, [])
}

export default useLocation