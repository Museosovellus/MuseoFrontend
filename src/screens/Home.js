import { React, useContext } from 'react';
import { StyleSheet, Text, View, Button, useColorScheme, Switch } from 'react-native';
import themeContext from '../../config/themeContext';

export default function Home({ navigation }) {
  const theme = useContext(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.letter}>M</Text>
      <Text style={[styles.header, { color: theme.color }]}>MUSEOÄPPI</Text>
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