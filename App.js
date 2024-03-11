import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './screens/AuthScreen';
import PatientHomeScreen from './screens/PatientHomeScreen';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './screens/CameraScreen';

//const Tab = createBottomTabNavigator();

export default function App() {
  console.log("App executed");

  return (
    <AuthScreen />

  );
} 

const styles = StyleSheet.create({
  
}); 




