import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button, Text } from 'react-native';
import Login from '../components/Login';
import Signup from '../components/Signup';
import LoggedIn from '../components/LoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../components/firebaseConfig";

const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {

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
    <View>
      {loggedIn ? (
        <>
          <LoggedIn user={user} />
        </>
      ) : (
        <>
          <Button onPress={() => navigation.navigate('Login')} title="Login" />
          <Button onPress={() => navigation.navigate('Signup')} title="Create account" />
        </>
      )}
    </View>
  );
}
export default function Profile() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}