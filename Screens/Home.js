import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
        <Button
        title="Navigate to MuseoList"
        onPress={() => navigation.navigate("MuseoList")}>
        </Button>

        <Button
        title="Navigate to MuseoMap"
        onPress={() => navigation.navigate("MuseoMap")}>
        </Button>
        
        <Text>Home Screen</Text>
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