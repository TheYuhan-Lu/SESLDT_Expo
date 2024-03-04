import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './Screens/AuthScreen';
import PatientHomeScreen from './Screens/PatientHomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  console.log("App executed");

  return (
    <SafeAreaView style={styles.container}>
      <PatientHomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 




