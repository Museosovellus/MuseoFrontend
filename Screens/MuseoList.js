import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';


export default function MuseoList() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://museum-rest-api.herokuapp.com/museums')
    .then(response => response.json())
    .then((data) => setData(data))
  }, [])

  return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => 
          <View>
            <Text>{item.name}</Text>
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
  });