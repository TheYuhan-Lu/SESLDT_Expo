import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const settingsOptions = ["Setting", "About", "More"];
  const [profileData, setProfileData] = useState(initialProfileData);
  const [currentUserId, setCurrentUserId] = useState('');
  const [userRole, setUserRole] = useState(null);

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

        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);

            const profileDataFromDoc = userData.profileData;
            setProfileData(profileDataFromDoc ? profileDataFromDoc : initialProfileData);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedProfileData) => {
    try {
      const profileRef = doc(db, "users", currentUserId);
      await updateDoc(profileRef, {
        profileData: updatedProfileData
      });
      setProfileData(updatedProfileData);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleCancel = () => {
    // Handle cancel action if needed
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const uri = result.assets[0].uri;
        console.log(result.assets[0].uri);
        await uploadImage(uri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      if (!uri) return;
  
      // Fetch the image data
      const response = await fetch(uri);
      const blob = await response.blob();
      console.log("UID:", currentUserId);
      console.log("uri:", response);
      // Create a storage reference
      const storageRef = ref(storage, `profile/${currentUserId}`);
  
      // Upload the image blob to the storage reference
      const snapshot = await uploadBytes(storageRef, blob);
  
      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Update profile data with download URL
      const updatedProfileData = { ...profileData, avatar: downloadURL };
  
      // Save the updated profile data
      handleSave(updatedProfileData);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
          <Button title="Change Profile Picture" onPress={handleImagePick} />
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
      {userRole === 'clinic' ? <CustomBottom_Clinic /> : <CustomBottom_Patient />}
    </SafeAreaView>
  );
};


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
    color: colors.green_dark,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_background,
    width: '100%',
    },

});

export default ProfileScreen;
