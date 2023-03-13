import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Button, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MuseoInfo from './MuseoInfo';

const Stack = createNativeStackNavigator();

function MuseoMap({ navigation }) {
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
        loadingEnabled={true}
      >
        {data.map((marker, index) => (
          <Marker
            key={index}
            title={marker.nimi}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          >
            <Callout>
              <View>
                <Text>{marker.nimi}</Text>
                <Button
                  title='Näytä lisätiedot'
                  onPress={() => {
                    navigation.navigate('Museo', {
                      index: marker.numero,
                      name: marker.nimi,
                      city: marker.kunta,
                      province: marker.maakunta,
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                      openingHours: marker['Museon paayksikon avoinna olo']
                    })
                  }}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

export default function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='KarttaStack' component={MuseoMap} options={{ headerShown: false }} />
      <Stack.Screen name='Museo' component={MuseoInfo} />
    </Stack.Navigator>
  )
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