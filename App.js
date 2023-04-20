import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './src/screens/Home';
import MuseoMap from './src/screens/MuseoMap';
import MuseoList from './src/screens/MuseoList';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';
import Profile from './src/screens/Profile';
import { auth } from './src/components/firebaseConfig';

const Tab = createBottomTabNavigator();

export default function App() {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

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
            } else if (route.name === 'Profiili') {
              iconName = focused ? 'ios-person' : 'ios-person-outline'
              if (!user) return null;
            } else {
              return null;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#05968f',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Etusivu" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="Museot" component={MuseoList} options={{ headerShown: true }} />
          <Tab.Screen name="Kartta" component={MuseoMap} options={{ headerShown: false }} />
          {user && <Tab.Screen name="Profiili" component={Profile} options={{ headerShown: false }} />}
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

