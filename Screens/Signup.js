import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
  
    const createAccount = async () => {
        try {
            if (password === confirmPassword) {
                await createUserWithEmailAndPassword(auth, email, password);
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
        <Text style={styles.header}>Signup</Text>

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
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Button
          title="Create Account"
          onPress={createAccount}
          disabled={!email || !password || !confirmPassword}
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