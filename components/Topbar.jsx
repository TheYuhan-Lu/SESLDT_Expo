import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { colors } from '../styles/globalStyles';

export const CustomTopBar = () => {
    return (
        <View style={styles.topBar}>
            <Image
                source={require('../assets/LOGO.png')} // 替换为你的logo图片路径
                style={styles.logo}
                resizeMode="contain" // 保持图片宽高比
            />
        </View>
    );

};

const styles = StyleSheet.create({
  topBar: {
    height: 60, 
    backgroundColor: colors.gray_background, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180, 
    height: 60, 
  },
});