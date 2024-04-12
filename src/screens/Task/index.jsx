import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import CustomButton from '../../Component/CustomButton';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask} from '../../redux/Actions';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');
  const [showBellModal, setShowBellModal] = useState(false);
  const [bellTime, setBellTime] = useState('1');

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
    }
  };

  const setTaskOnClick = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTask(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showBellModal}
        onRequestClose={() => setShowBellModal(false)}
        animationType="slide"
        transparent
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.bell_modal}>
            <View style={styles.bell_body}>
              <Text style={styles.txt}>Remind me after</Text>
              <TextInput
                style={styles.bell_input}
                value={bellTime}
                keyboardType="numeric"
              />
              <Text style={styles.txt}>minute(s)</Text>
            </View>
            <View style={styles.bell_buttons}>
              <TouchableOpacity style={styles.bell_cancel_button} onPress={() => {
                setShowBellModal(false)
              }} >
                <Text style={styles.txt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bell_ok_button} onPress={() => {
                setShowBellModal(false);
              }} >
                <Text style={styles.txt}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      <View style={styles.color_bar}>
        <TouchableOpacity
          style={styles.color_white}
          onPress={() => {
            setColor('white');
          }}>
          {color === 'white' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_red}
          onPress={() => {
            setColor('red');
          }}>
          {color === 'red' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_blue}
          onPress={() => {
            setColor('blue');
          }}>
          {color === 'blue' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_green}
          onPress={() => {
            setColor('green');
          }}>
          {color === 'green' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.extra_row}>
        <TouchableOpacity
          style={styles.extra_button}
          onPress={() => {
            setShowBellModal(true);
          }}>
          <FontAwesome5
            name={'bell'}
            size={25}
            color={'#ffffff'}></FontAwesome5>
        </TouchableOpacity>
      </View>
      <View style={styles.checkBox}>
        <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
        <Text style={styles.txt}>Is Done</Text>
      </View>
      <CustomButton title={'Save Task'} onPressFunction={setTaskOnClick} />
    </View>
  );
};

export default Task;
