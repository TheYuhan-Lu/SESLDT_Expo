import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './Screens/AuthScreen';
import PatientHomeScreen from './Screens/PatientHomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './Screens/CameraScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  console.log("App executed");

  return (
    <PatientHomeScreen />

  );
} 

const styles = StyleSheet.create({
  
}); 




