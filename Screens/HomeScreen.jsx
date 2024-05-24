import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import { globalStyles, colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg",
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      <ScrollView style={styles.container}>
        <View style={[globalStyles.card, styles.videoContainer]}>
          <Image
            style={styles.videoThumbnail}
            source={require('../assets/video.png')} 
          />
        </View>
        <View style={styles.separator} />
        <Text style={styles.recordTitle}>The latest Record</Text>
        <View style={styles.separator} />
        <RecordCard 
          record={recordExample} 
          isClinicUser={false}
        />
      </ScrollView>
      <CustomBottom_Patient />
    </SafeAreaView>
  );
};

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
