import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import MuseoMap from './Screens/MuseoMap';
import MuseoList from './Screens/MuseoList';
import { EventRegister}  from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

const Stack = createStackNavigator();

export default function App() {
  const [mode, setMode] = useState(false);

useEffect(() => {
  let eventListener = EventRegister.addEventListener(
    "changeTheme",
    (data) => {
      setMode(data);
    }
  );
  return () => {
    EventRegister.removeEventListener(eventListener);
  };
});
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"> 
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: "Welcome"}}
      />
      <Stack.Screen
      name="MuseoMap"
      component={MuseoMap}
      />
      <Stack.Screen
      name="MuseoList"
      component={MuseoList}
      />
    </Stack.Navigator>
  </NavigationContainer>
  </themeContext.Provider>
  );
};

