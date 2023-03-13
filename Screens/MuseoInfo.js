import React from "react";
import { View, Text } from "react-native";

export default function MuseoInfo({ route, navigation}) {
    const { name, city, province, latitude, longitude, openingHours } = route.params;
    return (
        <View>
            <Text>{name}</Text>
            <Text>{city}</Text>
            <Text>{province}</Text>
            <Text>{openingHours}</Text>
        </View>
    )
}