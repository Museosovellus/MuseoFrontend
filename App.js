import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import MuseoMap from './Screens/MuseoMap';
import MuseoList from './Screens/MuseoList';

const Stack = createStackNavigator();

export default function App() {
  return (
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
  );
};

