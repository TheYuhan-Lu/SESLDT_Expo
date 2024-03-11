
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';


const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      setIsPreviewVisible(true);
    }
  };

  const handleSavePhoto = async () => {
    if (capturedPhoto) {
      const asset = await MediaLibrary.createAssetAsync(capturedPhoto);
      await MediaLibrary.createAlbumAsync('YourAppName', asset, false);
      Alert.alert('Photo saved', 'Your photo was successfully saved to your album!');
      setIsPreviewVisible(false);
      setCapturedPhoto(null); // Optionally clear the photo or do something else
    }
  };

  const handleCancelPreview = () => {
    setIsPreviewVisible(false);
    setCapturedPhoto(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or media library</Text>;
  }

  return ( 
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} flashMode={flashMode} ref={cameraRef}>
        <SafeAreaView>
        <View style={styles.topButtonContainer}>
          <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.button} onPress={() => {
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setFlashMode(
              flashMode === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.torch
            );
          }}>
            <Ionicons name="flashlight" size={30} color="white" />
          </TouchableOpacity>
          </View>

        <TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        </View>
        </SafeAreaView>

        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </Camera>
      <Modal visible={isPreviewVisible} transparent={false} animationType="slide">
        <View style={styles.previewContainer}>
          <Image style={styles.fullScreenImage} source={{ uri: capturedPhoto }} />
          <TouchableOpacity style={styles.captureButton} onPress={handleSavePhoto}>
          <Ionicons name="archive" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closePreviewButton} onPress={handleCancelPreview}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  topButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 1,
  },
  leftButton: {
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70, // 根据按钮数量和间距调整
  },
  button: {
    marginHorizontal: 12,
  },

  captureButton: {
    position: 'absolute',
    bottom: 50, 
    left: '50%', 
    marginLeft: -30, 
    width: 60, 
    height: 60, 
    borderRadius: 24, 
    backgroundColor: '#029C93', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10, 
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  saveButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },

  closePreviewButton: {
    position: 'absolute',
    top: 60,
    left: 370,
  },
});

export default CameraScreen;