import React, { useEffect } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import styles from './style';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('My Tasks')
    },2000)
  })

  return (
    <View style={styles.container} >
      <Text style={styles.txt} >To do List App</Text>
      <Image
        style={styles.img}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png',
        }}
      />
    </View>
  );
};

export default SplashScreen;


