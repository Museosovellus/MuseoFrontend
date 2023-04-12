import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useRef } from 'react';
import MapView, { Marker } from "react-native-maps";
import themeContext from "../../config/themeContext";
import { Ionicons } from '@expo/vector-icons';
import { Button } from "react-native-paper";

export default function MuseoInfo({ route, navigation }) {

  const theme = useContext(themeContext);
  const { name, city, province, latitude, longitude, openingHours, index } = route.params;
  const mapRef = useRef(null);
  const initialRegion = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    latitudeDelta: Number(0.01),
    longitudeDelta: Number(0.01)
  }

  const centerMap = () => {
    mapRef.current.animateToRegion(initialRegion, 0.5 * 1000);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.box}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.city}><Ionicons name="location-sharp" /> {city}, {province}</Text>
        <Text style={styles.hours}>{openingHours}</Text>
        {/* TODO: Tarkemmat aukioloajat ja linkki museon nettisivulle. */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: Number(0.01),
            longitudeDelta: Number(0.01)
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker
            key={index}
            title={name}
            coordinate={{ latitude: Number(latitude), longitude: Number(longitude) }}
          />
        </MapView>
        <TouchableOpacity style={styles.button} onPress={centerMap}>
          <Ionicons name="location" size={24} color='gray' />
        </TouchableOpacity>
      </View>
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
    width: 280,
    marginTop: 50,
    height: 280,
    borderWidth: 3,
    borderColor: '#05968f',
    borderRadius: 140,
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 7,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#05968f',
  },
  city: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'grey',
    textTransform: 'uppercase',
  },
  hours: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
  },
  box: {
    marginTop: 10,
    marginBottom: 10,
    margin: 25,
    padding: 20,
    paddingBottom: 30,
    borderColor: '#e9f0ef',
    borderWidth: 1,
    backgroundColor: '#f2f5f4',
    width: 340,
  },
  button: {
    alignItems: "center",
    justifyContent: "center"
  }
});
