import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

// To do:
// * Set the user group to use edit button
// * Link the data with database

// RecordCard component to display and edit patient records
const RecordCard = ({ record, isClinicUser }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to handle expand/collapse of details
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode
  const [editedSummary, setEditedSummary] = useState(record.summary); // State to handle edited summary
  const [editedDetails, setEditedDetails] = useState(record.details); // State to handle edited details

  // Function to toggle expansion of details
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      // Save logic, implement as needed
      console.log('Saving edits', editedSummary, editedDetails);
      // Update the original record's summary and details upon successful save
    }
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={globalStyles.card}>
        <View style={styles.top}>
          <View style={styles.clinicInfo}>
            <Image
              style={styles.clinicAvatar}
              source={require('../assets/Profile.png')} // Local image or obtain from record
            />
            <Text style={styles.clinicName}>{record.clinicName}</Text>
          </View>
          {isClinicUser && (
            <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
              <Text style={styles.label}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.recordinfo}>
          <Text style={styles.name}>{record.patientName}</Text>
          <Text><Text style={styles.label}>Time:</Text> {record.time}</Text>
          {isEditing ? (
            // Edit mode view
            <>
              <Image source={require('../assets/eys.jpg')} style={styles.detailImage} />
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Summary:</Text>
                <TextInput
                  value={editedSummary}
                  onChangeText={setEditedSummary}
                  style={styles.input}
                  placeholder="Edit Summary"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Details:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setEditedDetails}
                  value={editedDetails}
                  placeholder="Edit Details"
                />
              </View>
            </>
          ) : (
            // Display mode view
            <>
              <Text><Text style={styles.label}>Diagnosis:</Text> {record.summary}</Text>
              {isExpanded && (
                <>
                  <Text><Text style={styles.label}>Details:</Text> {record.details}</Text>
                  <Image source={require('../assets/eys.jpg')} style={styles.detailImage} />
                </>
              )}
              <TouchableOpacity onPress={toggleExpand} style={styles.moreDetailsButton}>
                <Text style={styles.moreDetailsText}>{isExpanded ? 'Less' : 'More'} Details</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: '100%',
    flexDirection: 'row', // Align clinic info and edit button in a row
    justifyContent: 'space-between', // Align content to both sides
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.green_light,
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
    color: colors.white,
  },
  recordinfo: {
    backgroundColor: colors.white, // Set background color to white to differentiate from top
    padding: 10,
    borderBottomLeftRadius: 10, // Rounded corners inherited from global card style
    borderBottomRightRadius: 10,
  },
  detailImage: {
    marginTop: 20,
    marginBottom: 20,
    width: 350,
    height: 200,
    borderRadius: 20,
  },
  moreDetailsButton: {
    marginTop: 10,
    alignSelf: 'center', // Center align the button
  },
  moreDetailsText: {
    color: colors.green_dark,
  },
  editButton: {
    padding: 5,
    backgroundColor: colors.blue_light, // Different background color for edit button
    borderRadius: 5,
  },
  editButtonText: {
    color: colors.white, // White text color for better readability
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green_dark,
    marginBottom: 8,
    textAlign: 'center', // Ensure text is centered
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center', // Ensure text is centered
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center', // Center align label and input horizontally
  },
  label: {
    fontSize: 16,
    color: colors.green_dark,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Left align label
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.green_dark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%', // Make input take full width of inputGroup
    textAlign: 'left', // Ensure input text starts from the left
  },
});

export default RecordCard;
