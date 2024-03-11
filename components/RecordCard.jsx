import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { globalStyles,  colors } from '../styles/globalStyles';

//To do:
// * add record infomation
// * adjust the look of record card
// * edit button
// * detailed card

const RecordCard = () => {
    return (
        <View style = {globalStyles.card} >
            <View style = {styles.top}>
            <View style={styles.clinicInfo}>
            <Image
                style={styles.clinicAvatar}
                source={require('../assets/Profile.png')} // replace with your local image
                />
            <Text style={styles.clinicName}>Clinic Name</Text>
          </View>
            </View>
            <View style = {styles.recordinfo} >

                <TouchableOpacity style={styles.moreDetailsButton}>
                    <Text style={styles.moreDetailsText}>more details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    top: {
    width : '100%',
    height: 80, 
    backgroundColor: colors.green_light, 
    justifyContent: 'center',
    alignItems: 'center',
    },
    clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    clinicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    },
    clinicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    recordinfo: {
       height: 50, 
    },
    moreDetailsButton: {
    marginTop: 10,
    },
    moreDetailsText: {
    color: colors.green_dark,
    },
});


export default RecordCard;