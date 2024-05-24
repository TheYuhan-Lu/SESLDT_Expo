import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
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
      await MediaLibrary.createAlbumAsync('CameraApp', asset, false);
      Alert.alert('Photo saved', 'Your photo has been saved to the album!');
      setIsPreviewVisible(false);
      setCapturedPhoto(null);
    }
  };

  const handleCancelPreview = () => {
    setIsPreviewVisible(false);
    setCapturedPhoto(null);
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Requesting for camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text>No access to camera or media library</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        ref={cameraRef}
        useCamera2Api={true}
        zoom={zoom}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.transparentCircle} />
        </View>

        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setFlashMode(
              flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )}
          >
            <Ionicons name="flash" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.zoomSlider}>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={zoom}
            onValueChange={(value) => setZoom(value)}
          />
        </View>
      </Camera>

      {isPreviewVisible && (
        <Modal visible={isPreviewVisible} transparent={false} animationType="slide">
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedPhoto }} style={styles.fullScreenImage} />
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePhoto}>
              <Ionicons name="save" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancelPreview}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparentCircle: {
    width: 265,
    height: 265,
    borderRadius: 200,
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0.75)',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-end',
  },
  flashButton: {
    alignSelf: 'flex-end',
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#029C93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  saveButton: {
    position: 'absolute',
    bottom: 50,
    left: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  zoomSlider: {
    position: 'absolute',
    bottom: 120,
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
  },
});

export default CameraScreen;
