import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';

const [data, setData] = useState([]);

export default function MuseoList() {


  useEffect(() => {
    fetch('https://museum-rest-api.herokuapp.com/museums/')
    .then(response=>response.json())
    .then((json) => setData(json))
  },[])

  return (
    
      <View>
        <FlatList
        data={setData()}
        />
        </View>
      
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });