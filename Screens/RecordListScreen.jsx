import React from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import RecordCard from '../components/RecordCard';

//To do List：
// *Navigate to the chat detail page
// *update/link the page info with the info from database
// *add multiple record cards

const RecordListScreen = ({ navigation }) => {

  return (
      <SafeAreaView style={styles.safeArea}>
            <CustomTopBar />
          <ScrollView style={styles.container}> 
              <View style = {styles.container1} >
            <RecordCard />
        </View>
        </ScrollView>
          <CustomBottom_Patient />
          {/* <CustomBottom_Clinic /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    historycontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    flexGrow: 1,
    },
      container1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexGrow: 1,
    },
  
});


export default RecordListScreen;
