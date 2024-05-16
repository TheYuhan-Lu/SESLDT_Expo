import React, {useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View,TouchableOpacity,Text } from 'react-native';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "gs://sesldtphttps://firebasestorage.googleapis.com/v0/b/sesldtproject.appspot.com/o/profile%2Fprofile_default.jpeg?alt=media&token=37b6901a-762c-4dee-8e44-efc7e7cde770roject.appspot.com/profile/profile_default.jpeg", // 示例图片URL
  };

const ProfileInfoScreen = () => {
    // For testing hardware set
    const initialProfileData = {
    avatar: 'gs://sesldtproject.appspot.com/profile/profile_default.jphttps://firebasestorage.googleapis.com/v0/b/sesldtproject.appspot.com/o/profile%2Fprofile_default.jpeg?alt=media&token=37b6901a-762c-4dee-8e44-efc7e7cde770eg', // 或本地require('../path/to/default/avatar.jpg')
    name: 'John Doe',
    birthday: '1990-01-01',
    contact: '+1234567890',
    address: '123 Example Street, City',
   email:'test@gamil.com', 
    };
    
    const [profileData, setProfileData] = useState(initialProfileData);

    const handleSave = (updatedProfileData) => {
        setProfileData(updatedProfileData); // 更新状态以反映更改
  
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
            avatar: 'gs://sesldtproject.appspot.com/profihttps://firebasestorage.googleapis.com/v0/b/sesldtproject.appspot.com/o/profile%2Fprofile_default.jpeg?alt=media&token=37b6901a-762c-4dee-8e44-efc7e7cde770le/profile_default.jpeg', // 用户头像的URL
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