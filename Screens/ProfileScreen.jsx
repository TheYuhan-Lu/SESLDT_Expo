import React, {useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View,TouchableOpacity,Text } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';

import {getApp, getAuth, auth , db, storage} from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, setDoc, serverTimestamp, doc, where, getDoc, getDocs, or, updateDoc} from "firebase/firestore";
//import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
    // For testing hardware set
    const initialProfileData = {
    avatar: 'https://example.com/avatar.jpg', // 或本地require('../path/to/default/avatar.jpg')
    name: 'John Doe',
    birthday: '1990-01-01',
    contact: '+1234567890',
    address: '123 Example Street, City',
   email:'test@gamil.com', 
    };
    
    const settingsOptions = ["Setting", "About", "More"];
    const [profileData, setProfileData] = useState(initialProfileData);
    //get current user id.
    const [currentUserId, setCurrentUserId] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
              unsubscribe();
              resolve(user);
            }, reject);
          });
          setCurrentUserId(user?.uid || '');
          const profileRef = doc(db, 'users', user.uid);
          const profileDoc = await getDoc(profileRef);

            if (profileDoc.exists()) {
                setProfileData(profileDoc.data());
            } else {
                setProfileData(initialProfileData);
                console.log('No such document!');
            }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    fetchData();
    }, []);



    const handleSave = (updatedProfileData) => {
        setProfileData(updatedProfileData); // 更新状态以反映更改
        console.log(updatedProfileData);

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const profileRef = doc(db, "users", currentUserId);

        // Set the "capital" field of the city 'DC'
        updateDoc(profileRef, {
          uid: currentUserId,
          profileData:updatedProfileData
        }, { merge: true });
  
    };

    const handleCancel = () => {
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      
    <ScrollView style={styles.container}>
        <View style={styles.container1}>
       <ProfileCard
        profileData={profileData}
        onSave={handleSave}
        onCancel={handleCancel}
        /> 
     </View>

    <View style={styles.settingsContainer}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity key={index} style={styles.settingsButton}>
          <Text style={styles.settingsText}>{option}</Text>
          {index < settingsOptions.length - 1 && <View style={styles.divider} />}
        </TouchableOpacity>
      ))}
    </View>
      </ScrollView>   
      {/* <CustomBottom_Patient /> */}
      <CustomBottom_Clinic />
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#EFEFEF', 
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexGrow: 1,
    },
  settingsContainer: {
    marginTop: 20,
    },
  settingsButton: {
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
    },
    settingsText: {
      marginLeft: 10,
      marginVertical: 5,  
      fontSize: 18,
      color: colors.green_dark
    },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_background,
    width: '100%',
    },

});

export default ProfileScreen;