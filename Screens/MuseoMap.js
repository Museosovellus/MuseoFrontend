import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MuseoMap() {
  const data = require('../museums.json');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.2017,
          longitude: 24.9341,
          latitudeDelta: 1,
          longitudeDelta: 1
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {data.map((marker, index) => (
          <Marker
            key={index}
            title={marker.nimi}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
});