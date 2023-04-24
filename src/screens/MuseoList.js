import { Text, View, FlatList, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useState, useContext, useEffect, useRef } from 'react';
import themeContext from '../../config/themeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuseoInfo from './MuseoInfo';
import Visited from './Visited'
import Tovisit from './Tovisit'
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

  const listRef = useRef(null)
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

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

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={searchFunction}
        value={search}
        style={styles.searchbar}
        placeholder="Hae museoa tai kaupunkia"
      />
      {user ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.outlinedButton} onPress={() => navigation.navigate('Kiinnostus')}>
            <Text style={styles.outlinedButtonText}>Kiinnostukset <Ionicons name="star-outline" size={16} /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlinedButton} onPress={() => navigation.navigate('Käydyt')}>
            <Text style={styles.outlinedButtonText}>Käydyt museot <Ionicons name="heart-outline" size={16} /></Text>
          </TouchableOpacity>
        </View>
      ) : (<></>)}
      <FlatList
        data={filteredData}
        ref={listRef}
        onScroll={event => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
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
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <Ionicons
          name='arrow-up-circle' style={styles.scrollTopButton}
          onPress={() => {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }}
        />
      )}
    </View>
  );
}

export default function MuseoList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MuseoStack' component={ListScreen} options={{ headerShown: true, headerTitle: 'Museot' }} />
      <Stack.Screen name='Museo' component={MuseoInfo} options={{ headerShown: false }} />
      <Stack.Screen name='Käydyt' component={Visited} options={{ headerTitle: "Käydyt museot" }} />
      <Stack.Screen name='Kiinnostus' component={Tovisit} options={{ headerTitle: "Kiinnostuksen kohteet" }} />
    </Stack.Navigator>
  );
};
