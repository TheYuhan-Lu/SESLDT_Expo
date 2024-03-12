import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';
import { CustomTopBar } from '../components/Topbar';
import { CustomBottom_Patient,CustomBottom_Clinic } from '../components/Bottom'; // Or CustomBottom_Clinic based on your user role


const chatData = [
  { id: '1', name: 'Alice', lastMessage: 'Hi there!', avatarUrl: 'https://example.com/avatar1.jpg', time: '09:00 AM' },
  { id: '2', name: 'Bob', lastMessage: 'How are you?', avatarUrl: 'https://example.com/avatar2.jpg', time: '09:15 AM' },

];

const ChatListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetail', {
        name: item.name, // 传递聊天对象的名字
        avatarUrl: item.avatarUrl, // 传递聊天对象的头像URL
      })}
    >
      <View style={styles.chatItem}>
        <Image source={require('../assets/Profile.png')} style={styles.avatar} />
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.lastMessage}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <SafeAreaView style={styles.safeArea}>
      <View style = {styles.container}>
      <CustomTopBar />
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
        </View>
      {/* <CustomBottom_Patient /> */}
          <CustomBottom_Clinic />
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
  
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 2, // 保持原样或适当调整
  },
  messageContainer: {
    flex: 1,
    marginLeft: 20, // 增加从头像到文本的间距
  },
  title: {
    fontSize: 24,
  },
  time: {
    fontSize: 14,
    color: 'grey',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 16,
    marginRight: 16,
  },
});


export default ChatListScreen;
