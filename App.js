import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './Screens/Home';
import MuseoMap from './Screens/MuseoMap';
import MuseoList from './Screens/MuseoList';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Etusivu') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Museot') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Kartta') {
              iconName = focused ? 'location' : 'location-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Etusivu" component={Home} />
          <Tab.Screen name="Museot" component={MuseoList} />
          <Tab.Screen name="Kartta" component={MuseoMap} />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

