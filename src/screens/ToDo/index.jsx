import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask, setTaskId} from '../../redux/Actions';
import GlobalStyle from '../../utils/GlobalStyle';

const ToDo = ({navigation}) => {
  const {tasks} = useSelector(state => {
    return state.taskReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('🚀 ~ ToDo ~ tasks:', tasks);
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTask(parsedTasks));
        }
      })
      .catch(error => console.log(error));
  };

  navigateToTask = () => {
    dispatch(setTaskId(tasks.length + 1));
    navigation.navigate('Task');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text style={[GlobalStyle.MyFont, styles.title]} numberOfLines={1}>{item.Title}</Text>
            <Text style={styles.subTitle}>{item.Desc}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.btn} onPress={navigateToTask}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default ToDo;
