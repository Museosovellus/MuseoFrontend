import { React, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, useColorScheme, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../config/themeContext';

export default function Home({ navigation }) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.letter}>M</Text>
      <Text style={[styles.header, { color: theme.color }]}>MUSEOÄPPI</Text>

      <StatusBar />


      <Text style={[styles.theme, { color: theme.color }]}>vaihda tummaan tilaan</Text>

      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        ios_backgroundColor="#3e3e3e"
        style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 46,
    color: '#05968f',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  letter: {
    fontSize: 350,
    color: '#05968f',
    fontWeight: 'bold',
    marginBottom: -80,
  },
  theme: {
    fontSize: 10,
    color: '#05968f',
    marginTop: 50,
  },
});