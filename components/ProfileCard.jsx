import React, { useState }  from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, globalStyles } from '../styles/globalStyles';

// To do:
// *deal with the user data with the profile component
// *deal with the on save function
// *deal with if the page needs to edit profile


const ProfileCard = ({ profileData, onSave, onCancel }) => {
  const avatarSource = profileData.avatar ? { uri: profileData.avatar } : require('../assets/Profile.png');
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setTempData(prev => ({ ...prev, avatar: result.uri }));
    }
  };

  const handleSave = () => {
    onSave(tempData); // 使用临时状态更新原数据
    setEditMode(false); // 退出编辑模式
  };

  const handleCancel = () => {
    onCancel(); // 调用外部传入的取消逻辑
    setTempData({ ...profileData }); // 重置临时数据为原始数据
    setEditMode(false); // 退出编辑模式
  };

  return (
    <View style={globalStyles.card}>
      {editMode ? (
        <>
          <TouchableOpacity onPress={pickImage}>
            <Image source={tempData.avatar ? { uri: tempData.avatar } : avatarSource} style={styles.avatar} />
                  </TouchableOpacity>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              value={tempData.name}
              onChangeText={text => setTempData(prev => ({ ...prev, name: text }))}
              style={styles.input}
              placeholder="Name"
            />
          </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthday:</Text>
            <TextInput
              value={tempData.birthday}
              onChangeText={text => setTempData(prev => ({ ...prev, birthday: text }))}
              style={styles.input}
              placeholder="Birthday"
            />
          </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact:</Text>
            <TextInput
              value={tempData.contact}
              onChangeText={text => setTempData(prev => ({ ...prev, contact: text }))}
              style={styles.input}
              placeholder="Contact"
            />
          </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Address:</Text>
            <TextInput
              value={tempData.address}
              onChangeText={text => setTempData(prev => ({ ...prev, address: text }))}
              style={styles.input}
              placeholder="Address"
            />
          </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              value={tempData.email}
              onChangeText={text => setTempData(prev => ({ ...prev, email: text }))}
              style={styles.input}
              placeholder="Email"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} color={colors.green_dark} />
            <Button title="Cancel" onPress={handleCancel} color={colors.green_dark} />
          </View>

        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setEditMode(true)} style={{ alignItems: 'center' }}>
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.info}>Birthday: {profileData.birthday}</Text>
            <Text style={styles.info}>Email: {profileData.email}</Text>
            <Text style={styles.info}>Contact: {profileData.contact}</Text>
            <Text style={styles.info}>Address: {profileData.address}</Text>

          </TouchableOpacity>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
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
    alignSelf: 'flex-start', // 标签左对齐
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%', // 输入框占满整个inputGroup宽度
    textAlign: 'left', // 确保输入文本从左开始
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});


export default ProfileCard;
