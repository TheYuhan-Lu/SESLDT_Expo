import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomBottom_Patient = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="home" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="mail" size={30} color="gray" />
        </TouchableOpacity>
        <View style={{ width: 48, height: 48 }} />
        <TouchableOpacity onPress={() => navigation.navigate('RecordList')}>
          <Ionicons name="time" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const CustomBottom_Clinic = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('RecordList')}>
          <Ionicons name="home" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chatlist')}>
          <Ionicons name="mail" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#029C93',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
