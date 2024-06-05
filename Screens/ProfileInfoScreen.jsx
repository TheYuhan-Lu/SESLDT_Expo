import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { CustomTopBar } from '../components/Topbar';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

// Example record data to be displayed in the RecordCard component
const recordExample = {
  clinicName: "Happy Eye Clinic",
  patientName: "John Doe",
  time: "2023-03-03 14:30",
  summary: "Routine Checkup",
  details: "No cavities found.",
  imageUri: "https://example.com/example-image.jpg", // Example image URL
};

const ProfileInfoScreen = () => {
  // Initial profile data for testing
  const initialProfileData = {
    avatar: 'https://example.com/avatar.jpg', // Or a local image path: require('../path/to/default/avatar.jpg')
    name: 'John Doe',
    birthday: '1990-01-01',
    contact: '+1234567890',
    address: '123 Example Street, City',
    email: 'test@gmail.com',
  };

  const [profileData, setProfileData] = useState(initialProfileData); // State to handle profile data

  // Function to handle saving the updated profile data
  const handleSave = (updatedProfileData) => {
    setProfileData(updatedProfileData); // Update state to reflect changes
  };

  // Function to handle cancel action (can be customized as needed)
  const handleCancel = () => {
    // Handle cancel action if needed
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />

      <ScrollView style={styles.container}>
        <View style={styles.container1}>
          <ProfileCard
            profileData={profileData} // Pass the profile data to ProfileCard component
            onSave={handleSave} // Pass the save handler to ProfileCard component
            onCancel={handleCancel} // Pass the cancel handler to ProfileCard component
          />
        </View>

        {/* Displaying a RecordCard component with example data */}
        <RecordCard 
          record={recordExample} 
          isClinicUser={true} // Or dynamically set based on actual user role
        />
      </ScrollView>   
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

export default ProfileInfoScreen;
