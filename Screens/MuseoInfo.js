import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MuseoInfo({ route, navigation }) {
  const { name, city, province, latitude, longitude, openingHours, index } = route.params;
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{city}</Text>
      <Text>{province}</Text>
      <Text>{openingHours}</Text>
      {/* TODO: Tarkemmat aukioloajat ja linkki museon nettisivulle. */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        <Marker
          key={index}
          title={name}
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    marginTop: 50,
    height: 250,
  }
})
