import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', // 确保所有子项在水平方向上居中
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    width: '96%', // 宽度已经设置为屏幕宽度的96%
    alignSelf: 'center', // 确保卡片自身在其父视图中居中
  },
});
// Use example
// import { globalStyles } from './styles/globalStyles';

// const ExampleComponent = () => {
//   return (
//     <View style={globalStyles.container}></View>

export const colors = {
    gray_background:'#EFEFEF',
    green_dark: '#029C93',
    green_light:'#DCF1F0',
};
