import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, remove } from '@firebase/database';
import { auth } from '../components/firebaseConfig';
import themeContext from '../../config/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuseoInfo from './MuseoInfo';

const Stack = createNativeStackNavigator();

function Visited({ navigation }) {
  const theme = useContext(themeContext);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const visitedRef = ref(db, `users/${currentUser.uid}/visited`);
    const unsubscribe = onValue(visitedRef, (snapshot) => {
      const visitedData = snapshot.val() || [];
      const visitedList = Object.keys(visitedData).map((key) => ({
        id: key,
        ...visitedData[key],
      }));
      setVisited(visitedList);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveVisited = (id) => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const visitedRef = ref(db, `users/${currentUser.uid}/visited/${id}`);
    remove(visitedRef);
    setVisited(visited.filter((item) => item.id !== id));
  };

  const renderVisited = ({ item }) => (
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
        })
      }>
      <Text style={styles.item}>{item.name}</Text>
      <Text style={styles.city}>
        <Ionicons name="location-sharp" /> {item.city}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveVisited(item.id)}>
          <Ionicons name="close-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={visited}
        renderItem={renderVisited}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={
          <Text style={styles.emptyList}>
            Paina Museot -sivulla "<Ionicons name="heart-outline" size={16} />" lisätäksesi museoita joissa olet käynyt
          </Text>
        }
      />
    </View>
  );
}

export default function MuseoList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Visited' component={Visited} options={{ headerShown: false }} />
      <Stack.Screen name='Museo' component={MuseoInfo} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    padding: 20,
  },
  emptyList: {
    marginVertical: 50,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 7,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#05968f',
  },
  city: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 10,
    fontWeight: 'normal',
    color: 'grey',
    textTransform: 'uppercase',
  },
  box: {
    marginTop: 10,
    marginBottom: 10,
    margin: 'auto',
    padding: 20,
    paddingBottom: 30,
    borderColor: '#e9f0ef',
    borderWidth: 1,
    backgroundColor: '#f2f5f4',
    width: 340,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  removeButton: {
    marginLeft: 10,
  },
})