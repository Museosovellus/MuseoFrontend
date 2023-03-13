import React, { useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MuseoInfo({ route, navigation }) {
  const { name, city, province, latitude, longitude, openingHours, index } = route.params;
  const mapRef = useRef(null);
  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }

  const centerMap = () => {
    mapRef.current.animateToRegion(initialRegion, 0.5 * 1000);
  }

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{city}</Text>
      <Text>{province}</Text>
      <Text>{openingHours}</Text>
      {/* TODO: Tarkemmat aukioloajat ja linkki museon nettisivulle. */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        <Marker
          key={index}
          title={name}
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
      {/* Ton titlen tilalle joku kiva ikoni :) */}
      <Button title='Keskitä' onPress={centerMap} />
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
