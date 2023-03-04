import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect, useContext } from 'react';
import themeContext from '../config/themeContext';

export default function MuseoList() {
  const theme = useContext(themeContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    fetch('https://museum-rest-api.herokuapp.com/museums')
      .then(response => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, [])

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
            <Text style={styles.item}>{item.name}</Text>
          </View>
        }
        style={{ marginBottom: 30 }} />
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
    padding: 10,
    backgroundColor: '#fafafa',
    width: '90%'
  },
  item: {
    margin: 10,
    marginLeft: 30,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#05968f',
  }
});