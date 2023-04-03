import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const loginUser = async () => {
      try {
        let res = await signInWithEmailAndPassword(auth, email, password);
        if (res && res.user) {Alert.alert("Sisäänkirjautuminen onnistui")}
        navigation.navigate("Profile");
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
            <Text style={styles.header}>Login</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter password"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
          <Button title="Login" onPress={loginUser} disabled={!email || !password} />
          </View>
        </View>
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