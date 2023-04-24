import { React, useContext, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button, } from 'react-native';
import { auth } from '../components/firebaseConfig';
import themeContext from '../../config/themeContext';
import styles from '../../Styles';
import Login from '../components/Login';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const theme = useContext(themeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>M</Text>
      <Text style={[styles.header, { color: theme.color }]}>MUSEOÄPPI</Text>
      {!user && (
        <Button onPress={() => navigation.navigate('Login')} title="Kirjaudu sisään" />
      )}
    </View>
  );
};

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Etusivu" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};