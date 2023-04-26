import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from '@firebase/database';
import { auth } from '../components/firebaseConfig';
import themeContext from '../../config/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MuseoInfo from './MuseoInfo';
import styles from '../components/styles';

const Stack = createNativeStackNavigator();

function Tovisit({ navigation }) {
  const theme = useContext(themeContext);
  const [toVisit, setToVisit] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const toVisitRef = ref(db, `users/${currentUser.uid}/tovisit`);
    const unsubscribe = onValue(toVisitRef, (snapshot) => {
      const toVisitData = snapshot.val() || [];
      const toVisitList = Object.keys(toVisitData).map((key) => ({
        id: key,
        ...toVisitData[key],
      }));
      setToVisit(toVisitList);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveVisit = (id) => {
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const toVisitRef = ref(db, `users/${currentUser.uid}/tovisit/${id}`);
    remove(toVisitRef);
    setToVisit(toVisit.filter((item) => item.id !== id));
  };

  const renderToVisit = ({ item }) => (
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
          onPress={() => handleRemoveVisit(item.id)}>
          <Ionicons name="close-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={toVisit}
        renderItem={renderToVisit}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListEmptyComponent={
          <Text style={styles.emptyList}>
            Paina Museot -sivulla "<Ionicons name="star-outline" size={16} />" lisätäksesi museoita joissa haluat käydä
          </Text>
        }
      />
    </View>
  );
}

export default function MuseoList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tovisit" component={Tovisit} options={{ headerShown: false }} />
      <Stack.Screen name="Museo" component={MuseoInfo} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};