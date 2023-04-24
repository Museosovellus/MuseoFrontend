import React, { useState, useEffect } from 'react';
import { View, Button, Switch, Text } from 'react-native';
import LoggedIn from '../components/LoggedIn';
import Visited from './Visited';
import Tovisit from './Tovisit';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";
import styles from '../../Styles';

const Stack = createStackNavigator();

export function ProfileScreen({ navigation }) {
  //const [mode, setMode] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("user", JSON.stringify(user));
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      <LoggedIn />

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
    </Stack.Navigator>
  );
};