import React, {useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View,TouchableOpacity,Text } from 'react-native';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

import {getApp, getAuth, auth , db, storage} from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, setDoc, serverTimestamp, doc, where, getDoc, getDocs, or, updateDoc} from "firebase/firestore";

const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg", // 示例图片URL
  };

const ProfileInfoScreen = () => {
    // For testing hardware set
    const initialProfileData = {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/sesldtproject.appspot.com/o/profile%2Fprofile_default.jpeg?alt=media&token=37b6901a-762c-4dee-8e44-efc7e7cde770', // 或本地require('../path/to/default/avatar.jpg')
    name: 'John Doe',
    birthday: '1990-01-01',
    contact: '+1234567890',
    address: '123 Example Street, City',
   email:'test@gamil.com', 
    };
    
    //const [profileData, setProfileData] = useState(initialProfileData);
    const [profileData, setProfileData] = useState(initialProfileData);

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
                setProfileData(profileDoc.data().profileData);
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
        console.log("infoscreen");
        console.log(updatedProfileData);

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const profileRef = doc(db, "users", currentUserId);

        // Set the "capital" field of the city 'DC'
        updateDoc(profileRef, {
          profileData:updatedProfileData
        }, { merge: true });
  
    };

    const handleCancel = () => {
    };

    const profileDataWithAvatar = {
      ...profileData,
      avatar: profileData.avatar || 'https://example.com/default-avatar.jpg' // Provide a default avatar URL
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      
    <ScrollView style={styles.container}>
        <View style={styles.container1}>
       <ProfileCard
        profileData={profileDataWithAvatar}
        onSave={handleSave}
        onCancel={handleCancel}
        /> 
        </View>
            <RecordCard 
                record={recordExample} 
                isClinicUser={true} // 或根据实际用户角色动态设置
                />

      </ScrollView>   
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

export default ProfileInfoScreen;