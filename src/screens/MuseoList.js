import { Text, View, FlatList, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import themeContext from '../../config/themeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuseoInfo from './MuseoInfo';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, query, orderByChild, equalTo, get } from '@firebase/database';
import styles from '../../Styles';
import { faker } from '@faker-js/faker';

const Stack = createNativeStackNavigator();

export function ListScreen({ navigation }) {
  const theme = useContext(themeContext);
  const data = require('../../museums.json');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log('user', JSON.stringify(user));
      setUser(user);
    });
    return subscriber;
  }, []);

  const searchFunction = (text) => {
    const newData = data.filter((item) => {
      const itemName = (item.name).toLowerCase();
      const itemCity = (item.city).toLowerCase();
      const searchTerm = text.toLowerCase();
      return itemName.includes(searchTerm) || itemCity.includes(searchTerm);
    })
    setFilteredData(newData);
    setSearch(text);
  }

  const handleToVisitButtonPress = (item) => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const toVisitRef = ref(db, `users/${currentUser.uid}/tovisit`);
    const newToVisit = {
      number: item.number,
      name: item.name,
      city: item.city,
      province: item.province,
      latitude: item.latitude,
      longitude: item.longitude,
      openingHours: item.openingHours,
      url: item.url
    };

    const museumAlreadyToVisit = query(toVisitRef, orderByChild('name'), equalTo(item.name));
    get(museumAlreadyToVisit).then((snapshot) => {
      if (snapshot.exists()) {
        Alert.alert('Olet jo lisännyt tämän museon!');
      } else {
        push(toVisitRef, newToVisit);
      }
    });
  };

  const handleVisitedButtonPress = (item) => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const visitedRef = ref(db, `users/${currentUser.uid}/visited`);
    const newVisited = {
      number: item.number,
      name: item.name,
      city: item.city,
      province: item.province,
      latitude: item.latitude,
      longitude: item.longitude,
      openingHours: item.openingHours,
      url: item.url
    };

    const museumAlreadyInDatabaseRef = query(visitedRef, orderByChild('name'), equalTo(item.name));
    get(museumAlreadyInDatabaseRef).then((snapshot) => {
      if (snapshot.exists()) {
        Alert.alert('Olet jo lisännyt tämän museon!');
      } else {
        push(visitedRef, newVisited);
      }
    });
  };

  const generateImage = () => {
    faker.image.city(640, 480, false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={searchFunction}
        value={search}
        style={styles.searchbar}
        placeholder="Hae museoa tai kaupunkia"
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={styles.box}
            onPress={() =>
              navigation.navigate('Museo', {
                index: item.number,
                name: item.name,
                city: item.city,
                province: item.province,
                latitude: item.latitude,
                longitude: item.longitude,
                openingHours: item.openingHours,
                url: item.url
              })}>
            <Image source={{ uri: faker.image.city(640, 400, false) }} style={styles.listImage} />
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.city}><Ionicons name="location-sharp" /> {item.city}</Text>
            {user ? (
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.toVisitButton} onPress={() => handleToVisitButtonPress(item)}>
                  <Ionicons name="star-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.visitedButton} onPress={() => handleVisitedButtonPress(item)}>
                  <Ionicons name="heart-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>
            ) : (<></>)}
          </TouchableOpacity>}
      />
    </View>
  );
}

export default function MuseoList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MuseotStack' component={ListScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Museo' component={MuseoInfo} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
