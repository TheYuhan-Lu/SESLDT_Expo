import React from 'react';
import { SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { CustomBottom_Clinic, CustomBottom_Patient } from '../components/Bottom';
import { CustomTopBar } from '../components/Topbar';

//To do List：
// *Navigate to the chat detail page
// *update/link the page info with the info from database
// 




//test data
const chatData = [
  { id: '1', name: 'Alice', lastMessage: 'Hi there!', avatarUrl: 'https://example.com/avatar1.jpg', time: '09:00 AM' },
  { id: '2', name: 'Bob', lastMessage: 'How are you?', avatarUrl: 'https://example.com/avatar2.jpg', time: '09:15 AM' },

];

const ChatListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id, name: item.name })}
    >
      <View style={styles.chatItem}>
        <Image source={ require('../assets/Profile.png')} style={styles.avatar} />
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
                <CustomTopBar />
          <ScrollView style={styles.container}> 

      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />} // 分割线
              />
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
