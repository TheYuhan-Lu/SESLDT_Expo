import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, SafeAreaView } from "react-native";
import { Camera, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back; // Use the back camera
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraPermission === 'authorized' && mediaLibraryPermission.status === 'granted'
      );
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePhoto();
    setPhoto(photo);
    setIsPreviewVisible(true);
  };

  const handleSavePhoto = async () => {
    if (!photo) return;
    const asset = await MediaLibrary.createAssetAsync(photo.path);
    await MediaLibrary.createAlbumAsync("YourAppName", asset, false);
    Alert.alert("Photo saved", "Your photo was successfully saved to your album!");
    setIsPreviewVisible(false);
    setPhoto(null);
  };

  const handleCancelPreview = () => {
    setIsPreviewVisible(false);
    setPhoto(null);
  };

  if (hasPermission === false) {
    return <Text>No access to camera or media library.</Text>;
  }

  if (!device) {
    return <Text>Loading Camera...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      >
        <SafeAreaView>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePhoto}
        >
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </Camera>

      <Modal
        visible={isPreviewVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.previewContainer}>
          <Image
            style={styles.fullScreenImage}
            source={{ uri: photo?.uri }}
          />
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleSavePhoto}
          >
            <Ionicons name="archive" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closePreviewButton}
            onPress={handleCancelPreview}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  leftButton: {},
  captureButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#029C93",
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  closePreviewButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});

export default CameraScreen;
