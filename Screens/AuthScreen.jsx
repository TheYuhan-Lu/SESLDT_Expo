import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Status is used to track whether the login or registration form is currently displayed.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => setIsLogin(!isLogin); // Switch the function of the form

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Create an account'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignUp}>
        <Text style={styles.buttonText}>{isLogin ? 'LOGIN' : 'SIGN UP'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.toggleFormText}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleFormText: {
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

// Functions to handle login and registration need to be added here.

const handleLogin = async () => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    // Handle successful login
  } catch (error) {
    console.error('Login failed:', error);
    // Handle login error
  }
};

const handleSignUp = async () => {
  // 
  if (password !== confirmPassword) {
    console.error("Passwords don't match");
    return;
  }

  try {
    await auth().createUserWithEmailAndPassword(email, password);
    // Handle successful sign-up
  } catch (error) {
    console.error('Sign-up failed:', error);
    // Handle sign-up error
  }
};



export default AuthScreen;
