import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import { globalStyles, colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

// Example record data to be displayed in the RecordCard component
const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg",
};

// HomeScreen component displays the main content of the home screen
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom top bar */}
      <CustomTopBar />
      
      {/* Scrollable content area */}
      <ScrollView style={styles.container}>
        
        {/* Video container with a thumbnail */}
        <View style={[globalStyles.card, styles.videoContainer]}>
          <Image
            style={styles.videoThumbnail}
            source={require('../assets/video.png')} 
          />
        </View>
        
        {/* Separator line */}
        <View style={styles.separator} />
        
        {/* Title for the latest record section */}
        <Text style={styles.recordTitle}>The latest Record</Text>
        
        {/* Separator line */}
        <View style={styles.separator} />
        
        {/* RecordCard component to display the record example */}
        <RecordCard 
          record={recordExample} 
          isClinicUser={false}
        />
      </ScrollView>
      
      {/* Custom bottom bar for patient */}
      <CustomBottom_Patient />
    </SafeAreaView>
  );
};

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    backgroundColor: '#fff',
  },
  videoContainer: {
    // Add any specific styles for video container if needed
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  recordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green_dark,
  },
  separator: {
    height: 10,
    backgroundColor: '#E0E0E0',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default HomeScreen;
