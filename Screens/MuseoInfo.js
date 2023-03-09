import React from "react";
import { View, Text } from "react-native";

export default function MuseoInfo({ route, navigation}) {
    const { name } = route.params;
    return (
        <View>
            <Text>{name}</Text>
        </View>
    )
}