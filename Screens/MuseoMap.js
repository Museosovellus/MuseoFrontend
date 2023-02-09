import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import * as Location from'expo-location';
import { useState, useEffect  } from 'react';

//navigation, route
export default function MuseoMap(navigation,route) {
    //let language = route.params.language;
    //let greeting = language === "finnish" ? "Kartta Ruutu" : "Map Screen";

    const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [pin, setPin] = useState({
    latitude: 0.0000,
    longitude: 0.0000,
  })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  this.state = {
    region: {
    latitude: 60.17116,
    longitude: 24.93265,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    },
    markers: [
      {
        coordinate: {
          latitude: 60.16805,
          longitude: 24.95156
        },
        title: "Helsingin kaupunginmuseo",
        id: 1
      },
      {
        coordinate: {
          latitude: 60.16949,
          longitude: 24.95007
        },
        title: "Helsingin yliopistomuseo",
        id: 2
      },
      {
        coordinate: {
          latitude: 60.4496,
          longitude: 22.2738
        },
        title: "Aboa Vetus museo",
        id: 3
      },

    ]
  }


  const fetchLocation = () => {
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=2YWefQnbCvnpczTbs6GqAFCSjG2kJIZH&location=' + keyword) // lisää oma key KEY tilalle
    .then(response => response.json())
    .then(data => setData(data.locations))
    .catch(error => {
      Alert.alert('!!! ERROR Did you forget to change mapquestapi KEY? !!!');
    });
    }

    return (
        <View style={styles.container}>
        <MapView 
      style={{width:'100%', height:'75%'}}
      region={this.state.region}
      showsUserLocation={true}
      >
        {this.state.markers.map((marker: any) => (
                <Marker
                    key={marker.id}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                />
            ))}
        
      </MapView>
      <TextInput
      style={{fontSize: 18, width: 200}}
      placeholder='Kirjoita Sijainti'
      onChangeText={text => setKeyword(text)}
      />
      <Button 
      title="SEARCH"
      onPress={fetchLocation}
      
      />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });