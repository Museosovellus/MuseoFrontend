import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';


export default function MuseoList() {
  
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
    if (text) {
      // Inserted text is not blank
      // Filter the data and update FilteredData
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredData with data
      setFilteredData(data);
      setSearch(text);
    }
  }

  return (
      <View>
        <TextInput
        onChangeText={(text) => searchFunction(text)}
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
    searchbar: {
      borderColor: '#c4c4c4', 
      borderWidth: 1, 
      margin: 20,
      padding: 10,
      backgroundColor: '#fafafa'
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