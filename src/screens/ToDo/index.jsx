import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask, setTaskId} from '../../redux/Actions';
import GlobalStyle from '../../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';

const ToDo = ({navigation}) => {
  const {tasks} = useSelector(state => {
    return state.taskReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
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

  deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID != id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTask(filteredTasks));
        Alert.alert('Success', 'Task removed successfully');
      })
      .catch(err => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => (task.ID = id));
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;

      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTask(newTasks));
          Alert.alert('Success', 'Task state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.filter(task => task.Done === false)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskId(item.ID));
              navigation.navigate('Task');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#ffffff',
                  },
                  styles.color,
                ]}
              />
              <CheckBox
                value={item.Done}
                onValueChange={newValue => {
                  checkTask(item.ID, newValue);
                }}
              />
              <View style={styles.item_body}>
                <Text
                  style={[GlobalStyle.MyFont, styles.title]}
                  numberOfLines={1}>
                  {item.Title}
                </Text>
                <Text style={styles.subTitle}>{item.Desc}</Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteTask(item.ID)}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          dispatch(setTaskId(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default ToDo;
