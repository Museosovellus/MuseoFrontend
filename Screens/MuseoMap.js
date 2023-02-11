import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function MuseoMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://museum-rest-api.herokuapp.com/museums')
    .then(response => response.json())
    .then(data => setData(data))
  }, [])

  let markers = [];
  
  for (var i = 0; i < data.length; i++) {
    var object = data[i];
    let marker = new Object();
    for (var property in object) {
      if (property === 'name') {
        Object.assign(marker, {title: object[property]})
      } else if (property === 'latitude') {
        Object.assign(marker, {latitude: object[property]})
      } else if (property === 'longitude') {
        Object.assign(marker, {longitude: object[property]})
      } else if (Object.keys(marker).length === 2) {
        break;
      }
    }
    markers.push(marker)
  }

  console.log(markers)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.17116,
          longitude: 24.93265,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.title}
            coordinate={{ latitude: marker.latitude , longitude: marker.longitude }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});