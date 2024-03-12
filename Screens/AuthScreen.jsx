import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {getApp, getAuth, auth } from "../firebaseConfig";

import { useNavigation } from '@react-navigation/native';



const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Status is used to track whether the login or registration form is currently displayed.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => setIsLogin(!isLogin); // Switch the function of the form
  
  const navigation = useNavigation();
  const handleLogin = async () => {
    /*signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Navigate to the next screen or perform any other actions
          navigation.navigate('PatientHomeScreen');

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Handle sign-in error
        });
        navigation.navigate('PatientHomeScreen');*/
        console.log("handleLogin function is being called", email, password ); 
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          

          // Navigate to the next screen or perform any other actions
          navigation.navigate('HomeScreen');
      } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Handle sign-up error
      }
  };
  
  const handleSignUp = async () => {
    // 
    console.log("sign up function is being called", email, password ); 
try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Navigate to the next screen or perform any other actions
    navigation.navigate('HomeScreen');
} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-up failed:", errorMessage);
    // Handle sign-up error
}
  
  };
  

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
/*
const handleLogin = async () => {
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Navigate to the next screen or perform any other actions
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle sign-in error
      });
};

const handleSignUp = async () => {
  // 
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // Navigate to the next screen or perform any other actions
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle sign-up error
      });

};*/



export default AuthScreen;
