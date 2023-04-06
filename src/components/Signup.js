import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebaseConfig";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const createAccount = async () => {
    try {
      if (password === confirmPassword) {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        if (res && res.user) {
          Alert.alert("Käyttäjän luominen onnistui.");
          //await signInWithEmailAndPassword(auth, email, password);
          updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            navigation.navigate("Käyttäjä");
          }).catch((e) => {
            console.log(e);
          })
        }
      } else {
        setError('Salasanat eivät täsmää')
      }
    } catch (e) {
      setError('Käyttäjän luominen epäonnistui');
      console.log(e);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Rekisteröidy</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Käyttäjänimi"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
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
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Salasana uudestaan"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Luo käyttäjä"
          onPress={createAccount}
          disabled={!username || !email || !password || !confirmPassword}
        />
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