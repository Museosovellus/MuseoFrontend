import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import themeContext from '../config/themeContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MuseoInfo from './MuseoInfo';
import { Ionicons } from '@expo/vector-icons'; 


const Stack = createNativeStackNavigator();

function ListScreen({ navigation }) {
  const theme = useContext(themeContext);
  const data = require('../museums.json');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const searchFunction = (text) => {
    const newData = data.filter((item) => {
      const itemName = (item.nimi).toLowerCase();
      const itemCity = (item.kunta).toLowerCase();
      const searchTerm = text.toLowerCase();
      return itemName.includes(searchTerm) || itemCity.includes(searchTerm);
    })
    setFilteredData(newData);
    setSearch(text);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        onChangeText={searchFunction}
        value={search}
        style={styles.searchbar}
        placeholder="Hae museoa tai kaupunkia"
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) =>
          <TouchableOpacity 
          style={styles.box}
          onPress={() => 
            navigation.navigate('Museum', {name: item.nimi})}>
            <Text style={styles.item}>{item.nimi}</Text>
            <Text style={styles.city}><Ionicons name="location-sharp" /> {item.kunta}</Text>
          </TouchableOpacity>}
      />
    </View>
  );
}

export default function MuseoList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={ListScreen} />
      <Stack.Screen name='Museum' component={MuseoInfo} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },
  searchbar: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    margin: 20,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#fafafa',
    width: '90%'
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
  },
  box: {
    marginTop: 10,
    marginBottom: 10,
    margin: 25,
    padding: 20,
    paddingBottom: 30,
    borderColor: '#e9f0ef',
    borderWidth: 1,
    backgroundColor: '#f2f5f4',
  }
});
