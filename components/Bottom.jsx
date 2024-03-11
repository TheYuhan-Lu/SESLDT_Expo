import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomBottom_Patient = () => {
    const navigation = useNavigation();
    return (
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
    );
    
};

export const CustomBottom_Clinic = ({ onPress, title }) => {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity>
                <Ionicons name="home" size={30} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="mail" size={30} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="person" size={30} color="gray" />
            </TouchableOpacity>

        </View>
    );
    
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,

  },
    cameraButton: {
    position: 'absolute',
    bottom: 30, 
    left: '50%', 
    marginLeft: -18, 
    width: 60, 
    height: 60, 
    borderRadius: 24, 
    backgroundColor: '#029C93', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10, 
  },
});