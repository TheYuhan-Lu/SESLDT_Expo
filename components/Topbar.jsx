import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { colors } from '../styles/globalStyles';

// CustomTopBar component to display a top bar with a logo
export const CustomTopBar = () => {
  return (
    <View style={styles.topBar}>
      <Image
        source={require('../assets/LOGO.png')} // Replace with your logo image path
        style={styles.logo}
        resizeMode="contain" // Maintain aspect ratio of the image
      />
    </View>
  );
};

// Styles for the CustomTopBar component
const styles = StyleSheet.create({
  topBar: {
    height: 60, // Height of the top bar
    backgroundColor: colors.gray_background, // Background color of the top bar
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  logo: {
    width: 180, // Width of the logo
    height: 60, // Height of the logo
  },
});
