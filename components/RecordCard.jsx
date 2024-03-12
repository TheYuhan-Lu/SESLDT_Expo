import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,KeyboardAvoidingView ,Platform} from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

//To do:
// *set the user group to use edit button
// *link the data with database

const RecordCard = ({ record, isClinicUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(record.summary);
  const [editedDetails, setEditedDetails] = useState(record.details);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // 保存逻辑，此处为示例，根据实际需求实现
      console.log('Saving edits', editedSummary, editedDetails);
      // 假设保存操作成功后，更新原始记录的summary和details
    }
    setIsEditing(!isEditing);
  };

    return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>

    <View style={globalStyles.card}>
          <View style={styles.top}>
        <View style={styles.clinicInfo}>
          <Image
            style={styles.clinicAvatar}
            source={require('../assets/Profile.png')} // 本地图片或从record中获取
          />
          <Text style={styles.clinicName}>{record.clinicName}</Text>
        </View>
        {isClinicUser && (
          <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
            <Text style={styles.label}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.recordinfo}>
        <Text style={styles.name}>{record.patientName}</Text>
        <Text><Text style={styles.label}>Time:</Text> {record.time}</Text>
        {isEditing ? (
            <>
            <Image source={require('../assets/eys.jpg')} style={styles.detailImage} />    
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Summary:</Text>
            <TextInput
              value={editedSummary}
              onChangeText={setEditedSummary}
              style={styles.input}
              placeholder="Edit Summary"
            />
          </View>
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Details:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEditedDetails}
              value={editedDetails}
              placeholder="Edit Details"
            />
          </View>
          </>
        ) : (
          <>
            <Text><Text style={styles.label}>Diagnosis:</Text> {record.summary}</Text>
            {isExpanded && (
                <>
                <Text><Text style={styles.label}>Details:</Text> {record.details}</Text>
                <Image source={require('../assets/eys.jpg')} style={styles.detailImage} />
              </>
            )}
            <TouchableOpacity onPress={toggleExpand} style={styles.moreDetailsButton}>
              <Text style={styles.moreDetailsText}>{isExpanded ? 'Less' : 'More'} Details</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
            </View>
            </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  top: {
    width: '100%',
    flexDirection: 'row', // 使得诊所信息和编辑按钮并排显示
    justifyContent: 'space-between', // 在两侧对齐内容
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.green_light,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  recordinfo: {
    backgroundColor: colors.white, // 背景设置为白色以区分顶部
    padding: 10,
    borderBottomLeftRadius: 10, // 继承自全局卡片样式的圆角
    borderBottomRightRadius: 10,
  },
    detailImage: {
        marginTop: 20, 
        marginBottom:20,
        width: 350,
        height: 200,
        borderRadius: 20,
  },
  moreDetailsButton: {
    marginTop: 10,
    alignSelf: 'center', // 居中显示
  },
  moreDetailsText: {
    color: colors.green_dark,
  },
  editButton: {
    padding: 5,
    backgroundColor: colors.blue_light, // 编辑按钮使用不同的背景色
    borderRadius: 5,
  },
  editButtonText: {
    color: colors.white, // 文本颜色为白色以增强可读性
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    alignSelf: 'center',
    },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green_dark,
    marginBottom: 8,
    textAlign: 'center', // 确保文本居中对齐
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center', // 确保文本居中对齐
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center', // 使标签和输入框在水平方向上居中
  },
  label: {
    fontSize: 16,
    color: colors.green_dark,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // 标签左对齐
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.green_dark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%', // 输入框占满整个inputGroup宽度
    textAlign: 'left', // 确保输入文本从左开始
  },
});
export default RecordCard;