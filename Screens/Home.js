import {React, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, useColorScheme, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EventRegister}  from 'react-native-event-listeners';
import themeContext from '../config/themeContext';

export default function Home({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Switch value={mode}
        onValueChange={ (value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);
          }} />
        <Button
        title="Navigate to MuseoList"
        onPress={() => navigation.navigate("MuseoList")}>
        </Button>

        <Button
        title="Navigate to MuseoMap"
        onPress={() => navigation.navigate("MuseoMap")}>
        </Button>
        
        <Text style={[styles.text, {color: theme.color}]}>Home Screen</Text>
        <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#141414',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });