// Importing necessary modules from 'react' and 'react-native' packages
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from "react-native";

import Slider from "@react-native-community/slider";

// Cant use HoleView
// import { HoleView } from "react-native-hole-view";

// Importing Camera and Media Library features from Expo
// import { Camera } from "expo-camera/next";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

// Importing Ionicons from Expo's vector icons library for UI icons
import { Ionicons } from "@expo/vector-icons";

// Destructuring the width and height properties from the Dimensions module
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

// CameraScreen functional component definition
const CameraScreen = ({ navigation }) => {
  // State hooks for camera permissions, camera settings, photo capturing and preview
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const cameraRef = useRef(null); // Ref for controlling camera actions

  // State hook for camera focus
  const [focus, setFocus] = useState(true);

  const [zoom, setZoom] = useState(0); // Zoom level starts at 0 (no zoom)

  // Effect hook to request camera and media library permissions on component mount
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      );
    })();
  }, []);

  // Effect hook to focus the camera every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => focusCamera(), 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle photo capture
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
      setIsPreviewVisible(true);
    }
  };

  // Function to save the captured photo to the device's media library
  const handleSavePhoto = async () => {
    if (capturedPhoto) {
      const asset = await MediaLibrary.createAssetAsync(capturedPhoto);
      await MediaLibrary.createAlbumAsync("YourAppName", asset, false);
      Alert.alert(
        "Photo saved",
        "Your photo was successfully saved to your album!"
      );
      setIsPreviewVisible(false);
      setCapturedPhoto(null); // Optionally clear the photo or do something else
    }
  };

  // Function to cancel photo preview and reset state
  const handleCancelPreview = () => {
    setIsPreviewVisible(false);
    setCapturedPhoto(null);
  };

  // Function to handle focus point of interest on camera screen
  const focusCamera = () => {
    setFocus(false);
    // Set a timeout to re-enable focus after a short delay
    setTimeout(() => {
      setFocus(true);
    }, 100);
  };

  // Conditional rendering based on permission status
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or media library</Text>;
  }

  // Main component UI
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        ref={cameraRef}
        autoFocus={focus}
        useCamera2Api={true}
        zoom={zoom}
      >
        <View style={styles.overlay}>
          <View style={styles.transparentCircle} />
        </View>
        
        <TouchableOpacity
          activeOpacity={1}
          onPress={focusCamera}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        />

        <SafeAreaView>
          <View style={styles.topButtonContainer}>
            <View style={styles.rightButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setCameraType(
                    cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="camera-reverse" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFlashMode(
                    flashMode === Camera.Constants.FlashMode.torch
                      ? Camera.Constants.FlashMode.off
                      : Camera.Constants.FlashMode.torch
                  );
                }}
              >
                <Ionicons name="flashlight" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => navigation.navigate("HomeScreen")}
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

        <View style={styles.zoomSlider}>
          <Slider
            style={{ width: 400, height: 40 }}
            minimumValue={0}
            maximumValue={0.05}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={zoom}
            onValueChange={(value) => setZoom(value)}
          />
        </View>
      </Camera>

      <Modal
        visible={isPreviewVisible}
        transparent={false}
        animationType="slide"
      >
        <View style={styles.previewContainer}>
          <Image
            style={styles.fullScreenImage}
            source={{ uri: capturedPhoto }}
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

// StyleSheet for the component
const styles = StyleSheet.create({
  zoomSlider: {
    position: "absolute",
    right: "45%",
    bottom: "50%",
    width: "100%",
    transform: [{ rotate: "-90deg" }],
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 1,
  },
  leftButton: {},
  rightButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70, // Adjust based on button count and spacing
  },
  button: {
    marginHorizontal: 12,
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: "#029C93",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  saveButton: {
    position: "absolute",
    bottom: 40,
    right: 5,
  },
  closePreviewButton: {
    position: "absolute",
    // Set the button position same as the exit button in the camera screen
    top: 50,
    left: 330,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.0)", // Adjust transparency as needed
    justifyContent: "center",
    alignItems: "center",
  },
  transparentCircle: {
    width: 265, // Adjust size as needed
    height: 265, // Adjust size as needed
    borderRadius: 200, // Half of the width/height
    backgroundColor: "transparent",
    borderWidth: 10, // Adjust based on the desired thickness of the gray area
    borderColor: "rgba(0, 0, 0, 0.75)", // Same as overlay color for smooth blending
    position: "absolute",
  },
});

export default CameraScreen; // Exports the CameraScreen component for use in other parts of the app
