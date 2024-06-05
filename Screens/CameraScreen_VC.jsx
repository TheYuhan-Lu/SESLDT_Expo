import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ActivityIndicator, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';

// CameraScreen component handles the camera functionalities and UI
const CameraScreen = ({ isVisible, onClose, onPictureTaken }) => {
  const [hasPermission, setHasPermission] = useState(null); // State to track camera permissions
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // State to track the camera type (front/back)
  const [isLoading, setIsLoading] = useState(false); // State to handle loading indicator
  const cameraRef = useRef(null); // Reference to the camera instance

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync(); // Request camera permissions
      setHasPermission(status === 'granted'); // Update permission state
    })();
  }, []);

  // Function to handle taking a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      setIsLoading(true); // Show loading indicator
      const photo = await cameraRef.current.takePictureAsync(); // Take a picture
      await MediaLibrary.createAssetAsync(photo.uri); // Save the picture to the library
      setIsLoading(false); // Hide loading indicator
      onPictureTaken(photo); // Pass the taken picture to the parent component
    }
  };

  // Function to toggle the camera type (front/back)
  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <View style={styles.controls}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" /> // Show loading indicator while taking picture
          ) : (
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
              <FontAwesome name="camera" size={23} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  controls: {
    flex: 0.25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CameraScreen;
