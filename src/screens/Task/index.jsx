import {Alert, TextInput, View} from 'react-native';
import styles from './style';
import CustomButton from '../../Component/CustomButton';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask}  from '../../redux/Actions';
const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();


  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const setTaskOnClick = () => {
    if (title.length == 0) {
      Alert.alert('Warning', 'Please write your task title');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
        };

        let newTasks = [...tasks, Task];
       AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTask(newTasks))
          Alert.alert('Success !', 'Task saved succesfully');
          navigation.goBack();
        })
        .catch(err => console.log(err))
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        multiline
        onChangeText={desc => setDesc(desc)}
      />
      <CustomButton title={'Save Task'} onPressFunction={setTaskOnClick} />
    </View>
  );
};

export default Task;
