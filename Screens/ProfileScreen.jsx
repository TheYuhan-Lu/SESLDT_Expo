import React, {useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View,TouchableOpacity,Text } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';

import firestore from '@react-native-firebase/firestore';

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

    const handleSave = (updatedProfileData) => {
        setProfileData(updatedProfileData); // 更新状态以反映更改

        try {
          // Update profile data in Firestore
          firestore()
              .collection('users')  // 'profiles' is the name of the collection
              .doc('your-user-id')     // Unique identifier for the document
              .set(updatedProfileData, { merge: true }); // merge: true ensures that only provided fields are updated
  
          alert('Profile updated successfully');
      } catch (error) {
          console.error('Failed to update profile:', error);
          alert('Failed to update profile');
      }
  
    };

    const handleCancel = () => {
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      
    <ScrollView style={styles.container}>
        <View style={styles.container1}>
       <ProfileCard
        profileData={{
            // avatar: 'https://example.com/avatar.jpg', // 用户头像的URL
            name: 'John Doe', // 用户名字
            birthday: '1990-01-01', // 生日
            contact: '+1234567890', // 联系方式
            address: '123 Example Street, City', // 地址
            email:'test@gamil.com',
        }}
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