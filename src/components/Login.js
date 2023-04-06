import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./Signup";

const Stack = createStackNavigator();

function LoginStack({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async () => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (res && res.user) { Alert.alert("Sisäänkirjautuminen onnistui") }
      navigation.navigate("KäyttäjäStack");
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
        setError('Virheellinen sähköposti tai salasana');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Sähköposti on jo käytössä');
      } else {
        setError('Ongelma sisäänkirjautumisessa');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Kirjaudu sisään</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Sähköposti"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Salasana"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <Button title="Kirjaudu" onPress={loginUser} disabled={!email || !password} />
        <Button title="Uusi täällä? Luo käyttäjä" onPress={() => navigation.navigate('Rekisteröidy')} />
      </View>
    </View>
  );
}

export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kirjaudu" component={LoginStack} />
      <Stack.Screen name="Rekisteröidy" component={Signup} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
});