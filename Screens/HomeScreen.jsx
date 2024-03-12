import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';
import { globalStyles,colors } from '../styles/globalStyles';
import RecordCard from '../components/RecordCard';

const recordExample = {
    clinicName: "Happy Eye Clinic",
    patientName: "John Doe",
    time: "2023-03-03 14:30",
    summary: "Routine Checkup",
    details: "No cavities found.",
    imageUri: "https://example.com/example-image.jpg", // 示例图片URL
  };
// For testing hardware set
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar />
      
      {/* 使用ScrollView直接包裹内容，而不是额外的View */}
      <ScrollView style={styles.container}>
        {/* Video Container */}
      <View style={[globalStyles.card, styles.videoContainer]}>
          <Image
            style={styles.videoThumbnail}
            source={require('../assets/video.png')} 
          />
        </View>

        {/* Record Title */}
        <View style={styles.separator} />
        <Text style={styles.recordTitle}>The latest Record</Text>
                <View style={styles.separator} />
        <RecordCard 
          record={recordExample} 
          isClinicUser={false}
        />
      </ScrollView>   

      <CustomBottom_Patient />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    // 移除flex: 1，允许ScrollView自然地根据内部内容调整高度
    backgroundColor: '#fff',
  },
  videoContainer: {

  },
  videoThumbnail: {
    width: '100%', // 使缩略图填满容器宽度
    height: 200, // 设置一个固定的高度
    borderRadius: 5, 
  },
  recordContainer: {
    padding: 20,
  },
  recordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.green_dark,
  },
    separator: {
    height: 10, // 分割线的高度
    backgroundColor: '#E0E0E0', // 分割线的颜色，这里使用浅灰色
    width: '100%', // 分割线的宽度，与 card 宽度一致
    alignSelf: 'center', // 确保分割线在容器中居中对齐
    marginVertical: 8, // 在分割线上下添加一些外边距以分隔内容
  },

});

export default HomeScreen;