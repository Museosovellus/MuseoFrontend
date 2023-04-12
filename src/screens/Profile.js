import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Switch, Text } from 'react-native';
import Login from '../components/Login';
import LoggedIn from '../components/LoggedIn';
import Visited from './Visited';
import Tovisit from './Tovisit';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";

const Stack = createStackNavigator();

export function ProfileScreen({ navigation }) {
  //const [mode, setMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
      if (user) { setLoggedIn(true) } else { setLoggedIn(false) }
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <>
          <LoggedIn navigation={navigation} onVisitedPress={() => navigation.navigate('Käydyt')}
            onVisitPress={() => navigation.navigate('Kiinnostus')} />
        </>
      ) : (
        <>
          <Button onPress={() => navigation.navigate('LoginStack')} title="Kirjaudu sisään" />
        </>
      )}
      {/*<Text style={{ marginTop: 30 }}>vaihda tummaan tilaan</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        ios_backgroundColor="#3e3e3e"
        style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }] }}
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          EventRegister.emit("changeTheme", value);
        }} />*/}
    </View>
  );
}
export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="KäyttäjäStack" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginStack" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Käydyt" component={Visited} options={{ headerTitle: "Käydyt museot" }} />
      <Stack.Screen name="Kiinnostus" component={Tovisit} options={{ headerTitle: "Kiinnostuksen kohteet" }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})