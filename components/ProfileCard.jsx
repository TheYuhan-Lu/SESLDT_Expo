import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, globalStyles } from '../styles/globalStyles';

// ProfileCard component handles the user's profile display and editing
const ProfileCard = ({ profileData, onSave, onCancel }) => {
  const avatarSource = profileData.avatar ? { uri: profileData.avatar } : require('../assets/Profile.png'); // Default avatar image
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [tempData, setTempData] = useState({ ...profileData }); // Temporary state to hold profile data while editing

  // Function to pick an image from the library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setTempData(prev => ({ ...prev, avatar: result.uri })); // Update avatar in temp data
    }
  };

  // Function to handle saving the profile data
  const handleSave = () => {
    onSave(tempData); // Use temp data to update original data
    setEditMode(false); // Exit edit mode
  };

  // Function to handle cancelling the editing
  const handleCancel = () => {
    onCancel(); // Call external cancel logic
    setTempData({ ...profileData }); // Reset temp data to original data
    setEditMode(false); // Exit edit mode
  };

  return (
    <View style={globalStyles.card}>
      {editMode ? (
        // Edit mode view
        <>
          <TouchableOpacity onPress={pickImage}>
            <Image source={tempData.avatar ? { uri: tempData.avatar } : avatarSource} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              value={tempData.name}
              onChangeText={text => setTempData(prev => ({ ...prev, name: text }))}
              style={styles.input}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthday:</Text>
            <TextInput
              value={tempData.birthday}
              onChangeText={text => setTempData(prev => ({ ...prev, birthday: text }))}
              style={styles.input}
              placeholder="Birthday"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact:</Text>
            <TextInput
              value={tempData.contact}
              onChangeText={text => setTempData(prev => ({ ...prev, contact: text }))}
              style={styles.input}
              placeholder="Contact"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address:</Text>
            <TextInput
              value={tempData.address}
              onChangeText={text => setTempData(prev => ({ ...prev, address: text }))}
              style={styles.input}
              placeholder="Address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={tempData.email}
              onChangeText={text => setTempData(prev => ({ ...prev, email: text }))}
              style={styles.input}
              placeholder="Email"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} color={colors.green_dark} />
            <Button title="Cancel" onPress={handleCancel} color={colors.green_dark} />
          </View>
        </>
      ) : (
        // Display mode view
        <>
          <TouchableOpacity onPress={() => setEditMode(true)} style={{ alignItems: 'center' }}>
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.info}>Birthday: {profileData.birthday}</Text>
            <Text style={styles.info}>Email: {profileData.email}</Text>
            <Text style={styles.info}>Contact: {profileData.contact}</Text>
            <Text style={styles.info}>Address: {profileData.address}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
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
    alignItems: 'center', // Center label and input horizontally
  },
  label: {
    fontSize: 16,
    color: colors.green_dark,
    marginBottom: 5,
    alignSelf: 'flex-start', // Align label to the left
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%', // Make input take full width of inputGroup
    textAlign: 'left', // Ensure input text starts from the left
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default ProfileCard;
