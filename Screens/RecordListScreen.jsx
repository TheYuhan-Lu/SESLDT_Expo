import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import RecordCard from '../components/RecordCard';

//To do List：
// *Navigate to the chat detail page
// *update/link the page info with the info from database
// *add multiple record cards

const RecordListScreen = ({ navigation }) => {
const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg", // 示例图片URL
  };

  return (
      <SafeAreaView style={styles.safeArea}>
          <CustomTopBar />
          <ScrollView style={styles.container}> 
              <View style = {styles.container1} >
                <RecordCard 
                    record={recordExample} 
                    isClinicUser={true} // 或根据实际用户角色动态设置
                     />
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
