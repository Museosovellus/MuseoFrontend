import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useRef } from 'react';
import MapView, { Marker } from "react-native-maps";
import themeContext from "../../config/themeContext";
import { Ionicons } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import styles from '../../Styles';
import * as Linking from 'expo-linking';

export default function MuseoInfo({ route, navigation }) {

  const theme = useContext(themeContext);
  const { name, city, province, latitude, longitude, openingHours, url, index } = route.params;
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
    <View style={styles.container}>
         <MapView
          ref={mapRef}
          style={styles.mapStyle}
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
{/*         <TouchableOpacity style={styles.centeringButton} onPress={centerMap}>
          <Ionicons name="location" size={24} color='gray' />
        </TouchableOpacity> */}
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.location}><Ionicons name="location-sharp" /> {city}, {province}</Text>
        <Text style={styles.hours}>{openingHours}</Text>

        <Button title="Avaa tästä museon oma verkkosivu" onPress={() => Linking.openURL(url)} />
      </View>
    </View>
  )
};
