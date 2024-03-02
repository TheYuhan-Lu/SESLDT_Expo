import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AuthScreen from './Screens/AuthScreen';

export default function App() {
  console.log("App executed");

  return (
    <SafeAreaView style={styles.container}>
      <AuthScreen />
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
