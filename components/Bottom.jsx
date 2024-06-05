import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Custom bottom navigation bar for the patient view
export const CustomBottom_Patient = () => {
  const navigation = useNavigation(); // Hook to get the navigation object

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {/* Navigation button to HomeScreen */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="home" size={30} color="gray" />
        </TouchableOpacity>

        {/* Navigation button to Chatlist */}
        <TouchableOpacity onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="mail" size={30} color="gray" />
        </TouchableOpacity>

        {/* Placeholder for spacing */}
        <View style={{ width: 48, height: 48 }} />

        {/* Navigation button to RecordList */}
        <TouchableOpacity onPress={() => navigation.navigate('RecordList')}>
          <Ionicons name="time" size={30} color="gray" />
        </TouchableOpacity>

        {/* Navigation button to Profile */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={30} color="gray" />
        </TouchableOpacity>

        {/* Camera button in the center */}
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Custom bottom navigation bar for the clinic view
export const CustomBottom_Clinic = () => {
  const navigation = useNavigation(); // Hook to get the navigation object

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {/* Navigation button to RecordList */}
        <TouchableOpacity onPress={() => navigation.navigate('RecordList')}>
          <Ionicons name="home" size={30} color="gray" />
        </TouchableOpacity>

        {/* Navigation button to Chatlist */}
        <TouchableOpacity onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="mail" size={30} color="gray" />
        </TouchableOpacity>

        {/* Navigation button to Profile */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the navigation bars and buttons
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff', // Background color of the safe area
  },
  navBar: {
    flexDirection: 'row', // Layout items in a row
    justifyContent: 'space-around', // Space items evenly
    padding: 10, // Padding around the nav bar
    backgroundColor: '#ffffff', // Background color of the nav bar
    borderTopWidth: 1, // Top border width
    borderTopColor: '#e0e0e0', // Top border color
  },
  cameraButton: {
    position: 'absolute', // Positioning the camera button absolutely
    bottom: 10, // 10 units from the bottom
    left: '50%', // Center horizontally
    marginLeft: -30, // Offset to perfectly center the button
    width: 60, // Width of the camera button
    height: 60, // Height of the camera button
    borderRadius: 30, // Circular button
    backgroundColor: '#029C93', // Background color of the button
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    zIndex: 10, // Ensure the button is on top
  },
});
