import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect, useContext } from 'react';
import themeContext from '../config/themeContext';

export default function MuseoList() {
  const theme = useContext(themeContext);
  const [search, setSearch] = useState('');
  const data = require('../museums.json');
  const filteredData = require('../museums.json');

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        onChangeText={searchFunction}
        value={search}
        style={styles.searchbar}
        placeholder="museohaku"
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.item}>{item.nimi}</Text> 
            <Text style={styles.small}>{item.kunta}</Text>
          </View>
        } />
    </View>
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
    marginTop: 60,
    padding: 10,
    backgroundColor: '#fafafa',
    width: '90%'
  },
  item: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#05968f',
  },
  small: {
    marginTop: 0,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 10,
    fontWeight: 'normal',
    color: 'grey',
  }
});