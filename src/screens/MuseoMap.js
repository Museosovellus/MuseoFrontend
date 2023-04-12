import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Button, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MuseoInfo from './MuseoInfo';

const Stack = createNativeStackNavigator();

export function MuseoMap({ navigation }) {
  const data = require('../../museums.json');

  return (
    <View style={styles.container}>
      <MapView
        testID='map'
        style={styles.map}
        initialRegion={{
          latitude: Number(60.2017),
          longitude: Number(24.9341),
          latitudeDelta: Number(1),
          longitudeDelta: Number(1)
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
      >
        {data.map((marker, index) => (
          <Marker
            testID='marker'
            key={index}
            title={marker.name}
            coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
          >
            <Callout onPress={() => {
              navigation.navigate('Museo', {
                index: marker.number,
                name: marker.name,
                city: marker.city,
                province: marker.province,
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude),
                openingHours: marker.openingHours
              })
            }}>
              <View>
                <Text>{marker.name}</Text>
                <Button title='Näytä lisätiedot' />
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
      <Stack.Screen name='Museo' component={MuseoInfo} options={{ headerShown: false }} />
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