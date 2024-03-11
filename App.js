import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './Screens/AuthScreen';
import PatientHomeScreen from './Screens/PatientHomeScreen';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from './Screens/CameraScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");

  return (
    //<AuthScreen />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  
}); 




